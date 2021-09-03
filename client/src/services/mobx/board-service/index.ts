import { makeAutoObservable, runInAction, observable } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { enableLogging } from 'mobx-logger';
import { Task } from '../../redux/board-service/types';
import { TASK_STATUS } from '../../../core/enums';

class Board {
	tasks: Array<Task> = [];

	constructor() {
		makeAutoObservable(this);
	}

	async getTasks() {
		try {
			const tasks = await axios.get('/api/get-tasks');
			this.tasks = tasks.data;
		} catch (error) {
			console.log(error);
		}
	}

	*addTask(taskData: Task) {
		try {
			const response: AxiosResponse<void> = yield axios.post('/api/add-task', taskData);
			if (response.status === 200)
				runInAction(() => {
					this.tasks.push(taskData);
				});
		} catch (error) {
			console.log(error);
		}
	}

	*setUserForTask(taskId: string, userId: string) {
		try {
			const axiosPayload = { taskId, userId: userId.length ? userId : null };
			const response: AxiosResponse<Task> = yield axios.post('/api/set-task-user', axiosPayload);
			const taskIndex = this.tasks.findIndex(task => task.id === response.data.id);
			if (taskIndex !== -1)
				runInAction(() => {
					this.tasks[taskIndex] = response.data;
				});
		} catch (error) {
			console.log(error);
		}
	}

	*setTaskStatus(taskId: string, status: TASK_STATUS | string) {
		try {
			console.log(status);
			const axiosPayload = { taskId, status: status || null };
			const response: AxiosResponse<Task> = yield axios.post('/api/set-task-status', axiosPayload);
			const taskIndex = this.tasks.findIndex(task => task.id === response.data.id);
			if (taskIndex !== -1)
				runInAction(() => {
					// if you won't wrap child component who has task props by observer you should set copy like:
					// this.tasks = [...this.tasks.map(task => (task.id === response.data.id ? response.data : task))];
					this.tasks[taskIndex] = response.data;
				});
		} catch (error) {
			console.log(error);
		}
	}

	get total() {
		return this.tasks.length;
	}
}

const storeBoard = new Board();

export default storeBoard;

// LIKE FUNCTION STORE

// type Store = { tasks: Array<Task> };

// const initState: Store = {
// 	tasks: [],
// };

// function storeBoardFunc(initState: Store) {
// 	return makeAutoObservable({
// 		tasks: initState.tasks,

// 		async getTasks() {
// 			try {
// 				const tasks = await axios.get('/api/get-tasks');
// 				this.tasks = tasks.data;
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		},

// 		*addTask(taskData: Task) {
// 			try {
// 				const response: AxiosResponse<void> = yield axios.post('/api/add-task', taskData);
// 				if (response.status === 200)
// 					runInAction(() => {
// 						this.tasks.push(taskData);
// 					});
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		},

// 		*setUserForTask(taskId: string, userId: string) {
// 			try {
// 				const axiosPayload = { taskId, userId };
// 				const response: AxiosResponse<Task> = yield axios.post('/api/set-task-user', axiosPayload);
// 				const taskIndex = this.tasks.findIndex(task => task.id === response.data.id);
// 				if (taskIndex !== -1)
// 					runInAction(() => {
// 						this.tasks[taskIndex] = response.data;
// 					});
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		},

// 		*setTaskStatus(taskId: string, status: TASK_STATUS) {
// 			try {
// 				const axiosPayload = { taskId, status };
// 				const response: AxiosResponse<Task> = yield axios.post('/api/set-task-status', axiosPayload);
// 				const taskIndex = this.tasks.findIndex(task => task.id === response.data.id);
// 				if (taskIndex !== -1)
// 					runInAction(() => {
// 						this.tasks[taskIndex] = response.data;
// 					});
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		},

// 		get total() {
// 			return this.tasks.length;
// 		},
// 	});
// }

// export default storeBoardFunc(initState);

// LIKE OBSERVER STORE

// const boardStoreObservable = observable({
// 	tasks: [] as Array<Task>,
// 	async getTasks() {
// 		try {
// 			const tasks = await axios.get('/api/get-tasks');
// 			this.tasks = tasks.data;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	},

// 	*addTask(taskData: Task) {
// 		try {
// 			const response: AxiosResponse<void> = yield axios.post('/api/add-task', taskData);
// 			if (response.status === 200)
// 				runInAction(() => {
// 					this.tasks.push(taskData);
// 				});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	},

// 	*setUserForTask(taskId: string, userId: string) {
// 		try {
// 			const axiosPayload = { taskId, userId };
// 			const response: AxiosResponse<Task> = yield axios.post('/api/set-task-user', axiosPayload);
// 			const taskIndex = this.tasks.findIndex(task => task.id === response.data.id);
// 			if (taskIndex !== -1)
// 				runInAction(() => {
// 					this.tasks[taskIndex] = response.data;
// 				});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	},

// 	*setTaskStatus(taskId: string, status: TASK_STATUS) {
// 		try {
// 			const axiosPayload = { taskId, status };
// 			const response: AxiosResponse<Task> = yield axios.post('/api/set-task-status', axiosPayload);
// 			const taskIndex = this.tasks.findIndex(task => task.id === response.data.id);
// 			if (taskIndex !== -1)
// 				runInAction(() => {
// 					this.tasks[taskIndex] = response.data;
// 				});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	},

// 	get total() {
// 		return this.tasks.length;
// 	},
// });

// export default boardStoreObservable;

enableLogging({
	predicate: () => true,
	action: true,
	reaction: true,
	transaction: true,
	compute: true,
});

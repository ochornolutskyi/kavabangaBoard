import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { Task } from '../../redux/board-service/types';
import { TASK_STATUS } from '../../../core/enums';

class Board {
	tasks: Array<Task> = [];

	constructor() {
		// makeAutoObservable(this, {}, { autoBind: true });
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
					console.log('run in', this.tasks);
					this.tasks.push(taskData);
				});
		} catch (error) {
			console.log(error);
		}
	}

	*setUserForTask(taskId: string, userId: string) {
		try {
			const axiosPayload = { taskId, userId };
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

	*setTaskStatus(taskId: string, status: TASK_STATUS) {
		try {
			const axiosPayload = { taskId, status };
			const response: AxiosResponse<Task> = yield axios.post('/api/set-task-status', axiosPayload);
			const taskIndex = this.tasks.findIndex(task => task.id === response.data.id);
			if (taskIndex !== -1)
				runInAction(() => {
					this.tasks[taskIndex] = response.data;
					console.log(this.tasks[taskIndex].status);
				});
		} catch (error) {
			console.log(error);
		}
	}
}

const storeBoard = new Board();

export default storeBoard;

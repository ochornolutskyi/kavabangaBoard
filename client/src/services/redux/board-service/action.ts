import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { ADD_TASK, GET_TASKS, SET_TASK_STATUS, SET_USER_FOR_TASK } from '../action-types';
import { Task } from './types';
import { TASK_STATUS } from '../../../core/enums';

export const getTasks =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			const tasks = await axios.get('/api/get-tasks');
			dispatch({
				type: GET_TASKS,
				payload: tasks.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const addTask =
	(task: Task) =>
	(dispatch: Dispatch): void => {
		dispatch({
			type: ADD_TASK,
			payload: task,
		});
	};

export const setUserForTask =
	(taskId: string, userId: string) =>
	async (dispatch: Dispatch): Promise<void> => {
		const axiosPayload = { taskId, userId };
		const response: AxiosResponse<Task> = await axios.post('/api/set-task-user', axiosPayload);
		dispatch({
			type: SET_USER_FOR_TASK,
			payload: response.data,
		});
	};

export const setTaskStatus =
	(taskId: string, status: TASK_STATUS) =>
	async (dispatch: Dispatch): Promise<void> => {
		const axiosPayload = { taskId, status };
		const response: AxiosResponse<Task> = await axios.post('/api/set-task-status', axiosPayload);
		dispatch({
			type: SET_TASK_STATUS,
			payload: response.data,
		});
	};

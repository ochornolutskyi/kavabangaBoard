import { TASK_STATUS } from '../../../core/enums';
import { ADD_TASK, GET_TASKS, SET_TASK_STATUS, SET_USER_FOR_TASK } from '../action-types';

export type Task = {
	id: string;
	date: Date;
	name: string;
	description: string;
	status: TASK_STATUS;
	user?: string;
};

export interface IBoardReducer {
	tasks: Array<Task>;
}

export interface IGetTasks {
	type: typeof GET_TASKS;
	payload: Array<Task>;
}

interface IAddTask {
	type: typeof ADD_TASK;
	payload: Task;
}

interface ISetUserForTask {
	type: typeof SET_USER_FOR_TASK;
	payload: Task;
}

interface ISetTaskStatus {
	type: typeof SET_TASK_STATUS;
	payload: Task;
}

export type ActionsType = IGetTasks | IAddTask | ISetUserForTask | ISetTaskStatus;

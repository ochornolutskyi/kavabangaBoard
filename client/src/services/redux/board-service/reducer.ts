import { ADD_TASK, GET_TASKS, SET_TASK_STATUS, SET_USER_FOR_TASK } from '../action-types';
import { ActionsType, IBoardReducer, Task } from './types';

const initState: IBoardReducer = {
	tasks: [],
};

const boardReducer = (state = initState, action: ActionsType): IBoardReducer => {
	const { payload, type } = action;
	switch (type) {
		case GET_TASKS:
			return { ...state, tasks: payload as Array<Task> };

		case ADD_TASK:
			return { ...state, tasks: [...state.tasks, payload as Task] };

		case SET_USER_FOR_TASK:
			return {
				...state,
				tasks: state.tasks.map(task => (task.id === (payload as Task).id ? (payload as Task) : task)),
			};

		case SET_TASK_STATUS:
			return {
				...state,
				tasks: state.tasks.map(task => (task.id === (payload as Task).id ? (payload as Task) : task)),
			};

		default:
			return state;
	}
};

export default boardReducer;

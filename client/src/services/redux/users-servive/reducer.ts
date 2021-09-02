import { GET_USERS } from '../action-types';
import { ActionsType, IUsersReducer, User } from './types';

const initState: IUsersReducer = {
	usersList: [],
};

const usersReducer = (state = initState, action: ActionsType): IUsersReducer => {
	const { payload, type } = action;
	switch (type) {
		case GET_USERS:
			return { ...state, usersList: payload as Array<User> };

		default:
			return state;
	}
};

export default usersReducer;

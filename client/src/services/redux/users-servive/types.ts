import { GET_USERS } from '../action-types';

export type User = {
	id: string;
	firstName: string;
	lastName: string;
};

export interface IUsersReducer {
	usersList: Array<User>;
}

export interface IGetUsers {
	type: typeof GET_USERS;
	payload: Array<User>;
}

export type ActionsType = IGetUsers;

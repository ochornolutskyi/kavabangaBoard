import { Dispatch } from 'redux';
import axios from 'axios';
import { GET_USERS } from '../action-types';

export const getUsers =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			const users = await axios.get('/api/get-users');
			dispatch({
				type: GET_USERS,
				payload: users.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

import { makeObservable, observable, flow, configure, runInAction } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { User } from '../../redux/users-servive/types';

// like strict mode
configure({ enforceActions: 'always' });

// class
class Users {
	usersList: Array<User> = [];

	constructor() {
		makeObservable(this, { usersList: observable, getUsers: flow });
	}

	// flow
	*getUsers() {
		try {
			const users: AxiosResponse<Array<User>> = yield axios.get('/api/get-users');
			runInAction(() => {
				this.usersList = users.data;
			});
		} catch (error) {
			console.log(error);
		}
	}
}

const storeUsers = new Users();
export default storeUsers;

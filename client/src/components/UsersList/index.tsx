import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Task } from '../../services/redux/board-service/types';
import { User } from '../../services/redux/users-servive/types';
import styles from './UsersList.module.scss';

type UsersListProps = {
	users: Array<User>;
	tasks: Array<Task>;
};

const UsersList: FC<UsersListProps> = ({ users, tasks }: UsersListProps) => {
	return (
		<div className={styles.main}>
			<h2 className={styles.title}>Top of the top by kavabangas count:</h2>
			{users.map(user => (
				<div key={user.id} className={styles.person}>
					<span>
						{user.firstName} {user.lastName}
					</span>
					<span>{tasks.filter(task => task.user === user.id).length}</span>
				</div>
			))}
		</div>
	);
};

// despite the parent component is observer the child component should be observer also, `case we mutate the store data
export default observer(UsersList);

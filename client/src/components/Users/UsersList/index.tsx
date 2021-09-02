import React, { FC } from 'react';
import { User } from '../../../services/redux/users-servive/types';
import UsersListItem from '../UsersListItem';
import styles from './UsersList.module.scss';

type UsersListProps = {
	users: Array<User>;
};

const UsersList: FC<UsersListProps> = ({ users }: UsersListProps) => {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Users:</h2>
			<div className={styles.table}>
				<span className={styles.table__title}>User fullname</span>
				{users.map(user => (
					<UsersListItem key={user.id} firstName={user.firstName} lastName={user.lastName} />
				))}
			</div>
		</div>
	);
};

export default UsersList;

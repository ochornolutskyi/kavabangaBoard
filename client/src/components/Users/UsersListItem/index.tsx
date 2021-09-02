import React, { FC } from 'react';
import styles from './UsersListItem.module.scss';

type UsersListItemProps = {
	firstName: string;
	lastName: string;
};

const UsersListItem: FC<UsersListItemProps> = ({ firstName, lastName }: UsersListItemProps) => {
	return (
		<div>
			<span>{`${firstName} ${lastName}`} </span>
		</div>
	);
};

export default UsersListItem;

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TasksList from '../../components/Tasks/TasksList';
import UsersList from '../../components/Users/UsersList';
import { TASK_STATUS } from '../../core/enums';
import { Store } from '../../services/redux';
import { getTasks, setTaskStatus, setUserForTask } from '../../services/redux/board-service/action';
import { getUsers } from '../../services/redux/users-servive/action';
import styles from './ReduxBoard.module.scss';

const ReduxBoard: FC = () => {
	const dispatch = useDispatch();
	const users = useSelector((state: Store) => state.users.usersList);
	const tasks = useSelector((state: Store) => state.board.tasks);

	const dispatchSetUserForTask = (taskId: string, userId: string): void => {
		dispatch(setUserForTask(taskId, userId));
	};

	const dispatchSetTaskStatus = (taskId: string, status: TASK_STATUS) => {
		dispatch(setTaskStatus(taskId, status));
	};

	useEffect(() => {
		dispatch(getTasks());
		dispatch(getUsers());
	}, []);

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>You`re running the REDUX board</h1>
			<div className={styles.content}>
				<UsersList users={users} />
				<TasksList
					tasks={tasks}
					users={users}
					setUserForTask={(taskId: string, userId: string) => dispatchSetUserForTask(taskId, userId)}
					setTaskStatus={(taskId: string, status: TASK_STATUS) => dispatchSetTaskStatus(taskId, status)}
				/>
			</div>
		</div>
	);
};

export default ReduxBoard;

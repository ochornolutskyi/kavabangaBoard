import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardContentContainer from '../../components/BoardContentContainer';
import TasksList from '../../components/Tasks/TasksList';
import UsersList from '../../components/UsersList';
import Button from '../../shared/components/Button';
import { TASK_STATUS } from '../../core/enums';
import { Store } from '../../services/redux';
import { addTask, getTasks, setTaskStatus, setUserForTask } from '../../services/redux/board-service/action';
import { Task } from '../../services/redux/board-service/types';
import { getUsers } from '../../services/redux/users-servive/action';
import styles from './ReduxBoard.module.scss';

type ReduxBoardPrpops = { isShowBackButton?: boolean };

const ReduxBoard: FC<ReduxBoardPrpops> = ({ isShowBackButton }: ReduxBoardPrpops) => {
	const dispatch = useDispatch();
	const users = useSelector((state: Store) => state.users.usersList);
	const tasks = useSelector((state: Store) => state.board.tasks);
	const total = useSelector((state: Store) => state.board.tasks.length);

	const dispatchSetUserForTask = (taskId: string, userId: string): void => {
		dispatch(setUserForTask(taskId, userId));
	};

	const dispatchSetTaskStatus = (taskId: string, status: TASK_STATUS | string): void => {
		dispatch(setTaskStatus(taskId, status));
	};
	const dispatchAddTask = (task: Task) => {
		dispatch(addTask(task));
	};

	useEffect(() => {
		dispatch(getTasks());
		dispatch(getUsers());
	}, []);

	return (
		<BoardContentContainer styleType="styleRedux">
			{isShowBackButton && <Button title="Go back" clickHandler={() => history.go(-1)} />}
			<h1 className={styles.title}>REDUX board</h1>
			<TasksList
				tasks={tasks}
				users={users}
				setUserForTask={dispatchSetUserForTask}
				setTaskStatus={dispatchSetTaskStatus}
				addTask={dispatchAddTask}
				total={total}
			/>
			<UsersList tasks={tasks} users={users} />
		</BoardContentContainer>
	);
};

export default ReduxBoard;

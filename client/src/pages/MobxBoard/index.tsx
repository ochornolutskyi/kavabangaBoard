import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import TasksList from '../../components/Tasks/TasksList';
import UsersList from '../../components/Users/UsersList';
import storeBoard from '../../services/mobx/board-service';
import storeUsers from '../../services/mobx/users-service';
import PopupCreateTask from '../../components/Tasks/PopupCreateTask';
import { TASK_STATUS } from '../../core/enums';
import { Task } from '../../services/redux/board-service/types';
import styles from './MobxBoard.module.scss';

const MobxBoard: FC = () => {
	const [isShowAddTask, setIsShowAddTask] = useState(false);

	useEffect(() => {
		storeBoard.getTasks();
		storeUsers.getUsers();
	}, []);

	return (
		<div className={styles.wrapper}>
			<h1>You`re running the MOBX board</h1>
			<UsersList users={storeUsers.usersList} />
			<button onClick={() => setIsShowAddTask(true)}>Add new kavabanga</button>
			<TasksList
				tasks={storeBoard.tasks}
				users={storeUsers.usersList}
				setUserForTask={(taskId: string, userId: string) => storeBoard.setUserForTask(taskId, userId)}
				setTaskStatus={(taskId: string, status: TASK_STATUS) => storeBoard.setTaskStatus(taskId, status)}
			/>
			{isShowAddTask && (
				<PopupCreateTask
					setIsShowAddTask={setIsShowAddTask}
					addTask={(task: Task) => storeBoard.addTask(task)}
					// or you can just pass
					// addTask={storeBoard.addTask}
					// but you should configure boardStore in constructor as makeAutoObservable(this, {}, { autoBind: true }) for binding context
				/>
			)}
		</div>
	);
};

export default observer(MobxBoard);

import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import TasksList from '../../components/Tasks/TasksList';
import storeBoard from '../../services/mobx/board-service';
import storeUsers from '../../services/mobx/users-service';
import { TASK_STATUS } from '../../core/enums';
import { Task } from '../../services/redux/board-service/types';
import BoardContentContainer from '../../components/BoardContentContainer';
import UsersList from '../../components/UsersList';
import Button from '../../shared/components/Button';
import styles from './MobxBoard.module.scss';

type MobxBoardProps = { isShowBackButton?: boolean };

const MobxBoard: FC<MobxBoardProps> = ({ isShowBackButton }: MobxBoardProps) => {
	const history = useHistory();

	useEffect(() => {
		storeBoard.getTasks();
		storeUsers.getUsers();
	}, []);

	return (
		<BoardContentContainer styleType="styleMobx">
			{isShowBackButton && <Button title="Go back" clickHandler={() => history.go(-1)} />}
			<h1>MOBX board</h1>
			<TasksList
				tasks={storeBoard.tasks}
				users={storeUsers.usersList}
				setUserForTask={(taskId: string, userId: string) => storeBoard.setUserForTask(taskId, userId)}
				setTaskStatus={(taskId: string, status: TASK_STATUS | string) =>
					storeBoard.setTaskStatus(taskId, status)
				}
				addTask={(task: Task) => storeBoard.addTask(task)}
				total={storeBoard.total}
			/>
			<UsersList tasks={storeBoard.tasks} users={storeUsers.usersList} />
		</BoardContentContainer>
	);
};

export default observer(MobxBoard);

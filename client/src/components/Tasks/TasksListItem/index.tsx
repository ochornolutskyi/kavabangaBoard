import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { TASK_STATUS } from '../../../core/enums';
import { Task } from '../../../services/redux/board-service/types';
import { User } from '../../../services/redux/users-servive/types';
import styles from './TasksListItem.module.scss';

type TasksListItemProps = {
	task: Task;
	users: Array<User>;
	setUserForTask: (taskId: string, userId: string) => void;
	setTaskStatus: (taskId: string, status: TASK_STATUS) => void;
};

const TasksListItem: FC<TasksListItemProps> = ({ task, users, setUserForTask, setTaskStatus }: TasksListItemProps) => {
	return (
		<div className={styles.row}>
			<span>{task.name}</span>
			<span>{task.description}</span>
			<span>{new Date(task.date).toLocaleDateString()}</span>
			<span>
				<select
					value={task.user || undefined}
					onChange={e => {
						setUserForTask(task.id, e.target.value);
					}}
				>
					<option>Select user</option>
					{users.map(user => (
						<option key={user.id} value={user.id}>
							{`${user.firstName} ${user.lastName}`}
						</option>
					))}
				</select>
			</span>
			<span>
				<select value={task.status || undefined} onChange={e => setTaskStatus(task.id, +e.target.value)}>
					<option>Select status</option>
					<option value={TASK_STATUS.OPEN}>Open</option>
					<option value={TASK_STATUS.IN_PROGRESS}>In progress</option>
					<option value={TASK_STATUS.DONE}>Done</option>
				</select>
			</span>
		</div>
	);
};

export default observer(TasksListItem);

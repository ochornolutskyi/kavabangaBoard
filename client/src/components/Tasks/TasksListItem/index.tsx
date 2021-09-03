import React, { FC, useMemo } from 'react';
import cx from 'classnames';
import { TASK_STATUS } from '../../../core/enums';
import { Task } from '../../../services/redux/board-service/types';
import { User } from '../../../services/redux/users-servive/types';
import styles from './TasksListRow.module.scss';

const setUserFullnameByTask = (task: Task, users: Array<User>): string | null => {
	const correctUser = users.find(user => user.id === task.user);
	if (correctUser) return `${correctUser.firstName} ${correctUser.lastName}`;
	return "D'oh, here is nobody...";
};

const setCoolTaskStatusText = (task: Task): string | null => {
	switch (task.status) {
		case TASK_STATUS.OPEN:
			return 'Take me, I should be done, mmmm...';
		case TASK_STATUS.IN_PROGRESS:
			return 'Keep it up, bro :)';
		case TASK_STATUS.DONE:
			return 'Gooooood boy';
		default:
			return "I'm so alone... Look at me...";
	}
};

type TasksListRowProps = {
	task: Task;
	users: Array<User>;
	setUserForTask: (taskId: string, userId: string) => void;
	setTaskStatus: (taskId: string, status: TASK_STATUS | string) => void;
};

const TasksListRow: FC<TasksListRowProps> = ({ task, users, setUserForTask, setTaskStatus }: TasksListRowProps) => {
	const currentTaskUserFullname = useMemo(() => setUserFullnameByTask(task, users), [task, users]);
	const currentCoolStatus = useMemo(() => setCoolTaskStatusText(task), [task]);

	const selectUserChangehandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setUserForTask(task.id, e.target.value);
	};

	const selectTaskStatusChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setTaskStatus(task.id, e.target.value);
	};

	return (
		<div className={styles.row}>
			<div className={styles.row__cell}>{task.name}</div>
			<div className={styles.row__cell}>{task.description}</div>
			<div className={styles.row__cell}>{new Date(task.date).toLocaleDateString()}</div>
			<div className={cx(styles.row__cell, styles.cell__select)}>
				<div style={{ marginBottom: '5px' }}>{currentTaskUserFullname}</div>
				<select value={task.user || ''} onChange={selectUserChangehandler}>
					<option value="">Select user</option>
					{users.map(user => (
						<option key={user.id} value={user.id}>
							{`${user.firstName} ${user.lastName}`}
						</option>
					))}
				</select>
			</div>
			<div className={cx(styles.row__cell, styles.cell__select)}>
				<div style={{ marginBottom: '5px' }}>{currentCoolStatus}</div>
				<select value={task.status || ''} onChange={e => setTaskStatus(task.id, +e.target.value)}>
					<option value="">Select status</option>
					<option value={TASK_STATUS.OPEN}>Open</option>
					<option value={TASK_STATUS.IN_PROGRESS}>In progress</option>
					<option value={TASK_STATUS.DONE}>Done</option>
				</select>
			</div>
		</div>
	);
};

export default TasksListRow;

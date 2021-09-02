import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { TASK_STATUS } from '../../../core/enums';
import { Task } from '../../../services/redux/board-service/types';
import { User } from '../../../services/redux/users-servive/types';
import TasksListItem from '../TasksListItem';
import styles from './TasksList.module.scss';

type TasksListProps = {
	tasks: Array<Task>;
	users: Array<User>;
	setUserForTask: (taskId: string, userId: string) => void;
	setTaskStatus: (taskId: string, status: TASK_STATUS) => void;
};

const TasksList: FC<TasksListProps> = ({ tasks, users, setUserForTask, setTaskStatus }: TasksListProps) => {
	return (
		<div>
			<div>Kavabangas:</div>
			{tasks.map(task => (
				<TasksListItem
					key={task.id}
					task={task}
					users={users}
					setUserForTask={setUserForTask}
					setTaskStatus={setTaskStatus}
				/>
			))}
		</div>
	);
};

// despite the parent component is observer the child component should be observer also, `case we mutate the data
export default observer(TasksList);

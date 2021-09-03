import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { TASK_STATUS } from '../../../core/enums';
import { Task } from '../../../services/redux/board-service/types';
import { User } from '../../../services/redux/users-servive/types';
import PopupCreateTask from '../PopupCreateTask';
import TasksListRow from '../TasksListRow';
import styles from './TasksList.module.scss';
import Button from '../../../shared/components/Button';

type TasksListProps = {
	tasks: Array<Task>;
	users: Array<User>;
	setUserForTask: (taskId: string, userId: string) => void;
	setTaskStatus: (taskId: string, status: TASK_STATUS | string) => void;
	addTask: (task: Task) => void;
	total: number;
};

const TasksList: FC<TasksListProps> = ({
	tasks,
	users,
	setUserForTask,
	setTaskStatus,
	addTask,
	total,
}: TasksListProps) => {
	const [isShowAddTask, setIsShowAddTask] = useState(false);

	return (
		<div className={styles.main}>
			<Button title="Add new kavabanga" clickHandler={() => setIsShowAddTask(true)} />
			<div className={styles.table}>
				<h2 className={styles.table__title}>Kavabangas:</h2>
				<div className={styles.table__content}>
					{tasks.map(task => (
						<TasksListRow
							key={task.id}
							task={task}
							users={users}
							setUserForTask={setUserForTask}
							setTaskStatus={setTaskStatus}
						/>
					))}
					<div className={styles.table__content_total}>Total: {total}</div>
				</div>
				{isShowAddTask && (
					<PopupCreateTask
						setIsShowAddTask={setIsShowAddTask}
						addTask={addTask}
						// or you can just pass
						// addTask={storeBoard.addTask}
						// but you should configure boardStore in constructor as makeAutoObservable(this, {}, { autoBind: true }) for binding context
					/>
				)}
			</div>
		</div>
	);
};

// despite the parent component is observer the child component should be observer also, `case we mutate the store data
export default observer(TasksList);

import { observer } from 'mobx-react';
import React, { FC, useMemo, useState } from 'react';
import { TASK_STATUS } from '../../../core/enums';
import { Task } from '../../../services/redux/board-service/types';
import styles from './PopupCreateTask.module.scss';

type PopupCreateTaskProps = {
	setIsShowAddTask: React.Dispatch<React.SetStateAction<boolean>>;
	addTask: (taskData: Task) => void;
};

const PopupCreateTask: FC<PopupCreateTaskProps> = ({ setIsShowAddTask, addTask }: PopupCreateTaskProps) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	const kavabangaData = useMemo(() => {
		if (name && description && date)
			return {
				id: new Date().toLocaleString(),
				name,
				description,
				date: new Date(date),
				status: TASK_STATUS.OPEN,
			};
		return null;
	}, [name, date, description]);

	const submitClickHandler = () => {
		if (kavabangaData) {
			addTask(kavabangaData);
			setIsShowAddTask(false);
		}
	};

	return (
		<div>
			<input type="text" placeholder="Kavabanga name" value={name} onChange={e => setName(e.target.value)} />
			<input
				type="text"
				placeholder="Kavabanga description"
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
			<input type="date" placeholder="Kavabanga date" value={date} onChange={e => setDate(e.target.value)} />
			<button onClick={submitClickHandler} disabled={!kavabangaData}>
				Submit
			</button>
		</div>
	);
};

export default observer(PopupCreateTask);

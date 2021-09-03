import React, { FC } from 'react';
import { useHistory } from 'react-router';
import Button from '../../shared/components/Button';
import styles from './Main.module.scss';

const Main: FC = () => {
	const history = useHistory();

	return (
		<div className={styles.content}>
			<h1 className={styles.title}>Welcome to kavabangaBoard</h1>
			<div className={styles.options}>
				<Button title="Go to redux board" clickHandler={() => history.push('/redux/board')} />
				<Button title="Go to mobx board" clickHandler={() => history.push('/mobx/board')} />
				<Button title="Go to both boards" clickHandler={() => history.push('/both-boards')} />
			</div>
		</div>
	);
};

export default Main;

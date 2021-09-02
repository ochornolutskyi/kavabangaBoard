import React, { FC } from 'react';
import { useHistory } from 'react-router';
import styles from './Main.module.scss';

const Main: FC = () => {
	const history = useHistory();

	return (
		<div className={styles.content}>
			<h1 className={styles.title}>Welcome to kavabangaBoard</h1>
			<div className={styles.options}>
				<button className={styles.button} onClick={() => history.push('/redux/board')}>
					Go to redux board
				</button>
				<button className={styles.button} onClick={() => history.push('/mobx/board')}>
					Go to mobx board
				</button>
				<button className={styles.button} disabled>
					Run both board
				</button>
			</div>
		</div>
	);
};

export default Main;

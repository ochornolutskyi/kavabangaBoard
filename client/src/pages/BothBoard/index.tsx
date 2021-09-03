import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { useHistory } from 'react-router';
import { store } from '../../services/redux';
import Button from '../../shared/components/Button';
import MobxBoard from '../MobxBoard';
import ReduxBoard from '../ReduxBoard';
import styles from './BothBoard.module.scss';

const BothBoard: FC = () => {
	const history = useHistory();
	return (
		<div className={styles.wrapper}>
			<Button title="Go back" clickHandler={() => history.go(-1)} />
			<MobxBoard />
			<Provider store={store}>
				<ReduxBoard />
			</Provider>
		</div>
	);
};

export default BothBoard;

import React, { FC, useState } from 'react';
import { Provider } from 'react-redux';
import { useHistory } from 'react-router';
import CodeBattlePopup from '../../components/CodeBattlePopup';
import { store } from '../../services/redux';
import Button from '../../shared/components/Button';
import MobxBoard from '../MobxBoard';
import ReduxBoard from '../ReduxBoard';
import styles from './BothBoard.module.scss';

const BothBoard: FC = () => {
	const history = useHistory();
	const [isShowBattlePopup, setIsShowBattlePopup] = useState(false);

	return (
		<div className={styles.wrapper}>
			<div className={styles.actions}>
				<Button title="Go back" clickHandler={() => history.go(-1)} />
				<Button title="Show code battles" clickHandler={() => setIsShowBattlePopup(true)} />
			</div>
			<Provider store={store}>
				<ReduxBoard />
			</Provider>
			<MobxBoard />
			{isShowBattlePopup && <CodeBattlePopup closePopupClickHandler={() => setIsShowBattlePopup(false)} />}
		</div>
	);
};

export default BothBoard;

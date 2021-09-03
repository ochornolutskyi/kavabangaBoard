import React, { FC } from 'react';
import cx from 'classnames';
import MobxClass from '../../assets/images/MobxClass.png';
import MobxFunc from '../../assets/images/MobxFunc.png';
import MobxObservable from '../../assets/images/MobxObservable.png';
import styles from './CodeBattlePopup.module.scss';
import Button from '../../shared/components/Button';

type CodeBattlePopupProps = {
	closePopupClickHandler: () => void;
};

const CodeBattlePopup: FC<CodeBattlePopupProps> = ({ closePopupClickHandler }: CodeBattlePopupProps) => {
	return (
		<div className={styles.container}>
			<Button title="Close" clickHandler={closePopupClickHandler} />
			<h1 className={styles.title}>Mobx vs Redux for kavabangas store</h1>
			<div className={styles.content}>
				<div className={styles.content__statistic}>
					<span>Total files:</span>
					<span>Total strokes:</span>
					<span>Resolution:</span>
					<span>1</span>
					<span>63 as Class, 57 as Function, 51 as Observable</span>
					<span>All states are independent</span>
					<span>3 (4 with selector file)</span>
					<span>30 in types, 42 in actions, 24 in reducer. Total: 96</span>
					<span>Root state contains all other</span>
				</div>
			</div>
		</div>
	);
};

export default CodeBattlePopup;

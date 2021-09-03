import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from './BoardContentContainer.module.scss';

type BoardContentContainerProps = {
	children: ReactNode;
	styleType?: string;
};

const BoardContentContainer: FC<BoardContentContainerProps> = ({ children, styleType }: BoardContentContainerProps) => {
	return (
		<div
			className={cx(styles.main, {
				[styles.main__redux]: styleType === 'styleRedux',
				[styles.main__mobx]: styleType === 'styleMobx',
			})}
		>
			{children}
		</div>
	);
};

export default BoardContentContainer;

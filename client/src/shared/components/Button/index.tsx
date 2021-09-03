import React, { FC } from 'react';
import styles from './Button.module.scss';

type ButtonProps = { title: string; clickHandler: () => void; disabled?: boolean };

const Button: FC<ButtonProps> = ({ title, clickHandler, disabled }: ButtonProps) => {
	return (
		<button className={styles.main} onClick={clickHandler} disabled={disabled}>
			{title}
		</button>
	);
};

export default Button;

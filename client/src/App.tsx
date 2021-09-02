import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import ReduxBoard from './pages/ReduxBoard';
import MobxBoard from './pages/MobxBoard';
import Main from './pages/Main';
import { store } from './services/redux';
import styles from './App.module.scss';

const App: FC = () => {
	return (
		<div className={styles.container}>
			<Switch>
				<Route path="/" exact component={Main} />
				<Route path="/redux">
					<Switch>
						<Provider store={store}>
							<Route exact path="/redux/board" component={ReduxBoard} />{' '}
						</Provider>
					</Switch>
				</Route>
				<Route path="/mobx">
					<Switch>
						<Route exact path="/mobx/board" component={MobxBoard} />
					</Switch>
				</Route>
				<Route component={() => <div>Not found</div>} />
			</Switch>
		</div>
	);
};

export default App;

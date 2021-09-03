import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import ReduxBoard from './pages/ReduxBoard';
import MobxBoard from './pages/MobxBoard';
import Main from './pages/Main';
import { store } from './services/redux';
import styles from './App.module.scss';
import BothBoard from './pages/BothBoard';

const App: FC = () => {
	return (
		<div className={styles.container}>
			<Switch>
				<Route path="/" exact component={Main} />
				<Route path="/redux">
					<Switch>
						<Provider store={store}>
							<Route exact path="/redux/board">
								<ReduxBoard isShowBackButton />
							</Route>
						</Provider>
					</Switch>
				</Route>
				<Route path="/mobx">
					<Switch>
						<Route exact path="/mobx/board">
							<MobxBoard isShowBackButton />
						</Route>
					</Switch>
				</Route>
				<Route path="/both-boards" component={BothBoard} />
				<Route component={() => <div>Not found</div>} />
			</Switch>
		</div>
	);
};

export default App;

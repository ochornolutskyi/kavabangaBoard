import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import boardReducer from './board-service/reducer';
import usersReducer from './users-servive/reducer';

const rootReducer = combineReducers({
	board: boardReducer,
	users: usersReducer,
});

const composeEnhancers = compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

export type Store = ReturnType<typeof rootReducer>;

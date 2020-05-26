import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, reducers } from '.';
import { CLEAR_DATA } from './common/types';

export default function configureStore(history: History, initialState?: ApplicationState) {
  const appReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  const rootReducer = (state: any, action: any) => {
    const newState = action.type === CLEAR_DATA ? undefined : state;
    return appReducer(newState, action);
  };

  const middlewares = [thunk, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, initialState, composedEnhancers);
}

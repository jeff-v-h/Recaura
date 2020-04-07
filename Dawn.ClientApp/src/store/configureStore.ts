import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { ApplicationState, reducers } from "./";

export default function configureStore(
  history: History,
  initialState?: ApplicationState
) {
  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  });

  const middlewares = [thunk, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const windowIfDefined =
    typeof window === "undefined" ? null : (window as any);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, initialState, composedEnhancers);
}

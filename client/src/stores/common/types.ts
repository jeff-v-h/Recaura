export interface ReduxAction {
  type: string;
}

export interface ErrorAction extends ReduxAction {
  payload: string;
}

export interface RequestState {
  isFetching: boolean;
  error: string;
}

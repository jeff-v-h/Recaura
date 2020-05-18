export interface ReduxAction {
  type: string;
}

export interface ErrorAction extends ReduxAction {
  payload: string;
}

export interface RedirectAction extends ReduxAction {
  payload: string;
}

export interface RequestState {
  isFetching: boolean;
  error: string;
  redirectTo: string;
}

export const REDIRECT = 'REDIRECT';

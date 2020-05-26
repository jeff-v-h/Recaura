import { Action } from 'redux';

export interface ErrorAction extends Action {
  payload: string;
}

export interface RequestState {
  isFetching: boolean;
  error: string;
}

export const CLEAR_DATA = 'CLEAR_DATA';

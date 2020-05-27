import moment from 'moment';
import { NOT_LOGGED_IN } from './constants';
import { message } from 'antd';
import history from './history';

export enum ConsultPart {
  Subjective,
  Objective,
  Treatments,
  Plan
}

export function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
}

export async function sleep(ms: number) {
  await new Promise((res: any) => setTimeout(res, ms));
}

export function parseDateString(ds: string) {
  if (!ds) return '';
  return moment(ds).format('Do MMM YYYY');
}

export function handleNotLoggedInError(msg?: string) {
  message.error(msg ?? NOT_LOGGED_IN);
  history.push('/login');
}

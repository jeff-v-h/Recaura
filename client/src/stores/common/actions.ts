import { REDIRECT } from './types';

export const redirect = (link: string) => ({
  type: REDIRECT,
  payload: link
});

import moment from 'moment';

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

import { message } from "antd";

export function getParsedUrlId(id: string) {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    message.error(`${id} is not a number`);
    return 0;
  }

  return parsedId;
}

export enum ConsultPart {
  Subjective,
  Objective,
  Treatments,
  Plans,
}

export function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
}

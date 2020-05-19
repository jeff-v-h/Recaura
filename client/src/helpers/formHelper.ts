import { Gender, Honorific } from '../models/enums';

export const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 14 }
};

export const tailLayout = {
  wrapperCol: { offset: 14, span: 5 }
};

export function validateEmailAllowEmpty(email: string) {
  if (email.length === 0) return true;
  return /.+\@.+\..+/.test(email);
}

export function validatePhoneLength(num: string) {
  num = num.replace(/\s/g, '');
  return num.length >= 4 && num.length <= 15;
}

export function validatePhoneLengthAllowEmpty(num: string) {
  if (num.length === 0) return true;
  return validatePhoneLength(num);
}

export function validateDigitString(num: string) {
  num = num.replace(/\s/g, '');
  console.log(num);
  return /^[0-9]+$/.test(num);
}

export function validateDigitStringAllowEmpty(num: string) {
  if (num.length === 0) return true;
  return validateDigitString(num);
}

export function getPhoneErrorMsg(type: string | undefined) {
  switch (type) {
    case 'correctLength':
      return 'Invalid number of digits';
    case 'onlyDigits':
      return 'Only digits allowed';
    default:
      return 'Number invalid';
  }
}

export function getGenderFromTitle(title: string) {
  switch (title) {
    case Honorific.Mr:
    case Honorific.Master:
    case Honorific.M:
    case Honorific.Sir:
      return Gender.male;
    case Honorific.Mrs:
    case Honorific.Miss:
    case Honorific.Ms:
    case Honorific.Madam:
      return Gender.female;
    default:
      return Gender.other;
  }
}

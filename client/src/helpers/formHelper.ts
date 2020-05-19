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
  num = num.replace(' ', '');
  return num.length >= 4 && num.length <= 15;
}

export function validatePhoneLengthAllowEmpty(num: string) {
  if (num.length === 0) return true;
  return validatePhoneLength(num);
}

export function validateDigitString(num: string) {
  num = num.replace(' ', '');
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

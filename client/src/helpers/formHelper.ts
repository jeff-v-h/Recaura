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

export function validatePhoneNum(num: string) {
  num = num.replace(' ', '');
  if (num.length < 4 || num.length > 15) return false;
  return /^[0-9]+$/.test(num);
}

export function validatePhoneAllowEmpty(num: string) {
  if (num.length === 0) return true;
  return validatePhoneNum(num);
}

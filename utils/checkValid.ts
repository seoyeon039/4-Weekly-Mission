import errorMessage from '@/constants/error_messages';

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const testUserList = [
  {
    email: "test@codeit.com",
    password: "codeit101",
  },
  {
    email: "test2@codeit.com",
    password: "codeit202",
  }

];

/*email 형식인지 체크해주는 함수*/
export function checkEmailValid(email_address: string) {
	return EMAIL_REGEX.test(email_address);
}

/*password가 최소 8자 && 영문/숫자 조합인지 체크해주는 함수*/
export function checkPasswordValid(password: string) {
	return PASSWORD_REGEX.test(password);
}

export const validEmailInput = (value: string) => {
  if (value === '') {
    return errorMessage.EMAIL_REQUIRED;
  } 
  if (!checkEmailValid(value)) {
    return errorMessage.EMAIL_INVALID;
  }
  return '';
}

export const validPasswordInput = (value: string) => {
  if (value === '') {
    return errorMessage.PW_REQUIRED;
  }
  if (!checkPasswordValid(value)) {
    return errorMessage.PW_INVALID;
  }
  return '';
}

export const validPWCheckInput = (pwValue: string, pwCheckValue: string) => {
  if (pwCheckValue === '') {
    return errorMessage.PW_REQUIRED;
  }
  if (pwValue !== pwCheckValue) {
    return errorMessage.PW_NOT_MATCH;
  }
  return '';
}
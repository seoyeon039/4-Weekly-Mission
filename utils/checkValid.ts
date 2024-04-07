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
  return '';
}

export const validPWCheckInput = (value: string) => {
  if (value === '') {
    return errorMessage.PW_REQUIRED;
  }
  return '';
}
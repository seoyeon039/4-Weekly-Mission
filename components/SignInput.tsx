import { ChangeEvent, MouseEvent, useState } from 'react';
import { checkEmailValid } from '@/utils/checkValid';
import styles from '@/styles/SignInput.module.css';
import eyeOff from '@/public/images/Icon_eye-off.svg';
import eyeOn from '@/public/images/Icon_eye-on.svg';
import Image from 'next/image';
import errorMessage from '@/constants/error_messages';

interface Props {
  type: string;
  placeholder: string;
}

function SignInput({ type, placeholder }:Props) {
  const [isHidden, setIsHidden] = useState(type);
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    isHidden === "password" ? setIsHidden("text") : setIsHidden("password");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const validEmailInput = () => {
    if (inputValue === '') {
      setErrorMsg(errorMessage.EMAIL_REQUIRED);
      return;
    } 
    if (!checkEmailValid(inputValue)) {
      setErrorMsg(errorMessage.EMAIL_INVALID);
      return;
    }
    setErrorMsg('');
  }

  const validPasswordInput = () => {
    if (inputValue === '') {
      setErrorMsg(errorMessage.PW_REQUIRED);
      return;
    }
    setErrorMsg('');
  }

  const handleLoad = () => {
    if (type === "email") return validEmailInput();
    if (type === "password") return validPasswordInput();
  }

  return (
    <div className={styles.content}>
      <div>
        <label className={styles.inputName}>{placeholder}</label>
        <div className={styles.inputContainer}>
          <input
            type={isHidden}
            className={styles[errorMsg ? 'errorBorder' : 'inputBox']}
            onChange={handleChange}
            onBlur={handleLoad}
            placeholder={placeholder}/>
          {type === "password" &&
            <button className={styles.pwHiddenBtn} type="button" onClick={handleClick}>
              <Image src={isHidden === "password" ? eyeOff : eyeOn} alt="eye-btn" />
            </button>
          }
          {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
        </div>
      </div>
    </div>
  )
}

export default SignInput;
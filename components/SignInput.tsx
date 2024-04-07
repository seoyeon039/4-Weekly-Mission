import { ChangeEvent, MouseEvent, useState } from 'react';
import { validEmailInput, validPWCheckInput, validPasswordInput } from '@/utils/checkValid';
import styles from '@/styles/SignInput.module.css';
import eyeOff from '@/public/images/Icon_eye-off.svg';
import eyeOn from '@/public/images/Icon_eye-on.svg';
import Image from 'next/image';

interface Props {
  item: {
    type: string;
    label: string;
    placeholder: string;
  }
}

function SignInput({ item }: Props) {
  const [isHidden, setIsHidden] = useState(item.type);
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    isHidden === "password" ? setIsHidden("text") : setIsHidden("password");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleLoad = () => {
    if (item.label === "e-mail") setErrorMsg(validEmailInput(inputValue));
    if (item.label === "password") setErrorMsg(validPasswordInput(inputValue));
    if (item.label === "비밀번호 확인") setErrorMsg(validPWCheckInput(inputValue));
  }

  return (
    <>
      <label className={styles.inputName}>{item.label}</label>
      <div className={styles.inputContainer}>
        <input
          type={isHidden}
          className={styles[errorMsg ? 'errorBorder' : 'inputBox']}
          onChange={handleChange}
          onBlur={handleLoad}
          placeholder={item.placeholder}/>
        {item.type === "password" &&
          <button className={styles.pwHiddenBtn} type="button" onClick={handleClick}>
            <Image src={isHidden === "password" ? eyeOff : eyeOn} alt="eye-btn" />
          </button>
        }
        {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
      </div>
    </>
  )
}

export default SignInput;
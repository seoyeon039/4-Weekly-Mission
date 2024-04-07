import { ChangeEvent, MouseEvent, useState } from 'react';
import styles from '@/styles/SignInput.module.css';
import eyeOff from '@/public/images/Icon_eye-off.svg';
import eyeOn from '@/public/images/Icon_eye-on.svg';
import Image from 'next/image';

interface Props {
  item: {
    id: string;
    type: string;
    label: string;
    placeholder: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorMsg: string;
}

function SignInput({ item, onChange, onBlur, errorMsg }: Props) {
  const [isHidden, setIsHidden] = useState(item.type);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    isHidden === "password" ? setIsHidden("text") : setIsHidden("password");
  }

  return (
    <>
      <label className={styles.inputName}>{item.label}</label>
      <div className={styles.inputContainer}>
        <input
          id={item.id}
          type={isHidden}
          className={styles[errorMsg ? 'errorBorder' : 'inputBox']}
          onChange={onChange}
          onBlur={onBlur}
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
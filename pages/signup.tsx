import { validEmailInput, validPWCheckInput, validPasswordInput } from "@/utils/checkValid";
import { SIGN_UP_INIT_INFO } from "@/constants/signInput_constant";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { addNewUser, checkAccount } from "@/utils/api";
import { useRouter } from "next/router";
import SignInput from "@/components/SignInput";
import Link from "next/link";
import styles from '@/styles/SignPage.module.css';
import LinkbraryLogo from '@/public/images/logo.svg';
import GoogleIcon from '@/public/images/Icon_Google.svg';
import KakaoIcon from '@/public/images/Icon_Kakao2.svg';

const ACCESS_TOKEN_KEY = 'accessToken';

export default function SignUp() {
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [pwErrorMsg, setPWErrorMsg] = useState('');
  const [pwCheckErrorMsg, setPWCheckErrorMsg] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [pwInputValue, setPWInputValue] = useState('');
  const [pwCheckInputValue, setPWCheckInputValue] = useState('');
  const { email, password, pwCheck } = SIGN_UP_INIT_INFO;
  const router = useRouter();

  const handleEmailBlur = () => {
    setEmailErrorMsg(validEmailInput(emailInputValue));
  }
  const handlePWBlur = () => {
    setPWErrorMsg(validPasswordInput(pwInputValue));
  }
  const handlePWCheckBlur = () => {
    setPWCheckErrorMsg(validPWCheckInput(pwInputValue, pwCheckInputValue));
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.id === "email") setEmailInputValue(e.target.value);
    if(e.target.id === "password") setPWInputValue(e.target.value);
    if(e.target.id === "password-check") setPWCheckInputValue(e.target.value);
  }

  const handleSubmit = async(e: KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await checkAccount(emailInputValue);

    if (error) return setEmailErrorMsg(error.message);
    
    const { data } = await addNewUser(emailInputValue, pwInputValue);
    const accessToken = data?.accessToken;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    router.push('/folder')
  }

  return (
    <>
      <div className={styles.content}>
        <Link href='/' className={styles.logoImg}>
          <LinkbraryLogo width={210} />
        </Link>
        <div className={styles.toSignIn}>
          이미 회원이신가요?
          <Link href='/signin' className={styles.toSignInLink}>로그인하기</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <SignInput item={email} onChange={handleChange} onBlur={handleEmailBlur} errorMsg={emailErrorMsg} />
          <SignInput item={password} onChange={handleChange} onBlur={handlePWBlur} errorMsg={pwErrorMsg} />
          <SignInput item={pwCheck} onChange={handleChange} onBlur={handlePWCheckBlur} errorMsg={pwCheckErrorMsg} />
          <button className={styles.confirmBtn} type="submit">회원가입</button>
          <div className={styles.snsLogin}>
            다른 방식으로 가입하기
            <div className={styles.snsLinkButtons}>
              <Link href="https://www.google.com/" target='_blank'>
                <GoogleIcon className={styles.snsLinkButtonImg} />
              </Link>
              <Link href="https://www.kakaocorp.com/page/" target='_blank'>
                <KakaoIcon className={styles.snsLinkButtonImg} />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
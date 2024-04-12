import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { validEmailInput, validPasswordInput } from "@/utils/checkValid";
import { SIGN_IN_INIT_INFO } from "@/constants/signInput_constant";
import { loginAccount } from "@/utils/api";
import { useRouter } from "next/router";
import SignInput from "@/components/SignInput";
import errorMessage from '@/constants/error_messages';
import Link from "next/link";
import styles from '@/styles/SignPage.module.css';
import LinkbraryLogo from '@/public/images/logo.svg';
import GoogleIcon from '@/public/images/Icon_Google.svg';
import KakaoIcon from '@/public/images/Icon_Kakao2.svg';

const ACCESS_TOKEN_KEY = 'accessToken';

export default function SignIn() {
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [pwErrorMsg, setPWErrorMsg] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [pwInputValue, setPWInputValue] = useState('');
  const router = useRouter();
  const { email, password } = SIGN_IN_INIT_INFO;

  const handleEmailBlur = () => {
    setEmailErrorMsg(validEmailInput(emailInputValue));
  }
  const handlePWBlur = () => {
    setPWErrorMsg(validPasswordInput(pwInputValue));
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.id === "email") setEmailInputValue(e.target.value);
    if(e.target.id === "password") setPWInputValue(e.target.value);
  }

  const handleSubmit = async(e: KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userInfo = {
      "email": emailInputValue,
      "password": pwInputValue,
    }

    const res = await loginAccount(userInfo);
    const { data } = await res.json();

    if (res.status === 200) {
      const accessToken = data?.accessToken;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      router.push('/folder')
    }

    setEmailErrorMsg(errorMessage.CHECK_EMAIL);
    setPWErrorMsg(errorMessage.CHECK_PW);
  }

  useEffect(() => {
    // accessToken이 존재하면 folder로 이동
    const haveToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (haveToken) {
      router.push('/folder')
    }
    return;
  }, [router]);

  return (
    <>
    <div className={styles.content}>
      <Link href='/' className={styles.logoImg}>
        <LinkbraryLogo width={210}/>
      </Link>
      <div className={styles.toSignIn}>
        회원이 아니신가요?
        <Link href='/signup' className={styles.toSignInLink}>회원가입하기</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <SignInput item={email} onChange={handleChange} onBlur={handleEmailBlur} errorMsg={emailErrorMsg}/>
        <SignInput item={password} onChange={handleChange} onBlur={handlePWBlur} errorMsg={pwErrorMsg}/>
        <button className={styles.confirmBtn} type="submit">로그인</button>
        <div className={styles.snsLogin}>
          소셜로그인
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
import { SIGNIN } from "@/constants/signInput_constant";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { validEmailInput, validPasswordInput } from "@/utils/checkValid";
import SignInput from "@/components/SignInput";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/SignPage.module.css';
import linkbraryLogo from '@/public/images/logo.svg';
import googleIcon from '@/public/images/Icon_Google.svg';
import kakaoIcon from '@/public/images/Icon_Kakao2.svg';
import errorMessage from '@/constants/error_messages';
import { loginAccount } from "@/utils/api";

const ACCESS_TOKEN_KEY = 'accessToken';

export default function SignIn() {
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [pwErrorMsg, setPWErrorMsg] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [pwInputValue, setPWInputValue] = useState('');
  const router = useRouter();
  const { email, password } = SIGNIN;

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
  })

  return (
    <>
    <div className={styles.content}>
      <Link href='/' className={styles.logoImg}>
        <Image src={linkbraryLogo} width={210} alt="LinkbraryLogo" />
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
              <Image src={googleIcon} alt="google" />
            </Link>
            <Link href="https://www.kakaocorp.com/page/" target='_blank'>
              <Image src={kakaoIcon} alt="kakao" />
            </Link>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}
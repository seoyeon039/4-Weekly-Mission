import { SIGNIN } from "@/constants/signInput_constant";
import SignInput from "@/components/SignInput";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/SignPage.module.css';
import linkbraryLogo from '@/public/images/logo.svg';
import googleIcon from '@/public/images/Icon_Google.svg';
import kakaoIcon from '@/public/images/Icon_Kakao2.svg';

export default function SignIn() {
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
      <form>
        {SIGNIN.map((item) => {
          return <SignInput key={item.label} item={item} />
        })}
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
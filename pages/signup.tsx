import { SIGNUP } from "@/constants/signInput_constant";
import SignInput from "@/components/SignInput";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/SignPage.module.css';
import linkbraryLogo from '@/public/images/logo.svg';
import googleIcon from '@/public/images/Icon_Google.svg';
import kakaoIcon from '@/public/images/Icon_Kakao2.svg';


export default function SignUp() {
  return (
    <>
      <div className={styles.content}>
        <Link href='/' className={styles.logoImg}>
          <Image src={linkbraryLogo} width={210} alt="LinkbraryLogo" />
        </Link>
        <div className={styles.toSignIn}>
          이미 회원이신가요?
          <Link href='/signin' className={styles.toSignInLink}>로그인하기</Link>
        </div>
        <form>
          {SIGNUP.map((item) => {
            return <SignInput key={item.label} item={item} />
          })}
          <button className={styles.confirmBtn} type="submit">회원가입</button>
          <div className={styles.snsLogin}>
            다른 방식으로 가입하기
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
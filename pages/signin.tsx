import SignInput from "@/components/SignInput";
import Link from "next/link";
import linkbraryLogo from '@/public/images/logo.svg';
import Image from "next/image";
import { SIGNIN } from "@/constants/signInput_constant";
import googleIcon from '@/public/images/Icon_Google.svg';
import kakaoIcon from '@/public/images/Icon_Kakao2.svg';

export default function SignIn() {
  return (
    <>
      <Link href='/'>
        <Image src={linkbraryLogo} alt="LinkbraryLogo" />
      </Link>
      <Link href='/signup'>회원가입하기</Link>
      <form>
        {SIGNIN.map((item) => {
          return <SignInput key={item.type} item={item} />
        })}
        <button id="confirm-button" type="submit">로그인</button>
        <div className="sns-login">
          소셜로그인
          <div className="sns-link-buttons">
            <Link href="https://www.google.com/" target='_blank'>
              <Image src={googleIcon} alt="google" />
            </Link>
            <Link href="https://www.kakaocorp.com/page/" target='_blank'>
              <Image src={kakaoIcon} alt="kakao" />
            </Link>
          </div>
        </div>
      </form>
    </>
  )
}
import { SIGNUP } from "@/constants/signInput_constant";
import SignInput from "@/components/SignInput";
import Image from "next/image";
import Link from "next/link";
import linkbraryLogo from '@/public/images/logo.svg';
import googleIcon from '@/public/images/Icon_Google.svg';
import kakaoIcon from '@/public/images/Icon_Kakao2.svg';


export default function SignUp() {
  return (
    <>
      <Link href='/'>
        <Image src={linkbraryLogo} alt="LinkbraryLogo" />
      </Link>
      <Link href='/signin'>로그인하기</Link>
      <form>
        {SIGNUP.map((item) => {
          return <SignInput key={item.type} item={item} />
        })}
        <button id="confirm-button" type="submit">회원가입</button>
        <div className="sns-login">
          다른 방식으로 가입하기
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
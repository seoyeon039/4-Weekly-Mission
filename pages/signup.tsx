import SignInput from "@/components/SignInput";
import Link from "next/link";
import linkbraryLogo from '@/public/images/logo.svg';
import Image from "next/image";

export default function SignUp() {
  return (
    <>
      <Link href='/'>
        <Image src={linkbraryLogo} alt="LinkbraryLogo" />
      </Link>
      <Link href='/signin'>로그인하기</Link>
      <SignInput type="email" placeholder="이메일을 입력해주세요" />
      <SignInput type="password" placeholder="비밀번호를 입력해주세요" />
      <SignInput type="password" placeholder="비밀번호를 확인해주세요" />
    </>
  )
}
import SignInput from "@/components/SignInput"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <div>위클리미션go!</div>
      <Link href='/shared'>
        <button>shared 페이지</button>
      </Link>
      <Link href='/folder'>
        <button>folder 페이지</button>
      </Link>
      <br/>
      <p>input 컴포넌트 테스트</p>
      <SignInput type="email" placeholder="e-mail"/>
      <SignInput type="password" placeholder="password"/>
    </>
  )
}

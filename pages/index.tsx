/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import NavigationBar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import headerImg from "@/public/images/main_header_img.png";

const INITIAL_VALUE = {
  email: '',
  image_source: '',
}

export default function Home() {
  return (
    <>
      <header className={styles.headline}>
        <h1 className={styles.headlineTitle}>
          <span className={`${styles.headlineKeyword} ${styles.accent}`}>세상의 모든 정보</span>를
          쉽게 저장하고 관리해 보세요
        </h1>
        <Link className={styles.addLinkTag} href='/signup'>
          <button className={styles.addLinkButton}>
            링크 추가하기
          </button>
        </Link>
        <Image src={headerImg} alt="linkbrary-header-image" />
      </header>

      <section className={styles.content}>
      <div className={styles.options}>
        <h2 className={styles.optionsTitle}>
          <span className={`${styles.save} ${styles.accent}`}>원하는 링크</span>를
          저장하세요
        </h2>
        <p className={styles.optionDescribe}>
          나중에 읽고 싶은 글, 다시 보고 싶은 영상,
          사고 싶은 옷, 기억하고 싶은 모든 것을
          한 공간에 저장하세요
        </p>
        <img src='/images/example_img1.svg' alt="linkbrary-header-image" />
      </div>

      <div className={styles.options}>
        <h2 className={styles.optionsTitle}>
          링크를 폴더로
          <span className={`${styles.manage} ${styles.accent}`}>관리</span>하세요
        </h2>
        <p className={styles.optionDescribe}>
          나만의 폴더를 무제한으로 만들고
          다양하게 활용할 수 있습니다.
        </p>
        <img src='/images/example_img2.svg' alt="linkbrary-header-image" />
      </div>

      <div className={styles.options}>
        <h2 className={styles.optionsTitle}>
          저장한 링크를
          <span className={`${styles.share} ${styles.accent}`}>공유</span>해 보세요
        </h2>
        <p className={styles.optionDescribe}>
          여러 링크를 폴더에 담고 공유할 수 있습니다.
          가족, 친구, 동료들에게 쉽고 빠르게 링크를 
          공유해 보세요.
        </p>
        <img src='/images/example_img3.svg' alt="linkbrary-header-image" />
      </div>

      <div className={styles.options}>
        <h2 className={styles.optionsTitle}>
          저장한 링크를
          <span className={`${styles.search} ${styles.accent}`}>검색</span>해 보세요
        </h2>
        <p className={styles.optionDescribe}>
          중요한 정보들을 검색으로 쉽게 찾아보세요.
        </p>
        <img src='/images/example_img4.svg' alt="linkbrary-header-image" />
      </div>
      </section>
    </>
  )
}

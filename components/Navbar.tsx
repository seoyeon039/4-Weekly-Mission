import linkbraryLogo from '@/public/images/logo.svg';
import styles from '@/styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className: string;
  profileData: {
    email: string,
    profileImageSource: string,
  };
  isLoginStatus: boolean;
  }

function NavigationBar({ className, profileData, isLoginStatus }: Props) {
  return (
    <nav className={`${styles.nav} ${styles[className]}`}>
      <Link href='/'><Image src={linkbraryLogo} width={132} height={24} alt='logo'/></Link>
      {isLoginStatus ? (
        <div className={styles.account}>
          <Image src={profileData.profileImageSource} width={32} height={32} alt='profile' />
          <p>{profileData.email}</p>
        </div>
      )
      :(
        <Link href='../signin.html' className={styles.loginBtn}>로그인</Link>
      )
      }
    </nav>
  )
}

export default NavigationBar;
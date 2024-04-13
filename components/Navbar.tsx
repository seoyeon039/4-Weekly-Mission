import LinkbraryLogo from '@/public/images/logo.svg';
import styles from '@/styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className: string;
  profileData: {
    email: string,
    image_source: string,
  };
  isLoginStatus: boolean;
  }

function NavigationBar({ className, profileData, isLoginStatus }: Props) {
  return (
    <nav className={`${styles.nav} ${styles[className]}`}>
      <Link href='/'>
        <LinkbraryLogo width={133}/>
      </Link>
      {isLoginStatus ? (
        <div className={styles.account}>
          <Image src={profileData.image_source} width={32} height={32} alt='profile' />
          <p>{profileData.email}</p>
        </div>
      )
      :(
        <Link href='/signin' className={styles.loginBtn}>로그인</Link>
      )
      }
    </nav>
  )
}

export default NavigationBar;
import LinkbraryLogo from '@/public/images/logo.svg';
import styles from '@/styles/Navbar.module.css';
import Image from 'next/image';

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
      <Image src={LinkbraryLogo} alt='logo'/>
      {isLoginStatus ? (
        <div className={styles.account}>
          <Image src={profileData.profileImageSource} width={32} height={32} alt='profile' />
          <p>{profileData.email}</p>
        </div>
      )
      :(
        <a href='../signin.html' className={styles.loginBtn}>로그인</a>
      )
      }
    </nav>
  )
}

export default NavigationBar;
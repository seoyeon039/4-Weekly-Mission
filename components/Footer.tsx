import facebook from '@/public/images/facebook.svg';
import twitter from '@/public/images/twitter.svg';
import youtube from '@/public/images/youtube.svg';
import instagram from '@/public/images/instagram.svg';
import styles from '@/styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <footer>
      <div className={styles.footerInner}>
        <div className={styles.companyInfo}>codeit-2023</div>
        <div className={styles.QnALinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className={styles.snsLinks}>
          <Link href="https://www.facebook.com/" target='_blank' rel='noreferrer'>
            <Image src={facebook} alt="facebook" />
          </Link>
          <Link href="https://twitter.com/" target='_blank' rel='noreferrer'>
            <Image src={twitter} alt="twitter" />
          </Link>
          <Link href="https://www.youtube.com/" target='_blank' rel='noreferrer'>
            <Image src={youtube} alt="youtube" />
          </Link>
          <Link href="https://www.instagram.com/" target='_blank' rel='noreferrer'>
            <Image src={instagram} alt="instagram" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
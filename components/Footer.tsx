import Facebook from '@/public/images/facebook.svg';
import Twitter from '@/public/images/twitter.svg';
import Youtube from '@/public/images/youtube.svg';
import Instagram from '@/public/images/instagram.svg';
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
            <Facebook className={styles.snsLinkImg} />
          </Link>
          <Link href="https://twitter.com/" target='_blank' rel='noreferrer'>
            <Twitter className={styles.snsLinkImg} />
          </Link>
          <Link href="https://www.youtube.com/" target='_blank' rel='noreferrer'>
            <Youtube className={styles.snsLinkImg} />
          </Link>
          <Link href="https://www.instagram.com/" target='_blank' rel='noreferrer'>
            <Instagram className={styles.snsLinkImg} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
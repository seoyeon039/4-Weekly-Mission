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
            <Image src={facebook} width={20} height={20} alt="facebook" />
          </Link>
          <Link href="https://twitter.com/" target='_blank' rel='noreferrer'>
            <Image src={twitter} width={20} height={20} alt="twitter" />
          </Link>
          <Link href="https://www.youtube.com/" target='_blank' rel='noreferrer'>
            <Image src={youtube} width={20} height={20} alt="youtube" />
          </Link>
          <Link href="https://www.instagram.com/" target='_blank' rel='noreferrer'>
            <Image src={instagram} width={20} height={20} alt="instagram" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
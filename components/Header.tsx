import styles from '@/styles/Header.module.css';
import Image from 'next/image';

interface Props {
  folderName: string;
  folderOwnerData:{
    image_source: string,
    name: string,
  };
}

function Header({folderName, folderOwnerData}: Props) {
  return (
    <header className={styles.headerItems}>
      <Image
        src={folderOwnerData.image_source}
        className={styles.headerItemImg}
        width={64}
        height={64}
        alt="userProfile"
      />
      <div className={styles.username}>{folderOwnerData.name}</div>
      <div className={styles.folderName}>{folderName}</div>
    </header>
  )
}

export default Header;
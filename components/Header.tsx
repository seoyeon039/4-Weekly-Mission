import styles from '@/styles/Header.module.css';
import Image from 'next/image';

interface Props {
  folderData: {
    name: string,
  };
  folderOwnerData:{
    profileImageSource: string,
    name: string,
  };
}

function Header({folderData, folderOwnerData}: Props) {
  return (
    <header className={styles.headerItems}>
      <Image src={folderOwnerData.profileImageSource} width={64} height={64} alt="userProfile" />
      <div className={styles.username}>{folderOwnerData.name}</div>
      <div className={styles.folderName}>{folderData.name}</div>
    </header>
  )
}

export default Header;
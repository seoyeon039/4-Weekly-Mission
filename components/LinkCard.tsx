import { MouseEvent, useState } from 'react';
import { LinkCardData } from '@/types/type';
import formatDate from '@/utils/formatDate';
import diffTime from '@/utils/diffTime';
import star from '@/public/images/Icon_star.svg';
import kebab from '@/public/images/Icon_kebab.svg'
import noImg from '@/public/images/noImg.svg';
import styles from '@/styles/LinkCard.module.css';
import Popover from './Popover';
import Image from 'next/image';
import Link from 'next/link';


interface Props {
  item: LinkCardData
}

function LinkCard({item: {url, id, imageSource, createdAt, description}}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(isOpen ? false: true);
  }

  return (
    <Link href={url} target='_blank' rel='noreferrer'>
    <div className={styles.card} key={id}>
      <Image className={styles.star} src={star} alt='star' />
      <div
        className={styles.previewImg}
        style={{ backgroundImage: imageSource ? `url(${imageSource})` : `url(${noImg.src})`}}
      />
      <div className={styles.linkContent}>
        <button type='button' className={styles.kebab} onClick={handleClick}>
          <Image src={kebab} alt='kebab' />
        </button>
        <Popover isOpen={ isOpen } url={url} />
        <p className={styles.updateTime}>{diffTime(createdAt)}</p>
        <p className={styles.linkDescription}>{description}</p>
        <p className={styles.linkCreatedDate}>{formatDate(createdAt)}</p>
      </div>
    </div>
    </Link>
  )
}

export default LinkCard;
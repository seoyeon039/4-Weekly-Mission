import { MouseEvent, useState } from 'react';
import { LinkCardData } from '@/types/type';
import formatDate from '@/utils/formatDate';
import diffTime from '@/utils/diffTime';
import Popover from './Popover';
import Link from 'next/link';
import Star from '@/public/images/Icon_star.svg';
import Kebab from '@/public/images/Icon_kebab.svg'
import styles from '@/styles/LinkCard.module.css';


interface Props {
  item: LinkCardData
}

function LinkCard({item: {url, id, image_source, created_at, description}}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(isOpen ? false: true);
  }

  return (
    <Link href={url} target='_blank'>
    <div className={styles.card} key={id}>
      <Star className={styles.star} />
      <div
        className={styles.previewImg}
        style={{ backgroundImage: image_source ? `url(${image_source})` : `url('/images/noImg.svg')`}}
      />
      <div className={styles.linkContent}>
        <button type='button' className={styles.kebab} onClick={handleClick}>
          <Kebab />
        </button>
        <Popover isOpen={ isOpen } url={url} />
        <p className={styles.updateTime}>{diffTime(created_at)}</p>
        <p className={styles.linkDescription}>{description}</p>
        <p className={styles.linkCreatedDate}>{formatDate(created_at)}</p>
      </div>
    </div>
    </Link>
  )
}

export default LinkCard;
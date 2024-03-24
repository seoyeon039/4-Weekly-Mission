import { MouseEvent, useState } from 'react';
import formatDate from '../utils/formatDate';
import diffTime from '../utils/diffTime';
import star from '../images/Icon_star.svg';
import noImg from '../images/noImg.svg';
import styles from '../css/Card.module.css';
import Popover from './Popover';


interface Props {
  item: Data
}

function LinkCard({item: {url, id, imageSource, createdAt, description}}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(isOpen ? false: true);
  }

  return (
    <a href={url} target='_blank' rel='noreferrer'>
    <div className={styles.card} key={id}>
      <img className={styles.star} src={star} alt='star' />
      <div
        className={styles.previewImg}
        style={{ backgroundImage: imageSource ? `url(${imageSource})` : `url(${noImg})`}}
      />
      <div className={styles.linkContent}>
        <button type='button' className={styles.kebab} onClick={handleClick} />
        <Popover isOpen={ isOpen } url={url} />
        <p className={styles.updateTime}>{diffTime(createdAt)}</p>
        <p className={styles.linkDescription}>{description}</p>
        <p className={styles.linkCreatedDate}>{formatDate(createdAt)}</p>
      </div>
    </div>
    </a>
  )
}

export default LinkCard;
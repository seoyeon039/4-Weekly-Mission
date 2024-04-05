import LinkCard from './LinkCard';
import styles from '@/styles/LinkList.module.css';
import { Data } from '@/types/type';

interface SearchData extends Data {
  title?: string;
}

interface Props {
  keyword: string;
  linkData: SearchData[];
}

function LinkList({ keyword, linkData }: Props) {
  const searchData = linkData.filter((data) => {
    const searchWord = keyword.toLowerCase();
    const url = data.url.toLowerCase();
    const title = data.title?.toLowerCase() ?? '';
    const description = data.description?.toLowerCase() ?? '';
    
    return url.includes(searchWord) || title.includes(searchWord) || description.includes(searchWord)
  });

  return (
    <div className={styles.content}>
      <div className={styles.items}>
        {searchData.length !== 0 ? (searchData.map((item: any) => 
        <LinkCard item={item} key={item.id}/>))
        : <p className={styles.noLinks}>저장된 링크가 없습니다.</p>}
      </div>
    </div>
  )
}

export default LinkList;
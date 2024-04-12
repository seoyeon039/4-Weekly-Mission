import { useState } from "react";
import { LinkCardData } from "@/types/type";
import LinkList from "./LinkList";
import FolderMenu from "./FolderMenu";
import AddModal from "@/modal/addModal/AddModal";
import PlusIcon from "@/public/images/Icon_plus.svg";
import Button from "./Button";
import styles from "@/styles/FolderList.module.css";

const FIRST_SELECTED_FOLDER = "전체";

interface SearchData extends LinkCardData {
  title?: string;
}

interface Props {
  keyword: string;
  linkData: SearchData[];
  folderNameList: string[];
  currentId: number;
  folderName: string;
  onFolderButtonClick: (id: number, name: string) => void;
}

function FolderList({ keyword, linkData, folderNameList, currentId, folderName, onFolderButtonClick }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  return (
    <>
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.folderList}>
          <Button onClick={() => onFolderButtonClick(0, FIRST_SELECTED_FOLDER)} type="button" key={0}>
            {FIRST_SELECTED_FOLDER}
          </Button>
          {folderNameList.map((item: any) => {
            return (
              <Button onClick={() => onFolderButtonClick(item.id, item.name)} type="button" key={item.id}>
                {item.name}
              </Button>
            )
          })}
        </div>
          <button className={styles.addFolderBtn} type="button" onClick={openAddModal}>
            폴더 추가
            <PlusIcon className={styles.addFolderBtnImg} />
          </button>
          <AddModal isOpenModal={isAddModalOpen} closeModal={closeAddModal}/>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.linkControlBtn}>
        <p className={styles.folderName}>{folderName}</p>
        {currentId === 0 ? null : <FolderMenu placeholder={folderName} />}
      </div>
    </div>
    <LinkList keyword={keyword} linkData={linkData} />
  </>
  );
}

export default FolderList;
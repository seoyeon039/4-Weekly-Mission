import { useState } from "react";
import shareIcon from "@/public/images/Icon_share.svg";
import editIcon from "@/public/images/Icon_edit.svg";
import deleteIcon from "@/public/images/Icon_delete.svg";
import DeleteModal from "@/modal/deleteModal/DeleteModal";
import EditModal from "@/modal/editModal/EditModal";
import ShareModal from "@/modal/shareModal/ShareModal";
import styles from "@/styles/FolderMenu.module.css";
import Image from "next/image";

interface Props {
  placeholder: string;
}

function FolderMenu({ placeholder }: Props) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className={styles.controlBtns}>
      <button className={styles.shareBtn} type="button" onClick={openShareModal}>
        <Image src={shareIcon} alt="share-Icon" />
        공유
      </button>
      <ShareModal isOpenModal={isShareModalOpen} closeModal={closeShareModal} />
      <button className={styles.editBtn} type="button" onClick={openEditModal}>
        <Image src={editIcon} alt="edit-Icon" />
        이름 변경
      </button>
      <EditModal isOpenModal={isEditModalOpen} closeModal={closeEditModal} placeholder={placeholder}/>
      <button className={styles.deleteBtn} type="button" onClick={openDeleteModal}>
        <Image src={deleteIcon} alt="delete-Icon" />
        삭제
      </button>
      <DeleteModal isOpenModal={isDeleteModalOpen} closeModal={closeDeleteModal}/>
    </div>
  )
}

export default FolderMenu;
import { MODAL_TYPE } from "@/constants/modal_constants";
import { ModalBaseProps } from "@/types/type";
import ModalLayout from "@/modal/ModalLayout";
import styles from "./DeleteLinkModal.module.css";

interface DeleteLinkModalProp extends ModalBaseProps {
  url: string,
}

function DeleteLinkModal({ isOpenModal, closeModal, url }: DeleteLinkModalProp) {

  const { deleteLink } = MODAL_TYPE;

  return (
    <ModalLayout
      title={deleteLink.title}
      isOpenModal={isOpenModal}
      closeModal={closeModal}
    >
      <div className={styles.folderName}>{url}</div>
      <button className={styles.deleteButton}>
        {deleteLink.buttonName}
      </button>
    </ModalLayout>
  );
}

export default DeleteLinkModal;
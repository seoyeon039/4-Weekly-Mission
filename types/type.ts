export interface LinkCardData {
  url: string;
  id: number;
  image_source?: string;
  created_at: string;
  description: string;
}

export interface ModalBaseProps {
  isOpenModal: boolean,
  closeModal: () => void,
}
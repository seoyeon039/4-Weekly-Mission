export interface Data {
  url: string;
  id: number;
  imageSource?: string;
  createdAt: string;
  description: string;
}

export interface ModalBaseProps {
  isOpenModal: boolean,
  closeModal: () => void,
}
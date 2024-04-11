import { MODAL_TYPE } from "@/constants/modal_constants";
import { ModalBaseProps } from "@/types/type";
import { useScript } from "@/utils/hooks/useScript";
import { useEffect, useState } from "react";
import { FacebookShareButton } from "react-share";
import ModalLayout from "@/modal/ModalLayout";
import IconKakao from "@/public/images/Icon_Kakao.svg";
import IconFacebook from "@/public/images/Icon_Facebook.svg";
import IconLink from "@/public/images/Icon_link.svg";
import styles from "./ShareModal.module.css";
import Image from "next/image";

function ShareModal({ isOpenModal, closeModal }: ModalBaseProps) {
  const { share } = MODAL_TYPE;
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

	const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
	
	useEffect(() => {
		if (status === "ready" && window.Kakao) {
			if (!window.Kakao.isInitialized()) {
				window.Kakao.init("40dc080635d43ef81464b64a525177ed");
			}
		}
	}, [status]);

  const handleKakaoButton = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendScrap({
        requestUrl: currentUrl,
    });
  }
};

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalLayout
      title={share.title}
      isOpenModal={isOpenModal}
      closeModal={closeModal}
    >
      <div className={styles.folderName}>폴더명</div>
      <div className={styles.shareButtons}>
        <div className={styles.shareButton}>
          <button
            className={styles.shareKakao}
            type="button"
            onClick={handleKakaoButton}>
            <Image src={IconKakao} alt={IconKakao} />
          </button>
          <p className={styles.linkButtonName}>카카오톡</p>
        </div>
        <FacebookShareButton url={currentUrl}>
          <div className={styles.shareButton}>
            <button className={styles.shareFacebook} type="button">
              <Image src={IconFacebook} alt={IconFacebook} />
            </button>
            <p className={styles.linkButtonName}>페이스북</p>
          </div>
        </FacebookShareButton>
        <div className={styles.shareButton}>
          <button
            className={styles.copyLink}
            type="button"
            onClick={() => handleCopyClipBoard(currentUrl)}>
            <Image src={IconLink} alt={IconLink} />
          </button>
          <p className={styles.linkButtonName}>링크 복사</p>
        </div>
      </div>
    </ModalLayout>
  );
}


export default ShareModal;
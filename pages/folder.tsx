import Footer from "@/components/Footer";
import LinkAdd from "@/components/LinkAdd";
import NavigationBar from "@/components/Navbar";
import { getFolderUserInfo } from "@/utils/api";
import { useEffect, useState } from "react";

export default function FolderPage() {
  const [isLoginStatus, setIsLoginStatus] = useState(false);
  const [profileData, setProfileData] = useState({
    profileImageSource: '',
    email: '',
  });

  const getProfileData = async () => {
    const { data }  = await getFolderUserInfo();
    
    if (!data[0]) return;

    const purifiedData = {
        profileImageSource: data[0].image_source,
        email: data[0].email,
      }

    setProfileData(purifiedData);
    setIsLoginStatus(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <NavigationBar className="folderNav" profileData={profileData} isLoginStatus={isLoginStatus}/>
      <LinkAdd />
      <div>안녕 folder페이지!</div>
      <Footer />
    </>
  )
}
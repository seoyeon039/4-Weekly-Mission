import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavigationBar from "@/components/Navbar";
import { Data } from "@/types/type";
import { getSampleFolderLinks, getSampleUserInfo } from "@/utils/api";
import { useEffect, useState } from "react";

export default function SharedPage() {
  const [isLoginStatus, setIsLoginStatus] = useState(false);
  const [profileData, setProfileData] = useState({
    profileImageSource: '',
    email: '',
  });
  const [folderData, setFolderData] = useState({
    name: '',
  });
  const [folderOwnerData, setFolderOwnerData] = useState({
    profileImageSource: '',
    name: '',
  });
  const [linkData, setLinkData] = useState<Data[]>([]);

  const getProfileData = async () => {
    const data  = await getSampleUserInfo();
    
    if (!data) return;

    setProfileData(data);
    setIsLoginStatus(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  const getFolderData = async () => {
    const { folder } = await getSampleFolderLinks();
    
    if (!folder) return;

    setFolderData(folder);
    setFolderOwnerData(folder.owner);
    setLinkData(folder.links);
  }

  useEffect(() => {
    getFolderData();
  }, [])

  return (
    <>
      <NavigationBar className="sharedNav" profileData={profileData} isLoginStatus={isLoginStatus}/>
      <Header folderData={folderData} folderOwnerData={folderOwnerData}/>
      <div>안녕 shared페이지!</div>
      <Footer />
    </>
  )
}
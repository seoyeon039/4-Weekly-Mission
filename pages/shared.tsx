import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavigationBar from "@/components/Navbar";
import axios from "@/lib/axios";
import { Data } from "@/types/type";
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

  async function getProfileData() {
    const res = await axios.get('/sample/user');
    const data = res.data;

    if (!data) return;

    setProfileData(data);
    setIsLoginStatus(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  async function getFolderData() {
    const res = await axios.get('/sample/folder');
    const { folder } = res.data;
    
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
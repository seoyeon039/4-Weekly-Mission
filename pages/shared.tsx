import { getSampleFolderLinks, getSampleUserInfo } from "@/utils/api";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Data } from "@/types/type";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LinkList from "@/components/LinkList";
import NavigationBar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const INITIAL_PROFILE = {
  profileImageSource: '',
  email: '',
}
const INITIAL_FOLDER= {
  name: '',
}
const INITIAL_FOLDER_OWNER = {
  profileImageSource: '',
  name: '',
}

export default function SharedPage() {
  const [isLoginStatus, setIsLoginStatus] = useState(false);
  const [profileData, setProfileData] = useState(INITIAL_PROFILE);
  const [folderData, setFolderData] = useState(INITIAL_FOLDER);
  const [folderOwnerData, setFolderOwnerData] = useState(INITIAL_FOLDER_OWNER);
  const [linkData, setLinkData] = useState<Data[]>([]);
  const [search, setSearch] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleCloseButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSearch('');
    setSearchWord('');
  }

  const handleSubmit = (searchQuery: string) => {
    setSearchWord(searchQuery);
  };

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
      <SearchBar
        inputValue={search}
        searchWord={searchWord}
        onChange={handleChange}
        onClick={handleCloseButtonClick}
        onSubmit={handleSubmit}/>
      <LinkList keyword={searchWord} linkData={linkData}/>
      <Footer />
    </>
  )
}
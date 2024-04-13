import { getSharedFolderLinks, getSharedFolderOwner, getSharedUserInfo } from "@/utils/api";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { LinkCardData } from "@/types/type";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LinkList from "@/components/LinkList";
import NavigationBar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const INITIAL_PROFILE = {
  image_source: '',
  email: '',
}
const INITIAL_FOLDER= {
  name: '',
}
const INITIAL_FOLDER_OWNER = {
  image_source: '',
  name: '',
}

export default function SharedPage() {
  const [isLoginStatus, setIsLoginStatus] = useState(false);
  const [profileData, setProfileData] = useState(INITIAL_PROFILE);
  const [userId, setUserId] = useState(0);
  const [folderData, setFolderData] = useState(INITIAL_FOLDER);
  const [folderOwnerData, setFolderOwnerData] = useState(INITIAL_FOLDER_OWNER);
  const [linkData, setLinkData] = useState<LinkCardData[]>([]);
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
    const { data } = await getSharedUserInfo();
    
    if (!data) return;

    setProfileData(data[0]);
    setUserId(data[0].id);
    setIsLoginStatus(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  const getFolderOwnerData = useCallback(async () => {
    const { data } = await getSharedFolderOwner(userId);
    
    if (!data[0]) return;

    setFolderOwnerData(data[0]);
  }, [userId])

  useEffect(() => {
    getFolderOwnerData();
  }, [getFolderOwnerData]);

  const getFolderData = useCallback(async () => {
    const { folder } = await getSharedFolderLinks(userId);
    
    if (!folder) return;

    setFolderData(folder);
    setLinkData(folder.links);
  }, [userId])

  useEffect(() => {
    getFolderData();
  }, [getFolderData])

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
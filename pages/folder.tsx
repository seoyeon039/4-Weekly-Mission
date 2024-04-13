import { getFolderLinksData, getFolderLists, getFolderUserInfo } from "@/utils/api";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { LinkCardData } from "@/types/type";
import FolderList from "@/components/FolderList";
import Footer from "@/components/Footer";
import LinkAdd from "@/components/LinkAdd";
import NavigationBar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const FIRST_SELECTED_FOLDER = "전체";
const INITIAL_VALUE = {
  image_source: '',
  email: '',
}

interface SearchData extends LinkCardData {
  title?: string;
}

export default function FolderPage() {
  const [profileData, setProfileData] = useState(INITIAL_VALUE);
  const [isLoginStatus, setIsLoginStatus] = useState(false);
  const [folderListData, setFolderListData] = useState<string[]>([]);
  const [linkData, setLinkData] = useState<SearchData[]>([]);
  const [currentId, setCurrentId] = useState(0);
  const [folderName, setFolderName] = useState(FIRST_SELECTED_FOLDER);
  const [search, setSearch] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const getProfileData = async () => {
    const { data }  = await getFolderUserInfo();
    
    if (!data[0]) return;

    setProfileData(data[0]);
    setIsLoginStatus(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

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

  //button의 id와 이름 가져오는 함수.
  const handleFolderButtonClick = (id: number, name: string) => {
    setCurrentId(id);
    setFolderName(name);
  }

  //폴더 이름 가져오는 함수.
  const getFolderData = async () => {
    const { data } = await getFolderLists();
    
    if (!data) return;

    setFolderListData(data);
  }

  useEffect(() => {
    getFolderData();
  }, [])

  //폴더 안에 저장된 링크를 가져오는 함수
  const getLinkData = async (id: string|number) => {
    if (id === 0) id = '';
    const { data } = await getFolderLinksData(id);
    
    if (!data) return;

    setLinkData(data);
  }

  useEffect(() => {
    getLinkData(currentId);
  }, [currentId])

  return (
    <>
      <NavigationBar className="folderNav" profileData={profileData} isLoginStatus={isLoginStatus}/>
      <LinkAdd />
      <SearchBar
        inputValue={search}
        searchWord={searchWord}
        onChange={handleChange}
        onClick={handleCloseButtonClick}
        onSubmit={handleSubmit}/>
      <FolderList
        keyword={searchWord}
        linkData={linkData}
        folderNameList={folderListData}
        currentId={currentId}
        folderName={folderName}
        onFolderButtonClick={handleFolderButtonClick}
      />
      <Footer />
    </>
  )
}
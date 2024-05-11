import { getAllLinksData, getFolderLists, getUserInfo } from "@/utils/api";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LinkCardData } from "@/types/type";
import FolderList from "@/components/FolderList";
import LinkAdd from "@/components/LinkAdd";
import SearchBar from "@/components/SearchBar";

const FIRST_SELECTED_FOLDER = "전체";

interface SearchData extends LinkCardData {
  title?: string;
}

export default function FolderPage() {
  const [folderListData, setFolderListData] = useState<string[]>([]);
  const [linkData, setLinkData] = useState<SearchData[]>([]);
  const [currentId, setCurrentId] = useState(0);
  const [folderName, setFolderName] = useState(FIRST_SELECTED_FOLDER);
  const [search, setSearch] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const router = useRouter();

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
    router.push(`/folder/${id}`)
  }

  //폴더 이름 가져오는 함수.
  const getFolderData = async () => {
    const { data } = await getFolderLists();
    
    if (!data.folder) return;

    setFolderListData(data.folder);
  }

  useEffect(() => {
    getFolderData();
  }, [])

//전체 데이터 불러오는 함수
  const getLinkDataAll = async () => {
    const { data } = await getAllLinksData();
    
    if (!data.folder) return;

    setLinkData(data.folder);
  }

  useEffect(() => {
    getLinkDataAll();
  }, [])

  return (
    <>
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
    </>
  )
}
import { getSharedFolderInfo, getSharedFolderLinks, getSharedFolderOwner } from "@/utils/api";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { LinkCardData } from "@/types/type";
import Header from "@/components/Header";
import LinkList from "@/components/LinkList";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";

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
  const [userId, setUserId] = useState(0);
  const [folderData, setFolderData] = useState(INITIAL_FOLDER);
  const [folderOwnerData, setFolderOwnerData] = useState(INITIAL_FOLDER_OWNER);
  const [linkData, setLinkData] = useState<LinkCardData[]>([]);
  const [search, setSearch] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const router = useRouter();
  const { folderId } = router.query;

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

  const getFolderOwnerData = useCallback(async () => {
    const { data } = await getSharedFolderOwner(userId);
    
    if (!data[0]) return;

    setFolderOwnerData(data[0]);
  }, [userId])

  useEffect(() => {
    getFolderOwnerData();
  }, [getFolderOwnerData]);

  const getFolderData = useCallback(async () => {
    const { data } = await getSharedFolderInfo(folderId);
    
    if (!data) return;

    setFolderData(data[0]);
  }, [folderId])

  useEffect(() => {
    getFolderData();
  }, [getFolderData])

  const getFolderLinksData = useCallback(async () => {
    const { data } = await getSharedFolderLinks(userId, folderId);
    
    if (!data) return;

    setFolderData(data);
    setLinkData(data);
  }, [userId, folderId])

  useEffect(() => {
    getFolderLinksData();
  }, [getFolderLinksData])

  return (
    <>
      <Header folderData={folderData} folderOwnerData={folderOwnerData}/>
      <SearchBar
        inputValue={search}
        searchWord={searchWord}
        onChange={handleChange}
        onClick={handleCloseButtonClick}
        onSubmit={handleSubmit}/>
      <LinkList keyword={searchWord} linkData={linkData}/>
    </>
  )
}
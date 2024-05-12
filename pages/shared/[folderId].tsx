import { getSharedFolderInfo, getSharedFolderLinks, getSharedFolderOwner } from "@/utils/api";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { LinkCardData } from "@/types/type";
import Header from "@/components/Header";
import LinkList from "@/components/LinkList";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";

const INITIAL_FOLDER= {
  name: '',
}
const INITIAL_FOLDER_OWNER = {
  image_source: '',
  name: '',
}

export default function SharedPage() {
  const [userId, setUserId] = useState(0);
  const [folderName, setFolderName] = useState('');
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

  const getFolderData = useCallback(async () => {
    const data = await getSharedFolderInfo(folderId);
    
    if (!data) return;

    setUserId(data[0].user_id)
    setFolderName(data[0].name);
  }, [folderId])

  useEffect(() => {
    getFolderData();
  }, [getFolderData])

  const getFolderOwnerData = useCallback(async () => {
    const data = await getSharedFolderOwner(userId);
    
    if (!data) return;

    setFolderOwnerData(data[0]);
  }, [userId])

  useEffect(() => {
    getFolderOwnerData();
  }, [getFolderOwnerData]);

  const getFolderLinksData = useCallback(async () => {
    const data = await getSharedFolderLinks(folderId);
    
    if (!data) return;

    setLinkData(data);
  }, [folderId])

  useEffect(() => {
    getFolderLinksData();
  }, [getFolderLinksData])

  return (
    <>
      <Header folderName={folderName} folderOwnerData={folderOwnerData}/>
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
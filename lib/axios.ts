import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api',
});

const SHARED_USER_INFO_URL = '/sample/user';
const FOLDER_USER_INFO_URL = '/users/1';
const SHARED_DATA_API_URL = '/sample/folder';
const FOLDER_LIST_API_URL = '/users/1/folders';
const FOLDER_DATA_API_URL = '/users/1/links?folderId=';

// //shared 페이지 유저 데이터 조회
// export function getSampleUserInfo() {
//   return instance.get(SHARED_USER_INFO_URL);
// }

// //shared 페이지 폴더 데이터 조회
// export function getSampleFolderLinks() {
//   return instance.get(SHARED_DATA_API_URL);
// }

// //folder 페이지 유저 데이터 조회
// export function getFolderUserInfo() {
//   return instance.get(FOLDER_USER_INFO_URL);
// }

// //folder 페이지 폴더 데이터목록 조회
// export function getFolderLists() {
//   return instance.get(FOLDER_LIST_API_URL);
// }

// //folder 페이지 폴더에 저장된 링크 데이터조회
// export function getFolderLinksData(id: number|string) {
//   const path = FOLDER_DATA_API_URL + id;
//   return instance.get(path);
// }

export default instance;
const BASE_URL = 'https://bootcamp-api.codeit.kr/api'

const SHARED_USER_INFO_URL = `${BASE_URL}/sample/user`;
const FOLDER_USER_INFO_URL = `${BASE_URL}/users/1`;
const SHARED_DATA_API_URL = `${BASE_URL}/sample/folder`;
const FOLDER_LIST_API_URL = `${BASE_URL}/users/1/folders`;
const FOLDER_DATA_API_URL = `${BASE_URL}/users/1/links?folderId=`;

async function getApi(url: string) {
  const response = await fetch(url);
  if (!response?.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.")
  }

  const body = await response.json();
  return body;
}

//shared 페이지 유저 데이터 조회
export function getSampleUserInfo() {
  return getApi(SHARED_USER_INFO_URL);
}

//shared 페이지 폴더 데이터 조회
export function getSampleFolderLinks() {
  return getApi(SHARED_DATA_API_URL);
}

//folder 페이지 유저 데이터 조회
export function getFolderUserInfo() {
  return getApi(FOLDER_USER_INFO_URL);
}

//folder 페이지 폴더 데이터목록 조회
export function getFolderLists() {
  return getApi(FOLDER_LIST_API_URL);
}

//folder 페이지 폴더에 저장된 링크 데이터조회
export function getFolderLinksData(id: number|string) {
  const path = FOLDER_DATA_API_URL + id;
  return getApi(path);
}

//로그인 API
export async function loginAccount(email: string, password: string) {
  const res = await fetch (`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"email": email, "password": password}),
  });

  const body = await res.json();

  return body;
}

//회원가입 전 이메일 중복체크
export async function checkAccount(email: string) {
  const res = await fetch(`${BASE_URL}/check-email`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"email": email}),
  });

  const body = await res.json();

  return body;
}

//회원가입 API
export async function addNewUser(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({"email": email, "password": password}),
  });

  const body = await res.json();
  
  return body;
}
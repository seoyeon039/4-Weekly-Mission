const BASE_URL = 'https://bootcamp-api.codeit.kr/api'

const USER_INFO_URL = `${BASE_URL}/users`;
const SHARED_DATA_API_URL = `${BASE_URL}/folders`;
const FOLDER_All_DATA_API_URL = `${BASE_URL}/links`;
const FOLDER_DATA_API_URL = `${BASE_URL}/users/1/links?folderId=`;

async function getApi(url: string) {
  const response = await fetch(url);
  if (!response?.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.")
  }

  const body = await response.json();
  return body;
}

//페이지 유저 데이터 조회
export async function getUserInfo() {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(USER_INFO_URL, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  if (!response?.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.")
  }

  const body = await response.json();
  return body;
}

//shared 페이지 폴더 소유자 데이터 조회
export function getSharedFolderOwner(id: number) {
  return getApi(`${USER_INFO_URL}/${id}`);
}

//shared 페이지 폴더 데이터 조회
export function getSharedFolderInfo(folderId: string | string[] | undefined) {
  return getApi(`${SHARED_DATA_API_URL}/${folderId}`);
}

//shared 페이지 폴더의 링크 데이터 조회
export function getSharedFolderLinks(userId: number, folderId: string | string[] | undefined) {
  const query = `/${userId}/links?folderId=${folderId}`
  return getApi(USER_INFO_URL + query);
}

//folder 페이지 폴더 데이터목록 조회
export async function getFolderLists() {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(SHARED_DATA_API_URL, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  if (!response?.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.")
  }

  const body = await response.json();
  return body;
}

//folder 페이지 전체 폴더에 저장된 링크 데이터조회
export async function getAllLinksData() {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(FOLDER_All_DATA_API_URL, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  if (!response?.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.")
  }

  const body = await response.json();
  return body;
}

//folder 페이지 폴더에 저장된 링크 데이터조회
export function getFolderLinksData(id: string | string[] | undefined) {
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
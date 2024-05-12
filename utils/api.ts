const BASE_URL = 'https://bootcamp-api.codeit.kr/api/linkbrary/v1'

const USER_INFO_URL = `${BASE_URL}/users`;
const FOLDER_DATA_API_URL = `${BASE_URL}/folders`;
const FOLDER_All_DATA_API_URL = `${BASE_URL}/links`;

async function getApi(url: string) {
  try {
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("정보를 불러오는데 실패했습니다.");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    return null;
  }
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
  return getApi(`${FOLDER_DATA_API_URL}/${folderId}`);
}

//shared 페이지 폴더의 링크 데이터 조회
export function getSharedFolderLinks(folderId: string | string[] | undefined) {
  const url = `${FOLDER_DATA_API_URL}/${folderId}/links`
  return getApi(url);
}

//folder 페이지 폴더 데이터목록 조회
export async function getFolderLists() {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(FOLDER_DATA_API_URL, {
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
export function getFolderLinksData(folderId: string | string[] | undefined) {
  const path = `${FOLDER_DATA_API_URL}/${folderId}/links`;
  return getApi(path);
}

//로그인 API
export async function loginAccount(email: string, password: string) {
  const res = await fetch (`${BASE_URL}/auth/sign-in`, {
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
  const res = await fetch(`${BASE_URL}/users/check-email`, {
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
  const res = await fetch(`${BASE_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({"email": email, "password": password}),
  });

  const body = await res.json();
  
  return body;
}

//accessToken 만료시 refreshToken으로 다시 Token 발급
export async function reissueToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await fetch (`${BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "refresh_token": refreshToken
    }),
  });

  const body = await res.json();

  return body;
}
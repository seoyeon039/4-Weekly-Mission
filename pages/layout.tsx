import Footer from '@/components/Footer';
import NavigationBar from '@/components/Navbar';
import { getUserInfo } from '@/utils/api';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

interface PageLayoutProp {
  children: ReactNode;
}

const INITIAL_VALUE = {
  image_source: '',
  email: '',
}

function PageLayout({ children }: PageLayoutProp) {
  const [profileData, setProfileData] = useState(INITIAL_VALUE);
  const [isLoginStatus, setIsLoginStatus] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const navClassName = pathname.includes('folder') ? 'folderNav' : 'sharedNav';
  const isSignPage = pathname.includes('signin') || pathname.includes('signup') ? false : true;

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) await router.push('/signin');
    };
  
    checkAccessToken();
  }, [router])

  const getProfileData = async () => {
    const data = await getUserInfo();
    
    if (!data) return;

    setProfileData(data[0]);
    setIsLoginStatus(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      {isSignPage && <NavigationBar className={navClassName} profileData={profileData} isLoginStatus={isLoginStatus}/>}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
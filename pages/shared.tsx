import Footer from "@/components/Footer";
import NavigationBar from "@/components/Navbar";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

export default function SharedPage() {
  const [isLoginStatus, setIsLoginStatus] = useState(false);
  const [profileData, setProfileData] = useState({
    profileImageSource: '',
    email: '',
  });

  async function getProfileData() {
    const res = await axios.get('/sample/user');
    const data = res.data;

    if (!data) return;

    setProfileData(data);
    setIsLoginStatus(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <NavigationBar className="sharedNav" profileData={profileData} isLoginStatus={isLoginStatus}/>
      <div>안녕 shared페이지!</div>
      <Footer />
    </>
  )
}
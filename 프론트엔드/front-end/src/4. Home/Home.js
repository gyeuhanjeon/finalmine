import { useState, useEffect } from "react";
import TeamAPI from '../0. API/TeamAPI';


const Home = () => {
  const localId = window.localStorage.getItem("userId");

  const [nickName, setNickName] = useState('');

  useEffect(() => {
    let id = localId;
    const memberData = async () => {
      try {
        const response = await TeamAPI.memberInfo(id); // 원래는 전체 회원 조회용
        setNickName(response.data.nickName);
        console.log(response.data)
      } catch (e) {
        console.log(e);
      }
    };
    memberData();
    }, []);
  return(
    <>
      <h1>안녕하세요~ <span style={{color: "red" , fontWeight: "bold" }}>{nickName}</span> 님</h1>
      <h1>반갑습니다^^*</h1>
    </>
  );
}

export default Home;
import { useState, useEffect } from "react";
import TeamAPI from '../0. API/TeamAPI';


const Home = () => {
  const localId = window.localStorage.getItem("userId");

  const [nickName, setNickName] = useState('');
  const chatTest = async(name) => {
    console.log(name);
    try {
        const res = await TeamAPI.chatRoomOpen("테스트 채팅방");
        console.log(res.data);
        window.localStorage.setItem("chatRoomId", res.data);
        window.location.replace("/Socket");
    } catch {
        console.log("error");
    }
    
}

   
  return(
    <>
        <button onClick={chatTest}>임시 채팅 테스트</button>
      <h1>안녕하세요~ <span style={{color: "red" , fontWeight: "bold" }}>{nickName}</span> 님</h1>
      <h1>반갑습니다^^*</h1>
    </>
  );
}

export default Home;
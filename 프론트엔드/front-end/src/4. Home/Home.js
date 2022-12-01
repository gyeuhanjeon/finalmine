import { useState, useEffect } from "react";
import TeamAPI from '../0. API/TeamAPI';


const Home = () => {
  const localId = window.localStorage.getItem("userId");
  const local_id_num = window.localStorage.getItem("id_num");

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
useEffect(() => {
        
  const memberData = async () => {
    console.log("\n\n현재 localStorage 에 저장된 ID : " + localId);

    console.log(typeof(localId));
    let id = localId;
    try {
      const response = await TeamAPI.memberInfo(id); // 원래는 전체 회원 조회용
      setNickName(response.data.nickname)
      window.localStorage.setItem("id_num",response.data.id_num);
      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  };
  memberData();
  }, []);
   
  return(
    <>
        <button onClick={chatTest}>임시 채팅 테스트</button>
      <h1>안녕하세요~ <span style={{color: "red" , fontWeight: "bold" }}>{nickName}</span> 님</h1>
      <h1>반갑습니다^^*</h1>
    </>
  );
}

export default Home;
import { useEffect, useState } from "react";
import TeamAPI from "../0. API/TeamAPI";

const Chat = () => {
    const isLogin = window.localStorage.getItem("isLogin");
    if(isLogin === "FALSE") window.location.replace("/login");

    const [nickName, setNickName] = useState('');
    const [content, setContent] = useState('');
    const [chatInfo,setChatinfo] = useState([]);
    const [isText, setIsText] = useState('');
  




    const onChangeText = e => {
        let textShow = e.target.value;

        if(textShow === '') {
            setIsText(false);
        } else {
            setContent(textShow);
            setIsText(true);
        }
    }

    const onClickBTN = async (data) => {
        data.preventDefault();
        console.log("텍스트 : " + content);
        console.log("isText" + isText);
        try {
            if( isText === true ) {
                
                const res = await TeamAPI.memberChat(content);
                console.log(res.data);

                if(res.data === true) {
                    setContent('')
                }else{
                    alert("실패")
                }
               
            } else {
                alert('텍스트를 입력해주세요');
                           
            
        } }catch(e) {
            alert("오류")
        }
    }
    const chatText = [
        {
        content: ""
        }
    ]
    useEffect(() => {
        
        const chatData = async () => {
          console.log("\n\n현재 localStorage 에 저장된 isLogin : " + isLogin);
          let id = content;
          try {
            const response = await TeamAPI.chatInfo(id); // 원래는 전체 회원 조회용
            setChatinfo(response.data);
            console.log("1111", response.data);
            // console.log("1111", response.data[1].content)

   
            
          } catch (e) {
            console.log(e);
          }
        };
        chatData();
        }, [onClickBTN]);
    
   

    
    return (
        <div>
            <div>
                <h1>채팅내용</h1>
                <div>*********************</div>
                {chatInfo && chatInfo.map((chat) => (
                    <div key={chat.id}>
                        <tr>
                            <td>{chat.chatNum}</td>
                            <td>{chat.content}</td>
                            <td>{chat.chatTime}</td>
                        </tr>
                    </div>
                ))}
            </div>
            <input type="text" placeholder="입력" value={content} onChange={onChangeText}/>
            <button onClick={onClickBTN}>보내기</button>
        </div>
    )
}
export default Chat;
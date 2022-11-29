import { useEffect, useState } from "react";
import TeamAPI from "../0. API/TeamAPI";

const Chat = () => {
    const isLogin = window.localStorage.getItem("isLogin");
    if(isLogin === "FALSE") window.location.replace("/login");

    const [nickName, setNickName] = useState('');
    const [chatinfo,setChatinfo] = useState([]);
    const [content, setContent] = useState([]);
    const [isText, setIsText] = useState('');





    const onChangeText = e => {
        let textShow = e.target.value;

        if(textShow === '') {
            setIsText(false);
        } else {
            // setContent(textShow);
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
            setChatinfo(response.data[0]);
            setContent(response.data.content);
            console.log("1111", response.data);
            // console.log("1111", response.data[1].content)

   
            
          } catch (e) {
            console.log(e);
          }
        };
        chatData();
        }, []);
    
   

    
    return (
        <div>
            <div>
                <h1>채팅내용</h1>
                <table>1
                {chatinfo && chatinfo.map((content) => {
                    <div key={content.id}>
                        <tr>
                            <td>{content.chatNum}</td>
                            <td>{content.content}</td>
                        </tr>
                    </div>
                })}
                </table>
            </div>
            <h1>1</h1>
            <input type="text" placeholder="입력"  onChange={onChangeText}/>
            <button onClick={onClickBTN}>보내기</button>
        </div>
    )
}
export default Chat;
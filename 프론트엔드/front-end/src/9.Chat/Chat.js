import { useState } from "react";
import TeamAPI from "../0. API/TeamAPI";

const ChatPage = () => {
    const isLogin = window.localStorage.getItem("isLogin");
    if(isLogin === "FALSE") window.location.replace("/login");

    const [nickName, setNickName] = useState('');
    const [content, setContent] = useState('');
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
                    alert("저장")
                }else{
                    alert("실패")
                }
               
            } else {
                alert('텍스트를 입력해주세요');
                           
            
        } }catch(e) {
            alert("오류")
        }
    }
    
    return (
        <div>
            <div>
                <div>{setContent}</div>
            </div>
            <h1>{nickName}</h1>
            <input type="text" placeholder="입력"  onChange={onChangeText}/>
            <button onClick={onClickBTN}>보내기</button>
        </div>
    )
}
export default ChatPage;
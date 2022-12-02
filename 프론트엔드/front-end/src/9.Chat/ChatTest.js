import React, { useEffect, useState, useRef } from "react";
import TeamAPI from "../0. API/TeamAPI";
import { firestore } from "../firebase";


const SocketTest = () => {
    const localId = window.localStorage.getItem("userId");
    
    const [socketConnected, setSocketConnected] = useState(false);
    const [inputMsg, setInputMsg] = useState("");
    const [rcvMsg, setRcvMsg] = useState("");
    const webSocketUrl = `ws://localhost:8282/ws/chatting`;
    const roomId = window.localStorage.getItem("chatRoomId");
    let ws = useRef(null);
    const [items, setItems] = useState([]);
    const local_id_num = window.localStorage.getItem("id_num");
    const [nickName, setNickName] = useState('');

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

    const sender = nickName;
        console.log("닉네임", sender);
    const onChangMsg = (message) => {
        setInputMsg(message.target.value)
    }

    const onEnterKey = (e) => {
        if(e.key === 'Enter') onClickMsgSend(e);
    }

    const onClickMsgSend = async(e) => {
        e.preventDefault();
        
        ws.current.send(
            JSON.stringify({
            "type":"TALK",
            "roomId": roomId,
            "sender": sender,
            "message":inputMsg}));
            setInputMsg("");
            
    }
    const onClickMsgClose = () => {
        ws.current.send(
            JSON.stringify({
            "type":"CLOSE",
            "roomId": roomId,
            "sender":sender,
            "message":"종료 합니다."}));
        ws.current.close();
    }

    useEffect(() => {
        console.log("방번호 : " + roomId);
        if (!ws.current) {
            ws.current = new WebSocket(webSocketUrl);
            ws.current.onopen = () => {
                console.log("connected to " + webSocketUrl);
            setSocketConnected(true);
            };
        }
        if (socketConnected) {
            ws.current.send(
                JSON.stringify({
                "type":"ENTER",
                "roomId": roomId,
                "sender": sender,
                "message": "채팅을 시작합니다"

                }));
        }
        ws.current.onmessage = (evt) => {
            const data = JSON.parse(evt.data);
            console.log(data.message);
            // setRcvMsg(data.message);
            setItems((prevItems) => [...prevItems, data]);
           
      };
    }, [socketConnected]);
    
    useEffect(() => {
        
        const bucket = firestore.collection("chat");
        //bucket은 컬렉션이름
        bucket.add({content : inputMsg})
      },[onClickMsgSend]);
    // 데이터값 불러오는건 잘됨
    // useEffect(() => {
    //     const query = ref(db, "users/message/")
    //     return onValue(query, (snapshot)=>{ 
    //         const datas =snapshot.val();
    //         if(snapshot.exists()) {
    //             Object.values(datas).map((item)=>{
    //                 console.log(datas);
    //                 <div>{datas}</div>
    //             });
    //         }
    //     },[])
    // });
    return (
        <div >
            {/* <div>socket</div>
            <div>socket connected : {`${socketConnected}`}</div>
            <div>방번호: {roomId}</div> */}
            {/* <h2>소켓으로 문자 전송하기 테스트</h2> */}
            <div>{sender}님이 입장하셨습니다</div>
            <div>
                {items.map((item) => {
                return <div>{`${item.sender} > ${item.message}`}</div>;
                })}
            </div>
            <input className="msg_input" placeholder="문자 전송" value ={inputMsg} onChange={onChangMsg} onKeyUp={onEnterKey}/>
            <button className="msg_send" onClick={onClickMsgSend}>전송</button>
            <p/>
            <button className="msg_close" onClick={onClickMsgClose}>채팅 종료 하기</button>
        </div>
      );
    };
    
    export default SocketTest;
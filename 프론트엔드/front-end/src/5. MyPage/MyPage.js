import React, { useState, useEffect } from 'react';
import TeamAPI, { TEAM_DOMAIN } from '../0. API/TeamAPI';
import nowGo from '../images/logo.png';
import noImage from '../images/logo.png';



const MyPage = () => {
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "FALSE") window.location.replace("/login");
  // ▲ 로그인 안 되어 있으면 로그인 페이지로

  const localId = window.localStorage.getItem("userId");
  const localPw = window.localStorage.getItem("userPw");

  const [memberInfo, setMemberInfo] = useState(""); // 현재 로그인 되어 있는 회원의 정보 저장용
  
  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 나이, 성별, 주소 1, 주소 2
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  
  const [birth, setBirth] = useState('');
  
  const [gender, setGender] = useState('');
  
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");

  useEffect(() => {
        
    const memberData = async () => {
      console.log("\n\n현재 localStorage 에 저장된 ID : " + localId);
      console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + localPw);
      console.log("\n\n현재 localStorage 에 저장된 isLogin : " + isLogin);

      console.log(typeof(localId));
      let id = localId;
      try {
        const response = await TeamAPI.memberInfo(id); // 원래는 전체 회원 조회용
        setMemberInfo(response.data);
        setName(response.data.name);
        setId(response.data.id);
        setPwd(response.data.pwd);
        setBirth(response.data.birth);
        setGender(response.data.gender);
        console.log("생일 확인 : " + response.data.birth)
        setRegion1(response.data.region1);
        setRegion2(response.data.region2);
        console.log(response.data)
      } catch (e) {
        console.log(e);
      }
    };
    memberData();
    }, []);

  const onClickMember = () => {
    console.log("회원 목록 조회 눌렀어요.");
    window.location.replace("/AdminMemberInfo");
  }
  
  const onClickDrop = () => {
    console.log("탈퇴하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MemberDrop");
  }
  
  const onClickUpdate = () => {
    console.log("수정하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MemberUpdate");
  }

  const onClickTestStart = () => {
    console.log("검사하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/Exam");
  }
  const onClickMessage = () => {
    console.log("메세지함 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MessageList");
  }



  return(
      <div className="MyPage-Container">
        <div className="history" >
            <table className='mypage-table'>
              <colgroup> 
                <col width="50%" /> 
                <col width="50%" /> 
              </colgroup>
                <tr>
                  <td colSpan="2" align='center' style={{width:"300px", padding:'20px'}}><h1>회원정보</h1></td>
                </tr>
                <tr>
                  <td colSpan="2" align='center' >
                    { memberInfo.fileName ?  
                      <img src={ TEAM_DOMAIN + "MemberInfo/file/" + id } style={{borderRadius:'70%', width: '200px'}}/>
                      : <img src={noImage} style={{borderRadius:'70%', width: '200px'}} />
                    }</td>
                </tr>
                <tr>
                  <br />
                </tr>
                <tr>
                  <th className='mypage-th' >이름</th>
                  <td className='mypage-td'>{name}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>아이디</th>
                  <td className='mypage-td'>{id}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>비밀번호</th>
                  <td className='mypage-td'>{pwd}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>생년월일</th>
                  <td className='mypage-td'>{birth}</td>
                </tr>
                {/* <tr>
                  <th className='mypage-th'>나이</th>
                  <td className='mypage-td'>{member.age}</td>
                </tr> */}
                <tr>
                  <th className='mypage-th'>성별</th>
                  <td className='mypage-td'>{gender}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>주소</th>
                  <td className='mypage-td'>{region1} {region2}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>MBTI</th>
                  <td className='mypage-td'> 
                    { memberInfo.mbti ? 
                        memberInfo.mbti 
                        : <button onClick={onClickTestStart}>검사하기</button>}
                  </td>
                </tr>
                <tr>
                  <br />
                </tr>
            </table> 
          
            <div onClick={onClickUpdate}>
              <span>회원정보 수정</span>
            </div>
          </div>
          <div onClick={onClickMessage}>
              <img src={nowGo} alt="화살표" />
              <span>메세지 함</span>
            </div>
          <div onClick={onClickDrop}>
              <img src={nowGo} alt="화살표" />
              <span>탈퇴하기</span>
            </div>
          
    </div>
  );

}

export default MyPage;
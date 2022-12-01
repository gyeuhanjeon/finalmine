import { useState, useEffect, useRef } from 'react';
import TeamAPI, { TEAM_DOMAIN } from '../0. API/TeamAPI';
import hangjungdong from '../other/hangjungdong';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import face from '../images/기본 프로필.png'
import { Modal } from '../99. Modal/MyPageModal';

// 파이어베이스
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const regexName = /^[ㄱ-ㅎ가-힣]{2,20}$/;

function My() {
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "FALSE") window.location.replace("/login");
  // ▲ 로그인 안 되어 있으면 로그인 페이지로

  const localId = window.localStorage.getItem("userId");

  const [modalOpen, setModalOpen] = useState(false);
  const [memberInfo, setMemberInfo] = useState(""); // 현재 로그인 되어 있는 회원의 정보 저장용
  
  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 나이, 성별, 주소 1, 주소 2
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const {sido, sigugun} = hangjungdong;
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [mbti, setMbti] = useState("");
  const [keySido, setKeySido] = useState("");

  const [isNicknamecheck, setIsNicknamecheck] = useState(false);

  // 변경 여부 변수 선언
  const [isChangePwd, setIsChangePwd] = useState(false);
  const [isChangeNickname, setIsChangeNickname] = useState(false);
  const [isChangeIntroduce, setIsChangeIntroduce] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };
  
  /* 
  최초 통신(useEffect) */
  useEffect(() => {  
    const memberData = async () => {
      console.log("\n>> 회원 정보 조회(useEffect)");
      console.log("localId : "+ localId);
      try {
        const response = await TeamAPI.memberInfo(localId); // 회원 정보 조회
        if(response.status == 200) {
          console.log("통신 성공(200)");
          const member = response.data;
          setMemberInfo(member);
          console.log(member)
          console.log("------------------");

          // 프사, 이름, 아이디, 생년월일, 성별, MBTI, 비밀번호, 닉네임, 자기소개, 이메일, 주소
          setUrl(member.face);
          setName(member.name);
          setId(member.id);
          setBirth(member.birth);
          setGender(member.gender);
          setMbti(member.mbti);
          setPwd(member.pwd);
          setNickname(member.nickname);
          setIntroduce(member.introduce);
          setEmail(member.email);
          setRegion1(member.region1);
          setRegion2(member.region2);
          console.log("기존 회원 정보 가져오기 완료")
        } else {
          console.log("통신 실패("+ response.status + ")");
        }
      } catch (e) {
        console.log(e);
      }
    };
  memberData();
  }, []);

  // 프사 변경 및 미리보기
  const handleImageChange = (e) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setUrl(preview);
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // 프사 저장 버튼
  const handleSubmit = async () => {
    const imageRef = ref(storage, localId);

    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then(async(url) => {
        console.log("여기 url : " + url);
        setUrl(url);
        // 여기부터는 통신
    //
    //
    //
    //
    try {
      const response = await TeamAPI.changeFace(url, localId);
      console.log(response.data.result);
      if(response.status == 200) {
        console.log("통신 성공(200)");
        alert("url 저장 성공함");
      } else {
        console.log("통신 실패 : " + response.status);
        alert("통신 실패 : " + response.status);
      }
    } catch (e) {
      console.log(e);
      console.log("캐치 !! 이미지 url 저장 실패..");
    }
      })
      .catch((error) => {
        console.log(error.message, "error getting the image url");
      });
      setImage(null);
    })
    .catch((error) => {
      console.log(error.message);
    });
    console.log("url : " + url);

    
  };

  // 프사 삭제 버튼
  const handleDelete = async() => {

    if(url === null) alert("삭제할 이미지가 없습니다.")
    else {
    setUrl(null);
    const temp_url = null;

    try {
      const response = await TeamAPI.changeFace(temp_url, localId);
      console.log(response.data.result);
      if(response.status == 200) {
        console.log("통신 성공(200)");
        alert("url 저장 성공함");
      } else {
        console.log("통신 실패 : " + response.status);
        alert("통신 실패 : " + response.status);
      }
    } catch (e) {
      console.log(e);
      console.log("캐치 !! 이미지 url 저장 실패..");
    }
  }
  }

  /**
▶ 변경 가능 항목(비밀번호, 닉네임, 자기소개, 이메일, 주소) 
  */

  /* 비밀번호 변경 */
  const onChangePwd = e => { 
    let temp_pwd = e.target.value;
    setPwd(temp_pwd); 
  }

  /* 비밀번호 저장 */
  const onSavePwd = async(e) => {
    e.preventDefault();
    setPwd(pwd);
    setIsChangePwd(false);

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
      console.log("id : " + id);
      console.log("password : " + pwd);
      console.log("nickname : " + nickname);
      console.log("introduce : " + introduce);
      console.log("email : " + email);
      console.log("region1 : " + region1);
      console.log("region2 : " + region2);

      if(response.status == 200) {
        console.log("통신 성공(200)");
        alert("정보 수정 완료!!");
        console.log("\n\n업데이트 완!!");
      } 
    } catch (e) {console.log(e);}
  }

  /* 닉네임 변경 */
  const onChangeNickname = e => { 
    let temp_nickname = e.target.value;
    setNickname(temp_nickname); 
  }

  /* 닉네임 중복확인 버튼 클릭 */
  const onClickNicknameCheck = async (e) => {
    e.preventDefault();
    setIsNicknamecheck(false);
    console.log("\n>> 닉네임 중복확인 버튼 눌렀어요.");

    if (nickname === '' || !regexName.test(nickname)) {
      console.log("닉네임을 입력하지 않았거나 정규식에 맞지 않아요.");
      alert("먼저, 닉네임을 확인하세요.");
    } else {
      try {
        const nicknameCheck = await TeamAPI.nicknameCheck(nickname);
        console.log("nicknameCheck.data : " + nicknameCheck.data);
        console.log("nicknameCheck.status : " + nicknameCheck.status);
        // if(memberCheck.data.result === true) {
        if (nicknameCheck.data === true) {
          setNickname("");
          alert("사용할 수 없는 닉네임 입니다.");
          console.log("사용할 수 없는 닉네임 입니다.");
        } else {
          console.log("사용 가능한 닉네임 입니다.");
          setIsNicknamecheck(true);
          alert("사용 가능한 닉네임 입니다.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  /* 닉네임 저장 */
  const onSaveNickname = async(e) => {
    console.log("\n>> 닉네임 저장 버튼 눌렀어요.");
    if(!isNicknamecheck) {
      alert("닉네임을 다시 확인하거나 중복확인이 필요합니다.")
      return;
    }

    e.preventDefault();
    setNickname(nickname);
    setIsChangeNickname(false);

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
      console.log("id : " + id);
      console.log("password : " + pwd);
      console.log("nickname : " + nickname);
      console.log("introduce : " + introduce);
      console.log("email : " + email);
      console.log("region1 : " + region1);
      console.log("region2 : " + region2);

      if(response.status == 200) {
        console.log("통신 성공(200)");
        console.log("\n>> 닉네임 수정 완료");
        alert("닉네임 수정 완료!!");
      } 

    } catch (e) {console.log(e);}
  } 

  /* 자기소개 변경 */
  const onChangeIntroduce = e => { 
    let temp_introduce = e.target.value;
    setIntroduce(temp_introduce); 
  }

  /* 자기소개 저장 */
  const onSaveIntroduce = async(e) => {
    e.preventDefault();
    setIntroduce(introduce);
    setIsChangeIntroduce(false);
    console.log("\n>> 자기소개 저장 버튼 눌렀어요.");

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          console.log("\n>> 자기소개 수정 완료");
          alert("자기소개 수정 완료!!");
      } 

    } catch (e) {console.log(e);}
  } 

  /* 이메일 변경 */
  const onChangeEmail = e => { 
    let temp_email = e.target.value;
    setEmail(temp_email); 
  }

  /* 이메일 저장 */
  const onSaveEmail = async(e) => {
    e.preventDefault();
    setEmail(email);
    setIsChangeEmail(false);
    console.log("\n>> 이메일 저장 버튼 눌렀어요.");

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          console.log("\n>> 이메일 수정 완료");
          alert("이메일 수정 완료!!");
      } 

    } catch (e) {console.log(e);}
  }

  /* 주소 ☞ 시도 변경 */
  const onChangeRegion1 = (e) => {

    let temp_region1 = e.target.value;
    console.log("\n시도선택 : " + temp_region1); // 서울특별시
    setRegion1(temp_region1);

    const indexSido = sido.findIndex(e => e.codeNm === temp_region1);

    let temp_keySido = sido.at(indexSido).sido;
    setKeySido(temp_keySido);
  };

  /* 주소 ☞ 시구군 변경 */
  const onChangeRegion2 = (e) => {

    let temp_region2 = e.target.value;
    console.log("\n시/구/군선택 : " + temp_region2);
    setRegion2(temp_region2);
  }

  /* 주소 저장 */
  const onSaveAddress = async(e) => {
    setRegion1(region1);
    setRegion2(region2);
    setIsChangeAddress(false);
    console.log("\n>> 주소 저장 버튼 눌렀어요.");

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          console.log("\n>> 주소 수정 완료");
          alert("주소 수정 완료!!");
      } 

    } catch (e) {console.log(e);}
  }

  /* MBTI 검사하기 */
  const onClickTestStart = () => {
    console.log("\n>> 검사하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MBTI");
  }

  return(
    <>
      <Modal open={modalOpen} close={closeModal} header="비밀번호 변경"></Modal>
      <h1>마이페이지</h1>
      <h6>프로필 사진 미리보기 가능</h6>
      {url != null 
      ? <img  src={url} alt="프로필 이미지" style={{width: "150px", height: "150px", borderRadius: "70%", overflow: "hidden", objectFit: "cover"}}/>
      : <img  src={face} alt="프로필 이미지" style={{width: "150px", height: "150px", borderRadius: "70%", overflow: "hidden", objectFit: "cover"}}/> }
      <div>
      <input type="file" accept="image/*" onChange={handleImageChange}/>
      <button onClick={handleSubmit}>저장</button>
      <button onClick={handleDelete}>삭제</button>

      </div>
      <div className="Form-item">
        <span>이름</span>
        <input type="text" value ={name} disabled/>
      </div>
      <div className="Form-item">
        <span>아이디</span>
        <input type="text" value ={id} disabled/>
      </div>
      <div className="Form-item">
        <span>생년월일</span>
        <input type="text" value ={birth} disabled/>
      </div>
      <div className="Form-item">
        <span>성별</span>
        <input type="text" value ={gender} disabled/>
      </div>
      <div className="Form-item">
        <span>MBTI</span>
        { mbti ? <input type="text" value ={mbti} />
          : <button onClick={onClickTestStart}>검사하기</button>}
      </div>

      {/* 비밀번호 */}
      <div className="Form-item">
        <span>비밀번호</span>
        <input type="password" value ={pwd} />
        <button onClick={openModal}>수정</button>
      </div>

      {/* 닉네임 */}
      <div className="Form-item">
        <span>닉네임</span>
        {!isChangeNickname ?
        <>
          <input type="text" value ={nickname} />
          <button onClick={e => setIsChangeNickname(true)}>수정</button>
        </>
        :
        <>
          <input type="text" onChange={onChangeNickname}/>
          <button onClick={onClickNicknameCheck}>중복확인</button>
          <button onClick={onSaveNickname}>저장</button>
        </>
        }
      </div>

      {/* 자기소개 */}
      <div className="Form-item">
        <span>자기소개</span>
        {!isChangeIntroduce ?
        <>
          <input type="text" value ={introduce} />
          <button onClick={e => setIsChangeIntroduce(true)}>수정</button>
        </>
        :
        <>
          <input type="text" onChange={onChangeIntroduce}/>
          <button onClick={onSaveIntroduce}>저장</button>
        </>
        }
      </div>

      {/* 이메일 */}
      <div className="Form-item">
        <span>이메일</span>
        {!isChangeEmail ?
        <>
          <input type="mail" value ={email} />
          <button onClick={e => setIsChangeEmail(true)}>수정</button>
        </>
        :
        <>
          <input type="mail" onChange={onChangeEmail}/>
          <button onClick={onSaveEmail}>저장</button>
        </>
        }
      </div>

      {/* 주소 */}
      <>
      {isChangeAddress ?
      <div className="Form-item">
        <span>주소</span>
        <select className='Select-Sido' onChange={onChangeRegion1}>
          <option disabled selected>시도선택</option>
          {sido.map((e) => (
            <option key={e.sido} value={e.codeNm}>
              {e.codeNm}
            </option>
          ))}
        </select>
        <select className='Select-SiGuGun' onChange={onChangeRegion2}>
          <option disabled selected>시/구/군선택</option>

          {sigugun
            // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
            .filter((e) => e.sido === keySido)
            .map((e) => (
              <option key={e.sigugun} value={e.codeNm}>
                {e.codeNm}
              </option>
            ))}
        </select>
        <button onClick={onSaveAddress}>저장</button>
        
      </div>
      : 
      <div className="Form-item">
        <span>주소</span>
        <input type="text" value ={region1} />
        <input type="text" value ={region2} />
        <button onClick={e => setIsChangeAddress(true)}>수정</button>
      </div>
      }
      </>
    </>
  );
  
  



}

export default My;
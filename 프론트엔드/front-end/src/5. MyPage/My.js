import { useState, useEffect, useRef } from 'react';
import TeamAPI, { TEAM_DOMAIN } from '../0. API/TeamAPI';
import hangjungdong from '../other/hangjungdong';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import face from '../images/기본 프로필.png'

// 파이어베이스
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

function My() {
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "FALSE") window.location.replace("/login");
  // ▲ 로그인 안 되어 있으면 로그인 페이지로

  const localId = window.localStorage.getItem("userId");
  const localPw = window.localStorage.getItem("userPw");
  




  const [memberInfo, setMemberInfo] = useState(""); // 현재 로그인 되어 있는 회원의 정보 저장용
  
  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 나이, 성별, 주소 1, 주소 2
  const [image, setImage] = useState(null);// 여기에 기본 이미지 넣어야지
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

  // 변경 여부 변수 선언
  const [isChangePwd, setIsChangePwd] = useState(false);
  const [isChangeNickname, setIsChangeNickname] = useState(false);
  const [isChangeIntroduce, setIsChangeIntroduce] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
 
  /* 
  최초 통신(useEffect) */
  useEffect(() => {  
    const memberData = async () => {
      console.log("localId : "+ localId);
    try {
      const response = await TeamAPI.memberInfo(localId); // 회원 정보 조회
      setMemberInfo(response.data);
      console.log(response.data)

      setName(response.data.name);
      setNickname(response.data.nickname);
      setUrl(response.data.face);
      console.log("-----------" + response.data.nickname);
      setId(response.data.id);
      setEmail(response.data.email);
      setPwd(response.data.pwd);
      setBirth(response.data.birth);
      setGender(response.data.gender);
      console.log("생일 확인 : " + response.data.birth)
      setRegion1(response.data.region1);
      setRegion2(response.data.region2);
      setMbti(response.data.mbti);
      setIntroduce(response.data.introduce);
      console.log("기존 회원 정보 가져오기 완료")
      } catch (e) {
          console.log(e);
      }
    };
  memberData();
  }, []);

  // 이미지 변경
  const handleImageChange = (e) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setUrl(preview);
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // 업로드 버튼
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

  // 삭제 버튼
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

  /*
  변경 가능 항목(비밀번호, 닉네임, 자기소개, 이메일, 주소) */

  const onClickChangePwd = e => {
    let temp_pwd = e.target.value;
    setPwd(temp_pwd);
  }



  
  const onChangeNickname = e => { 
    let temp_nickname = e.target.value;
    setNickname(temp_nickname); 
  }
  
  const onChangeIntroduce = e => { 
    let temp_introduce = e.target.value;
    setIntroduce(temp_introduce); 
  }
  /*
  이메일 변경 */
  const onChangeEmail = e => { 
    let temp_email = e.target.value;
    setEmail(temp_email); 
  }

  /*
  이메일 저장 */
  const onSaveEmail = async(e) => {
    e.preventDefault();
    setEmail(email);
    setIsChangeEmail(false);

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

  /*
  시도 변경 */
  const onChangeRegion1 = (e) => {

    let temp_region1 = e.target.value;
    console.log("\n시도선택 : " + temp_region1); // 서울특별시
    setRegion1(temp_region1);

    const indexSido = sido.findIndex(e => e.codeNm === temp_region1);

    let temp_keySido = sido.at(indexSido).sido;
    setKeySido(temp_keySido);
  };

  /*
  시구군 변경 */
  const onChangeRegion2 = (e) => {

    let temp_region2 = e.target.value;
    console.log("\n시/구/군선택 : " + temp_region2);
    setRegion2(temp_region2);
  }

  /*
  주소 저장 */
  const onSaveAddress = async(e) => {
    setRegion1(region1);
    setRegion2(region2);
    setIsChangeAddress(false);

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


  const onClickTestStart = () => {
    console.log("검사하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MBTI");
  }

  const OnClickButton = async() => {
    try {
      const memberUpdate = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
  
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        console.log("업데이트 완!!");

    } catch (e) {console.log(e);}
        // window.location.replace("/mypage");
    // } else {
    //   console.log("잘못 입력한 값이 있거나 입력되지 않은 값이 있어요.");
    //   alert('입력된 값을 확인하세요.');
  }

  return(
    <>
      <h1>마이페이지</h1>
      {url != null 
      ? <img  src={url} alt="프로필 이미지" style={{width: "150px", height: "150px", borderRadius: "70%", overflow: "hidden", objectFit: "cover"}}/>
      : <img  src={face} alt="프로필 이미지" style={{width: "150px", height: "150px", borderRadius: "70%", overflow: "hidden", objectFit: "cover"}}/> }
      <div>
      <input type="file" accept="image/*" onChange={handleImageChange}/>
      <button onClick={handleSubmit}>변경</button>
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
      <div className="Form-item">
        <span>비밀번호</span>
        <input type="password" value ={pwd} />
        <button onClick={onClickChangePwd}>수정</button>
      </div>
      <div className="Form-item">
        <span>닉네임</span>
        <input type="text" value ={nickname} />
        <button onClick={onChangeNickname}>수정</button>
      </div>
      <div className="Form-item">
        <span>자기소개</span>
        <input type="text" value ={introduce} />
        <button onClick={onChangeIntroduce}>수정</button>
      </div>
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
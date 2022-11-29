import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TeamAPI from '../0. API/TeamAPI';
import hangjungdong from '../other/hangjungdong';
import '../3. SignUp/SignUp.css'





// 정규식 - 이름, 아이디, 비밀번호
const regexName = /^[ㄱ-ㅎ가-힣]{2,20}$/;
const regexId = /^\w{5,20}$/;
const regexPw = /^\w{8,20}$/;
const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
// const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;


const Msg = styled.div`
  color: orangered;
  font-size: calc(1rem * .8);
  display: flex;
  justify-content: flex-end;
  height: 1.5rem;
  margin-right: 20px;
  align-items: center; // 세로 기준으로 가운데 정렬
`;





function SignUp() {

  const [mode, setMode] = useState("agree");
  const [checkedItems, setCheckedItems] = useState([]);
  const [check_term1, setCheck_term1] = useState("");
  const [check_term2, setCheck_term2] = useState("");

  const Terms = () => {
  

    const [termsList, setTermsList] = useState([
      {termNum: 1, title: "[필수] 아이셔계정 약관", content: "테스트23"},
      {termNum: 2, title: "[선택] 프로모션 정보 수신 동의(선택)",
        content: "엠비티아이셔에서 제공하는 이벤트/혜택 등 다양한 정보를 이메일로 받아보실 수 있습니다. 일부 서비스(별도 회원 체계로 운영하거나 엠비티아이셔 가입 이후 추가 가입하여 이용하는 서비스 등)의 경우, 개별 서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고 동의를 받습니다."}
    ]);
  

    function AllCheck() {
      return(
        <p>
          전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.
          <br />
          선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
        </p>
      );
    }
  
    /* 
    체크박스 전체 선택 */ 
    const handleAllCheck = (checked) => {
      console.log("\n\n전체 선택 되었나요? : " + checked);
  
      if(checked) {
        const termNumArray = []; // termNum 을 담을 빈 배열(termNumArray) 생성
        termsList.forEach((e) => termNumArray.push(e.termNum)); // termsList 를 하나씩 돌면서 termNumArray termNum 추가
        console.log("postNumArray : " + termNumArray); // 모든 약관의 termNum 을 담은 배열로 checkedItems 상태 업데이트
        setCheckedItems(termNumArray);
      }
      else {
        setCheckedItems([]); // checkedItems 를 빈 배열로 상태 업데이트
      }
    }
  
    /* 
    체크박스 단일 선택 */ 
    const handleSingleCheck = (checked, num) => {
      console.log(num + "번 약관이 선택 되었나요? : " + checked);
      
      if (checked) {
        setCheckedItems(fix => [...fix, num]); // 체크된 약관 번호를 checkedItems 배열에 추가
        console.log("checkedItems : " + checkedItems.toString());
      } else {
        setCheckedItems(checkedItems.filter((e) => e !== num)); // 체크된 약관 번호를 checkedItems 배열에서 삭제
        console.log("checkedItems : " + checkedItems.toString());
      }
    };
  
    /*
    동의하고 가입하기 */
    const onClickAgree = () => {
      console.log("\n\n동의하고 가입하기 버튼 눌렀어요.");
  
      if(checkedItems.includes(1)) {
        setCheck_term1("동의")
        if(checkedItems.includes(2)) setCheck_term2("동의")
        else setCheck_term2("비동의")
        
        setMode("join");
  
      } else {
        alert("1번에 무조건 동의해야합니다.");
      }
    }
  
    return(
      <form>
        <div>
          <input type="checkbox" id="checkbox-check_all"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={termsList.length === checkedItems.length ? true : false} />
          <label htmlFor="checkbox-check_all">모두 동의합니다.</label>
        </div>
        <AllCheck />
        {termsList?.map(ball => (
          <div>
            <input type="checkbox" id="checkbox-check_single"
              onChange={(e) => handleSingleCheck(e.target.checked, ball.termNum)}
              checked={checkedItems.includes(ball.termNum) ? true : false} />
            <label htmlFor="checkbox-check_single">{ball.title}</label>
            <div>{ball.content}</div>
          </div>
        ))}
  
        <button type="button" onClick={onClickAgree}>동의하고 가입하기</button> 
      </form>
    );
  }

  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 나이, 성별, 주소 1, 주소 2
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdcheck, setPwdcheck] = useState('');
  const [email, setEmail] = useState('');

  const today = new Date();
  const [birth, setBirth] = useState('');
  const [age, setAge] = useState("");

  const [gender, setGender] = useState('');

  const { sido, sigugun } = hangjungdong;
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [keySido, setKeySido] = useState("");

  /* 
  최초 통신(useEffect) */
  useEffect(() => {
    console.log("현재 mode : " + mode);
    console.log("필수 약관 : " + check_term1);
    console.log("선택 약관 : " + check_term2);
  }, [mode]); 

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isIdcheck, setIsIdcheck] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPwdcheck, setIsPwdcheck] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isRegion1, setIsRegion1] = useState(false);
  const [isRegion2, setIsRegion2] = useState(false);

  // 보여줄 문구 목록
  const reqName = "이름을 정확히 입력하세요."
  const reqId = "아이디를 입력하세요."
  const guideId = "아이디를 올바르게 입력해주세요."
  const acceptId = "사용 가능한 ID 입니다.";
  const reqEmail = "이메일을 정확히 입력하세요."
  const guidePwd = "임시 정규식 : 8~20자"
  const acceptPwd = "사용 가능한 비밀번호입니다."
  const errorPwdcheck = "비밀번호가 일치하지 않습니다."
  const acceptPwdcheck = "비밀번호가 일치합니다."

  // 보여질 문구 상태
  const [showReqName, setShowReqName] = useState(false);
  const [showReqEmail, setShowReqEmail] = useState(false);
  const [showReqId, setShowReqId] = useState(false);
  const [showGuideId, setShowGuideId] = useState(false);
  const [showAcceptId, setShowAcceptId] = useState(false);
  const [showGuidePwd, setShowGuidePwd] = useState(false);
  const [showAcceptPwd, setShowAcceptPwd] = useState(false);
  const [showErrorPwdcheck, setShowErrorPwdcheck] = useState(false);
  const [showAcceptPwdcheck, setShowAcceptPwdcheck] = useState(false);


  /*
  이름 변경 */
  const onChangeName = e => {
    console.log("mode : " + mode);

    let temp_name = e.target.value;
    setName(temp_name);

    if (temp_name === '' || !regexName.test(temp_name)) {
      setIsName(false);
      setShowReqName(true); // 이름을 정확히 입력하세요.
    } else {
      setIsName(true);
      setShowReqName(false); // 이름을 정확히 입력하세요.
    }
  };

  /*
  아이디 변경 */
  const onChangeId = e => {
    setIsIdcheck(false);

    let temp_id = e.target.value;
    setId(temp_id);

    if (temp_id === '') {
      setIsId(false);
      setShowReqId(true); // 아이디를 입력하세요.
      setShowGuideId(false); // 아이디를 올바르게 입력해주세요.
    } else if (!regexId.test(temp_id)) {
      setIsId(false);
      setShowReqId(false); // 아이디를 입력하세요.
      setShowGuideId(true); // 아이디를 올바르게 입력해주세요.
    } else {
      setIsId(true);
      setShowReqId(false); // 아이디를 입력하세요.
      setShowGuideId(false); // 아이디를 올바르게 입력해주세요.
    }
  };

  /*
  중복확인 버튼 클릭 */
  const onClickIdCheck = async (e) => {
    e.preventDefault();

    setIsIdcheck(false);
    console.log("\n\n중복확인 버튼 눌렀어요.");

    if (id === '' || !regexId.test(id)) {
      console.log("아이디를 입력하지 않았거나 정규식에 맞지 않아요.");
      alert("먼저, 아이디를 확인하세요.");
    } else {
      setIsIdcheck(true);
      // 가입 여부 우선 확인
      try {
        const memberCheck = await TeamAPI.memberRegCheck(id);
        console.log("memberCheck.data : " + memberCheck.data);
        console.log("memberCheck.status : " + memberCheck.status);
        // if(memberCheck.data.result === true) {
        if (memberCheck.data === true) {
          setId("");
          alert("이미 가입되어 있는 ID 입니다.");
          console.log("이미 가입되어 있는 ID 입니다.");
        } else {
          console.log("사용 가능한 ID 입니다.");
          alert("사용 가능한 ID 입니다.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  /*
  비밀번호 변경 */
  const onChangePassword = e => {
    setIsPwd(false);
    setIsPwdcheck(false);

    let temp_pwd = e.target.value;
    setPwd(temp_pwd);

    if (regexPw.test(temp_pwd)) {
      setIsPwd(true);
      setShowAcceptPwd(true); // 사용 가능한 비밀번호입니다.
      setShowGuidePwd(false); // 임시 정규식 : 8~20자
    } else {
      setIsPwd(false);
      setShowAcceptPwd(false); // 사용 가능한 비밀번호입니다.
      setShowGuidePwd(true); // 임시 정규식 : 8~20자
    }

    if (pwdcheck == '') console.log(pwdcheck);
    else if (pwdcheck !== '' && (temp_pwd !== '' && temp_pwd === pwdcheck)) {
      setIsPwdcheck(true);
      setShowAcceptPwdcheck(true); // 비밀번호가 일치합니다.
      setShowErrorPwdcheck(false); // 비밀번호가 일치하지 않습니다.
    } else {
      setIsPwdcheck(false);
      setShowErrorPwdcheck(true); // 비밀번호가 일치하지 않습니다.
      setShowAcceptPwdcheck(false); // 비밀번호가 일치합니다.
    }
  };

  /*
  비밀번호 확인 변경 */
  const onChangePassword_check = e => {
    const temp_pwdcheck = e.target.value;
    setPwdcheck(temp_pwdcheck);

    if (pwd === temp_pwdcheck) {
      setIsPwdcheck(true);
      setShowAcceptPwdcheck(true); // 비밀번호가 일치합니다.
      setShowErrorPwdcheck(false); // 비밀번호가 일치하지 않습니다.
    } else {
      setIsPwdcheck(false);
      setShowErrorPwdcheck(true); // 비밀번호가 일치하지 않습니다.
      setShowAcceptPwdcheck(false); // 비밀번호가 일치합니다.
    }
  };

 
  /*이메일 변경*/
  const onChangeEmail = e => {
    let temp_email = e.target.value;
    setEmail(temp_email);

    if (temp_email === '' || !regexEmail.test(temp_email)) {
      setIsEmail(false);
      setShowReqEmail(true); // 이메일을 정확히 입력하세요.
    } else {
      setIsEmail(true);
      setShowReqEmail(false); // 이메일을 정확히 입력하세요.
    }
  };

  /*
  생년월일 변경 */
  const onChangeBirth = e => {
    setIsBirth(false);

    let temp_birth = e.target.value;
    setBirth(temp_birth);
    console.log("\n\ntemp_birth : " + temp_birth);

    if (temp_birth !== null) {
      setIsBirth(true);
      const birthArray = temp_birth.split('-');

      console.log("태어난 연도 : " + birthArray[0]);
      console.log("태어난 월 : " + birthArray[1]);
      console.log("태어난 일 : " + birthArray[2]);

      // 1992-02-20
      // 0123456789
      setAge(String(today.getFullYear() - birthArray[0]));

      console.log("현재 " + String(today.getFullYear()) + "년");
      console.log("현재 " + today.getMonth() + "월");

      const m = today.getMonth() - birthArray[1];
      console.log("태어난 월에서 현재 월을 빼면 " + m);

      if (m < 0 || (m === 0 && today.getDate() < birthArray[2])) {
        setAge(String(age - 1));
      }
    }
  };

  /*
  성별 변경 */
  const onChangeRadio = e => {
    let temp_gender = e.target.value;
    console.log("성별 : " + temp_gender);

    setGender(temp_gender);
    setIsGender(true);
  };

  /*
  시도 변경 */
  const onChangeRegion1 = (e) => {
    setIsRegion1(true);

    let temp_region1 = e.target.value;
    console.log("\n\n시도선택 : " + temp_region1); // 서울특별시
    setRegion1(temp_region1);

    const indexSido = sido.findIndex(e => e.codeNm === temp_region1);

    let temp_keySido = sido.at(indexSido).sido;
    setKeySido(temp_keySido);
  };

  /*
  시구군 변경 */
  const onChangeRegion2 = (e) => {
    setIsRegion2(true);

    let temp_region2 = e.target.value;
    console.log("\n\n시/구/군선택 : " + temp_region2);
    setRegion2(e.target.value);
  }

  /*
  회원가입 버튼 클릭 */
  const onClickButton = async (e) => {
    e.preventDefault();

    console.log("\n\n회원가입 버튼 눌렀어요.");
    console.log("isName : " + isName);
    console.log("isId : " + isId);
    console.log("isId_check : " + isIdcheck);
    console.log("isPwd : " + isPwd);
    console.log("isPwdcheck : " + isPwdcheck);
    console.log("isBirth : " + isBirth);
    console.log("isGender : " + isGender);
    console.log("isRegion1 : " + isRegion1);
    console.log("isRegion2 : " + isRegion2);
    console.log("check_term1 : " + check_term1);
    console.log("check_term2 : " + check_term2);

    if (isName && isId && isIdcheck && isPwd && isPwdcheck && isEmail && isBirth && isGender && isRegion1 && isRegion2) {
      const memberReg = await TeamAPI.memberReg(name, id, pwd, email, birth, gender, region1, region2, check_term1, check_term2);

      console.log("name : " + name);
      console.log("id : " + id);
      console.log("pwd : " + pwd);
      console.log("email : " + email);
      console.log("birth : " + birth);
      // console.log("age : " + age);
      console.log("gender : " + gender);
      console.log("region1 : " + region1);
      console.log("region2 : " + region2);
      console.log("필수 약관 : " + check_term1);
      console.log("선택 약관 : " + check_term2);
      console.log("가입 성공!! \n로그인 페이지로 이동합니다.");
      alert("콘솔창 확인용");
      window.location.replace("/login");
    } else {
      console.log("잘못 입력한 값이 있거나 입력되지 않은 값이 있어요.");
      alert('입력된 값을 확인하세요.');
    }
  };


  return (
    mode === 'agree' ? 
      <Terms/> 
    : 
    <div className="SignUp-Container">
      <div className="SignUp-Main-Box">

          <div className="SignUp-header">
            <h1>Sign Up</h1>
            <div>회원정보를 입력해주세요</div>
          </div>

          <form action="" className="SignUp-card-form">
            {/* 이름 */}
            <div className="Form-item">
              {/* <span style={{display: 'inline-block', width: 150}}>이름</span> */}
              <span className="Form-item-icon material-symbols-rounded"></span>
              <input type="text" className='Input-Name' placeholder="이름" value={name} onChange={onChangeName} required />
              <Msg>
                {showReqName && reqName}
              </Msg>
            </div>

            {/* 아이디 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded"></span>
              <input type="text" className='Input-ID' placeholder="아이디" value={id} onChange={onChangeId} required />
              <button onClick={onClickIdCheck} className='Input-ID-check' required> 중복확인 </button>
              <Msg>
                {showReqId && reqId}
                {showGuideId && guideId}
                {showAcceptId && acceptId}
              </Msg>
            </div>


            {/* 비밀번호 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded"></span>
              <input type="password" placeholder="비밀번호" value={pwd} onChange={onChangePassword} />
              <Msg>
                {showGuidePwd && guidePwd}
                {showAcceptPwd && acceptPwd}
              </Msg>
            </div>

            {/* 비밀번호 확인 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded"></span>
              <input type="password" placeholder="비밀번호 확인" value={pwdcheck} onChange={onChangePassword_check} disabled={!regexPw.test(pwd)} />
              <Msg>
                {showErrorPwdcheck && errorPwdcheck}
                {showAcceptPwdcheck && acceptPwdcheck}
              </Msg>
            </div>

            {/* 이메일 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded"></span>
              <input type="text" className='Input-Name' placeholder="이메일" value={email} onChange={onChangeEmail} required />
              <Msg>
                {showReqEmail && reqEmail}
              </Msg>
            </div>

            {/* 생년월일 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded"></span>
              <input type="date" value={birth} onChange={onChangeBirth} />
              <span className='Span-Age'>만 {age}세</span>
              <Msg>생년월일을 선택하세요</Msg>
            </div>

            {/* 성별 */}
            <div className="Form-item">
              <div className='Form-item-Gender'>
                <span className="Form-item-icon material-symbols-rounded"></span>
                <label className='Label-gender'>
                  <input type="radio" name="gender" value="남자" onChange={onChangeRadio} />
                  <span>남자</span>
                </label>
                <label className='Label-gender'>
                  <input type="radio" name="gender" value="여자" onChange={onChangeRadio} />
                  <span>여자</span>
                </label>
              </div>
              <Msg></Msg>
            </div>

            {/* 주소 */}
            <div className="Form-item">
              <div className='Form-item-Address'>
                <span className="Form-item-icon material-symbols-rounded"></span>
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
              </div>
              <Msg>주소를 선택하세요</Msg>
            </div>

            {/* 회원가입 */}
            <button type="submit" className='Button-Submit' onClick={onClickButton}>회원가입</button>

          </form>
      </div> {/* SignUp-card-container 의 끝 */}
    </div>
  );
}

export default SignUp;
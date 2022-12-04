import React, { useEffect, useState } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import '../2. Login/Login.css';
import '../font/Jalnan.ttf';
import "../images/아이셔용.png"
import { motion } from "framer-motion";
import { GoogleButton } from 'react-google-button';
import { auth, provider } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



const regexPw = /^\w{8,20}$/;



function Login() {

  const signInWithGoogle = () => {

    // e.preventDefault();
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);

      const email = result.user.email;

      localStorage.setItem("email", email);
      localStorage.setItem("email", email);
      console.log(localStorage);
      const dong = result.user.email;
      console.log(dong);
      
      
      // setGoogleEmail(() => dong);

      console.log("얻어온 구글 이메일(localStorage) " + localStorage.getItem("email"));
      googleInfo();
    }).catch((error) => {
      console.log(error);
    })
  };

  const googleInfo = async(e)=>{
    try {
      console.log("try 넘어서 얻어온 구글 아이디 : " + localStorage.getItem("email"));
      const res = await TeamAPI.googleInfo(localStorage.getItem("email"));
      console.log('날아온데이터 : ' + res.data);
      if (res.data.id != null) {
        alert('일치하는 이메일이 있습니다. 해당 아이디로 로그인 합니다.')
        window.localStorage.setItem("userId", res.data.id);
        window.localStorage.setItem("userId", res.data.id);
        window.location.replace("/home");

      } else{
        window.location.replace("/signup");

      }
      // if(res.data.email===localStorage.getItem("email")) {
      //   alert('일치하는 정보가 없습니다 새로 가입을 진행해 주세요.')
      //   window.location.replace("/signup");
      // }
    } catch {
      console.log(e)
    }
  };



  // ▼ 로그인되어 있으면 바로 HOME 으로 이동 
  const isLogin = window.localStorage.getItem("isLogin");
  if (isLogin === "TRUE") window.location.replace("/home");
  // ▲ 로그인되어 있으면 바로 HOME 으로 이동

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

  /*
  아이디 변경 */
  const onChangeId = (e) => {
    let temp_id = e.target.value;
    setId(temp_id);
  }

  /*
  비밀번호 변경 */
  const onChangePwd = (e) => {
    let temp_pwd = e.target.value;
    setPwd(temp_pwd);
  }

  /*
  Login 버튼 클릭 */
  const onClickLogin = async (e) => {
    e.preventDefault();

    console.log("입력한 ID : " + id);
    console.log("입력한 Password : " + pwd);
    console.log("LOGIN 버튼 눌렀어요.");

    try {
      const res = await TeamAPI.userLogin(id, pwd);
      // 로그인을 위한 axios 호출
      // console.log("호출 TRY : " + res.data.result);
      console.log("res.data : " + res.data);

      // if(res.data.result === "OK") {
      if (res.data === true) {
        window.localStorage.setItem("userId", id);
        window.localStorage.setItem("userId", id);
        window.localStorage.setItem("userPw", pwd);
        window.localStorage.setItem("isLogin", "TRUE");
        window.location.replace("/home");
      } else {
        alert("아이디 또는 비밀번호를 확인하세요!");
      }
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div className="Login-Container">
      <div className="Login-box1">

        {/* <div className="Login-card-logo">
            <img src={logo} alt="logo" />
          </div> */}

        <div className="Login-Main-font">
          <p className='Login-Main-Word'>MBTISOUR</p>
          <p>로그인을 해주세요!</p>
        </div>

        {/* <form action="" className="Login-card-form"> */}

        {/* 아이디 */}
        <div className="Login-Id">
          <input className="Login-input" type="text" placeholder="Enter ID" value={id} onChange={onChangeId} required />
        </div>

        {/* 비밀번호 */}
        <div className="Login-PW">
          <input className="Login-input" type="password" placeholder="Enter Password" value={pwd} onChange={onChangePwd} />
        </div>
        <motion.div
          className="Login-botton"
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        ><button className="Login-botton" type="submit" onClick={onClickLogin}>Login</button></motion.div>


        <div className="Login-findId">
          <a href="/FindInfo">아이디/비밀번호 찾기</a>
        </div>

        <div className="Login-footer">
          가입하고 친구를 만들어봐요! <p><a href="/signup">회원가입</a></p>
        </div>

        <div>
          {googleEmail}
          <GoogleButton onClick={signInWithGoogle} />
        </div>

      </div>
    </div>
  );
}

export default Login;
import React, { useState } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import '../2. Login/Login.css';
import '../font/Jalnan.ttf';
import "../images/아이셔로고.png" 
import { motion } from "framer-motion";

const regexPw = /^\w{8,20}$/;

function Login() {
  // ▼ 로그인되어 있으면 바로 HOME 으로 이동 
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "TRUE") window.location.replace("/home");
  // ▲ 로그인되어 있으면 바로 HOME 으로 이동

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

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
  const onClickLogin = async(e) => {
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
      if(res.data === true) {
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

  return(
    <div className="Login-Container">
        <div className="Login-box1">

          {/* <div className="Login-card-logo">
            <img src={logo} alt="logo" />
          </div> */}

          <div className="Login-Main-font">
            <h1 >MBTISOUR</h1>
            <p>로그인을 해주세요!</p>
          </div>

          {/* <form action="" className="Login-card-form"> */}

          {/* 아이디 */}
            <div className="Login-Id">
              <input className="Login-input" type="text" placeholder="Enter ID" value={id} onChange={onChangeId} required />
            </div>

          {/* 비밀번호 */}
            <div className="Login-PW">
              <input className="Login-input" type="password" placeholder="Enter Password" value ={pwd} onChange={onChangePwd} />
            </div>
            <motion.div
      className="Login-botton"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
    ><button className="Login-botton"type="submit" onClick={onClickLogin}>Login</button></motion.div>


            <div className="Login-findId">
              <a href="/FindInfo">아이디/비밀번호 찾기</a>
            </div>

          <div className="Login-card-footer">
            가입하고 친구를 만들어봐요! <p><a href="/signup">회원가입</a></p>
          </div>


        <div className="Login-card-social">

          <div className="Login-card-social-btns">
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
              </svg>
            </a>

            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
              </svg>
            </a>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Login;
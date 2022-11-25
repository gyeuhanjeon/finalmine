

function Logout() {
    // 로그아웃 by 조혜경 (수정 필요할 수도 있음)
    const onClickLogout = () => {
        const currentId = window.localStorage.getItem("userId");
        const currentPw = window.localStorage.getItem("userPw");
    
        console.log("\n\n현재 localStorage 에 저장된 ID : " + currentId);
        console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + currentPw);
  
        const logoutID = window.localStorage.setItem("userId", "");
        const logoutPW =window.localStorage.setItem("userPw", "");
        window.localStorage.setItem("isLogin", "FALSE");
        
        console.log("로그아웃 ID : " + logoutID)
        console.log("로그아웃 PW : " + logoutPW)
        alert("콘솔 확인용");
        window.location.replace("/");
      }




    return(
        <button type="button" class="btn btn-outline-info" onClick={onClickLogout}>로그아웃</button>
    );
}

export default Logout;

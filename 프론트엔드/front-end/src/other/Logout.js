import Cookies from 'universal-cookie';

function Logout() {

    const cookies = new Cookies();

    // 로그아웃 by 조혜경 (수정 필요할 수도 있음)
    const onClickLogout = () => {
        //     const currentId = window.localStorage.getItem("userId");
        //     const currentPw = window.localStorage.getItem("userPw");
        const localId = cookies.get('rememberId');


        console.log("\n\n현재 localStorage 에 저장된 ID : " + localId);
        // console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + currentPw);

        // const logoutID = window.localStorage.setItem("userId", "");
        // const logoutPW = window.localStorage.setItem("userPw", "");
        window.localStorage.setItem("isLogin", "FALSE");

        const logoutID = cookies.remove('rememberId');

        console.log("로그아웃 ID : " + logoutID)


        alert("콘솔 확인용");
        window.location.replace("/");
    }




    return (
        <button type="button" class="btn btn-outline-info" onClick={onClickLogout}>로그아웃</button>
    );
}


export default Logout;

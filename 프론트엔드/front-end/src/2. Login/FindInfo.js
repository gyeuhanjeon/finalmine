import React, { useState } from 'react';
import styled from 'styled-components';
import TeamAPI from '../0. API/TeamAPI';
import FindInfoModal from './FindInfoModal';
import EmailModal from './EmailModal';
import ChangePwdModal from '../99. Modal/ChangePwdModal';

const Find_Container = styled.div`
    width:500px;
    border: 1px solid black;
    position: relative;
    margin: 15vh auto;
    height: 70vh;
    box-sizing: border-box;
`
const Select_Mode = styled.span`
    width:250px;
    border: 1px solid black;
    border-top: none;
    border-right: none;
    border-left: none;
    position: absolute;
    height: 10vh;
    &>p{
        margin-top: 30px;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const Select_Mode2 = styled.span`
    width:250px;
    border: 1px solid black;
    border-top: none;
    border-right: none;
    position: absolute;
    height: 10vh;
    left:250px;
    &>p{
        margin-top: 30px;
        font-size: 25px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Input_Container = styled.div`
    margin-top: 200px;
    
`

const Input = styled.input`
    width:350px;
    position: relative;
    left: 75px;
    margin: 0 auto;
`



const FindInfo = () => {

    const regexName = /^[ㄱ-ㅎ가-힣]{2,20}$/;
    const regexId = /^\w{5,20}$/;
    const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);


    const [getId, setGetId] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [name, setName] = useState('');
    const [inputPwd, setInputPwd] = useState('');
    const [nickname, setNickname] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [gender, setGender] = useState('');
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [url,setUrl] = useState("");
    const [mbti,setMbti] = useState("");



    const [isName, setIsName] = useState(false);
    const [isId, setIsId] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isBirth, setIsBirth] = useState(false);


    const [showReqName, setShowReqName] = useState(false);
    const [showReqId, setShowReqId] = useState(false);
    const [showReqEmail, setShowReqEmail] = useState(false);

    const [findDate, setFindDate] = useState(false);

    const reqName = "이름을 정확히 입력하세요."
    const reqId = "아이디를 입력하세요."
    const reqEmail = "이메일을 정확히 입력하세요."


    const regexPw = /^\w{8,20}$/;


    const [pwd, setPwd] = useState('');
    const [pwdcheck, setPwdcheck] = useState('');
    const [changePwdModalOpen, setChangePwdModalOpen] = useState(false);




    /* 비밀번호 저장 */
    const getPwd = (pwd) => { setPwd(pwd); }
    const openChangePwdModal = () => { setChangePwdModalOpen(true); };
    const closeChangePwdModal = () => { setChangePwdModalOpen(false); };
    const onSavePwd = async (e) => {
        console.log("변경한 pwd :" + pwd);
        console.log("변경한 e :" + e);

        // e.preventDefault();

        try {
            const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
            console.log("id : " + id);
            console.log("password : " + pwd);
            console.log("nickname : " + nickname);
            console.log("introduce : " + introduce);
            console.log("email : " + email);
            console.log("region1 : " + region1);
            console.log("region2 : " + region2);

            if (response.status == 200) {
                console.log("통신 성공(200)");
                console.log("\n>> 비밀번호 수정 완료");
                alert("비밀번호 수정 완료!!");
                window.location.replace('/login');
            }
        } catch (e) { console.log(e); }

    }


    const onChangeName = e => {
        let temp_name = e.target.value;
        setName(temp_name);
        if (temp_name === '' || !regexName.test(temp_name)) {
            setIsName(false);
            setShowReqName(true); //이름을 정확히 입력하세요.
        } else {
            setIsId(true);
            setShowReqName(false);
        }
    }
    const onChangeId = e => {
        let temp_id = e.target.value;
        setId(temp_id);
        if (temp_id === '' || !regexId.test(temp_id)) {
            setIsId(false);
            setShowReqId(true); // 아이디을 정확히 입력하세요.
        } else {
            setIsId(true);
            setShowReqId(false); // 아이디을 정확히 입력하세요.
        }
    }
    const onChangeEmail = e => {
        let temp_email = e.target.value;
        setEmail(temp_email);
        if (temp_email === '' || !regexEmail.test(temp_email)) {
            setIsEmail(false);
            setShowReqEmail(true); // 이메일을 정확히 입력하세요.
        } else {
            setIsEmail(true);
            setShowReqEmail(false);
        }
    }
    const onChangeBirth = e => {
        let temp_birth = e.target.value;
        setBirth(temp_birth);
        if (temp_birth !== null) {
            setIsBirth(true);
        }
    }




    const [states, setStates] = useState({
        mode: 'findId',
    });

    function changeMode(mode) {
        setStates({ ...states, ['mode']: mode })
    }

    const onClickFindPwd = async (e) => {

        console.log("\n\n비밀번호 찾기 버튼을 눌렀어요");
        console.log("isId : " + isId);
        console.log("isBirth : " + isBirth);
        console.log("isEmail : " + isEmail);
        try {

            const findPwd = await TeamAPI.findPwd(id, email, birth);


            console.log(findPwd.data);

            if (findPwd.status === 200) {
                alert("입력 정보가 맞습니다.");
                console.log("입력 정보가 맞습니다.");
                setFindDate(true);
                setIsBirth(false);
                setName(findPwd.data.name);
                setId(findPwd.data.id);
                setBirth(findPwd.data.birth);
                setGender(findPwd.data.gender);
                setPwd(findPwd.data.pwd);
                setNickname(findPwd.data.nickname);
                setIntroduce(findPwd.data.introduce);
                setEmail(findPwd.data.email);
                setRegion1(findPwd.data.region1);
                setRegion2(findPwd.data.region2);
                setUrl(findPwd.data.face);
                setMbti(findPwd.data.mbti);
            } else {
                setId("");
                setEmail("");
                setBirth("");
                console.log('일치하지 않는 정보입니다.');
                alert('일치하지 않는 정보입니다.');
            }


        } catch (e) {
            console.log(e);
        }
    };
    /*이메일 인증*/
    const onClickEmailAdress = async (e) => {
        e.preventDefault();
        console.log("\n\nemail 인증 버튼을 눌렀어요");
        try {
            const changeResult = await TeamAPI.emailCheck(email);
            console.log("emailResult.data : " + changeResult.data);
            console.log("emailResult.status : " + changeResult.status);
            if (changeResult.status === 200) {
                setOpen(true);
                setEmail(email);
            } else {
                setEmail("");
            }
        } catch (e) {
            console.log(e);
        }
    }


    const onClickFindId = async (e) => {

        console.log("\n\n아이디 찾기 버튼을 눌렀어요");
        console.log("isName : " + isName);
        console.log("isBirth : " + isBirth);
        console.log("isEmail : " + isEmail);
        try {
            if (isId && isEmail && isBirth) {
                const findId = await TeamAPI.findId(name, email, birth);


                console.log(findId.data);

                if (findId.status === 200) {
                    // alert(findId.data.id);
                    console.log("입력 정보가 맞습니다.");
                    setGetId(findId.data.id);
                    setOpen(true);

                } else {
                    setId("");
                    setEmail("");
                    setBirth("");
                    console.log('일치하지 않는 정보입니다.');
                    alert('일치하지 않는 정보입니다.');
                }

            } else {
                console.log("잘못 입력한 값이 있거나 입력되지 않은 값이 있어요.");
                alert('입력된 값을 확인하세요.');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>

            {/* mode 가 main 일 때 */}
            {states.mode === 'findId'
                ?
                <Find_Container>
                    <Select_Mode>
                        <p>아이디 찾기</p>
                    </Select_Mode>
                    <Select_Mode2 onClick={() => changeMode('findPwd')}>
                        <p>비밀번호 찾기</p>
                    </Select_Mode2>
                    <Input_Container>
                        <FindInfoModal open={open} modalName={getId} onHide={() => setOpen(false)} />
                        <form>
                            <div>
                                <label>이름</label>
                                <Input type="text" placeholder="이름" value={name} onChange={onChangeName} required />
                                <p>{showReqName && reqName}</p>
                            </div>
                            <div>
                                <label>이메일</label>
                                <Input type="text" placeholder="이메일" value={email} onChange={onChangeEmail} required />
                                <p>{showReqEmail && reqEmail}</p>
                            </div>
                            <div>
                                <label>생년월일</label>
                                <Input type="date" value={birth} onChange={onChangeBirth} />
                            </div>
                        </form>
                        <button onClick={onClickFindId}>아이디 찾기</button>
                    </Input_Container>
                </Find_Container>
                : null
            }

            {states.mode === 'findPwd'
                ?
                <Find_Container>
                    <Select_Mode onClick={() => changeMode('findId')}>
                        <p>아이디 찾기</p>
                    </Select_Mode>
                    <Select_Mode2>
                        <p>비밀번호 찾기</p>
                    </Select_Mode2>
                    <Input_Container>
                        <form>
                            <EmailModal open={open} modalName={email} modalContent={() => setChangePwdModalOpen(true)} onHide={() => setOpen(false)} />
                            <ChangePwdModal open={changePwdModalOpen} close={closeChangePwdModal} getPwd={getPwd} onSavePwd={onSavePwd}></ChangePwdModal>
                            <div>
                                <label >아이디</label>
                                <Input type="text" placeholder="아이디" value={id} onChange={onChangeId} required />
                                <p>{showReqId && reqId}</p>
                            </div>
                            <div>
                                <label>이메일</label>
                                <Input type="text" placeholder="이메일" value={email} onChange={onChangeEmail} disabled={findDate ? true : false} />
                                {findDate && <button onClick={onClickEmailAdress}>이메일 인증</button>}
                                <p>{showReqEmail && reqEmail}</p>
                            </div>
                            <div>
                                <label>생년월일</label>
                                <Input type="date" value={birth} onChange={onChangeBirth} />
                            </div>
                        </form>
                        {isId && isEmail && isBirth && <button onClick={onClickFindPwd}>정보 조회 하기</button>}

                    </Input_Container>
                </Find_Container>
                : null
            }

        </div>

    )





}

export default FindInfo;
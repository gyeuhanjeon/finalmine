import React, { useState } from 'react';
import styled from 'styled-components';
import TeamAPI from '../0. API/TeamAPI';


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

    const regexId = /^\w{5,20}$/;
    const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;


    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const [isId, setIsId] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isBirth, setIsBirth] = useState(false);


    const [showReqId, setShowReqId] = useState(false);
    const [showReqEmail, setShowReqEmail] = useState(false);

    const reqId = "아이디를 입력하세요."
    const reqEmail = "이메일을 정확히 입력하세요."


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
            setShowReqEmail(false); // 이메일을 정확히 입력하세요.
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
            if (isId && isEmail && isBirth) {
                const findPwd = await TeamAPI.findPwd(id, email, birth);

                
                console.log(findPwd.data);
                
                if (findPwd.data === true) {
                    alert("입력 정보가 맞습니다.");
                    console.log("입력 정보가 맞습니다.");
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


    const onClickFindId = async (e) => {

        console.log("\n\n아이디 찾기 버튼을 눌렀어요");
        console.log("isBirth : " + isBirth);
        console.log("isEmail : " + isEmail);
        try {
            if (isEmail && isBirth) {
                const findId = await TeamAPI.findId(email, birth);

                
                console.log(findId.data);
                
                if (findId.status === 200) {
                    alert(findId.data.id);
                    console.log("입력 정보가 맞습니다.");
                    
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
                        <form>
                            <div>
                                <span>이메일</span>
                                <Input type="text" className='Input-Name' placeholder="이메일" value={email} onChange={onChangeEmail} required />
                                <p>{showReqEmail && reqEmail}</p>

                            </div>
                            <div>
                                <span>생년월일</span>
                                <Input type="date" value={birth} onChange={onChangeBirth} />
                            </div>
                        </form>
                        <button onClick={onClickFindId}>아이디 찾기</button>
                    </Input_Container>
                </Find_Container>
                : null
            }

            {/* mode 가 quiz 일 때 */}
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
                            <div>
                                <span >아이디</span>
                                <Input type="text" className='Input-ID' placeholder="아이디" value={id} onChange={onChangeId} required />
                                <p>{showReqId && reqId}</p>

                            </div>
                            <div>
                                <span>이메일</span>
                                <Input type="text" className='Input-Name' placeholder="이메일" value={email} onChange={onChangeEmail} required />
                                <p>{showReqEmail && reqEmail}</p>

                            </div>
                            <div>
                                <span>생년월일</span>
                                <Input type="date" value={birth} onChange={onChangeBirth} />
                            </div>
                        </form>
                        <button onClick={onClickFindPwd}>비밀번호 찾기</button>
                    </Input_Container>
                </Find_Container>
                : null
            }

        </div>

    )





}

export default FindInfo;
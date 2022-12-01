import React, { useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import './EmailModal.css';

const ChangePwdModal = ({ open2, show, onHide, modalName, modalContent }) => {

    const regexPw = /^\w{8,20}$/;


    const [pwd, setPwd] = useState('');
    const [pwdcheck, setPwdcheck] = useState('');

    const [isPwd, setIsPwd] = useState(false);
    const [isPwdcheck, setIsPwdcheck] = useState(false);

    const acceptPwd = "사용 가능한 비밀번호입니다."
    const errorPwdcheck = "비밀번호가 일치하지 않습니다."
    const acceptPwdcheck = "비밀번호가 일치합니다."

    const [showGuidePwd, setShowGuidePwd] = useState(false);
    const [showAcceptPwd, setShowAcceptPwd] = useState(false);
    const [showErrorPwdcheck, setShowErrorPwdcheck] = useState(false);
    const [showAcceptPwdcheck, setShowAcceptPwdcheck] = useState(false);
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
    const onClickClose = () => {
        onHide();
    }

    const onClickPwdChange = async () => {
        console.log("비밀번호 변경 버튼을 눌렀어요");
        console.log(pwd);
        console.log(pwdcheck);
        if (setIsPwd&&setIsPwdcheck) {
            const emailConfirm = await TeamAPI.emailCode(pwd);
            console.log(emailConfirm);
            alert("코드 보내기 성공!!");
            if (emailConfirm.data === 1) {
                alert("인증이 완료되었습니다.")
                modalContent();
                onHide();
            } else {
                alert("인증코드가 일치하지 않습니다. 다시 입력해주세요.");
                setPwd("");
                setPwdcheck("");
            }
        } else {
            console.log("\n\n 비밀번호를 제대로 입력해주세요.");
            alert("비밀번호 양식과 비밀번호 확인과 일치시켜주세요...^^");
        }
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open2 ? 'openModal modal' : 'modal'}>

            {open2 ? (<section>
                <header>
                    {"이메일 인증"}
                    <button className="close" onClick={onClickClose}>
                        &times;
                    </button>
                </header>
                <main>
                    <form>
                        <div>
                            <label>비밀 번호</label>
                            <input placeholder="비밀번호를 입력해주세요" value={pwd} onChange={onChangePassword} required></input>
                        </div>
                        <div>
                            <label>비밀번호 확인</label>
                            <input placeholder="비밀번호를 다시 입력해주세요." value={pwdcheck} onChange={onChangePassword_check} required ></input>
                        </div>
                    </form>
                </main>
                <footer>
                    <button onClick={onClickPwdChange}>
                        변경하기
                    </button>
                    <button className="close" onClick={onClickClose}>
                        close
                    </button>
                </footer>
            </section>
            ) : null}
        </div>
    )
}

export default ChangePwdModal;

import React, { useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailModal = ({ show, onHide, modalName, modalContent }) => {
    const [code, setCode] = useState("");
    const [signUpModalOn, setSignUpModalOn] = useState(false);

    const onChangeCode = e => {
        setCode(e.target.value);
    };

    const onClickReply = async () => {
        console.log("답장하기 버튼 눌렀어요.");
        console.log(code);
        if (code !== null) {
            const emailConfirm = await TeamAPI.emailCode(code);
            console.log(emailConfirm);
            alert("코드 보내기 성공!!");
            if(emailConfirm.data===1){
                alert("인증이 완료되었습니다.")
                modalContent();
                onHide();            
            }else{
                alert("인증코드가 일치하지 않습니다. 다시 입력해주세요.");
                setCode("");
            }
        } else {
            console.log("\n\n!!코드내용없음!!");
            alert("코드정보를 넣어주세요..^^");
        }
        /* 탈퇴한 회원이라면 */
    }



    return (
        <Modal
            // {...props}
            show={show} // 추가
            onHide={onHide} // 추가
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    이메일 인증
                </Modal.Title>
            </Modal.Header>

            {/* Modal.Body 의 내용이에요^^ */}
            <Modal.Body>

                <Form.Group className="mb-3">
                    <Form.Label>인증받을 이메일</Form.Label>
                    <Form.Control placeholder={modalName} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>인증 코드 입력 창</Form.Label>
                    <Form.Control type="text" placeholder="인증코드를 입력해주세요" value={code} onChange={onChangeCode} required />
                </Form.Group>

            </Modal.Body>

            {/* Modal.Footer 의 내용이에요^^ */}
            <Modal.Footer>
                <Button variant="primary" type="button" onClick={onClickReply}>
                    인증하기
                </Button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EmailModal;
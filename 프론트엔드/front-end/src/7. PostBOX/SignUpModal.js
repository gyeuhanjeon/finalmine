import React, {useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";  // yarn add react-bootstrap bootstrap 실행
import TeamAPI from '../../api/TeamAPI'
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpModal = ( { show, onHide, modalName, modalContent }) => {
  const [signUpModalOn, setSignUpModalOn] = useState(false);
  const localId = window.localStorage.getItem("userId");
  let sendMessage;

  const onClickReply = async() => {
    console.log("답장하기 버튼 눌렀어요.");

    try {
      const isMember = await TeamAPI.memberRegCheck(modalName);
      console.log(modalName + "이 현재 존재하는 회원인지 확인이 필요합니다.");
      console.log("isMember.data.result : " + isMember.data);

      if(isMember.data === true) {
        console.log("쪽지를 보낼 수 있습니다.");
        sendMessage = prompt("쪽지 내용을 작성하세요.", "");

        if(sendMessage !== null) {
          const messageReg = await TeamAPI.messageReg(localId, modalName, sendMessage);
          console.log("\n\n보내는 사람(localId) : " + localId);
          console.log("받는 사람(modalName) : " + modalName);
          console.log("쪽지 내용(sendMessage) : " + sendMessage);
          alert("쪽지 보내기 성공!!");
        } else {
          console.log("\n\n!!쪽지 내용 없음!!");
          alert("쪽지 내용을 작성하셔야죠..^^");
        } 
      /* 탈퇴한 회원이라면 */  
      } else {
        alert("존재하지 않는(탈퇴한) 회원입니다.");
        alert("쪽지를 삭제하시겠습니까? (구현하면 좋을 듯)");
        console.log("쪽지를 보낼 수 없습니다.");
      }
    } catch (e) {
      console.log(e);
    }
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
          Modal heading
        </Modal.Title>
      </Modal.Header>

    {/* Modal.Body 의 내용이에요^^ */}
      <Modal.Body>

        <Form.Group className="mb-3">
          <Form.Label>보낸 사람</Form.Label>
          <Form.Control placeholder={modalName} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>쪽지내용</Form.Label>
          <Form.Control placeholder={modalContent} disabled />
        </Form.Group>

      </Modal.Body>

    {/* Modal.Footer 의 내용이에요^^ */}
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={onClickReply}>
          답장하기
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
import React from 'react';
import './MyPageModal.css';

export const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  console.log("\n>> 모달창이 열렸어요.");
  console.log("넘겨받은 props(open) : " + open);
  console.log("넘겨받은 props(close) : " + close);
  console.log("넘겨받은 props(header) : " + header);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>

        {/* header 영역 */}
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

        {/* main 영역 */}
          <main>
            <div className="Modal-Form-item">
              <label className="form-label"> 현재 비밀번호</label>
              <input type="text" className="Modal-Form-control"/>
            </div>
            <div className="Modal-Form-item">
              <label className="form-label"> 새로운 비밀번호</label>
              <input type="text" className="Modal-Form-control"/>
            </div>
            <div className="Modal-Form-item">
              <label className="form-label"> 새로운 비밀번호 확인</label>
              <input type="text" className="Modal-Form-control"/>
            </div>
          </main>

        {/* footer 영역 */}
          <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            <button className="close" onClick={close}>
              변경
            </button>
          </footer>

        </section>
      ) : null}
    </div>
  );
};


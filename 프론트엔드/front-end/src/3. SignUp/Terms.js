import React from 'react'
import { useState, useEffect } from 'react';

const Terms = (props) => {

  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);
  
  const [checkedAll, setCheckedAll] = useState(false);
  // ▼ 체크된 쪽지를 담을 배열
  // const [checkedItems, setCheckedItems] = useState([]);
  
  // const [termsList, setTermsList] = useState([
  //   {termNum: 1, title: "[필수] 아이셔계정 약관", isCheck: false},
  //   {termNum: 2, title: "[선택] 프로모션 정보 수신 동의(선택)", isCheck: false}
  //   // {termNum: 3, title: "[선택] 수신 동의(선택)", isCheck: false}
  // ]);



  const essential = () => {
    return (
      <p>
        전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.
        <br />
        선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
      </p>
    );
  }

  useEffect(() => {
    console.log("\n\nuseEffect 왔어요!!!");
    if(isCheck1 && isCheck2) setCheckedAll(true);
    else setCheckedAll(false);

  }, [isCheck1, isCheck2]);

  /* 
  체크박스 단일 선택 */ 
  const handleSingleCheck1 = (e) => {
    let isSingleCheck1 = e.target.checked;
    console.log("1번 약관에 동의했나요? : " + isSingleCheck1);


    if (isSingleCheck1) {
      // setCheckedItems(fix => [...fix, termNum]); // 체크된 쪽지 번호를 checkedItems 배열에 추가
      setIsCheck1(true);
    } else {
      setIsCheck1(false);
      // setCheckedItems(checkedItems.filter((e) => e !== termNum)); // 체크된 쪽지 번호를 checkedPosts 배열에서 삭제
    }
  };
  const handleSingleCheck2 = (e) => {
    let isSingleCheck2 = e.target.checked;
    console.log("2번 약관에 동의했나요? : " + isSingleCheck2);


    if (isSingleCheck2) {
      // setCheckedItems(fix => [...fix, termNum]); // 체크된 쪽지 번호를 checkedItems 배열에 추가
      setIsCheck2(true);
    } else {
      setIsCheck2(false);
      // setCheckedItems(checkedItems.filter((e) => e !== termNum)); // 체크된 쪽지 번호를 checkedPosts 배열에서 삭제
    }
  };

  /* 
  체크박스 전체 선택 */ 
  const handleAllCheck = (e) => {
    let isAllCheck = e.target.checked;
    console.log("전체 선택 되었나요? : " + isAllCheck);
    setCheckedAll(isAllCheck);
    
    if(isAllCheck) {
      // const termNumsArray = []; // termNum 을 담을 빈 배열(termNumsArray) 생성
      // termsList.forEach((e) => termNumsArray.push(e.termNum)); // termsList 를 하나씩 돌면서 termNumsArray 에 termNum 추가
      // setCheckedItems(termNumsArray);
      // console.log("termNumsArray : " + termNumsArray); // 모든 쪽지의 termNum 을 담은 배열로 checkedItems 상태 업데이트
      // console.log("checkedItems : " + checkedItems);
      setCheckedAll(true);
      setIsCheck1(true);
      setIsCheck2(true);
    }
    else {
      // setCheckedItems([]); // checkedItems 를 빈 배열로 상태 업데이트
      setCheckedAll(false);
      setIsCheck1(false);
      setIsCheck2(false);
    }
  }


  return (
    <>
    <form>
      <div >
        <div aria-checked='false' role="checkbox"
          // ▼ checked 는 true 또는 false
          onChange={(e) => handleAllCheck(e)}
          // ▼ 전체 약관 수와 체크된 약관의 수가 다르면 false(전체 선택 해제)
          // checked={checkedItems.length === termsList.length ? true : false}>
          checked={checkedAll}>
          <input type="checkbox" id="checkbox-check_all" ></input>
          <label for="checkbox-check_all">
            <span>모두 동의합니다.</span>
          </label>
        </div>
        {/* <essential /> */}
      </div>


      
      
        <div role="checkbox" onChange={handleSingleCheck1}
                    // ▼ checkedItems 에 해당 쪽지의 postNum 이 있으면 true, 아니면 false
                    checked={isCheck1}>
          <input type="checkbox" id="check1"></input>
          <label for="check1">
            <span>[필수] 아이셔계정 약관</span>
          </label>
        </div>
        <a href='/'>
          <span>화살표 아이콘 들어갈 자리</span>
        </a>

        <div role="checkbox" onChange={handleSingleCheck2}
                    // ▼ checkedItems 에 해당 쪽지의 postNum 이 있으면 true, 아니면 false
                    checked={isCheck2}>
          <input type="checkbox" id="check1"></input>
          <label for="check1">
            <span>[선택] 프로모션 정보 수신 동의(선택)</span>
          </label>
        </div>
        <a href='/'>
          <span>화살표 아이콘 들어갈 자리</span>
        </a>
   


      <button>동의하고 가입하기</button>



    </form>
    </>
  )
}

export default Terms;

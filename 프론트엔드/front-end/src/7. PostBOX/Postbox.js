
import { useState, useEffect } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import SignUpModal from './SignUpModal';
import yong from '../images/아이셔용.png';


const Postbox = () => {
  const localId = window.localStorage.getItem("userId");

/* 변수(useState) 선언 */
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  // ▼ 체크된 쪽지를 담을 배열
  const [checkedPosts, setCheckedPosts] = useState([]);
  const [postSender, setPostSender] = useState("");
  const [content, setContent] = useState("");
  const [postModalOn, setPostModalOn] = useState(false);

  /* 
  최초 통신(useEffect) */
  useEffect(() => {
    const postData = async () => {
      setLoading(true);

      try {
        const response = await TeamAPI.postbox(localId);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          setPostList(response.data);
          // console.log("보낸 사람[0] : " + response.data[0].postSender);
          // console.log("내용[0] : " + response.data[0].content);
          // console.log("시간[0] : " + response.data[0].postTime);
        }
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };
    postData();
  }, []);

  /* 
  쪽지 자세히 보기 */
  const onClickPost = (postSender, content) => {
    console.log("보낸 사람(postSender) : " + postSender);
    setPostSender(postSender);

    console.log("내용(content) : " + content);
    setContent(content);

    setPostModalOn(true);
  }

  /* 
  체크박스 단일 선택 */ 
  const handleSingleCheck = (checked, num) => {
    console.log(num + "번 쪽지가 선택 되었나요? : " + checked);
    
    if (checked) {
      setCheckedPosts(fix => [...fix, num]); // 체크된 쪽지 번호를 checkedPosts 배열에 추가
      console.log("checkedPosts : " + checkedPosts.toString());
    } else {
      setCheckedPosts(checkedPosts.filter((e) => e !== num)); // 체크된 쪽지 번호를 checkedPosts 배열에서 삭제
      console.log("checkedPosts : " + checkedPosts.toString());
    }
  };

  /* 
  체크박스 전체 선택 */ 
  const handleAllCheck = (checked) => {
    console.log("전체 선택 되었나요? : " + checked);

    if(checked) {
      const postNumArray = []; // postNum 을 담을 빈 배열(postNumArray) 생성
      postList.forEach((e) => postNumArray.push(e.postNum)); // postList 를 하나씩 돌면서 postNumArray에 postNum을 추가
      console.log("postNumArray : " + postNumArray); // 모든 쪽지의 postNum 을 담은 배열로 checkedPosts 상태 업데이트
      setCheckedPosts(postNumArray);
    }
    else {
      setCheckedPosts([]); // checkedPosts 를 빈 배열로 상태 업데이트
    }
  }

  /* 
  쪽지 삭제 */
  const onClickDelete = async () => {
    console.log("\n\n삭제 버튼 눌렀어요.");

    console.log("checkedPosts : " + checkedPosts); // 5,6
    console.log("typeof(checkedPosts) : " + typeof(checkedPosts));

    if(checkedPosts.length < 1) {
      alert('삭제할 쪽지를 선택해주세요~^^');
    } else {
      try {
        const response = await TeamAPI.postDelete(checkedPosts);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          alert("선택한 쪽지가 삭제되었습니다.");
          window.location.reload();
        } else {
          console.log("통신 실패 : " + response.status);
          alert("통신 실패 : " + response.status);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  if (loading) { 
    return (
    <>
      <img src={yong} alt="아이셔용"/>
      <div>대기 중...</div> 
    </>
    );
  }

  return (
    <>
      <SignUpModal modalName={postSender} modalContent={content} show={postModalOn} onHide={() => setPostModalOn(false)} />
      <div className='Post-Container'>
        <div>Post Box</div>
        <button onClick={onClickDelete}>삭제</button>

        <table className='tableContainer'>
        {/* thead 의 시작 */}
          <thead>
            <tr>
              <th>
                <input type='checkbox'
                  // ▼ checked 는 true 또는 false
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  // ▼ 전체 쪽지 수와 체크된 쪽지의 수가 다르면 false(전체 선택 해제)
                  checked={checkedPosts.length === postList.length ? true : false} />
              </th>
              <th>보낸 사람(NAME)</th>
              <th>내용(CONTENT)</th>
              <th>시간(DATETIME)</th>
            </tr>
          </thead>
        {/* tbody 의 시작 */}
          <tbody>
            {postList?.map(post => (
            <tr key={post.postTime}>
              <td>
                <input type='checkbox' 
                  onChange={(e) => handleSingleCheck(e.target.checked, post.postNum)}
                  // ▼ checkedPosts 에 해당 쪽지의 postNum 이 있으면 true, 아니면 false
                  checked={checkedPosts.includes(post.postNum) ? true : false} />
              </td>
              <td>{post.postSender}</td>
              <td onClick={() => onClickPost(post.postSender, post.content)}>{post.content}</td>
              <td>{post.postTime}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Postbox;
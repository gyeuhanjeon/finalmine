import '../8.Matching/Matching.css'
import '../font/Jalnan.ttf';

/*아직 해야할 일들*/
/*1. 화면 비율별 UI개선 해야함
  2. Navber 연결 필요
  3. 전체적인 UI개선 */

function Matching2 () {
    return (
      <div className="Matching_Container">
        <div className='warp_main_body'>
          <div className='warp_body_Mainfont'>
            <p>나는 이런 사람과 어울려요!</p>
          </div>
          <div className='warp_body'>
            <div className='warp_body1'>
            내 MBTI프로필
            <div className='warp_body1_img'>
            <img className='' src=""/>
            </div>
              <div className='warp_body1_introduce'>
                안녕
              </div>
            </div>
              <div className='warp_body2'>
              상대 MBTI프로필
                <div className='warp_body2_img'>
                <img className='' src=""/>
                </div>
                  <div className='warp_body2_introduce'>
                  안녕하세요 27살 이동균 입니다. 사는곳은 양재고요 주변에 친구를 만들고 싶습니다.
                  </div>
                    <div className='warp_goodbutton'>
                      <button className='warp_goodbutton_padding'>좋아요</button>
                      <button className='warp_goodbutton_padding'>쪽지</button>
                      <button className='warp_goodbutton_padding'>채팅</button>
                    </div>
              </div>
                    <div className='warp_body3'>
                    상대2 MBTI프로필
                      <div className='warp_body3_img'>
                      <img className='' src=""/>
                      </div>
                        <div className='warp_body3_introduce'>
                        안녕하세요 23살 이동규 입니다 사는곳은 사당이고 주변에 간단하게 맥주 한잔 할 친구를 만들고 싶습니다.
                      </div>
                      <div className='warp_goodbutton'>
                      <button className='warp_goodbutton_padding'>좋아요</button>
                      <button className='warp_goodbutton_padding'>쪽지</button>
                      <button className='warp_goodbutton_padding'>채팅</button>
                    </div>
                 </div>
          </div>
      </div>
    </div>
  );
}
export default Matching2;
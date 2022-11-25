import { Link } from "react-router-dom";
import '../1. Main/Main.css'
import '../images/아이셔로고.png'
import Spinner from 'react-bootstrap/Spinner';
/* 보완 해야할 것 */
/* 1. 버튼 마우스 갖다대면 애니메이션 효과 주기 
   2. 전체적인 디자인 보완하기(검정은 그냥 만들어본것)
   3. 버튼을 잘 수정하자*/

function Main() {

    return(
        <div className="Main_Container">
            <div className="Main_title">
            <h4>MBTISOUR</h4>
            {/* <img src="../images/아이셔로고.png"></img> */}
            </div>
            <Spinner animation="border" role="status"> /*쳇바퀴*/
            <Link to="/login"><button className="Main-box-button2">START</button></Link>
    </Spinner>
            
        </div>
            )
        }
    export default Main;


import { Link } from "react-router-dom";
import '../1. Main/Main.css';
import '../images/아이셔용.png';
import { motion } from "framer-motion"
import { ScrollContainer, ScrollPage, batch, Fade,MoveOut, Sticky, Animator,FadeIn,ZoomIn,Move,StickyIn} from "react-scroll-motion"
/* 보완 해야할 것 */
/* 1. 버튼 마우스 갖다대면 애니메이션 효과 주기 
   2. 전체적인 디자인 보완하기(검정은 그냥 만들어본것)
   3. 버튼을 잘 수정하자 */

function Main () {
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());
    return(
        <div className="Main_Container">
            <div className="Main_title">
<ScrollContainer>
    <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -250))}>
            <span style={{ fontSize: "30px" }}>MBTISOUR</span>
        </Animator>
    </ScrollPage>
    <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -250))}>
            <span style={{ fontSize: "30px" }}> <strong><p>인간들은 제각각 성격이 다릅니다.</p></strong></span>
        </Animator>
    </ScrollPage>
    <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -250))}>
            <span className="Page3" style={{ fontSize: "30px" }}> <strong><p>그러기에 서로 존중하는 문화가 있어용</p></strong></span>
        </Animator>
    </ScrollPage>
    <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -250))}>
            <span className="Page3" style={{ fontSize: "30px" }}> <strong><p>무슨 말을 더 할까요? 어휘력이 부족합니다</p></strong></span>
        </Animator>
    </ScrollPage>
    <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -250))}>
            <span className="Page3" style={{ fontSize: "30px" }}> <strong><p>이런 분위기 어떤가요</p></strong></span>
        </Animator>
    </ScrollPage>
    <ScrollPage>
        <Animator animation={FadeUp}>
            <span style={{ fontSize: "40px" }}><motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link to="/login"><button className="Main-box-button2">START</button></Link>
                </motion.div></span>
        </Animator>
    </ScrollPage>
</ScrollContainer>
            {/* <h4 className="Main_font">MBTISOUR</h4>
            <strong><p>당신은 자신의 대해 얼마나 아십니까?</p></strong> */}
            {/* <img src="../images/아이셔로고.png"></img> */}
            {/* </div> */}
            {/* <motion.div
            className="box"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Link to="/login"><button className="Main-box-button2">START</button></Link>
                </motion.div> */}
    </div>
    </div>
    )
}
    export default Main;
    

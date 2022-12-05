import styled from 'styled-components';
import { useEffect, useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import 논리술사 from '../images/논리술사.png';
import 통솔자 from '../images/통솔자.png';
import 변론가 from '../images/변론가.png';
import 옹호자 from '../images/옹호자.png';
import 중재자 from '../images/중재자.png';
import 선도자 from '../images/선도자.png';
import 활동가 from '../images/활동가.png';
import 현실주의자 from '../images/현실주의자.png';
import 수호자 from '../images/수호자.png';
import 경영자 from '../images/경영자.png';
import 집정관 from '../images/집정관.png';
import 장인 from '../images/장인.png';
import 모험가 from '../images/모험가.png';
import 사업가 from '../images/사업가.png';
import 연예인 from '../images/연예인.png';
import Cookies from 'universal-cookie';



//스타일 컴포넌트

const Word1 = styled.div`
  position: relative;
  font-size: 25px;
  width:800px;
  height: 20px;
  top:230px;
  color:skyblue;

`;
const Word2 = styled.div`
  position: relative;
  font-size: 25px;
  width:800px;
  height: 20px;
  top:230px;
  color:orangered;

`;
const NumContainer = styled.div`
  font-size: 35px;
  font-weight: bold;
  text-align: center;
`;
const Num = styled.span`
  font-size: 0.8em;
  border-radius: 30px;
  background: #fef5d4;
  border: 0;
  display: inline-block;
  width: 200px;
  height: 50px;
  margin-bottom: 500px;
`;
const OXcontainer = styled.div`
    display: flex;
    margin : 0 auto;    
    width: 1080px;
    position: relative;
    left: 0;
    z-index: 1;
    bottom:500px;
    
`;
const O3 = styled.div`
    display: flex;  
    color: skyblue;
    width: 50%;
    height: 500px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 300px;
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;
const X3 = styled.div`
    display: flex;  
    color: orangered;
    width: 50%;
    height: 500px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 300px;
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;
const O2 = styled.div`
    display: flex;  
    color: skyblue;
    width: 50%;
    height: 500px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 180px;
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;
const X2 = styled.div`
    display: flex;  
    color: orangered;
    width: 50%;
    height: 500px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 180px;
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;
const O1 = styled.div`
    display: flex;  
    color: skyblue;
    width: 50%;
    height: 500px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 110px;
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;
const X1 = styled.div`
    display: flex;  
    color: orangered;
    width: 50%;
    height: 500px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 110px;
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;
const Recommend = styled.div`
  display: flex;
  width :800px;
  margin: 0 auto;
`;
const RecommendByOne = styled.div`
  &>img{
    width:200px;
  }
  &>p{
    font-size: 17px;
    text-align: center;
  }
  margin: 0 auto;
`;
const ResultContainer = styled.div`
  width :1080px;
  margin : 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;
const MyMbti = styled.div`
  width:320px;
  margin:0 380px;
  &>p{
    font-size: 30px;
    text-align: center;
  }
`
const StyledButton = styled.button`
  width:400px;
  margin: 50px 340px 0px 340px;
`
const RecommendWord = styled.div`
  color: orangered;
  font-weight: 900;
  font-size: 30px;
  position: relative;
  text-align:center;
`

//퀴즈 컴포넌트
const Quiz = (props) => {
  const cookies = new Cookies();

  const localId = cookies.get('rememberId');
  if (localId === "FALSE") window.location.replace("/");


  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
  const [EnI, setEnI] = useState(0);
  const [SnN, setSnN] = useState(0);
  const [TnF, setTnF] = useState(0);
  const [JnP, setJnP] = useState(0);



  const [testMBTI, setTestMBTI] = useState("");
  useEffect(() => {
    console.log(EnI);
    console.log(SnN);
    console.log(TnF);
    console.log(JnP);
  }, [EnI, SnN, TnF, JnP]);

  const answerNoList = {
    answer: ["I", "N", "F", "P"]
  };
  const answerYesList = {
    answer: ["E", "S", "T", "J"]
  };

  const RecommendWord2="내 유형과 잘맞는 단짝 유형"

  // 결과 페이지
  if (count === props.questionList.length) {
    if (testMBTI === "ISTJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={현실주의자}></img>
              <p>{"ISTJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={연예인}></img>
                <p>{'ESFP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ESTJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={경영자}></img>
              <p>{"ESTJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={논리술사}></img>
                <p>{'INTP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={모험가}></img>
                <p>{'ISFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={장인}></img>
                <p>{'ISTP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ESFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={집정관}></img>
              <p>{"ESFJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={모험가}></img>
                <p>{'ISFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={장인}></img>
                <p>{'ISTP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ISFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={수호자}></img>
              <p>{"ISFJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={연예인}></img>
                <p>{'ESFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={사업가}></img>
                <p>{'ESTP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ESTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={사업가}></img>
              <p>{"ESTP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={수호자}></img>
                <p>{'ISFJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ISTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={장인}></img>
              <p>{"ISTP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={집정관}></img>
                <p>{'ESFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={경영자}></img>
                <p>{'ESTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ESFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={연예인}></img>
              <p>{"ESFP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={수호자}></img>
                <p>{'ISFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={현실주의자}></img>
                <p>{'ISTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ISFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={모험가}></img>
              <p>{"ISFP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={집정관}></img>
                <p>{'ESFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={경영자}></img>
                <p>{'ESTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ENTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={변론가}></img>
              <p>{"ENTP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={옹호자}></img>
                <p>{'INFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={논리술사}></img>
                <p>{'INTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "INTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={논리술사}></img>
              <p>{"INTP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={통솔자}></img>
                <p>{'ENTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ENTJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={통솔자}></img>
              <p>{"ENTJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={옹호자}></img>
                <p>{'INFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={논리술사}></img>
                <p>{'INTP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "INTJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={논리술사}></img>
              <p>{"INTJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={활동가}></img>
                <p>{'ENFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={변론가}></img>
                <p>{'ENTP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ENFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={선도자}></img>
              <p>{"ENFJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={중재자}></img>
                <p>{'INFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={모험가}></img>
                <p>{'ISFP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "INFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={옹호자}></img>
              <p>{"INFJ"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={활동가}></img>
                <p>{'ENFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={변론가}></img>
                <p>{'ENTP'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ENFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={활동가}></img>
              <p>{"ENFP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={옹호자}></img>
                <p>{'INFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={논리술사}></img>
                <p>{'INTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "INFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <img src={중재자}></img>
              <p>{"INFP"}</p>
            </MyMbti>
            <RecommendWord>
              {RecommendWord2}
            </RecommendWord>
            <Recommend>
              <RecommendByOne>
                <img src={선도자}></img>
                <p>{'ENFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <img src={통솔자}></img>
                <p>{'ENTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <StyledButton>
              단짝 친구 찾으러 가기
            </StyledButton>
          </div>
        </ResultContainer>
      );
    }
  }


  //선택지
  function onClick3Yes1() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);

    console.log(index + ' ' + EnI)
    setEnI(EnI => EnI + 3.1);
    let current = EnI + 3.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동1-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동1-2');
    }
  }
  function onClick2Yes1() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);

    console.log(index + ' ' + EnI)
    setEnI(EnI => EnI + 2.1);
    let current = EnI + 2.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동1-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동1-2');
    }
  }
  function onClick1Yes1() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);

    console.log(index + ' ' + EnI)
    setEnI(EnI => EnI + 1.1);
    let current = EnI + 1.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동1-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동1-2');
    }
  }

  function onClick1No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI


    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 1.1);
    let current = EnI - 1.1;


    console.log(index + ' ' + EnI + ' ' + index2)

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동2-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동2-2');
    }
  }
  function onClick2No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI


    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 2.1);
    let current = EnI - 2.1;


    console.log(index + ' ' + EnI + ' ' + index2)

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동2-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동2-2');
    }
  }
  function onClick3No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI


    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 3.1);
    let current = EnI - 3.1;


    console.log(index + ' ' + EnI + ' ' + index2)

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동2-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동2-2');
    }
  }

  function onClick3Yes2() {

    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 3.1);
    let current = SnN + 3.1;



    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동3-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동3-2');
    }
  }
  function onClick2Yes2() {

    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 2.1);
    let current = SnN + 2.1;



    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동3-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동3-2');
    }
  }
  function onClick1Yes2() {

    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 1.1);
    let current = SnN + 1.1;



    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동3-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동3-2');
    }
  }

  function onClick1No2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 1.1);
    let current = SnN - 1.1;


    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동4-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동4-2');
    }
  }
  function onClick2No2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 2.1);
    let current = SnN - 2.1;


    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동4-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동4-2');
    }
  }
  function onClick3No2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 3.1);
    let current = SnN - 3.1;


    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동4-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동4-2');
    }
  }
  function onClick3Yes3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 3.1);
    let current = TnF + 3.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동5-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동5-2');
    }
  }
  function onClick2Yes3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 2.1);
    let current = TnF + 2.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동5-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동5-2');
    }
  }
  function onClick1Yes3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 1.1);
    let current = TnF + 1.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동5-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동5-2');
    }
  }

  function onClick1No3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 1.1);
    let current = TnF - 1.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동6-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동6-2');
    }

  }
  function onClick2No3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 2.1);
    let current = TnF - 2.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동6-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동6-2');
    }

  }
  function onClick3No3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 3.1);
    let current = TnF - 3.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동6-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동6-2');
    }

  }
  const onClick3Yes4 = async (e) => {
    let index = count2 / 5 - 1;


    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 3.1);
    let current = JnP + 3.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick2Yes4 = async (e) => {
    let index = count2 / 5 - 1;


    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 2.1);
    let current = JnP + 2.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick1Yes4 = async (e) => {
    let index = count2 / 5 - 1;


    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 1.1);
    let current = JnP + 1.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }

  const onClick1No4 = async (e) => {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 1.1);
    let current = JnP - 1.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick2No4 = async (e) => {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 2.1);
    let current = JnP - 2.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick3No4 = async (e) => {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 3.1);
    let current = JnP - 3.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }

  //문제 및 선택지 출력
  return (
    <div>
      {props.questionList.map((e, idx) => {
        if (count === idx && idx < 5) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <Word1>동의</Word1>
                  <O3><div onClick={onClick3Yes1}>{e.check_O}</div></O3>
                  <O2><div onClick={onClick2Yes1}>{e.check_O}</div></O2>
                  <O1><div onClick={onClick1Yes1}>{e.check_O}</div></O1>
                  <X1><div onClick={onClick1No1}>{e.check_O}</div></X1>
                  <X2><div onClick={onClick2No1}>{e.check_O}</div></X2>
                  <X3><div onClick={onClick3No1}>{e.check_O}</div></X3>
                  <Word2>비동의</Word2>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 10) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <Word1>동의</Word1>
                  <O3><div onClick={onClick3Yes2}>{e.check_O}</div></O3>
                  <O2><div onClick={onClick2Yes2}>{e.check_O}</div></O2>
                  <O1><div onClick={onClick1Yes2}>{e.check_O}</div></O1>
                  <X1><div onClick={onClick1No2}>{e.check_O}</div></X1>
                  <X2><div onClick={onClick2No2}>{e.check_O}</div></X2>
                  <X3><div onClick={onClick3No2}>{e.check_O}</div></X3>
                  <Word2>비동의</Word2>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 15) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <Word1>동의</Word1>
                  <O3><div onClick={onClick3Yes3}>{e.check_O}</div></O3>
                  <O2><div onClick={onClick2Yes3}>{e.check_O}</div></O2>
                  <O1><div onClick={onClick1Yes3}>{e.check_O}</div></O1>
                  <X1><div onClick={onClick1No3}>{e.check_O}</div></X1>
                  <X2><div onClick={onClick2No3}>{e.check_O}</div></X2>
                  <X3><div onClick={onClick3No3}>{e.check_O}</div></X3>
                  <Word2>비동의</Word2>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 20) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <Word1>동의</Word1>
                  <O3><div onClick={onClick3Yes4}>{e.check_O}</div></O3>
                  <O2><div onClick={onClick2Yes4}>{e.check_O}</div></O2>
                  <O1><div onClick={onClick1Yes4}>{e.check_O}</div></O1>
                  <X1><div onClick={onClick1No4}>{e.check_O}</div></X1>
                  <X2><div onClick={onClick2No4}>{e.check_O}</div></X2>
                  <X3><div onClick={onClick3No4}>{e.check_O}</div></X3>
                  <Word2>비동의</Word2>
                </OXcontainer>
              </NumContainer>
            </>
          );
        }
      })}

    </div>
  );
}

const MBTI = () => {

  const cookies = new Cookies();
  const localId = cookies.get('rememberId')  ;
  if (localId === "FALSE") window.location.replace("/login");

  const currentId = window.localStorage.getItem("userId");
  const currentPw = window.localStorage.getItem("userPw");

  console.log("\n\n현재 localStorage 에 저장된 ID : " + currentId);
  console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + currentPw);

  const [states, setStates] = useState({
    mode: 'start',
    questionList: [
      { question: "나는 사교적이며 활동적이다.", check_O: "O", check_X: "X" },
      { question: "나는 사람들과 함께 있을때 에너지를 얻는다.", check_O: "O", check_X: "X" },
      { question: "대인관계를 넓고 다양하게 유지하는 편이다.", check_O: "O", check_X: "X" },
      { question: "글보다는 말로 표현하는 것이 좋다.", check_O: "O", check_X: "X" },
      { question: "생각보다 행동이 앞선다.", check_O: "O", check_X: "X" },
      { question: "나는 오감에 의존한다.", check_O: "O", check_X: "X" },
      { question: "근거없는 예감을 믿지 않는다.", check_O: "O", check_X: "X" },
      { question: "미래에 대한 생각보다는 현재에 집중한다.", check_O: "O", check_X: "X" },
      { question: "간접 경험보다는 직접 행동으로 경험하는 것을 선호한다.", check_O: "O", check_X: "X" },
      { question: "본인이 명확함, 사실, 실용적 등의 단어와 어울린다.", check_O: "O", check_X: "X" },
      { question: "나는 분석적이고 논리적이다.", check_O: "O", check_X: "X" },
      { question: "나는 감정적인 호소 보다는 논리적인 호소에 설득이 잘된다.", check_O: "O", check_X: "X" },
      { question: "비교적 협력보다 경쟁을 통해 성장할 수 있다고 생각한다.", check_O: "O", check_X: "X" },
      { question: "나는 어떠한 일에 동정심을 느끼기 보다는 해결책을 제시한다.", check_O: "O", check_X: "X" },
      { question: "나의 논리적인 부분이 감정적인 부분을 컨트롤 할 수 있다.", check_O: "O", check_X: "X" },
      { question: "나는 철처하고 계획적이다", check_O: "O", check_X: "X" },
      { question: "나는 데이트를 할때 모든 계획을 세워두고 만나는 편이다.", check_O: "O", check_X: "X" },
      { question: "나는 선택의 여지를 주는것을 좋아하지 않는다.", check_O: "O", check_X: "X" },
      { question: "나는 머릿속에 늘 체크리스트를 가지고 다닌다.", check_O: "O", check_X: "X" },
      { question: "나는 당장의 흥미보다는 미래의 안정이 더 중요하다.", check_O: "O", check_X: "X" }
    ]
  });

  function changeMode(mode) {
    setStates({ ...states, ['mode']: mode })
  }

  return (
    <div>

      {/* mode 가 main 일 때 */}
      {states.mode === 'start'
        ?
        <div>
          {/* <img className='mbti-btn-img' src={mbti}></img> */}

          <button className='btn-exam-start' onClick={() => { changeMode('quiz') }}>검 사 시 작</button>
        </div>
        : null
      }

      {/* mode 가 quiz 일 때 */}
      {states.mode === 'quiz'
        ? <Quiz questionList={states.questionList} />
        : null
      }

    </div>
  )
}

export default MBTI;
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import TeamAPI, { TEAM_DOMAIN } from '../0. API/TeamAPI';
import noImage from '../images/logo.png';
import styled from 'styled-components';

const Matching = () => {
    // ▼ 로그인 안 되어 있으면 로그인 페이지로
    const isLogin = window.localStorage.getItem("isLogin");
    if(isLogin === "FALSE") window.location.replace("/login");
    // ▲ 로그인 안 되어 있으면 로그인 페이지로
    const localId = window.localStorage.getItem("userId");
    const local_id_num = window.localStorage.getItem("id_num");

    const [id, setId] = useState('');
    const [id_num, setId_num] = useState('');
    const [NickName, setNickName] = useState('');
    const [mbti, setMbti] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [mat_memberInfo, setMat_MemberInfo] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    // const [like_user_num, setLike_user_num] = useState('');
    // const [like_num, setLike_num] = useState(0);
    // const [mat_id_num, setMat_id_num] = useState('');

    // 페이지 이동
    const onChangeNext = () => {
        setPageNum(pageNum + 1);
        console.log("pageNum : " + pageNum);
    }

    const onChangePrev = () => {
        setPageNum(pageNum - 1);
        console.log("pageNum : " + pageNum);
    }

    // 좋아요 버튼
    // const Click_like = () => {
    //     setLike_num(1);
    //     console.log("Click_like : " + like_num);
    // }

    // const UnClick_like = (e) => {
    //     const like_user_num = e.target.value
    //     setLike_user_num(like_user_num);
    //     setLike_num(0);
    //     console.log("UnClick_like : " + like_user_num);
    // }

    // 매칭 회원 정보 조회
    useEffect(() => {
        const memberData = async () => {
            const id = localId;
            console.log(">>>>>>>>>>>>>>");
            console.log(typeof(id));
            console.log(id);
          try {
            const Mat = await TeamAPI.MatchingMember2(id, pageNum);
            console.log("****************");
            setMat_MemberInfo(Mat.data);
            setId_num(Mat.data[0].user_id_num);
            setNickName(Mat.data[0].user_nick);
            setMbti(Mat.data[0].user_mbti);
            setIntroduce(Mat.data[0].user_introduce);
            console.log("1", Mat.data);
            console.log("2", Mat.data[0].user_nick);
            console.log("3", Mat.data[0].mat_id_num);
          } catch (e) {
            console.log(e);
          }
        };
        memberData();
        }, [pageNum]);


        return (
            <StyleMat>
                    {/* 
                        내 정보 테이블 
                     */}
                    <table className='mypage-table'>
                        <colgroup> 
                            <col width="50%" /> 
                            <col width="50%" /> 
                        </colgroup>
                        <tr>
                            <td colSpan="2" align='center' style={{width:"300px", padding:'20px'}}><h2>내 정보</h2></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align='center' >
                            { mat_memberInfo.fileName ?  
                                <img src={ TEAM_DOMAIN + "MemberInfo/file/" + id } style={{borderRadius:'70%', width: '100px'}}/>
                                : <img src={noImage} style={{borderRadius:'70%', width: '100px'}} />
                            }</td>
                        </tr>
                        <tr>
                            <br />
                        </tr>
                        <tr>
                            <th className='mypage-th' >닉네임</th>
                            <td className='mypage-td'>{NickName}</td>
                        </tr>
                        <tr>
                            <th className='mypage-th'>MBTI</th>
                            <td className='mypage-td'>{mbti}</td>
                        </tr>
                        <tr>
                                <th className='mypage-th'>자기소개</th>
                                <td className='mypage-td'>{introduce}</td>
                            </tr>
                        <tr>
                            <br />
                        </tr>
                    </table>  
        
                    {/* 
                        친구 추천 테이블 
                     */}
                    {/* 
                        친구 추천 테이블 
                    */}
                    { mat_memberInfo.map((mat) => (
                    <div key={mat.id}>
                        <table className='Matching-table'>
                            <colgroup> 
                                <col width="50%" /> 
                                <col width="50%" /> 
                            </colgroup>
                            <tr>
                                <td colSpan="2" align='center' style={{width:"300px", padding:'20px'}}><h2>친구 추천 {mat_memberInfo.index}</h2></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align='center' >
                                { mat.fileName ?
                                    <img src={ TEAM_DOMAIN + "MemberInfo/file/" + id } style={{borderRadius:'70%', width: '100px'}}/>
                                    : <img src={noImage} style={{borderRadius:'70%', width: '100px'}} />
                                }</td>
                            </tr>
                            <tr>
                                <th className='Matching-th' >닉네임</th>
                                <td className='Matching-td'>{mat.mat_nick}</td>
                            </tr>
                            <tr>
                                <th className='Matching-th'>MBTI</th>
                                <td className='Matching-td'>{mat.mat_mbti}</td>
                            </tr>
                            <tr>
                                <th className='Matching-th'>자기소개</th>
                                <td className='Matching-td'>{mat.mat_introduce}</td>
                            </tr>
                            
                            {/* { like_num === 0 ?
                                <img src={Click} onClick={Click_like} value={mat.mat_id_num} style={{width: 30}}/>
                                : <img src={unClick} onClick={UnClick_like} value={mat.mat_id_num} style={{width: 25}} />   
                            } */}
                            <tr>
                                <br />
                            </tr>
                        </table>
                    </div>    
                    ))}
                    <button onClick={onChangePrev} disabled={(pageNum === 1) ? true : false }>이전</button>   
                    <button onClick={onChangeNext} disabled={(pageNum === 2) ? true : false }>다음</button>   
                    
                </StyleMat>     
            )
        }

export default Matching;

// 임시 스타일 적용 중(가운데 정렬)
const StyleMat = styled.div`
    width: 1180;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
`;
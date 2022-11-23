import axios from "axios";


const HEADER = 'application/json';
/* ▼ 인텔리제이용 ▼ */
const TEAM_DOMAIN = "http://localhost:8282/";
/* ▼ 이클립스용 ▼ */
// const TEAM_DOMAIN = "http://localhost:8111/ISOUR/";/



const TeamAPI = {
  // 로그인 기능
  userLogin: async function(id, pwd) {
    const loginObj = {
      id: id,
      pwd: pwd
    }
    return await axios.post(TEAM_DOMAIN + "Login", loginObj, HEADER); // LoginServlet이거가 백앤드랑 이름이 동일해야댐
  },

  // 회원 가입 여부 확인
  memberRegCheck: async function(id) {
    const regCheck = {
      id: id
    };

    return await axios.post(TEAM_DOMAIN + "IsMemberCheck", regCheck, HEADER);
  },

  // 회원 정보 조회
  memberInfo: async function(id) {
    // return await axios.get(TEAM_DOMAIN + "GetMemberParam?cmd=MemberList", HEADER);
    return await axios.get(TEAM_DOMAIN + `MyPage?id=${id}`, HEADER);
  },

  // 회원 가입
  memberReg: async function(name, id, pwd, birth, gender, region1, region2) {
    const memberObj = {
      name: name,
      id: id,
      pwd: pwd,
      birth: birth,
      gender: gender,
      region1: region1,
      region2: region2
    };

    return await axios.post(TEAM_DOMAIN + "SignUp", memberObj, HEADER);
  },

  // 회원 탈퇴
  memberDrop: async function(id, pwd) {
    const dropObj = {
      id: id,
      pwd: pwd
    };

    return await axios.post(TEAM_DOMAIN + "Goodbye", dropObj, HEADER);
  },

  // 회원 정보 수정
  MemberUpdate: async function(id, pwd, region1, region2) {
    const memberObj = {
      id: id,
      pwd: pwd,
      region1: region1,
      region2: region2
    };

    return await axios.put(TEAM_DOMAIN + "MyPage", memberObj, HEADER);
  },

  // MBTI 검사 결과
  mbtiReg: async function(mbti, id) {
    const resultObj = {
      mbti: mbti,
      id: id
    };

    return await axios.post(TEAM_DOMAIN + "MBTI", resultObj, HEADER);
  },

  // 쪽지함 불러오기
  // messageStorage: async function(id) {
  //   return await axios.get(TEAM_DOMAIN + `GetPostbox?id=${id}`, HEADER);
  // },
  messageStorage: async function(id) {
    const regCmd = {
      id : id
    }
    return await axios.post(TEAM_DOMAIN + "GetPostbox", regCmd, HEADER);
  },

  // 쪽지보내기
  messageReg: async function(id, receiverId, content) {
    const messageObj = {
      id: id,
      receiverId: receiverId,
      content: content
    };

    return await axios.post(TEAM_DOMAIN + "SendPost", messageObj, HEADER);
  },

  // 이미지 파일 업로드
  UploadService: async function(formData) {
    const regCheck = {
      formData: formData
    };
    const config = {
      Header: {
        'content-type': 'multipart/form-data',
      },
    };

    return await axios.post(TEAM_DOMAIN + "UploadService", regCheck, config, HEADER);
  },
  
}

export default TeamAPI;
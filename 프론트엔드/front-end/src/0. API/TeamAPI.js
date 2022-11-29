import axios from "axios";

const HEADER = 'application/json';
/* ▼ 인텔리제이용 ▼ */
export const TEAM_DOMAIN = "http://localhost:8282/";
/* ▼ 이클립스용 ▼ */
// export const TEAM_DOMAIN = "http://localhost:8111/ISOUR/";/

const TeamAPI = {
  
  /* 아이디 중복확인(회원가입 여부 확인) */
  memberRegCheck: async function(id) {
    const regCheck = {
      id: id
    };
    // @PostMapping("/IsMemberCheck")
    return await axios.post(TEAM_DOMAIN + "IsMemberCheck", regCheck, HEADER);
  },

  /* 회원가입 */
  memberReg: async function(name, id, pwd, email, birth, gender, region1, region2, check_term1, check_term2) {
    const memberObj = {
      name: name,
      id: id,
      pwd: pwd,
      email: email,
      birth: birth,
      gender: gender,
      region1: region1,
      region2: region2,
      check_term1: check_term1,
      check_term2: check_term2
    };
    // @PostMapping("/SignUp")
    return await axios.post(TEAM_DOMAIN + "SignUp", memberObj, HEADER);
  },

  /* 로그인 */
  userLogin: async function(id, pwd) {
    const loginObj = {
      id: id,
      pwd: pwd
    }
    // @PostMapping("/Login")
    return await axios.post(TEAM_DOMAIN + "Login", loginObj, HEADER);
  },

  /* MBTI 검사 결과 저장*/
  mbtiReg: async function(mbti, id) {
    const resultObj = {
      mbti: mbti,
      id: id
    };
    // @PostMapping("/MBTI")
    return await axios.post(TEAM_DOMAIN + "MBTI", resultObj, HEADER);
  },

  /* 회원 조회 */
  memberInfo: async function(id) {
    // @GetMapping("/MyPage")
    return await axios.get(TEAM_DOMAIN + `MyPage?id=${id}`, HEADER);
  },
  
  /* 비밀번호 찾기 */
  findPwd: async function(id, email, birth) {
    // @GetMapping("/FindPwd")
    return await axios.get(TEAM_DOMAIN + `FindPwd?id=${id}&email=${email}&birth=${birth}`, HEADER);
  },
  
  /* 아이디 찾기 */
  findId: async function(email, birth) {
    // @GetMapping("/FindId")
    return await axios.get(TEAM_DOMAIN + `FindId?email=${email}&birth=${birth}`, HEADER);
  },



  /* 회원정보 수정 */
  MemberUpdate: async function(id, name, pwd, birth, region1, region2) {
    const memberObj = {
      id: id,
      name: name,
      pwd: pwd,
      birth: birth,
      region1: region1,
      region2: region2
    };
    // @PutMapping("/MyPage")
    return await axios.put(TEAM_DOMAIN + "MyPage", memberObj, HEADER);
  },

  /* 회원 탈퇴 */
  memberDrop: async function(id, pwd) {
    const dropObj = {
      id: id,
      pwd: pwd
    };
    // @PostMapping("/Goodbye")
    return await axios.post(TEAM_DOMAIN + "Goodbye", dropObj, HEADER);
  },
  
// ========= PostController =========

  /* 쪽지함 조회 */
  postbox: async function(id) {
    const postObj = {
      id : id
    }
    // @PostMapping("/GetPostbox")
    return await axios.post(TEAM_DOMAIN + "GetPostbox", postObj, HEADER);
  },

  /* 쪽지 보내기 */
  sendPost: async function(id, receiverId, content) {
    const postObj = {
      id: id,
      receiverId: receiverId,
      content: content
    };
    // @PostMapping("/SendPost")
    return await axios.post(TEAM_DOMAIN + "SendPost", postObj, HEADER);
  },

  /* 쪽지 삭제 */
  postDelete: async function(obj) {
    const postObj = {
      obj: obj
    };
    // @PostMapping("/DeletePost")
    return await axios.post(TEAM_DOMAIN + "DeletePost", obj, HEADER);
  },
    //chat
    memberChat: async function(content) {
      const chatObj = {
      
        content:content
      };
      return await axios.put(TEAM_DOMAIN + "Chat", chatObj, HEADER);
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

  // 매칭회원 불러오기
  MatchingMember2: async function(id, pageNum) {
    const regCmd = {
      id : id,
      pageNum: pageNum
    }
    return await axios.post(TEAM_DOMAIN + "Matching", regCmd, HEADER);
  },
  
}

export default TeamAPI;
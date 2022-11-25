package com.ISOUR.controller;

import com.ISOUR.dto.MemberDTO;
import com.ISOUR.Service.MemberService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@Slf4j
public class MemberController {
    // Service(서비스) 로직 연결
    private MemberService memberService;
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    /* 아이디 중복확인(회원가입 여부 확인) */
    @PostMapping("/IsMemberCheck")
    public ResponseEntity<Boolean> isMemberCheck(@RequestBody Map<String, String> memberData) {
        log.warn("★★★★★★★★★아이디 중복확인 Controller★★★★★★★★★");

        String getId = memberData.get("id");
        log.warn("중복확인할 아이디(id) : " + getId);

        boolean isTrue = memberService.isMemberCheck(getId);
        if(isTrue) log.warn("중복확인할 아이디(id) : " + isTrue);

        if(isTrue) {
            log.warn(">" + isTrue + " : 사용할 수 없는 아이디(id)입니다. ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 사용할 수 있는 아이디(id)입니다. ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }

    }

    /* 회원가입 */
    @PostMapping("/SignUp")
    public ResponseEntity<Boolean> memberSignUp(@RequestBody Map<String, String> signUpData) {
        log.warn("★★★★★★★★★회원가입 Controller★★★★★★★★★");
        log.warn("항목 : 이름, 아이디, 비밀번호,이메일, 생년월일, 성별, 시도, 시구군");

        String getName = signUpData.get("name");
        String getId = signUpData.get("id");
        String getPwd = signUpData.get("pwd");
        String getEmail = signUpData.get("email");
        String getBirth = signUpData.get("birth");
        String getGender = signUpData.get("gender");
        String getRegion1 = signUpData.get("region1");
        String getRegion2 = signUpData.get("region2");

        boolean isTrue = memberService.signUpMember(getName, getId, getPwd, getEmail, getBirth, getGender, getRegion1, getRegion2);

        if(isTrue) {
            log.warn(">" + isTrue + " : 회원가입 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 회원가입 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    /* 로그인 */
    @PostMapping("/Login")
    public ResponseEntity<Boolean> memberLogin(@RequestBody Map<String, String> loginData) {
        log.warn("★★★★★★★★★로그인 Controller★★★★★★★★★");

        String getId = loginData.get("id");
        String getPwd = loginData.get("pwd");
        log.warn("입력한 아이디(id) : " + getId);
        log.warn("입력한 비밀번호(pwd) : " + getPwd);

        boolean isTrue = memberService.loginMember(getId, getPwd);

        if(isTrue) {
            log.warn(">" + isTrue + " : 로그인 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 로그인 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    /* MBTI 검사 결과 저장 */
    @PostMapping("/MBTI")
    public ResponseEntity<Boolean> mbtiSave(@RequestBody Map<String, String> mbtiData) {
        log.warn("★★★★★★★★★MBTI 검사 결과 저장 Controller★★★★★★★★★");

        String getMbti = mbtiData.get("mbti");
        String getId = mbtiData.get("id");
        log.warn("MBTI 검사 결과(mbti) : " + getMbti);
        log.warn("아이디(id) : " + getId);

        boolean isTrue = memberService.saveMBTI(getMbti, getId);

        if(isTrue) {
            log.warn(">" + isTrue + " : MBTI 검사 결과 저장 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : MBTI 검사 결과 저장 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    /* 회원정보 수정 */
    @PutMapping("/MyPage")
    // 객체 타입이 와야하기 때문에 Boolean 대문자
    public ResponseEntity<Boolean> MemberUpdate_Ctrl(@RequestBody Map<String, String> regData) {
        log.warn("★★★★★★★★★회원정보 수정 Controller★★★★★★★★★");
        String getId = regData.get("id");
        String getPwd = regData.get("pwd");
        String getName = regData.get("name");
        String getGender = regData.get("gender");
        String getNickName = regData.get("NickName");
        String getRegion1 = regData.get("region1");
        String getRegion2 = regData.get("region2");
        String getIntroduce = regData.get("introduce");
        log.warn("아이디(id) : " + getId);
        log.warn("변경한 비밀번호(pwd) : " + getPwd);
        log.warn("변경한 시도(region1) : " + getRegion1);
        log.warn("변경한 시구군(region2) : " + getRegion2);
        log.warn("변경한 자기소개(introduce) : " + getIntroduce);

        boolean isTrue = memberService.MemberUpdate(getId, getPwd, getName, getNickName, getGender, getRegion1, getRegion2, getIntroduce);

        if(isTrue) {
            log.warn(">" + isTrue + " : 회원정보 수정 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 회원정보 수정 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    /* 회원탈퇴 */
    @PostMapping("/Goodbye")
    public ResponseEntity<Boolean> memberDelete(@RequestBody Map<String, String> goodbyeData) {
        log.warn("★★★★★★★★★회원탈퇴 Controller★★★★★★★★★");

        String getId = goodbyeData.get("id");
        String getPwd = goodbyeData.get("pwd");
        log.warn("아이디(id) : " + getId);
        log.warn("입력한 비밀번호(pwd) : " + getPwd);

        boolean isTrue = memberService.deleteMember(getId, getPwd);

        if(isTrue) {
            log.warn(">" + isTrue + " : 회원탈퇴 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 회원탈퇴 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    /* @GetMapping 모음집 - 회원 조회 */

    /* 개별 회원 조회 */
    @GetMapping("/MyPage")
    public ResponseEntity<MemberDTO> memberInfo(@RequestParam String id) {
        log.warn("★★★★★★★★★개별 회원 조회 Controller★★★★★★★★★");
        MemberDTO memberDTO = memberService.getMemberInfo(id);
        return new ResponseEntity<>(memberDTO, HttpStatus.OK);
    }

    /* 비밀번호 찾기 정보 조회 */
    @GetMapping("/FindPwd")
    public ResponseEntity<Boolean> memberInfo(@RequestParam String id, String email, String birth ) {
        log.warn("★★★★★★★★★개별 회원 조회 Controller★★★★★★★★★");
        boolean isTrue = memberService.findPwd(id,email,birth);
        if(isTrue) {
            log.warn(">" + isTrue + " : MBTI 검사 결과 저장 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : MBTI 검사 결과 저장 실패 ");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    /* 아이디 찾기 정보 조회 */
    @GetMapping("/FindId")
    public ResponseEntity<MemberDTO> memberInfo(@RequestParam String email, String birth ) {
        log.warn("★★★★★★★★★개별 회원 조회 Controller★★★★★★★★★");
        MemberDTO memberDTO = memberService.findId(email,birth);
        return new ResponseEntity<>(memberDTO, HttpStatus.OK);

    }

    /* 전체 회원 조회 */
    @GetMapping("/MemberList")
    public ResponseEntity<List<MemberDTO>> memberList() {
        log.warn("★★★★★★★★★전체 회원 조회 Controller★★★★★★★★★");
        List<MemberDTO> list = memberService.getMemberList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}

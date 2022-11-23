package com.ISOUR.controller;


import com.ISOUR.Entity.I_MEMBER;
import com.ISOUR.Service.MemberService;
import com.ISOUR.dao.MemberRepository;
import com.ISOUR.vo.MemberVO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
public class ISOURController {
    private MemberService memberService;

    // 생성자 추가
    public ISOURController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 로그인
    @PostMapping("/ISOUR/Login")
    public ResponseEntity<Boolean> LoginMember_Ctrl(@RequestBody Map<String, String> LoginData) {
        String id = LoginData.get("id");
        String pwd = LoginData.get("pwd");
        boolean result = memberService.LoginCheck(id, pwd);
        if(result) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 회원 가입
    @PostMapping("/ISOUR/RegMember")
    // 객체 타입이 와야하기 때문에 Boolean 대문자
    public ResponseEntity<Boolean> registerMember_Ctrl(@RequestBody Map<String, String> regData) {
        String id = regData.get("id");
        String pwd = regData.get("pwd");
        String name = regData.get("name");
        String email = regData.get("email");
        String birth = regData.get("birth");
        String gender = regData.get("gender");
        String region1 = regData.get("region1");
        String region2 = regData.get("region2");

        boolean result = memberService.MemberReg(id, pwd, name, email, birth, gender, region1, region2 );
        if(result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 회원정보수정
    @PutMapping("/ISOUR/MyPage")
    // 객체 타입이 와야하기 때문에 Boolean 대문자
    public ResponseEntity<Boolean> MemberUpdate_Ctrl(@RequestBody Map<String, String> regData) {
        String id = regData.get("id");
        String pwd = regData.get("pwd");
        String name = regData.get("name");
        String email = regData.get("email");
        String birth = regData.get("birth");
        String gender = regData.get("gender");
        String region1 = regData.get("region1");
        String region2 = regData.get("region2");

        boolean result = memberService.MemberUpdate(id, pwd, name, email, birth, gender, region1, region2 );
        System.out.println("회원정보수정 결과 : " + result);
        if(result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 회원정보조회
    @PostMapping("/ISOUR/MyPage")
    public ResponseEntity<List<MemberVO>> memberList(@RequestBody Map<String, String> LoginData) {
        String id = LoginData.get("id");
        List<MemberVO> list = memberService.getMemberList(id);
        System.out.println("가져와라 회원정보 : " + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 중복 아이디 체크
    @PostMapping("/ISOUR/IdCheck")
    public ResponseEntity<Boolean> IdCheck_Ctrl(@RequestBody Map<String, String> LoginData) {
        String id = LoginData.get("id");
        boolean result = memberService.IdCheck(id);
        System.out.println("중복아이디 : " + result);
        if(result) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }




//    // 전체 회원 정보 조회
//    @GetMapping("/ISOUR/admin")
//    public List<I_MEMBER> getMember() {
//        return memberRepository.findAll();
//    }

}

package com.ISOUR.controller;

import com.ISOUR.Service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ISOUR.Service.EmailServiceImpl;
import com.ISOUR.Service.EmailService;

import java.util.Map;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/service/*")
public class EmailConfirmController {
    @Autowired
    EmailService service;
    private MemberService memberService;
    public EmailConfirmController(MemberService memberService) {
        this.memberService = memberService;
    }
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @PostMapping("/mail")
    public void isMemberCheck(@RequestBody Map<String, String> emailData) throws Exception {
        String getEmailId = emailData.get("id");
        logger.info("post emailConfirm");
        System.out.println("전달 받은 이메일 : " + getEmailId);
        service.sendSimpleMessage(getEmailId);
    }
    @PostMapping("/verifyCode")
//    @ResponseBody
    public Integer verifyCode(@RequestBody Map<String, String> emailCode){
        logger.info("Post verifyCode");
        Integer result=0;
        String getEmailCode = emailCode.get("code");
        System.out.println("code : "+getEmailCode);
        System.out.println("code match : "+ EmailServiceImpl.ePw.equals(getEmailCode));
        if(EmailServiceImpl.ePw.equals(getEmailCode)) {
            result =1;
        }
        return result;
    }


    @PostMapping("/isEmailCheck")
    public ResponseEntity<Boolean> IsEmailCheck(@RequestBody Map<String, String> memberData) {
        log.warn("★★★★★★★★★이메일 중복확인 Controller★★★★★★★★★");

        String getEmail = memberData.get("email");
        log.warn("중복확인할 이메일 주소(email : " + getEmail);

        boolean isTrue = memberService.isEmailCheck(getEmail);
        if(isTrue) log.warn("중복확인할 이메일(email) boolean 값 : " + isTrue);

        if(isTrue) {
            log.warn(">>" + isTrue + " : 사용할 수 없는 이메일 입니다. ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">>" + isTrue + " : 사용할 수 있는 이메일입니다. ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }



}

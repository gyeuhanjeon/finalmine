package com.ISOUR.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ISOUR.Service.EmailServiceImpl;
import com.ISOUR.Service.EmailService;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/service/*")
public class EmailConfirmController {
    @Autowired
    EmailService service;

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
}

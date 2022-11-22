package com.ISOUR.Service;

import com.ISOUR.Entity.I_MEMBER;
import com.ISOUR.dao.MemberRepository;
import com.ISOUR.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class MemberService {
    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        // 위의 memberRepo 는 매개변수로 받은 memberRepo 와 같다 라고 지정해 준 것.
        this.memberRepository = memberRepository;
    }

    // 로그인
    public boolean LoginCheck(String id, String pwd) {
        List<I_MEMBER> memberList = memberRepository.findByIdAndPwd(id, pwd);
        for(I_MEMBER e : memberList) {
            return true;
        }
        return false;
    }

    // 회원 가입
    // 프론트에서 입력 받을 값(controller 한테 받은거)
    public boolean MemberReg(String id, String pwd, String name, String email, String birth, String gender, String region1, String region2 ) {
        I_MEMBER i_member = new I_MEMBER();
        i_member.setId(id);
        i_member.setPwd(pwd);
        i_member.setName(name);
        i_member.setEmail(email);
        i_member.setBirth(birth);
        i_member.setGender(gender);
        i_member.setRegion1(region1);
        i_member.setRegion2(region2);
        I_MEMBER rst = memberRepository.save(i_member);
        log.warn(rst.toString());
        return true;
    }

    // 아이디 중복 체크
    public boolean IdCheck(String id) {
        List<I_MEMBER> memberList = memberRepository.findById(id);
        for(I_MEMBER e : memberList) {
            return false;
        }
        return true;
    }
}

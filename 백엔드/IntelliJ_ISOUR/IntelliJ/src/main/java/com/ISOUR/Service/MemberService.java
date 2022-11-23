package com.ISOUR.Service;

import com.ISOUR.Entity.I_MEMBER;
import com.ISOUR.dao.MemberRepository;
import com.ISOUR.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
//@Transactional
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
    // 프론트에서 입력 받은 값(controller 한테 받은거)
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

    // 회원정보수정
    // 프론트에서 입력 받을 값(controller 한테 받은거)

    public boolean MemberUpdate(String id, String pwd, String name, String email, String birth, String gender, String region1, String region2 ) {
        I_MEMBER i_member = new I_MEMBER();
        List<I_MEMBER> memberList = memberRepository.findById(id);
        for(I_MEMBER e : memberList) {
            i_member.setId_num(e.getId_num());
            i_member.setId(id);
            i_member.setPwd(pwd);
            i_member.setName(name);
            i_member.setEmail(email);
            i_member.setBirth(birth);
            i_member.setGender(gender);
            i_member.setRegion1(region1);
            i_member.setRegion2(region2);
            I_MEMBER rs = memberRepository.save(i_member);
            log.warn(">>>>>>>>>>>>>>>>>>>>> 회원 정보 수정");
            log.warn(rs.toString());
        }
        return true;
    }

    // 아이디 중복 체크
    public boolean IdCheck(String id) {
        List<I_MEMBER> memberList = memberRepository.findById(id);
        for(I_MEMBER e : memberList) {
            return true;
        }
        return false;
    }

    // 아이디로 회원정보 조회
     public List<MemberVO> getMemberList(String id) {
        List<MemberVO> MemberList = new ArrayList<>();
        List<I_MEMBER> memberList = memberRepository.findById(id);
        for(I_MEMBER e : memberList) {
            MemberVO memberVO = new MemberVO();
            memberVO.setId_num(e.getId_num());
            memberVO.setId(e.getId());
            memberVO.setPwd(e.getPwd());
            memberVO.setName(e.getName());
            memberVO.setNickName(e.getNickName());
            memberVO.setEmail(e.getEmail());
            memberVO.setBirth(e.getBirth());
            memberVO.setGender(e.getGender());
            memberVO.setRegion1(e.getRegion1());
            memberVO.setRegion2(e.getRegion2());
            memberVO.setMbti(e.getMbti());
            memberVO.setIntroduce(e.getIntroduce());
            MemberList.add(memberVO);
        }
         log.warn(String.valueOf(MemberList));
        return MemberList;
    }

}

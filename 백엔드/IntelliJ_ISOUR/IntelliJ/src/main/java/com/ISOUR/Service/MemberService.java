package com.ISOUR.Service;

import com.ISOUR.dto.MemberDTO;
import com.ISOUR.Entity.MemberInfo;
import com.ISOUR.repository.MemberRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class MemberService {
    private MemberRepository memberRepository;
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /* 아이디 중복 체크(회원가입 여부 확인) 서비스 */
    public boolean isMemberCheck(String id) {
        log.warn("★★★★★★★★★아이디 중복체크 서비스★★★★★★★★★");
        log.warn("입력한 아이디(id) : " + id);

        MemberInfo memberInfo = memberRepository.findById(id);
        if(memberInfo != null) return true;
        else return false;
    }

    /* 회원가입 서비스 */
    public boolean signUpMember(String name, String id, String pwd, String birth, String gender, String region1, String region2) {
        MemberInfo memberInfo = new MemberInfo();
        memberInfo.setName(name);
        memberInfo.setId(id);
        memberInfo.setPwd(pwd);
        memberInfo.setBirth(birth);
        memberInfo.setGender(gender);
        memberInfo.setRegion1(region1);
        memberInfo.setRegion2(region2);

        MemberInfo result = memberRepository.save(memberInfo);
        log.warn(result.toString());

        return true;
    }

    /* 로그인 서비스 */
    public boolean loginMember(String id, String pwd) {
        log.warn("★★★★★★★★★로그인 서비스★★★★★★★★★");
        log.warn("입력한 아이디(id) : " + id);
        log.warn("입력한 비밀번호(pwd) : " + pwd);

        List<MemberInfo> memberInfoList = memberRepository.findByIdAndPwd(id, pwd);
        for(MemberInfo e : memberInfoList) {
            return true;
        }
        return false;
    }

    /* MBTI 검사 결과 저장 서비스 */
    public boolean saveMBTI(String mbti, String id) {
        log.warn("★★★★★★★★★MBTI 검사 결과 저장 서비스★★★★★★★★★");
        log.warn("MBTI 검사 결과(mbti) : " + mbti);
        log.warn("아이디(id) : " + id);

        MemberInfo memberInfo = memberRepository.findById(id);
        memberInfo.setId_num(memberInfo.getId_num());
        memberInfo.setName(memberInfo.getName());
        memberInfo.setId(memberInfo.getId());
        memberInfo.setPwd(memberInfo.getPwd());
        memberInfo.setBirth(memberInfo.getBirth());
        memberInfo.setGender(memberInfo.getGender());
        memberInfo.setRegion1(memberInfo.getRegion1());
        memberInfo.setRegion2(memberInfo.getRegion2());
        memberInfo.setMbti(mbti);

        memberRepository.save(memberInfo);

        return true;
    }

    /* 회원정보 수정 서비스 */
    public boolean MemberUpdate(String id, String pwd, String name, String NickName, String gender, String region1, String region2, String introduce ) {
        log.warn("★★★★★★★★★회원정보 수정 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + id);
        log.warn("변경한 비밀번호(pwd) : " + pwd);
        log.warn("변경한 시도(region1) : " + region1);
        log.warn("변경한 시구군(region2) : " + region2);

        MemberInfo memberInfo = memberRepository.findById(id);
        memberInfo.setId_num(memberInfo.getId_num());
        memberInfo.setPwd(pwd);
        memberInfo.setName(name);
        memberInfo.setNickName(NickName);
        memberInfo.setGender(gender);
        memberInfo.setRegion1(region1);
        memberInfo.setRegion2(region2);
        memberInfo.setIntroduce(introduce);
        memberRepository.save(memberInfo);

        return true;
    }

    /* 회원탈퇴 서비스 */
    public boolean deleteMember(String id, String pwd) {
        log.warn("★★★★★★★★★회원탈퇴 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + id);
        log.warn("입력한 비밀번호(pwd) : " + pwd);

        List<MemberInfo> memberInfoList = memberRepository.findByIdAndPwd(id, pwd);
        if(memberInfoList != null) {
            memberRepository.deleteAll(memberInfoList);
            return true;
        } else return false;
    }

    /* 개별 회원 조회 서비스 */
    public MemberDTO getMemberInfo(String id) {
        log.warn("★★★★★★★★★개별 회원 조회 서비스★★★★★★★★★");
        log.warn("조회할 아이디(id) : " + id);
        MemberInfo memberInfo = memberRepository.findById(id);
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setName(memberInfo.getName());
        memberDTO.setId(memberInfo.getId());
        memberDTO.setPwd(memberInfo.getPwd());
        memberDTO.setBirth(memberInfo.getBirth());
        memberDTO.setGender(memberInfo.getGender());
        memberDTO.setRegion1(memberInfo.getRegion1());
        memberDTO.setRegion2(memberInfo.getRegion2());
        memberDTO.setMbti(memberInfo.getMbti());

        return memberDTO;
    }

    /* 전체 회원 조회 서비스 */
    public List<MemberDTO> getMemberList() {
        log.warn("★★★★★★★★★전체 회원 조회 서비스★★★★★★★★★");

        List<MemberDTO> memberDTOS = new ArrayList<>();
        List<MemberInfo> memberInfoList = memberRepository.findAll();
        for(MemberInfo e : memberInfoList) {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setName(e.getName());
            memberDTO.setId(e.getId());
            memberDTO.setPwd(e.getPwd());
            memberDTO.setBirth(e.getBirth());
            memberDTO.setRegion1(e.getRegion1());
            memberDTO.setRegion2(e.getRegion2());
            memberDTO.setMbti(e.getMbti());

            memberDTOS.add(memberDTO);
        }
        return memberDTOS;
    }


}
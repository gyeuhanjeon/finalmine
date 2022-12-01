package com.ISOUR.repository;

import com.ISOUR.entity.MemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MemberRepository extends JpaRepository<MemberInfo, Long> {


    List<MemberInfo> findByIdAndPwd(String id, String pwd);
    MemberInfo findById(String id);
    MemberInfo findByEmail(String email);
    MemberInfo findByNickname(String nickname);
    List<MemberInfo> findByIdAndEmailAndBirth(String id, String email, String birth);

    MemberInfo findByNameAndEmailAndBirth(String name, String email, String birth);

}

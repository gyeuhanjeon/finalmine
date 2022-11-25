package com.ISOUR.repository;

import com.ISOUR.Entity.MemberInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MemberRepository extends JpaRepository<MemberInfo, Long> {


    List<MemberInfo> findByIdAndPwd(String id, String pwd);
    MemberInfo findById(String id);
    List<MemberInfo> findByIdAndEmailAndBirth(String id, String email, String birth);

    MemberInfo findByEmailAndBirth(String email, String birth);

}

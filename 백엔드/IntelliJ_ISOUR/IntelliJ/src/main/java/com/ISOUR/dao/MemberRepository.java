package com.ISOUR.dao;

import com.ISOUR.Entity.I_MEMBER;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MemberRepository extends JpaRepository<I_MEMBER, Integer> {

    List<I_MEMBER> findByIdAndPwd(String id, String pwd);
}

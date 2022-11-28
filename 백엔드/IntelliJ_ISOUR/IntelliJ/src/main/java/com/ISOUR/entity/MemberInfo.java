package com.ISOUR.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name="I_MEMBER")
@DynamicUpdate
public class MemberInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_num;
    private String id;
//    @Column(insertable=false, updatable=false)
    @Column(updatable = false)
    private String pwd;
    private String name;
    @Column(updatable = false)
    private String birth;
    private String nickName;
    private String email;
    private String gender;
    private String region1;
    private String region2;
    private String mbti;
    private String introduce;
}

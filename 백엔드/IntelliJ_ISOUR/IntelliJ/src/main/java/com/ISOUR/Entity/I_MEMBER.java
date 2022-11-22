package com.ISOUR.Entity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Data
@Entity
@Table(name = "I_MEMBER")
public class I_MEMBER {
     @Id //프라이머리키 지정이 필요.
    // 키 값을 생성하는 전략 : 기본키 생성을 JPA 큭성을 따름.
    @GeneratedValue(strategy = GenerationType.AUTO)

    private int id_num;
    private String id;
    private String pwd;
    private String name;
    private String NickName;
    private String email;
    private String birth;
    private String gender;
    private String region1;
    private String region2;
    private String mbti;
    private String introduce;


}

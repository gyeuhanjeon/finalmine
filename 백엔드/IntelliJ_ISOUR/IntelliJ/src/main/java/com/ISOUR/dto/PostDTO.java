package com.ISOUR.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class PostDTO {
    private Long postNum;
    private String postSender;
    private String content;
    private LocalDate postTime;
}

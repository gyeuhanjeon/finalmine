package com.ISOUR.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PostDTO {
    private Long postNum;
    private String postSender;
    private String content;
    private LocalDate postTime;
}

package com.ISOUR.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ChatDTO {
    private Long chatNum;
    private String content;
}

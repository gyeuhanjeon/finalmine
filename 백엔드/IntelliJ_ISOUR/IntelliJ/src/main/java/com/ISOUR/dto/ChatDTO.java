package com.ISOUR.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class ChatDTO {
    private Long chatNum;
    private String content;
    @DateTimeFormat(pattern="yyyyMMddHHmmss")
    private LocalDateTime chatTime;
}

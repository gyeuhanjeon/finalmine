package com.ISOUR.Entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="Postbox")
public class Postbox {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postNum;
    private String postReceiver;
    private String postSender;
    private String content;
    @Column(updatable = false)
    private LocalDate postTime;
}

package com.ISOUR.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

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

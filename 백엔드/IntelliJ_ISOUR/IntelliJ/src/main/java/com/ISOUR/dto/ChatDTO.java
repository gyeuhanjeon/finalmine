package com.ISOUR.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatDTO {
    public enum MessageType {
        ENTER, TALK,CLOSE
    }
    private MessageType type;
    private String roomId;
    // 나중에 닉네임으로 대체해볼것
    private String sender;
    private String message;
}


package com.ISOUR.service;

import com.ISOUR.dto.ChatDTO;
import com.ISOUR.dto.MemberDTO;
import com.ISOUR.entity.Chat;
import com.ISOUR.entity.MemberInfo;
import com.ISOUR.repository.ChatRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ChatService {
    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public boolean sendPost(String content) {
        log.warn("★★★★★★★★★채팅 보내기 서비스★★★★★★★★★");
        log.warn("내용(content) : " + content);

        Chat chat = new Chat();
        chat.setContent(content);
        chat.setChatTime(LocalDateTime.now());

        Chat result = chatRepository.save(chat);
        log.warn(result.toString());

        return true;
    }

    public List<ChatDTO> getChatList() {
        log.warn("★★★★★★★★★전체 회원 조회 서비스★★★★★★★★★");

        List<ChatDTO> chatDTOS = new ArrayList<>();
        List<Chat> chatInfoList = chatRepository.findAll();
        for(Chat e : chatInfoList) {
            ChatDTO chatDTO = new ChatDTO();
            chatDTO.setChatNum(e.getChatNum());
            chatDTO.setContent(e.getContent());
            chatDTO.setChatTime(e.getChatTime());
            chatDTOS.add(chatDTO);
        }
        return chatDTOS;
    }
}

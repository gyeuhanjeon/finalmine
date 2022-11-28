package com.ISOUR.service;

import com.ISOUR.entity.Chat;
import com.ISOUR.repository.ChatRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
}

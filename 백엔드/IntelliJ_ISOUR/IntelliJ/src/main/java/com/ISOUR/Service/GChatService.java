package com.ISOUR.service;

import com.ISOUR.dto.GChatDTO;
import com.ISOUR.entity.GChat;
import com.ISOUR.repository.GChatRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class GChatService {
    private final GChatRepository GChatRepository;

    public GChatService(GChatRepository GChatRepository) {
        this.GChatRepository = GChatRepository;
    }

    public boolean sendPost(String content) {
        log.warn("★★★★★★★★★채팅 보내기 서비스★★★★★★★★★");
        log.warn("내용(content) : " + content);

        GChat GChat = new GChat();
        GChat.setContent(content);
        GChat.setChatTime(LocalDateTime.now().withNano(0));

        GChat result = GChatRepository.save(GChat);
        log.warn(result.toString());

        return true;
    }

    public List<GChatDTO> getChatList() {
        log.warn("★★★★★★★★★전체 회원 조회 서비스★★★★★★★★★");

        List<GChatDTO> GChatDTOS = new ArrayList<>();
        List<GChat> GChatInfoList = GChatRepository.findAll();
        for(GChat e : GChatInfoList) {
            GChatDTO GChatDTO = new GChatDTO();
            GChatDTO.setChatNum(e.getChatNum());
            GChatDTO.setContent(e.getContent());
            GChatDTO.setChatTime(e.getChatTime());
            GChatDTOS.add(GChatDTO);
        }
        return GChatDTOS;
    }
}

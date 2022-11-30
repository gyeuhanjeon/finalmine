package com.ISOUR.controller;

import com.ISOUR.dto.ChatDTO;
import com.ISOUR.dto.MemberDTO;
import com.ISOUR.repository.ChatRepository;
import com.ISOUR.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@Slf4j
public class ChattingController {
    private   ChatService chatService;
    public ChattingController(ChatService chatService) {
        this.chatService = chatService;
    }
        @PutMapping("/Chat")
        public ResponseEntity<Boolean> sendPost(@RequestBody Map<String, String> chatData) {
            log.warn("★★★★★★★★★쪽지 보내기 Controller★★★★★★★★★");
            String getContent = chatData.get("content");

            log.info(getContent);


            boolean isTrue = chatService.sendPost(getContent);
            if(isTrue) {
                log.warn(">" + isTrue + " : 채팅성공 ");
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                log.warn(">" + isTrue + " : 채팅 실패 ");
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
    }
    @PostMapping("/Chat")
    public ResponseEntity<List<ChatDTO>> chatList() {
        log.warn("★★★★★★★★★전체 회원 조회 Controller★★★★★★★★★");
        List<ChatDTO> list = chatService.getChatList();
        log.warn(">>>>>>>>>>" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}

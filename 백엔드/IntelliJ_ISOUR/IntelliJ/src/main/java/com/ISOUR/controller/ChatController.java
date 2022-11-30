package com.ISOUR.controller;

import com.ISOUR.dto.ChatRoom;
import com.ISOUR.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
    private final ChatService chatService;
    @PutMapping("/Chatting")
    public ResponseEntity<String> createRoom(@RequestBody String name) {
        ChatRoom room = chatService.createRoom(name);
        log.info(room.getRoomId());
        System.out.println(room.getRoomId());
        return new ResponseEntity(room.getRoomId(), HttpStatus.OK);
    }
    @GetMapping
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }
}
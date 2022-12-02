package com.ISOUR.webSocket;

import com.ISOUR.dto.*;
import com.ISOUR.Service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    // json 데이터를 ChatMessage Class 변경
    private final ObjectMapper objectMapper;
    private  final ChatService chatService;
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        String payload = message.getPayload();
        log.warn("{}", payload);
        ChatDTO chatMessage = objectMapper.readValue(payload, ChatDTO.class);
        ChatRoom chatRoom = chatService.findRoomById(chatMessage.getRoomId());
        chatRoom.handleActions(session, chatMessage, chatService);
    }
}

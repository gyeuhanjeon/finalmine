package com.ISOUR.repository;

import com.ISOUR.entity.GChat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GChatRepository extends JpaRepository<GChat, Long> {
    GChat findByChatNum(Long chatNum);
}

package com.ISOUR.repository;

import com.ISOUR.Entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Chat findByChatNum(Long chatNum);
}

package com.ISOUR.repository;

import com.ISOUR.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Chat findByChatNum(Long chatNum);
}

package com.ISOUR.repository;

import com.ISOUR.entity.Postbox;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostboxRepository extends JpaRepository<Postbox, Long> {
    List<Postbox> findByPostReceiver(String postReceiver);
    Postbox findByPostNum(Long postNum);
}

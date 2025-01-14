package com.book.book_log.repository;

import com.book.book_log.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    // 닉네임 중복 확인
    boolean existsByUsername(String username);
}
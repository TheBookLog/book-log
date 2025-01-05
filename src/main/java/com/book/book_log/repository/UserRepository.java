package com.book.book_log.repository;

import com.book.book_log.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    // 이메일로 사용자 조회(소셜 로그인을 구현하기 위해 필요함)
    Optional<User> findByEmail(String email);

    // 닉네임 중복 확인
    boolean existsByUsername(String username);
}
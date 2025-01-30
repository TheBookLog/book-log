package com.book.book_log.repository;

import com.book.book_log.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, String> {
    // 이름으로 장르 찾기
    Optional<Genre> findByName(String name);
}
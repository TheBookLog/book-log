package com.book.book_log.repository;

import com.book.book_log.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, String> {
}
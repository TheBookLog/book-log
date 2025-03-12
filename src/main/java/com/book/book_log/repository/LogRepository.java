package com.book.book_log.repository;

import com.book.book_log.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository extends JpaRepository<Log, String> {
    List<Log> findByBookId(String bookId);
}
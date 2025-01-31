package com.book.book_log.repository;

import com.book.book_log.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {
    List<Book> findByCategoryId(Integer categoryId);
}
package com.book.book_log.repository;

import com.book.book_log.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, String> {
    List<Book> findByCategoryId(Integer categoryId);

    /**
     * 제목과 저자가 동일한 책이 존재하는지 확인
     * Log 작성 시 중복 저장을 방지하기 위해 사용됨
     */
    Optional<Book> findByTitleAndAuthor(String title, String author);
}
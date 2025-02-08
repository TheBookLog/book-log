package com.book.book_log.service;

import com.book.book_log.dto.BookResponseDTO;
import com.book.book_log.entity.Book;
import com.book.book_log.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepo;

    public List<BookResponseDTO> getAllBooks() {
        List<Book> books = bookRepo.findAll();
        return books.stream().map(BookResponseDTO::new).collect(Collectors.toList());
    }

    public BookResponseDTO getBookById(String id) {
        Book book = bookRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 책을 찾을 수 없습니다: " + id));
        return new BookResponseDTO(book);
    }

    // 특정 카테고리 ID로 책 조회
    public List<BookResponseDTO> getBooksByCategory(Integer categoryId) {
        List<Book> books = bookRepo.findByCategoryId(categoryId);
        return books.stream().map(BookResponseDTO::new).collect(Collectors.toList());
    }
}
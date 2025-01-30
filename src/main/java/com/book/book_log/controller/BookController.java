package com.book.book_log.controller;

import com.book.book_log.dto.AladinBookResponseDTO;
import com.book.book_log.dto.BookResponseDTO;
import com.book.book_log.service.AladinApiService;
import com.book.book_log.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final AladinApiService aladinApiSvc;
    private final BookService bookSvc;

    // 알라딘 API를 이용한 도서 검색
    @GetMapping("/search")
    public ResponseEntity<AladinBookResponseDTO> searchBooks(@RequestParam String query) {
        AladinBookResponseDTO response = aladinApiSvc.searchBooks(query);
        return ResponseEntity.ok(response);
    }

    // 모든 책 조회
    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> getAllBooks() {
        List<BookResponseDTO> books = bookSvc.getAllBooks();
        return ResponseEntity.ok(books);
    }

    // 특정 책 조회
    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> getBookById(@PathVariable String id) {
        BookResponseDTO book = bookSvc.getBookById(id);
        return ResponseEntity.ok(book);
    }

    // 특정 카테고리의 책 조회(categoryId 기준 필터링)
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<BookResponseDTO>> getBooksByCategory(@PathVariable Integer categoryId) {
        List<BookResponseDTO> books = bookSvc.getBooksByCategory(categoryId);
        return ResponseEntity.ok(books);
    }
}
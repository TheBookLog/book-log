package com.book.book_log.controller;

import com.book.book_log.dto.AladinBookResponseDTO;
import com.book.book_log.service.AladinApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BookController {
    private final AladinApiService aladinApiService;

    @GetMapping("api/books/search")
    public ResponseEntity<AladinBookResponseDTO> searchBooks(@RequestParam String query) {
        AladinBookResponseDTO response = aladinApiService.searchBooks(query);
        return ResponseEntity.ok(response);
    }
}

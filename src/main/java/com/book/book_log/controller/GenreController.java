package com.book.book_log.controller;

import com.book.book_log.dto.GenreResponseDTO;
import com.book.book_log.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreSvc;

    // 모든 장르 조회
    @GetMapping
    public ResponseEntity<List<GenreResponseDTO>> getAllGenres() {
        List<GenreResponseDTO> genres = genreSvc.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    // 특정 장르 조회
    @GetMapping("/{id}")
    public ResponseEntity<GenreResponseDTO> getGenreById(@PathVariable String id) {
        GenreResponseDTO genre = genreSvc.getGenreById(id);
        return ResponseEntity.ok(genre);
    }

    // 특정 장르 이름으로 조회
    @GetMapping("/search")
    public ResponseEntity<GenreResponseDTO> getGenreByName(@RequestParam String name) {
        GenreResponseDTO genre = genreSvc.getGenreByName(name);
        return ResponseEntity.ok(genre);
    }
}
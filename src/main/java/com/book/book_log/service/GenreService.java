package com.book.book_log.service;

import com.book.book_log.dto.GenreResponseDTO;
import com.book.book_log.entity.Genre;
import com.book.book_log.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepo;

    // 모든 장르 조회
    public List<GenreResponseDTO> getAllGenres() {
        List<Genre> genres = genreRepo.findAll();
        return genres.stream()
                .map(GenreResponseDTO::new)
                .collect(Collectors.toList());
    }

    // 특정 장르 조회
    public GenreResponseDTO getGenreById(String id) {
        Genre genre = genreRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 장르를 찾을 수 없습니다: " + id));
        return new GenreResponseDTO(genre);
    }

    // 특정 장르 조회(이름 기반)
    public GenreResponseDTO getGenreByName(String name) {
        Genre genre = genreRepo.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("해당 장르를 찾을 수 없습니다: " + name));
        return new GenreResponseDTO(genre);
    }
}
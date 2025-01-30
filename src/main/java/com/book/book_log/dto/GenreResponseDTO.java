package com.book.book_log.dto;

import com.book.book_log.entity.Genre;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GenreResponseDTO {
    private String id;
    private String name;
    private List<GenreResponseDTO> subGenres;

    public GenreResponseDTO(Genre genre) {
        this.id = genre.getId();
        this.name = genre.getName();
        this.subGenres = genre.getSubGenres().stream()
                .map(GenreResponseDTO::new)
                .collect(Collectors.toList());
    }
}
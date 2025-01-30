package com.book.book_log.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "genre")
public class Genre {
    @Id
    @UuidGenerator
    @Column(length = 36, unique = true, nullable = false, updatable = false)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Genre parent; // 상위 장르(nullable 가능)

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Genre> subGenres = new ArrayList<>(); // 하위 장르 목록
}
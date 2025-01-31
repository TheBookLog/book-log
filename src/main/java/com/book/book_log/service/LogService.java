package com.book.book_log.service;

import com.book.book_log.dto.LogRequestDTO;
import com.book.book_log.dto.LogResponseDTO;
import com.book.book_log.entity.Book;
import com.book.book_log.entity.Log;
import com.book.book_log.entity.User;
import com.book.book_log.repository.BookRepository;
import com.book.book_log.repository.LogRepository;
import com.book.book_log.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepository logRepo;
    private final BookRepository bookRepo;
    private final UserRepository userRepo;

    // Log 생성(Book 자동 저장)
    @Transactional
    public LogResponseDTO createLog(String userId, LogRequestDTO request) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다." + userId));

        // 책이 DB에 없으면 자동 저장
        Book book = bookRepo.findByTitleAndAuthor(request.getBookTitle(), request.getAuthor())
                .orElseGet(() -> {
                    Book newBook = new Book();
                    newBook.setTitle(request.getBookTitle());
                    newBook.setAuthor(request.getAuthor());
                    newBook.setPublisher(request.getPublisher());
                    newBook.setCategoryId(request.getCategoryId());
                    newBook.setCoverUrl(request.getCoverUrl());
                    return bookRepo.save(newBook);
                });

        // 별점 검증 (1~5, 0.5 단위)
        validateRating(request.getRating());

        // Log 저장
        Log log = new Log();
        log.setUser(user);
        log.setBook(book);
        log.setRating(request.getRating());
        log.setQuote(request.getQuote());
        log.setContent(request.getContent());
        log.setVisibility(request.getVisibility() != null ? request.getVisibility() : true);
        log.setStartDate(request.getStartDate());
        log.setEndDate(request.getEndDate());

        return new LogResponseDTO(logRepo.save(log));
    }

    // 특정 책에 대한 Log 목록 조회
    public List<LogResponseDTO> getLogsByBookId(String bookId) {
        List<Log> logs = logRepo.findByBookId(bookId);
        return logs.stream().map(LogResponseDTO::new).collect(Collectors.toList());
    }

    // Log 수정
    @Transactional
    public LogResponseDTO updateLog(String logId, LogRequestDTO request) {
        Log log = logRepo.findById(logId)
                .orElseThrow(() -> new IllegalArgumentException("해당 Log를 찾을 수 없습니다: " + logId));

        validateRating(request.getRating());

        log.setRating(request.getRating());
        log.setQuote(request.getQuote());
        log.setContent(request.getContent());
        log.setVisibility(request.getVisibility());
        log.setStartDate(request.getStartDate());
        log.setEndDate(request.getEndDate());

        return new LogResponseDTO(logRepo.save(log));
    }

    // Log 삭제
    @Transactional
    public void deleteLog(String logId) {
        if (!logRepo.existsById(logId)) {
            throw new IllegalArgumentException("해당 Log를 찾을 수 없습니다: " + logId);
        }
        logRepo.deleteById(logId);
    }

    // 별점 검증 로직 (1~5 범위, 0.5 단위)
    private void validateRating(Float rating) {
        if (rating == null || rating < 1 || rating > 5 || rating % 0.5 != 0) {
            throw new IllegalArgumentException("별점은 1~5 범위에서 0.5 단위로 입력해야 합니다.");
        }
    }
}
package com.book.book_log.service;

import com.book.book_log.entity.Book;
import com.book.book_log.entity.Log;
import com.book.book_log.entity.Statistics;
import com.book.book_log.repository.LogRepository;
import com.book.book_log.repository.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final StatisticsRepository statisticsRepo;
    private final LogRepository logRepo;

    /**
     * 특정 책의 통계를 업데이트하는 메서드
     * Log가 추가, 수정, 삭제될 때마다 호출됨
     */
    @Transactional
    public void updateStatistics(Book book) {
        List<Log> logs = logRepo.findByBookId(book.getId());

        int logCount = logs.size();
        double averageRating = logs.stream()
                .mapToDouble(Log::getRating)
                .average()
                .orElse(0.0);

        Statistics statistics = statisticsRepo.findById(book.getId())
                .orElseGet(() -> new Statistics());

        statistics.setBook(book);
        statistics.setLogCount(logCount);
        statistics.setAverageRating(averageRating);

        statisticsRepo.save(statistics);
    }
    /**
     * 특정 책의 통계 조회
     */
    public Statistics getStatistics(String bookId) {
        return statisticsRepo.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 책의 통계를 찾을 수 없습니다: " + bookId));
    }
}
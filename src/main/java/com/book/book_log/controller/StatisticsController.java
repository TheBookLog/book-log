package com.book.book_log.controller;

import com.book.book_log.entity.Statistics;
import com.book.book_log.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService statisticsSvc;

    /**
     * 특정 책의 통계 조회
     */
    @GetMapping("/{bookId}")
    public ResponseEntity<Statistics> getStatistics(@PathVariable("bookId") String bookId) {
        Statistics statistics = statisticsSvc.getStatistics(bookId);
        return ResponseEntity.ok(statistics);
    }
}
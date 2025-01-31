package com.book.book_log.controller;

import com.book.book_log.dto.LogRequestDTO;
import com.book.book_log.dto.LogResponseDTO;
import com.book.book_log.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class LogController {
    private final LogService logSvc;

    // Log 작성
    @PostMapping("/{userId}")
    public ResponseEntity<LogResponseDTO> createLog(@PathVariable String userId,
                                                    @RequestBody LogRequestDTO request) {
        LogResponseDTO log = logSvc.createLog(userId, request);
        return ResponseEntity.ok(log);
    }

    // 특정 책에 대한 Log 조회
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<LogResponseDTO>> getLogsByBookId(@PathVariable String bookId) {
        List<LogResponseDTO> logs = logSvc.getLogsByBookId(bookId);
        return ResponseEntity.ok(logs);
    }

    // Log 수정
    @PatchMapping("/{logId}")
    public ResponseEntity<LogResponseDTO> updateLog(@PathVariable String logId,
                                                    @RequestBody LogRequestDTO request) {
        LogResponseDTO log = logSvc.updateLog(logId, request);
        return ResponseEntity.ok(log);
    }

    // Log 삭제
    @DeleteMapping("/{logId}")
    public ResponseEntity<Void> deleteLog(@PathVariable String logId) {
        logSvc.deleteLog(logId);
        return ResponseEntity.noContent().build();
    }
}
//package com.book.book_log.repository;
//
//import com.book.book_log.entity.Log;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import java.util.List;
//
//public interface LogRepository extends JpaRepository<Log, Long> {
//
//    // 내 독서 기록 조회 (GET /api/logs/me)
//    List<Log> findByUser_Id(Long userId);
//
//    // 특정 Log 상세 조회 (GET /api/logs/{logId})
//    // JpaRepository의 findById() 메서드로 대체 가능
//
//    // 공개된 전체 기록 조회 (GET /api/logs)
//    List<Log> findByVisibilityTrue();
//
//    // 특정 책의 공개 기록 조회 (GET /api/logs?item_id={itemId})
//    List<Log> findByItemIdAndVisibilityTrue(String itemId);
//
//    // 공개 기록을 카테고리별로 조회 (GET /api/logs?category_id={id})
//    List<Log> findByCategory_IdAndVisibilityTrue(Long categoryId);
//
//    // 특정 책의 로그 개수 (특정 책의 공개 기록 조회에 포함)
//    long countByItemIdAndVisibilityTrue(String itemId);
//
//    // 특정 책의 별점 평균 (특정 책의 공개 기록 조회에 포함)
//    @Query("SELECT AVG(l.rating) FROM Log l WHERE l.itemId = :itemId AND l.visibility = true")
//    Double findAverageRatingByItemIdAndVisibilityTrue(@Param("itemId") String itemId);
//}
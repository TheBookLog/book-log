package com.book.book_log.config;

import com.book.book_log.entity.TestDocument;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TestDataLoader {
    private final MongoTemplate mongoTemplate;

    @PostConstruct
    public void init() {
        TestDocument doc = new TestDocument();
        doc.setMessage("Hello MongoDB");
        mongoTemplate.save(doc);
    }
}
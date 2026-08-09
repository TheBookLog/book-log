package com.book.book_log;

import com.book.book_log.config.TestcontainersConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(TestcontainersConfig.class)
class BookLogApplicationTests {

	@Test
	void contextLoads() {
	}

}

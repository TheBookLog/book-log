package com.book.book_log.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.containers.PostgreSQLContainer;

/**
 * 테스트 실행 시 PostgreSQL 컨테이너를 띄운다. 로컬에 Docker 데몬이 떠 있어야 한다.
 * {@code @ServiceConnection}이 컨테이너 접속 정보를 DataSource에 자동으로 연결하므로
 * properties에 datasource 설정을 적지 않는다.
 */
@TestConfiguration(proxyBeanMethods = false)
public class TestcontainersConfig {

    @Bean
    @ServiceConnection
    PostgreSQLContainer<?> postgresContainer() {
        return new PostgreSQLContainer<>("postgres:16-alpine");
    }
}

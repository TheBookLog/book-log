package com.book.book_log.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**",       // Swagger UI 경로
                                "/v3/api-docs/**",      // OpenAPI docs
                                "/v3/api-docs.yaml"     // OpenAPI YAML
                        ).permitAll()                // 인증 없이 허용
                        .anyRequest().permitAll()    // 모든 요청 허용 (테스트용)
                )
                .securityContext(context -> context.requireExplicitSave(false)); // 인증 상태 유지 설정
        return http.build();
    }
}
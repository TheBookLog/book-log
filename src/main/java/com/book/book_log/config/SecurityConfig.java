package com.book.book_log.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                                "/v3/api-docs.yaml",     // OpenAPI YAML
                                "/api/auth/kakao-login/**", // 카카오 로그인 엔드포인트
                                "/login/oauth2/**", // Spring Security OAuth2 로그인 리다이렉트
                                "/api/auth/issue-token", // JWT 발급 엔드포인트 허용
                                "/api/books/**" // 도서 검색 API 인증 없이 허용
                        ).permitAll()                // 인증 없이 허용
                        .anyRequest().authenticated()    // 나머지 요청은 인증 필요
                )
                .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class) // 필터 추가
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/api/auth/kakao-login/success") // 로그인 성공 시 리다이렉트 경로
                        .failureUrl("/api/auth/kakao-login/failure") // 로그인 실패 시 리다이렉트 경로
                )
                .securityContext(context -> context.requireExplicitSave(false)); // 인증 상태 유지 설정
        return http.build();
    }
}
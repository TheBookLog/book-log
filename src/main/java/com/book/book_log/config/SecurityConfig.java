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
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml",
                                "/login/oauth2/**",
                                "/api/auth/**", // ✅ "/api/auth/" 하위의 모든 경로를 인증 없이 허용
                                "/api/books/**",
                                "/api/categories/**",
                                "/api/logs/**",
                                "/api/users/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                         .defaultSuccessUrl("/api/auth/kakao-login/success")
                        .failureUrl("/api/auth/kakao-login/failure")
                )
                .securityContext(context -> context.requireExplicitSave(false));
        return http.build();
    }
}
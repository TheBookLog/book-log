package com.book.book_log.config;

import com.book.book_log.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 특정 경로 예외 처리 (OAuth2 관련 경로는 필터 제외)
        String requestUri = request.getRequestURI();
        if (requestUri.startsWith("/api/auth/kakao-login")) {
            filterChain.doFilter(request, response); // 필터 건너뛰기
            return;
        }

        // JWT 토큰 처리
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer")) {
            String token = header.substring(7); // "Bearer " 이후의 토큰 값
            try {
                System.out.println("Extracted Token: " + token); // 디버깅 로그: 토큰 확인
                String userId = JwtUtil.validateToken(token); // JWT 검증 및 userId 추출
                System.out.println("Validated UserId: " + userId); // 디버깅 로그: 검증된 userId

                // SecurityContext에 인증 정보 저장
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userId, null, List.of(new SimpleGrantedAuthority("USER")));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (RuntimeException e) {
                System.err.println("JWT Validation Error: " + e.getMessage()); // 디버깅 로그: 예외 메시지
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT token");
                return;
            }
        }

        filterChain.doFilter(request, response); // 다음 필터로 이동
    }
}
package com.book.book_log.config;

import com.book.book_log.util.JwtCookieFactory;
import com.book.book_log.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 특정 경로 예외 처리 (OAuth2 관련 경로는 필터 제외)
        String requestUri = request.getRequestURI();
        if (requestUri.startsWith("/api/auth/kakao-login")) {
            filterChain.doFilter(request, response); // 필터 건너뛰기
            return;
        }

        String token = resolveToken(request);
        if (token != null) {
            try {
                String userId = jwtUtil.validateToken(token); // JWT 검증 및 userId 추출

                // SecurityContext에 인증 정보 저장
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userId, null, List.of(new SimpleGrantedAuthority("USER")));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (RuntimeException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write("{\"message\":\"유효하지 않거나 만료된 토큰입니다.\"}");
                return;
            }
        }

        filterChain.doFilter(request, response); // 다음 필터로 이동
    }

    // 브라우저는 쿠키로, Swagger·Postman 같은 도구는 헤더로 보낸다
    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        if (request.getCookies() == null) {
            return null;
        }
        return Arrays.stream(request.getCookies())
                .filter(c -> JwtCookieFactory.COOKIE_NAME.equals(c.getName()))
                .map(Cookie::getValue)
                .filter(v -> !v.isBlank())
                .findFirst()
                .orElse(null);
    }
}

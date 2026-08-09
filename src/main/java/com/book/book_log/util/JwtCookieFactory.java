package com.book.book_log.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class JwtCookieFactory {

    public static final String COOKIE_NAME = "accessToken";

    private final JwtUtil jwtUtil;

    // 배포(HTTPS) 환경에서는 true로 올린다
    @Value("${app.auth.cookie-secure:false}")
    private boolean secure;

    public ResponseCookie create(String token) {
        return build(token, Duration.ofMillis(jwtUtil.getExpirationMs()));
    }

    public ResponseCookie expire() {
        return build("", Duration.ZERO);
    }

    private ResponseCookie build(String value, Duration maxAge) {
        return ResponseCookie.from(COOKIE_NAME, value)
                .httpOnly(true)
                .secure(secure)
                .sameSite("Lax") // 다른 사이트에서 시작된 요청에는 쿠키를 붙이지 않는다 (CSRF 방어)
                .path("/")
                .maxAge(maxAge)
                .build();
    }
}

package com.book.book_log.controller;

import com.book.book_log.dto.UserResponseDTO;
import com.book.book_log.service.CustomOAuth2UserService;
import com.book.book_log.util.JwtCookieFactory;
import com.book.book_log.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final CustomOAuth2UserService oAuth2uSvc;
    private final OAuth2AuthorizedClientService authorizedClientSvc;
    private final JwtCookieFactory jwtCookieFactory;
    private final JwtUtil jwtUtil;

    // 카카오 로그인 성공 리디렉션 처리
    @GetMapping("/kakao-login/success")
    public ResponseEntity<Void> kakaoLoginSuccess(OAuth2AuthenticationToken authenticationToken) {
        // 로그인 흐름을 거치지 않고 직접 호출하면 토큰이 없다
        if (authenticationToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            OAuth2AuthorizedClient authorizedClient = authorizedClientSvc.loadAuthorizedClient(
                    authenticationToken.getAuthorizedClientRegistrationId(),
                    authenticationToken.getName()
            );

            OAuth2AccessToken accessToken = authorizedClient.getAccessToken();

            UserResponseDTO user = oAuth2uSvc.processOAuth2User(authenticationToken, accessToken);
            String jwt = jwtUtil.generateToken(user.getId());

            // JWT는 HttpOnly 쿠키로만 전달한다. 주소창에 실으면 히스토리·액세스 로그에 남는다.
            String redirectUrl = String.format("http://localhost:3000/oauth/kakao/success?userId=%s",
                    user.getId());

            return ResponseEntity.status(HttpStatus.FOUND)
                    .header(HttpHeaders.SET_COOKIE, jwtCookieFactory.create(jwt).toString())
                    .location(URI.create(redirectUrl))
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 사용자의 JWT 발급 및 전달
    @PostMapping("/issue-token")
    public ResponseEntity<String> issueJwtToken(@RequestBody UserResponseDTO user) {
        if (user.getId() == null || user.getId().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID is required");
        }
        String jwtToken = jwtUtil.generateToken(user.getId());
        return ResponseEntity.ok(jwtToken);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookieFactory.expire().toString())
                .body("성공적으로 로그아웃 되었습니다.");
    }
}
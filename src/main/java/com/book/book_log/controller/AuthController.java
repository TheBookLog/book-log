package com.book.book_log.controller;

import com.book.book_log.dto.UserResponseDTO;
import com.book.book_log.service.CustomOAuth2UserService;
import com.book.book_log.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final CustomOAuth2UserService oAuth2uSvc;
    private final OAuth2AuthorizedClientService authorizedClientSvc;

    // 카카오 로그인 콜백 엔드포인트
    @PostMapping("/kakao-login/callback")
    public ResponseEntity<?> kakaoLoginCallback(OAuth2AuthenticationToken authenticationToken) {
        try {
            // 인증된 사용자와 관련된 OAuth2AuthorizedClient 가져오기
            OAuth2AuthorizedClient authorizedClient = authorizedClientSvc.loadAuthorizedClient(
                    authenticationToken.getAuthorizedClientRegistrationId(),
                    authenticationToken.getName()
            );

            // OAuth2 Access Token 가져오기
            OAuth2AccessToken accessToken = authorizedClient.getAccessToken();

            // CustomOAuth2UserService에서 사용자 정보 처리
            UserResponseDTO user = oAuth2uSvc.processOAuth2User(authenticationToken, accessToken);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("로그인 처리 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 사용자의 JWT 발급 및 전달
    @PostMapping("/issue-token")
    public ResponseEntity<String> issueJwtToken(@RequestBody UserResponseDTO user) {
        if (user.getId() == null || user.getId().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID is required");
        }
        String jwtToken = JwtUtil.generateToken(user.getId());
        return ResponseEntity.ok(jwtToken);
    }
}

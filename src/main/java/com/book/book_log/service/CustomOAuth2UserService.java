package com.book.book_log.service;

import com.book.book_log.dto.UserResponseDTO;
import com.book.book_log.entity.AgeGroup;
import com.book.book_log.entity.Gender;
import com.book.book_log.entity.OAuthProvider;
import com.book.book_log.entity.User;
import com.book.book_log.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService {

    private final UserRepository uRepo;
    private final OAuth2AuthorizedClientService authorizedClientService;

    @Transactional
    public UserResponseDTO processOAuth2User(OAuth2AuthenticationToken authenticationToken, OAuth2AccessToken accessToken) {
        Map<String, Object> attributes = authenticationToken.getPrincipal().getAttributes();
        System.out.println("✅ OAuth2 Attributes: " + attributes);

        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName()
        );
        ClientRegistration clientRegistration = authorizedClient.getClientRegistration();
        String provider = clientRegistration.getRegistrationId().toUpperCase();
        OAuthProvider oauthProvider = OAuthProvider.valueOf(provider);

        String oauthId = attributes.get("id").toString();

        // username 추출 (kakao_account.profile.nickname)
        String username = "UNKNOWN";
        try {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            username = profile.get("nickname").toString();
        } catch (Exception e) {
            System.err.println("카카오 닉네임 추출 실패: " + e.getMessage());
        }

        // 기존 사용자 조회
        User user = uRepo.findByOauthIdAndOauthProvider(oauthId, oauthProvider).orElse(null);
        boolean isNew = false; // ✅ 추가됨

        // 최초 로그인이라면 사용자 등록
        if (user == null) {
            isNew = true; // ✅ 추가됨
            user = new User();
            user.setOauthId(oauthId);
            user.setUsername(username);
            user.setGender(Gender.UNKNOWN);
            user.setAgeGroup(AgeGroup.UNKNOWN);
            user.setOauthProvider(oauthProvider);
            user.setOauthToken(accessToken.getTokenValue());
            user.setRefreshToken(accessToken.getTokenValue());
            user.setExpiresAt(accessToken.getExpiresAt().atZone(ZoneId.systemDefault()).toLocalDateTime());

            user = uRepo.save(user);
        } else {
            if (user.getGender() == Gender.UNKNOWN || user.getAgeGroup() == AgeGroup.UNKNOWN) {
                isNew = true;
            }
        }

        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getGender() != null ? user.getGender().toString() : null,
                user.getAgeGroup() != null ? user.getAgeGroup().toString() : null,
                user.getOauthProvider().toString(),
                isNew // ✅ 추가됨
        );
    }
}

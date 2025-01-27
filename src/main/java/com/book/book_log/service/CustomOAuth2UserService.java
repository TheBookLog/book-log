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
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService {

    private final UserRepository uRepo;
    private final OAuth2AuthorizedClientService authorizedClientService;

    public UserResponseDTO processOAuth2User(OAuth2AuthenticationToken authenticationToken, OAuth2AccessToken accessToken) {
        Map<String, Object> attributes = authenticationToken.getPrincipal().getAttributes();

        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName()
        );
        ClientRegistration clientRegistration = authorizedClient.getClientRegistration();
        String provider = clientRegistration.getRegistrationId().toUpperCase();

        String providerId = attributes.get("id").toString();
        String username = attributes.containsKey("profile_nickname") ?
                attributes.get("profile_nickname").toString() : "UNKNOWN";

        User user = uRepo.findById(providerId).orElseGet(() -> {
            User newUser = new User();
            newUser.setId(providerId);
            newUser.setUsername(username);
            newUser.setGender(Gender.UNKNOWN);
            newUser.setAge_group(AgeGroup.UNKNOWN);
            newUser.setOauth_provider(OAuthProvider.valueOf(provider));
            newUser.setOauth_token(accessToken.getTokenValue());
            newUser.setRefresh_token(accessToken.getTokenValue());
            newUser.setExpires_at(accessToken.getExpiresAt().atZone(ZoneId.systemDefault()).toLocalDateTime());
            return uRepo.save(newUser);
        });

        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getGender() != null ? user.getGender().toString() : null,
                user.getAge_group() != null ? user.getAge_group().toString() : null,
                user.getOauth_provider().toString()
        );
    }
}

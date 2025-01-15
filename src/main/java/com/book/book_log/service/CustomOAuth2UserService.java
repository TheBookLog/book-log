package com.book.book_log.service;

import com.book.book_log.entity.AgeGroup;
import com.book.book_log.entity.Gender;
import com.book.book_log.entity.OAuthProvider;
import com.book.book_log.entity.User;
import com.book.book_log.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository uRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) new DefaultOAuth2UserService().loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        String providerId = attributes.get("id").toString();
        String username = attributes.containsKey("profile_nickname") ?
                attributes.get("profile_nickname").toString() : "UNKNOWN";

        User user = uRepo.findById(providerId)
                .orElseGet(() -> createUser(providerId, username, provider));

        return new DefaultOAuth2User(oAuth2User.getAuthorities(), attributes, "id");
    }

    private User createUser(String providerId, String username, String provider) {
        User user = new User();
        user.setId(providerId);
        user.setUsername(username);
        user.setGender(Gender.UNKNOWN); // 초기에는 UNKNOWN 처리
        user.setAge_group(AgeGroup.UNKNOWN); // 초기에는 UNKNOWN 처리
        user.setOauth_provider(OAuthProvider.valueOf(provider));
        uRepo.save(user);
        return user;
    }
}

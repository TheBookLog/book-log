package com.book.book_log.dto;

import lombok.Getter;
import lombok.NoArgsConstructor; // ✅ NoArgsConstructor 추가

@Getter
// @NoArgsConstructor // ✅ NoArgsConstructor가 필요하다면 추가 (final 필드 때문에 직접 구현하는 것이 더 좋음)
public class UserResponseDTO {
    private final Long id; // ✅ Long 타입으로 변경되었고, final로 불변성을 가짐
    private final String username;
    private final String gender;
    private final String ageGroup;
    private final String oauthProvider;
    private final boolean isNew;

    public UserResponseDTO(Long id, String username, String gender, String ageGroup, String oauthProvider, boolean isNew) {
        this.id = id;
        this.username = username;
        this.gender = gender;
        this.ageGroup = ageGroup;
        this.oauthProvider = oauthProvider;
        this.isNew = isNew;
    }
}
package com.book.book_log.dto;

import lombok.Getter;

@Getter
public class UserResponseDTO {
    private final String id;
    private final String username;
    private final String gender;
    private final String ageGroup;
    private final String oauthProvider;

    public UserResponseDTO(String id, String username, String gender, String ageGroup, String oauthProvider) {
        this.id = id;
        this.username = username;
        this.gender = gender;
        this.ageGroup = ageGroup;
        this.oauthProvider = oauthProvider;
    }
}

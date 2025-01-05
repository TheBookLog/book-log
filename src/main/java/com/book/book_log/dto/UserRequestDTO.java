package com.book.book_log.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRequestDTO {
    private String username;
    private String gender;
    private String ageGroup;

    public UserRequestDTO(String username, String gender, String ageGroup) {
        this.username = username;
        this.gender = gender;
        this.ageGroup = ageGroup;
    }
}

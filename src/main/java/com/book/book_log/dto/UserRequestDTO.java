package com.book.book_log.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRequestDTO {
    private String username;

    @Schema(description = "성별 (허용값: MALE, FEMALE, UNKNOWN)", example = "MALE", allowableValues = {"MALE", "FEMALE", "UNKNOWN"})
    private String gender;

    @Schema(description = "연령대 (허용값: AGE_10S, AGE_20S, AGE_30S, AGE_40S, AGE_50S, AGE_60_PLUS)", example = "AGE_20S", allowableValues = {"AGE_10S", "AGE_20S", "AGE_30S", "AGE_40S", "AGE_50S", "AGE_60_PLUS"})
    private String ageGroup;

    public UserRequestDTO(String username, String gender, String ageGroup) {
        this.username = username;
        this.gender = gender;
        this.ageGroup = ageGroup;
    }
}

package com.book.book_log.service;

import com.book.book_log.dto.UserRequestDTO;
import com.book.book_log.dto.UserResponseDTO;
import com.book.book_log.entity.AgeGroup;
import com.book.book_log.entity.Gender;
import com.book.book_log.entity.User;
import com.book.book_log.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository uRepo;

    // 사용자 조회
    public UserResponseDTO getUserById(String id) {
        User user =  uRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        return toResponseDTO(user);
    }

    // 사용자 정보 업데이트
    public UserResponseDTO updateUser(String id, UserRequestDTO dto) {
        User user = uRepo.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        user.setUsername(dto.getUsername());
        user.setGender(Gender.valueOf(dto.getGender().toUpperCase())); // String -> ENUM
        user.setAge_group(AgeGroup.valueOf(dto.getAgeGroup().toUpperCase())); //String -> ENUM

        User updatedUser = uRepo.save(user);
        return toResponseDTO(updatedUser); // User -> DTO 변환
    }

    // 사용자 삭제
    public void deleteUser(String id) {
        if (!uRepo.existsById(id)) {
            throw new EntityNotFoundException("사용자를 찾을 수 없습니다.");
        }
        uRepo.deleteById(id);
    }

    // 닉네임 중복 확인
    public boolean isUsernameAvailable(String username) {
        return !uRepo.existsByUsername(username);
    }

    // DTO 변환 메서드
    private UserResponseDTO toResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getGender() != null ? user.getGender().toString() : null, // ENUM -> String
                user.getAge_group() != null ? user.getAge_group().toString() : null, // ENUM -> String
                user.getOauth_provider().toString() // ENUM -> String
        );
    }
}
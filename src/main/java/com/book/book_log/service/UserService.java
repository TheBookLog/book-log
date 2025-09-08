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
public class UserService {

    private final UserRepository uRepo;

    // 사용자 조회
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id) {
        User user = uRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        return toResponseDTO(user);
    }

    // 사용자 정보 업데이트
    @Transactional
    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {
        User user = uRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        if (dto.getUsername() != null) {
            user.setUsername(dto.getUsername());
        }

        if (dto.getGender() != null) {
            user.setGender(Gender.valueOf(dto.getGender().toUpperCase()));
        }

        if (dto.getAgeGroup() != null) {
            user.setAgeGroup(AgeGroup.valueOf(dto.getAgeGroup().toUpperCase()));
        }

        return toResponseDTO(user);
    }

    // 사용자 삭제
    @Transactional
    public void deleteUser(Long id) {
        // 엔티티 존재 여부 확인 후 삭제 (findById로 대체)
        User user = uRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        uRepo.delete(user);
    }

    // 닉네임 중복 확인
    @Transactional(readOnly = true)
    public boolean isUsernameAvailable(String username) {
        return !uRepo.existsByUsername(username);
    }

    // DTO 변환 메서드
    private UserResponseDTO toResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getGender() != null ? user.getGender().toString() : null,
                user.getAgeGroup() != null ? user.getAgeGroup().toString() : null,
                user.getOauthProvider().toString(),
                false
        );
    }
}
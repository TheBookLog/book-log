package com.book.book_log.service;

import com.book.book_log.entity.User;
import com.book.book_log.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository uRepo;

    // 사용자 생성
    public User createUser(User user) {
        if (uRepo.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }
        return uRepo.save(user);
    }

    // 사용자 조회
    public User getUserById(String id) {
        return uRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    // 사용자 정보 업데이트
    public User updateUser(String id, User updatedUser) {
        User user = getUserById(id); // ID를 통해 기존 사용자 조회
        user.setUsername(updatedUser.getUsername());
        user.setGender(updatedUser.getGender());
        user.setAge_group(updatedUser.getAge_group());
        return uRepo.save(user); // 변경된 사용자 저장
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

    // 이메일 기반 사용자 조회 (소셜 로그인에 사용됨)
    public Optional<User> findUserByEmail(String email) {
        return uRepo.findByEmail(email);
    }
}

package com.book.book_log.controller;

import com.book.book_log.dto.UserRequestDTO;
import com.book.book_log.dto.UserResponseDTO;
import com.book.book_log.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService uSvc;

    // 사용자 정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        try {
            System.out.println("Fetching User ID: " + id); // 추가 로그: 요청받은 ID 확인
            UserResponseDTO user = uSvc.getUserById(id);
            System.out.println("Fetched User: " + user); // 추가 로그: 조회된 사용자 정보 확인
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.err.println("Error fetching user: " + e.getMessage()); // 추가 로그: 예외 메시지 확인
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    // 사용자 정보 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable String id,
            @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO updatedUser = uSvc.updateUser(id, userRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        uSvc.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // 닉네임 중복 확인
    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean isAvailable = uSvc.isUsernameAvailable(username);
        return ResponseEntity.ok(isAvailable);
    }
}
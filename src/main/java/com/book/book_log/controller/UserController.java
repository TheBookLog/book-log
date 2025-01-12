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

    // 사용자 생성
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO createUser = uSvc.createUser(userRequestDTO);
        return new ResponseEntity<>(createUser, HttpStatus.CREATED);
    }

    // 사용자 정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable String id) {
        UserResponseDTO user = uSvc.getUserById(id);
        return ResponseEntity.ok(user);
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
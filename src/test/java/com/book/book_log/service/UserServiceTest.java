package com.book.book_log.service;

import com.book.book_log.dto.UserRequestDTO;
import com.book.book_log.dto.UserResponseDTO;
import com.book.book_log.entity.AgeGroup;
import com.book.book_log.entity.Gender;
import com.book.book_log.entity.User;
import com.book.book_log.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Mockito 초기화
    }

    @Test
    void createUser_Success() {
        // given
        UserRequestDTO request = new UserRequestDTO("example", "MALE", "AGE_20S");
        User user = new User();
        user.setId("12345");
        user.setUsername("example");
        user.setGender(Gender.MALE);
        user.setAge_group(AgeGroup.AGE_20S);

        when(userRepository.existsByUsername("example")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // when
        UserResponseDTO response = userService.createUser(request);

        // then
        assertNotNull(response);
        assertEquals("example", response.getUsername());
        assertEquals("MALE", response.getGender());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void getUserById_Success() {
        // given
        User user = new User();
        user.setId("12345");
        user.setUsername("example");
        user.setGender(Gender.MALE);
        user.setAge_group(AgeGroup.AGE_20S);

        when(userRepository.findById("12345")).thenReturn(Optional.of(user));

        // when
        UserResponseDTO response = userService.getUserById("12345");

        // then
        assertNotNull(response);
        assertEquals("example", response.getUsername());
        assertEquals("MALE", response.getGender());
        verify(userRepository, times(1)).findById("12345");
    }

    @Test
    void getUserById_NotFound() {
        // given
        when(userRepository.findById("12345")).thenReturn(Optional.empty());

        // when & then
        assertThrows(EntityNotFoundException.class, () -> userService.getUserById("12345"));
        verify(userRepository, times(1)).findById("12345");
    }

    @Test
    void deleteUser_Success() {
        // given
        when(userRepository.existsById("12345")).thenReturn(true);

        // when
        userService.deleteUser("12345");

        // then
        verify(userRepository, times(1)).deleteById("12345");
    }

    @Test
    void deleteUser_NotFound() {
        // given
        when(userRepository.existsById("12345")).thenReturn(false);

        // when & then
        assertThrows(EntityNotFoundException.class, () -> userService.deleteUser("12345"));
        verify(userRepository, times(0)).deleteById("12345");
    }

}
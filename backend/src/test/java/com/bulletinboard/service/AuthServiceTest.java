package com.bulletinboard.service;

import com.bulletinboard.model.User;
import com.bulletinboard.repository.UserRepository;
import com.bulletinboard.util.CipherUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLogin() {
        String account = "tester";
        String password = "password";
        String encryptedPassword = CipherUtil.encrypt(password);

        User user = new User();
        user.setAccount(account);
        user.setPassword(encryptedPassword);

        when(userRepository.findByAccountAndPassword(account, encryptedPassword)).thenReturn(Optional.of(user));

        User result = authService.login(account, password);

        assertNotNull(result);
        assertEquals(account, result.getAccount());
    }

    @Test
    public void testLoginInvalidAccountOrPassword() {
        String account = "invalid";
        String password = "invalid";
        String encryptedPassword = CipherUtil.encrypt(password);

        when(userRepository.findByAccountAndPassword(account, encryptedPassword)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> authService.login(account, password));
        assertEquals("Invalid account or password", exception.getMessage());
    }
}

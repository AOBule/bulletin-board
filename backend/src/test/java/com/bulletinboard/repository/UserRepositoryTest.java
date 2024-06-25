package com.bulletinboard.repository;

import com.bulletinboard.model.User;
import com.bulletinboard.util.CipherUtil;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByAccountAndPassword() {
        String account = "hoge";
        String password = "hogehoge"; // 平文のパスワード
        String encryptedPassword = CipherUtil.encrypt(password);

        Optional<User> user = userRepository.findByAccountAndPassword(account, encryptedPassword);
        assertTrue(user.isPresent());
        assertEquals("hoge", user.get().getAccount());
    }
}

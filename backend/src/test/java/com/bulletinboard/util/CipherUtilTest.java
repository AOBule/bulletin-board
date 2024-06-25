package com.bulletinboard.util;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Test;

public class CipherUtilTest {

    @Test
    public void testEncrypt() {
        String password = "hogehoge";
        String encryptedPassword = CipherUtil.encrypt(password);

        // 確認のため、同じパスワードを再度暗号化しても同じ結果になること
        String encryptedPasswordAgain = CipherUtil.encrypt(password);
        assertEquals(encryptedPassword, encryptedPasswordAgain);

        // 暗号化されたパスワードは元のパスワードと異なること
        assertNotEquals(password, encryptedPassword);
    }

    @Test
    public void testEncryptDifferentPasswords() {
        String password1 = "password1";
        String password2 = "password2";

        String encryptedPassword1 = CipherUtil.encrypt(password1);
        String encryptedPassword2 = CipherUtil.encrypt(password2);

        // 異なるパスワードが異なる結果になること
        assertNotEquals(encryptedPassword1, encryptedPassword2);
    }
}

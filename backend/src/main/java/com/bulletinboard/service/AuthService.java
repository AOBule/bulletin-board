package com.bulletinboard.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bulletinboard.util.CipherUtil;

import com.bulletinboard.model.User;
import com.bulletinboard.repository.UserRepository;

@Service
public class AuthService {

  private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
  
  @Autowired
  private UserRepository userRepository;

  public User login(String account, String password) {
    String encryptedPassword = CipherUtil.encrypt(password);
    // アカウントと暗号化されたPWのペアでDB検索し、対象があった場合のみログイン可
    // パスワード復号を省く
    User user = userRepository.findByAccountAndPassword(account, encryptedPassword)
            .orElseThrow(() -> new RuntimeException("Invalid account or password"));
    logger.info("User logged in successfully: {}", user.getAccount());
    return user;
  }
}

package com.bulletinboard.controller;

import org.springframework.web.bind.annotation.RestController;

import com.bulletinboard.model.User;
import com.bulletinboard.repository.UserRepository;
import com.bulletinboard.service.UserService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/users")
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(BranchController.class);

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;

  @PostMapping
  public ResponseEntity<String> registerUser(@RequestBody User user) {
      if(userRepository.existsByAccount(user.getAccount())){
        return ResponseEntity.status(HttpStatus.CONFLICT).body("E0015");
      }
      try {
        userService.saveUser(user);
        return ResponseEntity.ok("ユーザー登録成功");
    } catch (DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ユーザー登録失敗");
    }
  }

  @GetMapping
  public List<User> getAllUsers() {
      return userService.getAllUsers();
  }

  @PutMapping("/{id}")
  public void updateUser(@PathVariable Long id, @RequestBody User user) {
      userService.updateUser(id, user);
  }

  @PutMapping("/{id}/toggle")
  public void toggleUserStatus(@PathVariable Long id) {
    logger.info("リクエスト受信");
    userService.toggleUserStatus(id);
  }
}

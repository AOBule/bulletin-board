package com.bulletinboard.controller;

import org.springframework.web.bind.annotation.RestController;

import com.bulletinboard.model.User;
import com.bulletinboard.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<User> login(@RequestBody User user){
    User authenticatedUser = authService.login(user.getAccount(), user.getPassword());
    return ResponseEntity.ok(authenticatedUser);
  }

}

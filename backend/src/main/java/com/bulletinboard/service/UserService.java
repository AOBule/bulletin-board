package com.bulletinboard.service;

import java.time.LocalDateTime;
import java.util.List;
import org.apache.commons.lang3.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bulletinboard.model.User;
import com.bulletinboard.repository.UserRepository;
import com.bulletinboard.util.CipherUtil;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User saveUser(User user) {
        String encryptedPassword = CipherUtil.encrypt(user.getPassword());
        user.setPassword(encryptedPassword);
        return userRepository.save(user);
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }
  public void updateUser(Long id, User user) {
    User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    existingUser.setAccount(user.getAccount());
    if(!StringUtils.isEmpty(user.getPassword())){
      String encryptedPassword = CipherUtil.encrypt(user.getPassword());
      existingUser.setPassword(encryptedPassword);
    }
    existingUser.setName(user.getName());
    existingUser.setBranchId(user.getBranchId());
    existingUser.setDepartmentId(user.getDepartmentId());
    userRepository.save(existingUser);
  }

  public void toggleUserStatus(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    user.setIsStopped(!user.getIsStopped());
    userRepository.save(user);
  }
}

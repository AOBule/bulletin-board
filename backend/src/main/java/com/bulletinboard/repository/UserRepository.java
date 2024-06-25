package com.bulletinboard.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bulletinboard.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
  Optional<User> findByAccountAndPassword(String account, String password);

  boolean existsByAccount(String account);
}

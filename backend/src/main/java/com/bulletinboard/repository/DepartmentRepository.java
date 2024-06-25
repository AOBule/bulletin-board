package com.bulletinboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bulletinboard.model.Departments;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Departments, Long> {
}
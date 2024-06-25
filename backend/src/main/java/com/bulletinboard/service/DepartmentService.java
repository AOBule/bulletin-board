package com.bulletinboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bulletinboard.model.Departments;
import com.bulletinboard.repository.DepartmentRepository;

@Service
public class DepartmentService {

  @Autowired
  private DepartmentRepository departmentRepository;

  public List<Departments> getAllDepartments(){
    return departmentRepository.findAll();
  }
}

package com.bulletinboard.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import com.bulletinboard.model.Branches;
import com.bulletinboard.model.Departments;
import com.bulletinboard.service.BranchService;
import com.bulletinboard.service.DepartmentService;

import java.util.List;


@RestController
@RequestMapping("/api/branches")
public class BranchController {

  private static final Logger logger = LoggerFactory.getLogger(BranchController.class);

  @Autowired
  private BranchService branchService;

  @Autowired
  private DepartmentService departmentService;

  @GetMapping
  public BranchResponse getAllBranchesAndDepartments() {
    logger.info("request来てるで");
    List<Branches> branches = branchService.getAllBranches();
    List<Departments> departments = departmentService.getAllDepartments();

    BranchResponse branchResponse = new BranchResponse(branches, departments);
    logger.info("取得したよ");
    logger.info("Response: {}", branchResponse.branches.size());
    return branchResponse;
  }

  public static class BranchResponse {
      private List<Branches> branches;
      private List<Departments> departments;

      public BranchResponse(List<Branches> branches, List<Departments> departments) {
          this.branches = branches;
          this.departments = departments;
      }

      public List<Branches> getBranches() {
          return branches;
      }

      public List<Departments> getDepartments() {
          return departments;
      }
  }
}
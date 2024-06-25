package com.bulletinboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bulletinboard.model.Branches;
import com.bulletinboard.repository.BranchRepository;

@Service
public class BranchService {
  @Autowired
    private BranchRepository branchRepository;

    public List<Branches> getAllBranches() {
        return branchRepository.findAll();
    }
}

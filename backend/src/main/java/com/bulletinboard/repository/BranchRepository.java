package com.bulletinboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bulletinboard.model.Branches;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository extends JpaRepository<Branches, Long> {
}

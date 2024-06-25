package com.bulletinboard.service;

import com.bulletinboard.model.Branches;
import com.bulletinboard.repository.BranchRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class BranchServiceTest {

    @Autowired
    BranchRepository branchRepository;

    @Test
    public void testGetAllBranches() {
        Branches branch1 = new Branches();
        branch1.setId(1L);
        branch1.setName("本社");

        Branches branch2 = new Branches();
        branch2.setId(2L);
        branch2.setName("支社A");

        List<Branches> dbBranch = branchRepository.findAll();

        assertEquals(4, dbBranch.size());
        assertEquals("本社", dbBranch.get(0).getName());
        assertEquals("A支社", dbBranch.get(1).getName());
    }
}

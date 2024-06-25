package com.bulletinboard.service;

import com.bulletinboard.model.Departments;
import com.bulletinboard.repository.DepartmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class DepartmentServiceTest {

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private DepartmentService departmentService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllDepartments() {
        Departments department1 = new Departments();
        department1.setId(1L);
        department1.setName("総務人事部");

        Departments department2 = new Departments();
        department2.setId(2L);
        department2.setName("情報管理部");

        when(departmentRepository.findAll()).thenReturn(Arrays.asList(department1, department2));

        List<Departments> departments = departmentService.getAllDepartments();
        assertEquals(2, departments.size());
        assertEquals("総務人事部", departments.get(0).getName());
        assertEquals("情報管理部", departments.get(1).getName());
    }
}

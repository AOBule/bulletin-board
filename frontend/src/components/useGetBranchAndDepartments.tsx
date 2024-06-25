import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Department{
  id: number;
  name: string;
}

export interface Branch{
  id: number;
  name: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const useGetBranchAndDepartments = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [branchDepartmentMap, setBranchDepartmentMap] = useState<Map<number, Department[]>>(new Map());

  useEffect(() => {
    const getBranchAndDepartments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/branches`);
        setBranches(response.data.branches);
        setDepartments(response.data.departments);

        const map = new Map<number, Department[]>();
        response.data.branches.forEach((b: Branch) => {
          if(b.id === 1) {
            map.set(b.id, response.data.departments.filter((department: Department) => department.id === 1 || department.id === 2));
          } else {
            map.set(b.id, response.data.departments.filter((department: Department) => department.id === 3 || department.id === 4));
          }
        });
        setBranchDepartmentMap(map);
      } catch (err) {
        console.error('支店と部署の取得に失敗しました。')
      }
    };
    getBranchAndDepartments();
  }, []);
  return { branches, departments, branchDepartmentMap };
};

export default useGetBranchAndDepartments;
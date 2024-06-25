import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import RegisterUser from './RegisterUser';
import EditUser from './EditUser';
import '../styles/Modal.scss';
import '../styles/UserManagement.scss';
import useGetBranchAndDepartments, { Branch, Department } from '../components/useGetBranchAndDepartments';

Modal.setAppElement('#root');

interface User {
  id: number;
  account: string;
  name: string;
  branchId: number;
  departmentId: number;
  isStopped: boolean;
  branchName: string;
  departmentName: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { branches, departments } = useGetBranchAndDepartments();
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' }>({ key: 'account', direction: 'ascending' });


  useEffect(() => {
    if(branches.length > 0 && departments.length > 0){
      console.log('Branches:', branches);
    console.log('Departments:', departments);
      fetchUsers();
    }
  }, [branches, departments]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const usersData: User[] = response.data.map((user: User) => {
        const branch = branches.find(b => user.branchId === b.id);
        const department = departments.find(d => user.departmentId === d.id);

        console.log('User:', user);
        console.log('Branch found:', branch);
        console.log('Department found:', department);

        return {
          ...user,
          branchName: branch ? branch.name : '',
          departmentName: department ? department.name : ''
        };
      });
      setUsers(usersData);
    } catch (error) {
      setError('ユーザー情報の取得に失敗しました');
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleToggleStatus = async (user: User) => {
    const confirmed = window.confirm(`ユーザー ${user.account} を${user.isStopped ? '復活' : '停止'}しますか？`);
    if (confirmed) {
      try {
        await axios.put(`${API_BASE_URL}/users/${user.id}/toggle`);
        setUsers(users.map(u => u.id === user.id ? { ...u, isStopped: !u.isStopped } : u));
        fetchUsers();
      } catch (error) {
        setError('ユーザーの状態更新に失敗しました');
      }
    }
  };

  const handleAddUser = () => {
    setIsRegisterModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  return (
    <div className="user-management-container">
      <h2>ユーザー管理</h2>
      {error && <p className="error">{error}</p>}
      <table className="user-table">
        <thead>
        <tr>
          <th onClick={() => requestSort('account')}>アカウント名</th>
          <th onClick={() => requestSort('name')}>名前</th>
          <th onClick={() => requestSort('branchName')}>支社</th>
          <th onClick={() => requestSort('departmentName')}>部署</th>
          <th onClick={() => requestSort('isStopped')}>状態</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.account}</td>
              <td>{user.name}</td>
              <td>{user.branchName}</td>
              <td>{user.departmentName}</td>
              <td>{user.isStopped ? '停止' : '活性'}</td>
              <td>
                <div  className="action-buttons">
                  <button onClick={() => handleEdit(user)} className="edit-button">編集</button>
                  <button onClick={() => handleToggleStatus(user)}  className="toggle-status-button">
                    {user.isStopped ? '復活' : '停止'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='add-user-button'>
        <button onClick={handleAddUser} className='add-user-button'>ユーザー登録</button>
      </div>


      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeModal}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
      >
        <RegisterUser onClose={closeModal} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeModal}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
      >
        {selectedUser && <EditUser user={selectedUser} onClose={closeModal} />}
      </Modal>
    </div>
  );
};

export default UserManagement;

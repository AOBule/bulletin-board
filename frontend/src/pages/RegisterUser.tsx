import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserValidation } from '../components/useUserValidation';
import useGetBranchAndDepartments from '../components/useGetBranchAndDepartments';
import '../styles/RegisterUser.scss';
import { ERROR_MESSAGES } from '../constants/context';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RegisterUser = ({ onClose }: { onClose: () => void }) => {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordChk, setPasswordChk] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [branchId, setBranchId] = useState<number>();
  const [departmentId, setDepartmentId] = useState<number>();
  const [error, setError] = useState('');
  const { errors, validate, submitValidation, setErrors } = useUserValidation();
  const { branches, branchDepartmentMap } = useGetBranchAndDepartments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validateで入力チェックし、問題ない場合trueが返ってくる
    if (submitValidation({ account, password, passwordChk, name, branchId, departmentId }, false)) {
      try{
        await axios.post(`${API_BASE_URL}/users`, { account, password, name, branchId, departmentId });
        onClose();
      } catch(e: any) {
        if(axios.isAxiosError(e) && e.response){
          if (e.response.status === 409) {
            setErrors((prevErrors: any) => ({
              ...prevErrors,
              account: ERROR_MESSAGES.E0015
            }));
          } else {
            setError('ユーザー登録に失敗しました');
          }
        } else {
          setError('ユーザー登録に失敗しました');
        }
      }
    }
  };

  // パスワード・再入力欄が変更されるたび照合をおこなう
  useEffect(() => {
    if (password || passwordChk) {
      validate({ password, passwordChk });
    }
  }, [password, passwordChk, validate]);

  // 支社名と対応する部署名をセット
  const selectedDepartments = branchId ? branchDepartmentMap.get(branchId) : [];



  return (
    <div className="register-user-container">
      <h2>ユーザー登録</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="account">アカウント名</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          {errors.account && <span className="error">{errors.account}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordChk) {
                validate({ password: e.target.value, passwordChk });
              }
            }}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="passwordChk">パスワード再入力</label>
          <input
            type="password"
            id="passwordChk"
            value={passwordChk}
            onChange={(e) => {
              setPasswordChk(e.target.value);
              if (password) {
                validate({ password, passwordChk: e.target.value });
              }
            }}
          />
          {errors.passwordChk && <span className="error">{errors.passwordChk}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="branch">支社</label>
          <select
            id="branch"
            value={branchId}
            onChange={(e) => setBranchId(Number(e.target.value))}
          >
            <option value="">選択してください</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          {errors.branchId && <span className="error">{errors.branchId}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="department">部署</label>
          <select
            id="department"
            value={departmentId}
            onChange={(e) => setDepartmentId(Number(e.target.value))}
            disabled={!branchId}
          >
            <option value="">選択してください</option>
            {selectedDepartments?.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.departmentId && <span className="error">{errors.departmentId}</span>}
        </div>
        <button type='submit' className='register-button'>登録</button>
        <button onClick={onClose} className='cancel-button'>キャンセル</button>
      </form>
    </div>
  );
};

export default RegisterUser;

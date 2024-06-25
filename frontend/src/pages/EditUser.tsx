import React, {useState, useEffect} from "react";
import { useUserValidation } from "../components/useUserValidation";
import useGetBranchAndDepartments, { Branch, Department }  from "../components/useGetBranchAndDepartments";
import '../styles/RegisterUser.scss';
import axios from "axios";
import { ERROR_MESSAGES } from "../constants/context";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface EditUserProps {
  user: {
    id: number;
    account: string;
    name: string;
    branchId: number;
    departmentId: number;
    isStopped: boolean;
  };
  onClose: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onClose }) => {
  const [account, setAccount] = useState<string>(user.account);
  const [password, setPassword] = useState<string>('');
  const [passwordChk, setPasswordChk] = useState<string>('');
  const [name, setName] = useState<string>(user.name);
  const [branchId, setBranchId] = useState<number>(user.branchId);
  const [departmentId, setDepartmentId] = useState<number>(user.departmentId);
  const [ selectedDepartments, setSelectedDepartments ] = useState<Department[]>([]);
  const [error, setError] = useState('');
  const { errors, validate, submitValidation, setErrors } = useUserValidation();
  const { branches, branchDepartmentMap } = useGetBranchAndDepartments();

  // 初期値として現在の値を設定
  useEffect(() => {
    if (branchDepartmentMap.size > 0) {
      const departments = branchDepartmentMap.get(branchId) || [];
      setSelectedDepartments(departments);
    }
  }, [branchId,branchDepartmentMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 変更があったかどうかをチェック
    const isChanged: boolean = account !== user.account || password !== '' || name !== user.name || branchId !== user.branchId || departmentId !== user.departmentId;

    if (isChanged) {
      if(submitValidation({ account, password, passwordChk, name, branchId, departmentId }, true)) {
        try{
          await axios.put(`${API_BASE_URL}/users/${user.id}`,{ account, password, name, branchId, departmentId });
          onClose();
        } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
            if (e.response.status === 409) {
              setErrors((prevErrors: any) => ({
                ...prevErrors,
                account: ERROR_MESSAGES.E0015
              }));
            } else {
              setError('ユーザー編集に失敗しました');
            }
          } else {
            setError('ユーザー編集に失敗しました');
          }
        }
      }
    } else {
      setError('変更がありません');
    }
  };

  // パスワード・再入力欄が変更されるたび照合をおこなう
  useEffect(() => {
    if (password || passwordChk) {
      validate({ password, passwordChk }, true);
    }
  }, [password, passwordChk]);

  return (
    <div className="register-user-container">
      <h2>ユーザー編集</h2>
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
            onChange={(e) => setPassword(e.target.value)}
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
            <option value=""></option>
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
          >
            <option value="">--</option>
            {selectedDepartments?.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.departmentId && <span className="error">{errors.departmentId}</span>}
        </div>
        <button type='submit' className='register-button'>保存</button>
        <button onClick={onClose} className='cancel-button'>キャンセル</button>


      </form>
    </div>
  )

};
export default EditUser;
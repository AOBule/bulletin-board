import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ERROR_MESSAGES } from '../constants/context';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';

const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ account?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const validate = (): boolean => {
    const newErrors: { account?: string; password?: string } = {};
    if (!account) {
      newErrors.account = ERROR_MESSAGES.E0001;
    }
    if (!password) {
      newErrors.password = ERROR_MESSAGES.E0002;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await login(account, password);
        navigate('/home');
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ account: ERROR_MESSAGES.E0003 });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="account">アカウント</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <div className="error">
            {errors.account && <span className="error">{errors.account}</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <div className="input-container">
            <input
              type={passwordType}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-visual"
            >
              {passwordType === "password" ? "Show" : "Hide"}
            </button>
          </div>
          <div className="error">
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
        </div>
        <button type="submit" className="login-button">ログイン</button>
      </form>
    </div>
  );
};

export default Login;

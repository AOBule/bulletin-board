import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="logoMes">
          <div>＠掲示板</div>
        </div>
      </div>
      <div className="menu">
        <button className="menu-button">☰</button>
        <div className="menu-content">
          {user.id ? (
            <>
              <li>
                <Link to="/home">ホーム</Link>
              </li>
              <li>
                <Link to="/new-post">新規投稿</Link>
              </li>
              {user.departmentId === 1 && (
                <>
                  <li>
                    <Link to="/user-management">ユーザー管理</Link>
                  </li>
                  <li>
                    <Link to="/register-user">ユーザー登録</Link>
                  </li>
                </>
              )}
              <li>
                <a href="#logout" onClick={handleLogout}>Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
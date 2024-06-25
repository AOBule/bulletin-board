/*
認証状態を管理する
*/

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login, logout, getCurrentUser } from '../services/authService';

interface AuthContextType {
  user: any;
  login: (account: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(getCurrentUser());

  const handleLogin = async (account: string, password: string) => {
    const user = await login(account, password);
    setUser(user);
    console.log(user.departmentId);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/*
認証サービス
ログインのためのAPIリクエストを行う
*/

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (account: string, password: string) => {
    try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { account, password });
    if (response.data.token) {
      console.log('Response:', response);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import UserManagement from './pages/UserManagement';
import NewPost from './pages/NewPost';
// import RegisterUser from './pages/RegisterUser';
// import PrivateRoute from './components/PrivateRoute';
import './styles/global.scss';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home"  element={<Home />}/>
          <Route path="/user-management" element={<UserManagement />} />
          {/* <Route path="/register-user" element={<RegisterUser />}/> */}
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Dashboard />}></Route>
    </Routes>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Header from './compoments/widget/Header';
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;

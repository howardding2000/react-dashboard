import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Header from './compoments/Header';
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Dashboard />}></Route>
      </Routes>
    </>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/dashboard/home/home";
import Categories from "./pages/dashboard/categories/categories";
import Products from "./pages/dashboard/products/products";
import Users from "./pages/dashboard/users/users";
import Roles from "./pages/dashboard/roles/roles";
import Charts from "./pages/dashboard/charts/charts";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />}>
          <Route path='home' element={<Home />} />
          <Route path='categories' element={<Categories />} />
          <Route path='products' element={<Products />} />
          <Route path='users' element={<Users />} />
          <Route path='roles' element={<Roles />} />
          <Route path='charts' element={<Charts />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

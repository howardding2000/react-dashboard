import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/dashboard/home/home";
import Category from "./pages/dashboard/category/category";
import Product from "./pages/dashboard/product/product";
import Users from "./pages/dashboard/users/users";
import Roles from "./pages/dashboard/roles/roles";
import { AuthContext } from "./store/auth-context";
import BarChart from "./pages/dashboard/charts/bar-chart";
import PieChart from "./pages/dashboard/charts/pie-chart";
import LineChart from "./pages/dashboard/charts/line-chart";
import ProductHome from "./pages/dashboard/product/home";
import ProductDetail from "./pages/dashboard/product/detail";
import ProductAddUpdate from "./pages/dashboard/product/add-update";

const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        {!!token && (
          <Route path='/*' element={<Dashboard />}>
            <Route path='home' element={<Home />} />
            <Route path='category' element={<Category />} />
            <Route path='product' element={<Product />}>
              <Route path='addupdate' element={<ProductAddUpdate />} />
              <Route path='detail' element={<ProductDetail />} />
              <Route path='*' element={<ProductHome />} />
            </Route>
            <Route path='users' element={<Users />} />
            <Route path='roles' element={<Roles />} />
            <Route path='charts/bar-chart' element={<BarChart />} />
            <Route path='charts/pie-chart' element={<PieChart />} />
            <Route path='charts/line-chart' element={<LineChart />} />
            <Route path='*' element={<Home />} />
          </Route>
        )}
        {!token && <Route path='/*' element={<Login />} />}
      </Routes>
    </>
  );
};

export default App;

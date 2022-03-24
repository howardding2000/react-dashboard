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

const App = () => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        {loggedInUser && (
          <Route path='/*' element={<Dashboard />}>
            <Route path='home' element={<Home />} />
            <Route path='products/category' element={<Category />} />
            <Route path='products/product' element={<Product />} />
            <Route path='users' element={<Users />} />
            <Route path='roles' element={<Roles />} />
            <Route path='charts/bar-chart' element={<BarChart />} />
            <Route path='charts/pie-chart' element={<PieChart />} />
            <Route path='charts/line-chart' element={<LineChart />} />
            <Route path='*' element={<Home />} />
          </Route>
        )}
        {!loggedInUser && <Route path='/*' element={<Login />} />}
      </Routes>
    </>
  );
};

export default App;

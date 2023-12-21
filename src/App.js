import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./user/Login";
import Add from "../src/product/Add";
import Edit from "../src/product/Edit";
import List from "../src/product/List";
import ListCategory from "../src/category/ListCategory"
import AddCategory from "../src/category/AddCategory"
import EditCategory from "../src/category/EditCategory";
import Verify from "../src/user/Verify";
import ForgetPassWord from "./user/ForgetPassWord";
import ResetPassword from "./user/ResetPassword";
import SendMail from "./user/SendEmail";

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";

function App() {
  // lấy thông tin user từ localStorage
  const getUserFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  }
  // lưu thông tin user vào localStorage
  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
    } else {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    }
  }
  const [user, setUser] = useState(getUserFromLocalStorage());

  // những link k cần login
  const PublicRoute = () => {
    if (user) {
      return <Navigate to="/" />
    } else {
      return <Outlet />
    }
  }

  // những link cần login
  const PrivateRoute = () => {
    if (user) {
      return <Outlet />
    } else {
      return <Navigate to="/login" />
    }
  }
  return (
    <div className="container">
      <Router>
         <Routes>
          <Route path="/verify/:id" element={<Verify />} />
          <Route path="/changedPassword/:id" element={<ForgetPassWord />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route element={<PrivateRoute />} >
            <Route path="/" element={<List setUser={saveUserToLocalStorage}/>} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:id" element={<Edit />} />
            <Route path="listCategory" element={<ListCategory/>} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="editCategory/:id" element={<EditCategory />} />
          </Route>
          <Route element={<PublicRoute />} >
            <Route path="/login" element={<Login saveUser={saveUserToLocalStorage} />} />
            <Route path="/SendEmail" element={<SendMail />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

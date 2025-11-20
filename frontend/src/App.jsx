import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBaseRoutes from "./utils/RoleBaseRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentsList from "./components/department/DepartmentsList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartments from "./components/department/EditDepartments.jsx";
import List from "./components/emploee/List.jsx";
import Add from "./components/emploee/Add.jsx";
import View from "./components/emploee/View.jsx";
import Edit from "./components/emploee/Edit.jsx";
// import AtalAwasiyaData from "./pages/Login.jsx";
import AddSalary from "./components/salary/Add.jsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login" element={<AtalAwasiyaData/>}/> */}
          {/* protect admin routes from PrivateRoutes & RoleBaseRoutes used */}
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes requierdRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          } >
            <Route index element={<AdminSummary />}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentsList />}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
            <Route path="/admin-dashboard/department/:id" element={<EditDepartments />}></Route>
            <Route path="/admin-dashboard/employee" element={<List />}></Route>
            <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
            <Route path="/admin-dashboard/employee/:id" element={<View />}></Route>
            <Route path="/admin-dashboard/employee/edit/:id" element={<Edit />}></Route>
            {/* <Route path="/admin-dashboard/employee/salary/${id}" element={<View/>}></Route> */}
            <Route path="/admin-dashboard/salary" element={<AddSalary/>}></Route>
          </Route>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

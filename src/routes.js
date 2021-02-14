/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-var */
/* eslint-disable indent */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import GlobalMaster from 'src/views/master/GlobalView';
import ListEmployee from 'src/views/master/EmployeeMaster/listEmployee';
import ListSite from 'src/views/master/SiteMaster/listEmployee';
import ListDepartment from 'src/views/master/DepartmentMaster/listEmployee';
import ListDesignation from 'src/views/master/DesignationMaster/listEmployee';
import EditSite from 'src/views/master/SiteMaster/Edit';
import EditDepartment from 'src/views/master/DepartmentMaster/Edit';
import EditDesignation from 'src/views/master/DesignationMaster/Edit';

const userName = localStorage.getItem('username');
var routes = [];
if (userName != null) {
   routes = [
    {
      // In app
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'account', element: <AccountView /> },
        { path: 'customers', element: <CustomerListView /> },
        { path: 'dashboard', element: <DashboardView /> },
        { path: 'products', element: <ProductListView /> },
        { path: 'settings', element: <SettingsView /> },
  
        // Master
        { path: 'master', element: <GlobalMaster /> },
        { path: 'master/list/employee', element: <ListEmployee /> },

        { path: 'master/list/site', element: <ListSite /> },
        { path: 'master/edit/site/:id', element: <EditSite /> },

        { path: 'master/list/department', element: <ListDepartment /> },
        { path: 'master/edit/department/:id', element: <EditDepartment /> },

        { path: 'master/list/designation', element: <ListDesignation /> },
        { path: 'master/edit/designation/:id', element: <EditDesignation /> },
  
        // For Wrong Path
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    },
   
    {
      // Base app
      path: '/',
      children: [
        { path: 'login', element: <LoginView /> },
        { path: 'register', element: <RegisterView /> },
        { path: '404', element: <NotFoundView /> },
        { path: '*', element: <Navigate to="/404" /> },
  
        // Login
        { path: '/', element: <Navigate to="login" /> }
      ]
    }
  
    // {
    //   // Base app
    //   path: '/',
    //   element: <MainLayout />,
    //   children: [
    //     { path: 'login', element: <LoginView /> },
    //     { path: 'register', element: <RegisterView /> },
    //     { path: '404', element: <NotFoundView /> },
    //     { path: '*', element: <Navigate to="/404" /> },
  
    //     // Login
    //     { path: '/', element: <Navigate to="login" /> }
    //   ]
    // }
  
  ];
} else {
   routes = [
    {
      // Base app
      path: '/',
      children: [
        // Login
        { path: 'login', element: <LoginView /> },
        { path: '/', element: <Navigate to="login" /> },
        { path: '*', element: <Navigate to="login" /> }
      ]
    }
  ];
}


export default routes;



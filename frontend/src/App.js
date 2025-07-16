import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './component/HomePage';
import MainLayout from './component/MainLayout';
import UserPage from './user/UserPage';
import LeasePage from './lease/LeasePage';
import LeaseRequestPage from './leaseRequest/LeaseRequestPage';
import PropertyPage from './property/PropertyPage';
import SignUpPage from './component/SignUpPage';
import LoginPage from './component/LogInPage';
import ForgotPasswordPage from './component/ForgotPasswordPage';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<MainLayout />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/lease" element={<LeasePage/>} />
          <Route path="/lease-request" element={<LeaseRequestPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

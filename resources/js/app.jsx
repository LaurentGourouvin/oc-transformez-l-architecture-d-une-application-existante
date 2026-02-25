import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Settings from './components/settings/Settings';
import RegisterForm from './components/auth/RegisterForm';
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm.jsx";
import ResetPasswordForm from "./components/auth/ResetPasswordForm.jsx";
import VerifyEmail from "./components/auth/VerifyEmail.jsx";
import VerifyEmailCallback from "./components/auth/VerifyEmailCallback.jsx";
import ConfirmPassword from "./components/auth/ConfirmPassword.jsx";

function App() {
    return (
        <BrowserRouter basename="/app">
            <Routes>
                <Route path="/login" element={
                    <AuthLayout>
                        <LoginForm />
                    </AuthLayout>
                } />
                <Route path="/register" element={
                    <AuthLayout>
                        <RegisterForm />
                    </AuthLayout>
                } />
                <Route path="/reset-password" element={
                    <AuthLayout>
                        <ResetPasswordForm />
                    </AuthLayout>
                } />
                <Route path="/forgot-password" element={
                    <AuthLayout>
                        <ForgotPasswordForm />
                    </AuthLayout>
                } />
                <Route path="/confirm-password" element={
                    <ProtectedRoute>
                        <AuthLayout>
                            <ConfirmPassword />
                        </AuthLayout>
                    </ProtectedRoute>
                } />
                <Route path="/verify-email" element={
                    <ProtectedRoute>
                        <AuthLayout>
                            <VerifyEmail />
                        </AuthLayout>
                    </ProtectedRoute>
                } />
                <Route path="/verify-email/:id/:hash" element={
                    <ProtectedRoute>
                        <AuthLayout>
                            <VerifyEmailCallback />
                        </AuthLayout>
                    </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

const el = document.getElementById('react-app');
if (el) createRoot(el).render(<App />);

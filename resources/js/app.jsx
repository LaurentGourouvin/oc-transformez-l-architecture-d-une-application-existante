import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Settings from './components/settings/Settings';

function App() {
    return (
        <BrowserRouter basename="/app">
            <Routes>
                <Route path="/login" element={<LoginForm />} />
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

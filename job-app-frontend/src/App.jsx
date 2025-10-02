// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import JobDetail from "./components/JobDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<HomePage />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/" element={<Navigate to="/jobs" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
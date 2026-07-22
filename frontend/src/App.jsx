// Main application component
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import Layout
import MainLayout from './components/MainLayout';

// 2. Import Page Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Members from './pages/Members';
import IssueReturn from './pages/IssueReturn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Route (No sidebar/topbar) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Wrapped by MainLayout) */}
        <Route element={<MainLayout />}>
          {/* Default redirect from "/" to "/dashboard" */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Active Pages rendered inside MainLayout's <Outlet /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/members" element={<Members />} />
          <Route path="/issues" element={<IssueReturn />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
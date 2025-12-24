import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate for safety
import Home from '../components/Home';
import Sign from '../components/Sign';
import Dashboard from '../components/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Landing Page */}
      <Route path='/' element={<Home />} />

      {/* 2. Authentication Routes (Both point to Sign) */}
      <Route path='/login' element={<Sign />} />
      <Route path='/register' element={<Sign />} />

      {/* 3. Protected Dashboard (Changed /home to /dashboard for clarity) */}
      <Route path='/dashboard' element={<Dashboard />} />
      
      {/* Optional: Redirect random paths to home or login */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
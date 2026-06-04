import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerDashboard from '../pages/sellerdashboard';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import RegisterPage from '../pages/RegisterPage';
import AccountActivationPage from '../pages/AccountActivationPage';
import { AuthGuard, GuestGuard, RoleGuard } from '../components/ProtectedRoute';
import SellerDashboardForm from '../pages/SellerDashboardForm';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Guest only routes */}
        <Route path="/" element={<GuestGuard><LoginPage /></GuestGuard>} />
        <Route path="/register" element={<GuestGuard><RegisterPage /></GuestGuard>} />

        {/* Public route */}
        <Route path="/activate/:uid/:token" element={<AccountActivationPage />} />

        {/* Role based protected routes */}
        <Route path="/user-dashboard" element={<RoleGuard allowedRole="customer"><UserDashboard /></RoleGuard>} />
        <Route path="/seller-dashboard" element={<RoleGuard allowedRole="seller"><SellerDashboard /></RoleGuard>} />
        <Route path="/admin-dashboard" element={<RoleGuard allowedRole="admin"><AdminDashboard /></RoleGuard>} />
        <Route path="/seller-dashboard-form" element={<SellerDashboardForm />}/>
      </Routes>
    </Router>
  );
}
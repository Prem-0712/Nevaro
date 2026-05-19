import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerDashboard from '../pages/sellerdashboard';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import RegisterPage from '../pages/RegisterPage';
import AccountActivationPage from '../pages/AccountActivationPage';
import { PrivateRoute, PublicRoute } from '../components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public only routes - logged in users get redirected */}
        <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Activation route - public */}
        <Route path="/activate/:uid/:token" element={<AccountActivationPage />} />

        {/* Private routes - only logged in users */}
        <Route path="/seller-dashboard" element={<PrivateRoute><SellerDashboard /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
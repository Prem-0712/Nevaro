import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerDashboard from '../pages/sellerdashboard';
import HomePage from '../pages/HomePage';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import AccountActivationPage from '../pages/AccountActivationPage';
import Auth from '../pages/Auth';
import { MyProvider } from '../context/ToggleContext';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route 
    path="/" 
    element={
      <MyProvider>
        <Auth />
      </MyProvider>
    } 
  />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/activate" element={<AccountActivationPage />} />
      </Routes>
    </Router>
  );
}

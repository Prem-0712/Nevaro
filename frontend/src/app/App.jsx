import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerDashboard from '../pages/sellerdashboard';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/AdminDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
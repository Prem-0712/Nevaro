import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerDashboard from '../pages/sellerdashboard';
import LoginPage from '../pages/LoginPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}
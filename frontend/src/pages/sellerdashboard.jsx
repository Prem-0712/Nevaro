import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsetToken } from "../store/authSlice";
import { getSellerProfile, updateSellerProfile, deleteSeller } from "../services/authService";
import SellerProfile from "./SellerProfile";

const sidebarItems = [
  { label: "Dashboard", icon: "📊", active: true },
  { label: "My Order", icon: "📦" },
  { label: "Wishlist", icon: "🤍" },
  { label: "My Profile", icon: "👤" },
  { label: "Payment", icon: "💳" },
  { label: "Settings", icon: "⚙️" },
];

const stats = [
  { label: "Total Sales", value: "$24,580", change: "+12% from last month", icon: "$" },
  { label: "Orders Today", value: "47", change: "+8% from yesterday", icon: "🛒" },
  { label: "Revenue", value: "$8,580", change: "+12% from last week", icon: "📈" },
  { label: "Conversion Rate", value: "3.2%", change: "-2% from last month", icon: "%" },
];

const bestSelling = [
  { name: "Wireless Headphones", category: "Electronics", price: "$2,340", sold: "78 sold" },
  { name: "Smart Watch", category: "Electronics", price: "$2,340", sold: "78 sold" },
  { name: "Running shoes", category: "Sports", price: "$2,340", sold: "78 sold" },
  { name: "Coffee maker", category: "Home and kitchen", price: "$2,340", sold: "78 sold" },
];

const stockLevels = [
  { name: "Wireless Headphones", level: 20, status: "Low", units: "12 units left" },
  { name: "Smart watch", level: 55, status: "Medium", units: "12 units left" },
  { name: "Running shoes", level: 80, status: "High", units: "12 units left" },
  { name: "Coffee maker", level: 75, status: "High", units: "12 units left" },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Sarah Johnson", product: "Wireless Headphones", amount: "$129.99" },
  { id: "#ORD-002", customer: "Mike Chen", product: "Smart watch", amount: "$129.99" },
  { id: "#ORD-003", customer: "Emma Davis", product: "Running Shoes", amount: "$129.99" },
];

const stockColor = (status) => {
  if (status === "Low") return "bg-red-400";
  if (status === "Medium") return "bg-yellow-400";
  return "bg-green-400";
};

export default function SellerDashboard() {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(unsetToken());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 bg-white flex flex-col py-6 px-4 shadow-sm shrink-0">
        <div className="text-xl font-bold tracking-tight mb-8 px-2">Nevaro</div>
        <nav className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                active === item.label
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all"
        >
          <span>🚪</span> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="text-sm text-gray-400">Seller Dashboard</div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-800 text-lg">🔔</button>
            <button className="text-gray-500 hover:text-gray-800 text-lg">⚙️</button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {active === "Dashboard" && (
            <>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-sm text-gray-400 mt-1">Welcome back! Here's what's with your store today.</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">{stat.label}</span>
                      <span className="text-gray-400 text-sm">{stat.icon}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className={`text-xs mt-1 ${stat.change.startsWith('-') ? 'text-red-400' : 'text-green-500'}`}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-700">Best Selling Products</h2>
                    <button className="text-xs text-gray-400 hover:text-gray-600">View All</button>
                  </div>
                  <div className="space-y-3">
                    {bestSelling.map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg shrink-0"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-700">{item.price}</div>
                          <div className="text-xs text-gray-400">{item.sold}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-700">Stock Levels</h2>
                  </div>
                  <div className="space-y-4">
                    {stockLevels.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{item.name}</span>
                          <span className={`text-xs font-medium ${
                            item.status === 'Low' ? 'text-red-500' :
                            item.status === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                          }`}>{item.status}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className={`h-2 rounded-full ${stockColor(item.status)}`} style={{ width: `${item.level}%` }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{item.units}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700">Recent Orders</h2>
                  <button className="text-xs text-gray-400 hover:text-gray-600">View All Orders</button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 text-xs border-b border-gray-100">
                      <th className="text-left pb-2 font-medium">Order ID</th>
                      <th className="text-left pb-2 font-medium">Customer</th>
                      <th className="text-left pb-2 font-medium">Product</th>
                      <th className="text-left pb-2 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 text-gray-500">{order.id}</td>
                        <td className="py-3 text-gray-700">{order.customer}</td>
                        <td className="py-3 text-gray-700">{order.product}</td>
                        <td className="py-3 text-gray-700 font-medium">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {active === "My Profile" && (
            <SellerProfile />
          )}
        </div>
      </div>
    </div>
  );
}
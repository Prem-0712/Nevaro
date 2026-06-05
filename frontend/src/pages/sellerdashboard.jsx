import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { getSellerProfile, updateSellerProfile, deleteSeller } from "../services/authService";

const sidebarItems = [
  { label: "Dashboard", icon: "📊", active: true },
  { label: "My Order", icon: "📦" },
  { label: "Wishlist", icon: "🤍" },
  { label: "My Profile", icon: "👤" },
  { label: "Payment", icon: "💳" },
  { label: "Settings", icon: "⚙️" },
];

// when backend is ready
//const stats = await fetch('/api/dashboard/stats');
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
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    phone_number: "", business_name: "", business_email: "",
    address_line_1: "", address_line_2: "", postal_code: "",
    city: "", state_region: "", country: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getSellerProfile();
        if (data.success) {
          setProfile(data.data);
          setFormData(data.data);
        }
      } catch (err) {
        console.log("Profile not created yet");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateSuccess("");
    setUpdateError("");
    try {
      const { data, status } = await updateSellerProfile(formData);
      if (status === 200) {
        setUpdateSuccess("Profile updated successfully!");
      } else {
        setUpdateError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setUpdateError("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const { status } = await deleteSeller();
      if (status === 200) {
        dispatch(logout());
        navigate("/");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
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
            <div className="max-w-2xl space-y-6">
              <h1 className="text-xl font-bold text-gray-800">My Profile</h1>

              {updateSuccess && (
                <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3">{updateSuccess}</div>
              )}
              {updateError && (
                <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">{updateError}</div>
              )}

              <form onSubmit={handleUpdate} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Business Information</h2>
                {[
                  { name: "phone_number", label: "Phone Number" },
                  { name: "business_name", label: "Business Name" },
                  { name: "business_email", label: "Business Email" },
                  { name: "address_line_1", label: "Address Line 1" },
                  { name: "address_line_2", label: "Address Line 2" },
                  { name: "postal_code", label: "Postal Code" },
                  { name: "city", label: "City" },
                  { name: "state_region", label: "State / Region" },
                  { name: "country", label: "Country" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs text-gray-500 mb-1">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                  Update Profile
                </button>
              </form>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
                <h2 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h2>
                <p className="text-xs text-gray-500 mb-4">Deleting your account is permanent and cannot be undone.</p>
                {!deleteConfirm ? (
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-red-600 font-medium">Are you sure? This cannot be undone!</p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(false)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
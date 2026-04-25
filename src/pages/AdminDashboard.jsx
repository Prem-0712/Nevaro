import { useState } from "react";

const stats = [
  { label: "Total Revenue", value: "$84,320", change: "+12.5%", up: true, icon: "💰" },
  { label: "Total Orders", value: "3,842", change: "+8.1%", up: true, icon: "📦" },
  { label: "Total Customers", value: "12,540", change: "+5.3%", up: true, icon: "👥" },
  { label: "Total Sellers", value: "318", change: "-2.1%", up: false, icon: "🏪" },
];

const recentOrders = [
  { id: "#ORD-1021", customer: "Alice Johnson", product: "Wireless Headphones", date: "Apr 8, 2026", status: "Delivered", amount: "$129.99" },
  { id: "#ORD-1022", customer: "James Okafor", product: "Running Shoes", date: "Apr 8, 2026", status: "Processing", amount: "$89.00" },
  { id: "#ORD-1023", customer: "Priya Nair", product: "Skincare Set", date: "Apr 7, 2026", status: "Shipped", amount: "$54.50" },
  { id: "#ORD-1024", customer: "Carlos Rivera", product: "Gaming Mouse", date: "Apr 7, 2026", status: "Cancelled", amount: "$45.00" },
  { id: "#ORD-1025", customer: "Sophie Lee", product: "Yoga Mat", date: "Apr 6, 2026", status: "Delivered", amount: "$32.00" },
];

const topProducts = [
  { name: "Wireless Headphones", category: "Electronics", sold: 842, revenue: "$109,065", rating: "4.8" },
  { name: "Running Shoes", category: "Fashion", sold: 631, revenue: "$56,159", rating: "4.6" },
  { name: "Skincare Set", category: "Beauty", sold: 520, revenue: "$28,340", rating: "4.7" },
  { name: "Gaming Mouse", category: "Electronics", sold: 415, revenue: "$18,675", rating: "4.5" },
  { name: "Yoga Mat", category: "Sports", sold: 390, revenue: "$12,480", rating: "4.9" },
];

const sellers = [
  { name: "TechZone Store", email: "techzone@store.com", products: 142, revenue: "$48,320", status: "Active" },
  { name: "FashionHub", email: "fashionhub@store.com", products: 98, revenue: "$31,200", status: "Active" },
  { name: "BeautyBliss", email: "beautybliss@store.com", products: 76, revenue: "$22,800", status: "Suspended" },
  { name: "SportsPeak", email: "sportspeak@store.com", products: 54, revenue: "$15,600", status: "Active" },
];

const customers = [
  { name: "Alice Johnson", email: "alice@email.com", orders: 24, spent: "$1,840", joined: "Jan 2025", status: "Active" },
  { name: "James Okafor", email: "james@email.com", orders: 18, spent: "$1,200", joined: "Mar 2025", status: "Active" },
  { name: "Priya Nair", email: "priya@email.com", orders: 11, spent: "$780", joined: "Jun 2025", status: "Active" },
  { name: "Carlos Rivera", email: "carlos@email.com", orders: 6, spent: "$320", joined: "Sep 2025", status: "Inactive" },
];

const statusColors = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Active: "bg-emerald-100 text-emerald-700",
  Suspended: "bg-red-100 text-red-700",
  Inactive: "bg-gray-100 text-gray-500",
};

const navItems = ["Dashboard", "Orders", "Products", "Sellers", "Customers", "Settings"];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-56" : "w-16"} transition-all duration-300 bg-slate-900 text-white flex flex-col shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            R
          </div>
          {sidebarOpen && <span className="font-semibold text-base tracking-wide">Rahana</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                activeNav === item
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-base shrink-0">
                {item === "Dashboard" && "🏠"}
                {item === "Orders" && "📦"}
                {item === "Products" && "🛍️"}
                {item === "Sellers" && "🏪"}
                {item === "Customers" && "👥"}
                {item === "Settings" && "⚙️"}
              </span>
              {sidebarOpen && <span>{item}</span>}
            </button>
          ))}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="m-3 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs text-center cursor-pointer"
        >
          {sidebarOpen ? "◀ Collapse" : "▶"}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-xs text-slate-400 mt-0.5">Wednesday, April 8, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Recent Orders</h2>
              <button className="text-xs text-indigo-600 hover:underline cursor-pointer">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    {["Order ID", "Customer", "Product", "Date", "Status", "Amount"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 font-mono text-indigo-600 font-medium">{o.id}</td>
                      <td className="px-5 py-3 text-slate-700">{o.customer}</td>
                      <td className="px-5 py-3 text-slate-500">{o.product}</td>
                      <td className="px-5 py-3 text-slate-400">{o.date}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.status]}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-semibold text-slate-800">{o.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Top Products</h2>
              <button className="text-xs text-indigo-600 hover:underline cursor-pointer">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    {["#", "Product", "Category", "Units Sold", "Revenue", "Rating"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topProducts.map((p, i) => (
                    <tr key={p.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 text-slate-400 font-medium">{i + 1}</td>
                      <td className="px-5 py-3 font-medium text-slate-800">{p.name}</td>
                      <td className="px-5 py-3 text-slate-500">{p.category}</td>
                      <td className="px-5 py-3 text-slate-700">{p.sold}</td>
                      <td className="px-5 py-3 font-semibold text-slate-800">{p.revenue}</td>
                      <td className="px-5 py-3">
                        <span className="text-yellow-500 font-semibold">★ {p.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sellers & Customers side by side */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Sellers Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">Sellers Overview</h2>
                <button className="text-xs text-indigo-600 hover:underline cursor-pointer">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                    <tr>
                      {["Seller", "Products", "Revenue", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {sellers.map((s) => (
                      <tr key={s.name} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-800">{s.name}</p>
                          <p className="text-xs text-slate-400">{s.email}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{s.products}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">{s.revenue}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[s.status]}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">Customers Overview</h2>
                <button className="text-xs text-indigo-600 hover:underline cursor-pointer">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                    <tr>
                      {["Customer", "Orders", "Total Spent", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {customers.map((c) => (
                      <tr key={c.name} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-800">{c.name}</p>
                          <p className="text-xs text-slate-400">{c.email}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{c.orders}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">{c.spent}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
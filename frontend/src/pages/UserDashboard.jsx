import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar";
import DashStats from "../components/DashStats";

// --- Dados mockados ---
const recentOrders = [
  { id: "#ORD-2025-1876", date: "Jan 15, 2025", items: "3 Items",  total: "$230.75", status: "Shipped"    },
  { id: "#ORD-2025-1876", date: "Jan 15, 2025", items: "15 Items", total: "$230.75", status: ""           },
  { id: "#ORD-2025-1876", date: "Jan 15, 2025", items: "6 Items",  total: "$230.75", status: "Processing" },
  { id: "#ORD-2025-1876", date: "Jan 15, 2025", items: "3 Items",  total: "$230.75", status: "Shipped"    },
];

const savedAddresses = [
  {
    label: "Home",
    address: "123 Main Street, Apt 4 New York, NY 10001, United States",
  },
  {
    label: "Office",
    address: "456 Business Ave, Suite 200 New York, NY 10022, United States",
  },
];

const paymentMethods = [
  { type: "Visa",       detail: "ending in 4242", sub: "Expires 12/2026" },
  { type: "Mastercard", detail: "ending in 8888", sub: "Expires 12/2026" },
  { type: "Paypal",     detail: "",               sub: "joe.doe@gmail.com" },
];

// --- Badge de status ---
const StatusBadge = ({ status }) => {
  if (!status) return null;

  const styles = {
    Shipped:    "bg-green-50 text-green-700",
    Processing: "bg-yellow-50 text-yellow-700",
    Cancelled:  "bg-red-50 text-red-700",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

// --- Ícone de cartão (placeholder cinza) ---
const CardIcon = () => (
  <div className="w-10 h-7 rounded bg-gray-200 shrink-0" />
);

// --- Componente principal ---
const UserDashboard = () => {
  return (
    <main>
      <Navbar />

      {/* Page container */}
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex-1 pt-10 px-6 pb-12 flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-2xl text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-[#5B5757]">
              Welcome back, John! Here&apos;s what&apos;s with your store today.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashStats />
          </div>

          {/* Recent Orders */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-base text-gray-900">Recent Orders</h2>
              <button className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
                View All Orders
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {["Order", "Date", "Items", "Total", "Status"].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left font-medium text-gray-600 text-xs"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-700">{order.id}</td>
                      <td className="px-4 py-3 text-gray-500">{order.date}</td>
                      <td className="px-4 py-3 text-gray-500">{order.items}</td>
                      <td className="px-4 py-3 text-gray-700">{order.total}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom row: Saved Addresses + Payment Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Saved Addresses */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium text-base text-gray-900">Saved Addresses</h2>
                <button className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
                  Add new
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                {savedAddresses.map((addr) => (
                  <div key={addr.label} className="px-4 py-4">
                    <p className="text-sm font-medium text-gray-800 mb-1">{addr.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{addr.address}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Payment Methods */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium text-base text-gray-900">Payment Methods</h2>
                <button className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
                  Add new
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                {paymentMethods.map((pm) => (
                  <div key={pm.type + pm.sub} className="px-4 py-4 flex items-center gap-3">
                    <CardIcon />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {pm.type} {pm.detail}
                      </p>
                      <p className="text-xs text-gray-500">{pm.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default UserDashboard;
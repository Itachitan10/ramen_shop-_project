import { useState } from "react";
import Navbar from "./component/navbar";
import {
  User,
  MapPin,
  Package,
  Settings,
  ChevronRight,
  Star,
  Clock,
  LogOut,
  Pencil,
  Plus,
} from "lucide-react";

const TABS = [
  { id: "orders", label: "Order History", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Account Settings", icon: Settings },
];

const ORDERS = [
  {
    id: "KR-10432",
    date: "Sep 21, 2026",
    status: "Delivered",
    items: "Tonkotsu Ramen, Gyoza (6pc)",
    total: 486,
  },
  {
    id: "KR-10411",
    date: "Sep 14, 2026",
    status: "Delivered",
    items: "Shoyu Ramen, Chashu Add-on",
    total: 312,
  },
  {
    id: "KR-10388",
    date: "Sep 3, 2026",
    status: "Cancelled",
    items: "Spicy Miso Ramen",
    total: 259,
  },
];

const ADDRESSES = [
  {
    label: "Home",
    detail: "Blk 4 Lot 12, Malibong, Urbiztondo, Pangasinan, 2427",
    isDefault: true,
  },
  {
    label: "Work",
    detail: "2F Unit 3, Main St., Urbiztondo Poblacion, Pangasinan, 2427",
    isDefault: false,
  },
];

const STATUS_STYLES = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
  Preparing: "bg-amber-50 text-amber-700",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-stone-800">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 text-lg font-semibold tracking-tight">
         <Navbar/>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Profile header card */}
        <div className="mb-8 flex flex-col items-start gap-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-xl font-semibold text-amber-800">
              CS
            </div>
            <div>
              <h1 className="text-lg font-semibold">Christian Sentorio</h1>
              <p className="text-sm text-stone-400">
                christiantorio162@gmail.com
              </p>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-amber-600">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                Regular customer · 12 orders
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50">
            <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar tabs */}
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-stone-800 text-white"
                      : "text-stone-500 hover:bg-stone-100"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {tab.label}
                </button>
              );
            })}
            <button className="mt-2 flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50">
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
              Log Out
            </button>
          </nav>

          {/* Content */}
          <div>
            {activeTab === "orders" && (
              <div className="space-y-3">
                {ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-stone-800">
                          {order.id}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">{order.items}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                        <Clock className="h-3 w-3" strokeWidth={1.75} />
                        {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold">
                        ₱{order.total}
                      </span>
                      <ChevronRight className="h-4 w-4 text-stone-300" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-3">
                {ADDRESSES.map((addr) => (
                  <div
                    key={addr.label}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                        <MapPin className="h-4 w-4 text-stone-500" strokeWidth={1.75} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-stone-500">{addr.detail}</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-stone-400 hover:text-stone-600">
                      Edit
                    </button>
                  </div>
                ))}
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-300 py-4 text-sm font-medium text-stone-500 hover:border-stone-400 hover:text-stone-700">
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                  Add New Address
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" defaultValue="Christian Sentorio" />
                  <Field label="Phone Number" defaultValue="09187183210" />
                  <Field
                    label="Email Address"
                    defaultValue="christiantorio162@gmail.com"
                    className="sm:col-span-2"
                  />
                  <Field label="New Password" placeholder="••••••••" type="password" />
                  <Field label="Confirm Password" placeholder="••••••••" type="password" />
                </div>
                <button className="mt-6 rounded-xl bg-stone-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-900">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, defaultValue, placeholder, type = "text", className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium text-stone-500">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
    </label>
  );
}
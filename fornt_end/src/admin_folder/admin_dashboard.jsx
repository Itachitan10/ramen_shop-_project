import React, { useState } from 'react';

const ORDERS = [
  {
    id: '#KM-8846',
    table: 'TABLE 04 · DINE-IN',
    customer: 'Kenji Sato',
    party: 'Party of 2',
    items: [
      { count: '2x', name: 'Tonkotsu Special', note: 'Extra Chashu' },
      { count: '1x', name: 'Pork Gyoza' },
    ],
    amount: '₱695',
    prepState: 'Prep: 8m left',
    actionText: 'MARK READY',
    actionVariant: 'primary',
  },
  {
    id: '#KM-8845',
    table: 'GRABFOOD · PICKUP',
    customer: 'Maria Santos',
    party: 'Driver Arrived',
    items: [
      { count: '1x', name: 'Spicy Miso Ramen', note: 'Spicy Level 3' },
      { count: '1x', name: 'Calpis Soda' },
    ],
    amount: '₱360',
    prepState: 'Ready for Pickup',
    actionText: 'DISPATCH',
    actionVariant: 'danger',
  },
  {
    id: '#KM-8844',
    table: 'TABLE 11 · DINE-IN',
    customer: 'David & Sarah',
    party: 'Party of 2',
    items: [
      { count: '2x', name: 'Black Garlic Tonkotsu' },
      { count: '1x', name: 'Karaage Bowl' },
      { count: '2x', name: 'Green Tea' },
    ],
    amount: '₱840',
    prepState: 'Cooking (In Pot)',
    actionText: 'VIEW TICKET',
    actionVariant: 'outline',
  },
  {
    id: '#KM-8843',
    table: 'TAKEOUT · COUNTER',
    customer: 'Aris Thorne',
    party: 'Paid Cash',
    items: [
      { count: '1x', name: 'Shoyu Ramen' },
      { count: '1x', name: 'Gyoza' },
    ],
    amount: '₱390',
    prepState: 'Completed',
    actionText: 'RECEIPT',
    actionVariant: 'subtle',
  },
];

const HOURLY_CHART = [
  { time: '10A', height: '22%', isPeak: false },
  { time: '11A', height: '48%', isPeak: false },
  { time: '12P', height: '96%', isPeak: true, revenue: '₱8,920' },
  { time: '1P', height: '84%', isPeak: true },
  { time: '2P', height: '54%', isPeak: false },
  { time: '3P', height: '26%', isPrep: true },
  { time: '4P', height: '30%', isPrep: true },
  { time: '5P', height: '58%', isPeak: false },
  { time: '6P', height: '82%', isPeak: true },
  { time: '7P', height: '92%', isPeak: true },
  { time: '8P', height: '68%', isPeak: false },
];

export default function KumoDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [chartTab, setChartTab] = useState('today');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#211b16] font-sans antialiased flex flex-col lg:flex-row selection:bg-[#ffdf99]">
      
      {/* ─── 1. MOBILE BACKDROP BLUR OVERLAY ─── */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-[#211b16]/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ─── 2. LEFT SIDEBAR (Drawer sa Mobile, Persistent sa Desktop) ─── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#fff1e4] z-50 flex flex-col justify-between border-r-2 border-[#211b16] shadow-[3px_0px_0px_#211b16] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Box */}
          <div className="p-5 border-b-2 border-[#211b16] bg-[#fbebdb] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#020100] text-white rounded flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#211b16]">
                雲
              </div>
              <div>
                <div className="text-lg font-black uppercase tracking-wider text-[#020100] leading-none">
                  KUMO.
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#4d4540] mt-1 font-bold">
                  Artisanal Ramen Bar
                </div>
              </div>
            </div>
            {/* Close Button on Mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden w-8 h-8 rounded bg-white border-2 border-[#211b16] flex items-center justify-center font-bold text-sm shadow-[1.5px_1.5px_0px_#211b16]"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 p-3.5">
            {[
              { id: 'dashboard', label: 'DASHBOARD', icon: '▦' },
              { id: 'orders', label: 'ORDERS', icon: '▤', badge: '14' },
              { id: 'menu', label: 'MENU & PRODUCTS', icon: '🍜' },
              { id: 'categories', label: 'CATEGORIES', icon: '▧' },
              { id: 'kitchen', label: 'KITCHEN DISPLAY', icon: '🥣', dot: true },
              { id: 'customers', label: 'CUSTOMERS', icon: '👥' },
              { id: 'analytics', label: 'ANALYTICS & REPORTS', icon: '📊' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                  activeMenu === item.id
                    ? 'bg-[#020100] text-white shadow-[2px_2px_0px_#211b16]'
                    : 'text-[#4d4540] hover:bg-[#f5e6d6] hover:text-[#211b16]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#b90c17] text-white font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                    {item.badge}
                  </span>
                )}
                {item.dot && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f6bf22] animate-pulse" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Manager Shift Profile */}
        <div className="p-3.5 border-t-2 border-[#211b16] bg-[#fbebdb]">
          <div className="flex items-center justify-between p-2 rounded bg-white border-2 border-[#211b16] shadow-[2px_2px_0px_#211b16]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-[#211b16] flex items-center justify-center font-mono text-xs text-white font-bold">
                KM
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-xs text-[#211b16] font-bold uppercase leading-none">
                  KENJI MORI
                </span>
                <span className="font-mono text-[9px] text-[#4d4540] tracking-wider mt-0.5">
                  Floor Mgr #04
                </span>
              </div>
            </div>
            <span className="text-sm font-bold text-[#4d4540]">➔</span>
          </div>
        </div>
      </aside>

      {/* ─── 3. MAIN WORKSPACE CONTAINER ─── */}
      <div className="w-full flex-1 flex flex-col min-h-screen lg:pl-72 pb-16 lg:pb-0">
        
        {/* TOPBAR */}
        <header className="sticky top-0 bg-[#fff1e4]/95 backdrop-blur border-b-2 border-[#211b16] z-30 px-4 lg:px-8 py-3 h-16 flex items-center justify-between shadow-[0_2px_0px_#211b16]">
          <div className="flex items-center gap-3 w-full max-w-xl">
            {/* Hamburger Button on Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded bg-white border-2 border-[#211b16] shadow-[2px_2px_0px_#211b16] flex items-center justify-center text-xl font-black active:translate-x-[1px] active:translate-y-[1px]"
              aria-label="Toggle menu"
            >
              ☰
            </button>

            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-2.5 text-[#4d4540] text-xs">🔍</span>
              <input
                type="search"
                placeholder="Search chit #, table, ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border-2 border-[#211b16] rounded text-xs text-[#211b16] focus:outline-none focus:bg-[#ffdf99] shadow-[2px_2px_0px_#211b16] placeholder:text-[#7f756f]"
              />
            </div>
          </div>

          {/* Topbar Telemetry & Notifications */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#211b16] rounded shadow-[2px_2px_0px_#211b16]">
              <span className="w-2 h-2 rounded-full bg-[#de2e2c] animate-pulse" />
              <span className="font-mono text-[10px] uppercase font-bold text-[#211b16]">
                ACCEPTING ORDERS
              </span>
              <span className="font-mono text-[9px] text-[#4d4540]">[OPEN]</span>
            </div>

            <div className="hidden md:flex items-center px-3 py-1 bg-[#fbebdb] border-2 border-[#211b16] rounded shadow-[2px_2px_0px_#211b16]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#211b16] font-bold">
                📅 OCT 24 / RUSH
              </span>
            </div>

            <button className="relative p-2 bg-white border-2 border-[#211b16] rounded shadow-[2px_2px_0px_#211b16] active:translate-x-[1px] active:translate-y-[1px]">
              <span className="text-sm">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b90c17] text-white rounded-full font-mono text-[9px] flex items-center justify-center font-bold">
                3
              </span>
            </button>

            <div className="w-8 h-8 rounded-full bg-[#020100] text-white flex items-center justify-center text-xs font-bold shadow-[1px_1px_0px_#211b16]">
              👤
            </div>
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <main className="p-4 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          
          {/* ── 1. OPS HERO BANNER ── */}
          <section className="relative overflow-hidden rounded-xl bg-[#fbebdb] border-2 border-[#211b16] shadow-[4px_4px_0px_#211b16] p-5 lg:p-8">
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border-2 border-[#211b16] rounded shadow-[2px_2px_0px_#211b16]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#de2e2c] animate-ping" />
                  <span className="font-mono text-[10px] tracking-widest text-[#020100] font-bold uppercase">
                    KUMO RAMEN · LIVE OPS DASHBOARD
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-none uppercase text-[#020100]">
                  GOOD FOOD. <span className="text-[#b90c17]">GOOD BUSINESS.</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#4d4540] max-w-xl">
                  Daily restaurant performance, active kitchen tickets, and revenue telemetry for Store #04 · Shibuya Metro Branch.
                </p>
              </div>

              {/* Shift Telemetry Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 bg-white border-2 border-[#211b16] px-4 py-2.5 rounded-lg shadow-[3px_3px_0px_#211b16]">
                  <span className="text-2xl text-[#f6bf22]">☀️</span>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7f756f]">ACTIVE SHIFT</div>
                    <div className="text-sm font-bold text-[#020100]">
                      Lunch Rush <span className="font-mono text-[10px] text-[#7f756f] font-normal">(11:00 - 15:00)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white border-2 border-[#211b16] px-4 py-2.5 rounded-lg shadow-[3px_3px_0px_#211b16]">
                  <span className="text-2xl text-[#b90c17]">🪑</span>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7f756f]">FLOOR SEATED</div>
                    <div className="text-sm font-bold text-[#020100]">
                      82% <span className="font-mono text-[10px] text-[#7f756f] font-bold">(18/22 Tables)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white border-2 border-[#211b16] px-4 py-2.5 rounded-lg shadow-[3px_3px_0px_#211b16]">
                  <span className="text-2xl text-[#020100]">⏱️</span>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7f756f]">AVG TICKET TIME</div>
                    <div className="text-sm font-bold text-[#020100]">
                      14.2 <span className="font-mono text-[10px] text-[#7f756f] font-normal">mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="relative z-10 mt-6 pt-4 border-t-2 border-[#211b16]/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 bg-[#020100] text-white px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border-2 border-[#020100] shadow-[2px_2px_0px_#211b16] hover:bg-[#b90c17] active:translate-x-[1px] active:translate-y-[1px] font-bold transition-all">
                  <span>+ NEW QUICK ORDER</span>
                </button>
                <button className="inline-flex items-center gap-2 bg-white text-[#020100] px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border-2 border-[#020100] shadow-[2px_2px_0px_#211b16] hover:bg-[#efe0d0] active:translate-x-[1px] active:translate-y-[1px] font-bold transition-all">
                  <span className="text-[#b90c17]">⏸</span>
                  <span>PAUSE ONLINE ORDERS</span>
                </button>
                <button className="inline-flex items-center gap-2 bg-white text-[#020100] px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border-2 border-[#020100] shadow-[2px_2px_0px_#211b16] hover:bg-[#f5e6d6] active:translate-x-[1px] active:translate-y-[1px] font-bold transition-all">
                  <span>🖨️ PRINT SHIFT REPORT</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[#4d4540] font-mono text-[11px] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#de2e2c]" />
                <span>POS TERMINAL SYNC: 2S AGO</span>
              </div>
            </div>
          </section>

          {/* ── 2. KPI METRICS (4 CARDS) ── */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Revenue */}
            <div className="bg-white border-2 border-[#211b16] p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4d4540]">TODAY&apos;S REVENUE</span>
                  <div className="text-3xl font-black text-[#020100] mt-1 tracking-tight">₱38,450</div>
                </div>
                <div className="w-10 h-10 rounded bg-[#ffdf99] border-2 border-[#211b16] flex items-center justify-center font-bold text-[#020100] shadow-[1px_1px_0px_#211b16]">
                  ₱
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#4d4540] mb-1">
                  <span>Target: ₱45,000</span>
                  <span className="font-bold text-[#020100]">85% Met</span>
                </div>
                <div className="w-full h-2.5 bg-[#efe0d0] border border-[#211b16] rounded overflow-hidden">
                  <div className="h-full bg-[#f6bf22] w-[85%]" />
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#211b16]/20 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#b90c17] font-bold">↑ 14.8% vs yday</span>
                <span className="text-[#7f756f]">Goal by 22:00</span>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white border-2 border-[#211b16] p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4d4540]">TOTAL ORDERS</span>
                  <div className="text-3xl font-black text-[#020100] mt-1 tracking-tight">
                    214 <span className="font-mono text-xs text-[#4d4540] font-normal">chits</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded bg-[#ffdad6] border-2 border-[#211b16] flex items-center justify-center text-lg shadow-[1px_1px_0px_#211b16]">
                  🍜
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="bg-[#fbebdb] p-1.5 rounded border border-[#211b16]/40">
                  <div className="font-mono text-[10px] text-[#7f756f]">Dine-In</div>
                  <div className="text-lg text-[#020100] font-bold">142</div>
                </div>
                <div className="bg-[#fbebdb] p-1.5 rounded border border-[#211b16]/40">
                  <div className="font-mono text-[10px] text-[#7f756f]">Delivery</div>
                  <div className="text-lg text-[#020100] font-bold">72</div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#211b16]/20 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#b90c17] font-bold">↑ 9.2% speed</span>
                <span className="text-[#7f756f]">Peak: 12:45 PM</span>
              </div>
            </div>

            {/* Kitchen Queue */}
            <div className="bg-white border-2 border-[#211b16] p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#4d4540]">KITCHEN QUEUE</span>
                    <span className="w-2 h-2 rounded-full bg-[#b90c17] animate-pulse" />
                  </div>
                  <div className="text-3xl font-black text-[#b90c17] mt-1 tracking-tight">8 Tickets</div>
                </div>
                <div className="w-10 h-10 rounded bg-[#de2e2c] text-white border-2 border-[#211b16] flex items-center justify-center text-lg shadow-[1px_1px_0px_#211b16]">
                  🥣
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#b90c17] text-white font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                  3 URGENT (&gt;15m)
                </span>
                <span className="px-2.5 py-1 rounded bg-[#fbebdb] border border-[#211b16] font-mono text-[10px] text-[#020100] font-bold">
                  5 In-Progress
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-[#211b16]/20 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#020100] font-bold">Noodle Line: Full</span>
                <span className="text-[#b90c17] uppercase font-bold">3 COOKERS BUSY</span>
              </div>
            </div>

            {/* Avg Ticket */}
            <div className="bg-white border-2 border-[#211b16] p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4d4540]">AVG TICKET / ORDER</span>
                  <div className="text-3xl font-black text-[#020100] mt-1 tracking-tight">₱492</div>
                </div>
                <div className="w-10 h-10 rounded bg-[#ede0d8] border-2 border-[#211b16] flex items-center justify-center text-lg shadow-[1px_1px_0px_#211b16]">
                  🧾
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between h-8 px-1">
                <div className="w-3 bg-[#f5e6d6] h-4 rounded-t border-t border-[#020100]" />
                <div className="w-3 bg-[#f5e6d6] h-5 rounded-t border-t border-[#020100]" />
                <div className="w-3 bg-[#f5e6d6] h-3 rounded-t border-t border-[#020100]" />
                <div className="w-3 bg-[#f6bf22] h-7 rounded-t border-t border-[#020100]" />
                <div className="w-3 bg-[#f6bf22] h-6 rounded-t border-t border-[#020100]" />
                <div className="w-3 bg-[#b90c17] h-8 rounded-t border-t border-[#020100]" />
                <div className="w-3 bg-[#020100] h-7 rounded-t" />
              </div>
              <div className="mt-3 pt-2 border-t border-[#211b16]/20 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#b90c17] font-bold">↑ 4.5% AOV</span>
                <span className="text-[#7f756f]">38 mins/turnover</span>
              </div>
            </div>
          </section>

          {/* ── 3. CHARTS & STATION LOAD (65% / 35%) ── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Sales Demand Velocity Bar Chart */}
              <div className="bg-white border-2 border-[#211b16] rounded-lg p-5 lg:p-6 shadow-[3px_3px_0px_#211b16]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#211b16]/20">
                  <div>
                    <h3 className="text-xl uppercase font-black text-[#020100]">SALES &amp; DEMAND VELOCITY</h3>
                    <p className="text-xs text-[#4d4540]">Tracking real-time bowl volume and gross revenue telemetry</p>
                  </div>

                  {/* Time Switcher */}
                  <div className="inline-flex bg-[#fbebdb] p-1 rounded border-2 border-[#211b16] shadow-[1px_1px_0px_#211b16]">
                    {[
                      { id: 'today', label: 'TODAY (HOURLY)' },
                      { id: 'week', label: 'THIS WEEK' },
                      { id: 'month', label: 'THIS MONTH' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setChartTab(tab.id)}
                        className={`px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase font-bold rounded transition-all ${
                          chartTab === tab.id
                            ? 'bg-[#020100] text-white shadow-[1px_1px_0px_#211b16]'
                            : 'text-[#211b16] hover:text-[#b90c17]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar Chart Graphics */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#7f756f] uppercase">
                      HOURLY DISTRIBUTION (10:00 AM - 9:00 PM)
                    </span>
                    <div className="flex items-center gap-4 font-mono text-[11px]">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-3 h-3 bg-[#b90c17] border border-[#020100]" /> Peak Rush
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-3 h-3 bg-[#f6bf22] border border-[#020100]" /> Standard Service
                      </span>
                    </div>
                  </div>

                  <div className="relative h-64 w-full bg-[#fbebdb]/40 border-2 border-[#211b16] rounded-lg p-3 sm:p-4 flex items-end justify-between gap-1 sm:gap-2">
                    <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-[#211b16]/20 pointer-events-none" />
                    <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-[#211b16]/20 pointer-events-none" />
                    <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-[#211b16]/20 pointer-events-none" />

                    {HOURLY_CHART.map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end relative group">
                        {bar.revenue && (
                          <div className="absolute -top-7 px-1.5 py-0.5 bg-[#b90c17] text-white font-mono text-[10px] rounded border border-[#020100] shadow-[1px_1px_0px_#211b16] whitespace-nowrap z-10">
                            {bar.revenue}
                          </div>
                        )}
                        <div
                          style={{ height: bar.height }}
                          className={`w-full max-w-[36px] border-2 border-[#211b16] rounded-t shadow-[1px_0px_0px_#211b16] transition-all ${
                            bar.isPeak
                              ? 'bg-[#b90c17] group-hover:bg-[#de2e2c]'
                              : bar.isPrep
                              ? 'bg-[#efe0d0]'
                              : 'bg-[#f6bf22] group-hover:bg-[#ffdf99]'
                          }`}
                        />
                        <span className={`font-mono text-[10px] ${bar.isPeak ? 'text-[#b90c17] font-bold' : 'text-[#7f756f]'}`}>
                          {bar.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Station Load Preview */}
              <div className="bg-white border-2 border-[#211b16] rounded-lg p-5 shadow-[3px_3px_0px_#211b16]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base uppercase font-bold text-[#020100]">STATION LOAD PREVIEW</span>
                  <span className="font-mono text-[10px] text-[#7f756f] uppercase font-bold">ACTIVE LINE COOKS: 5</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#fbebdb] rounded border-2 border-[#211b16] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold uppercase text-[#020100]">RAMEN STATION</div>
                      <div className="text-xs text-[#4d4540]">Tonkotsu &amp; Broths</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#b90c17] text-white font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                      3 Pending
                    </span>
                  </div>

                  <div className="p-3 bg-[#fbebdb] rounded border-2 border-[#211b16] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold uppercase text-[#020100]">FRYER / KARAAGE</div>
                      <div className="text-xs text-[#4d4540]">Appetizers &amp; Sides</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#f6bf22] text-[#020100] font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                      2 Orders
                    </span>
                  </div>

                  <div className="p-3 bg-[#fbebdb] rounded border-2 border-[#211b16] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold uppercase text-[#020100]">DRINK &amp; DESSERT</div>
                      <div className="text-xs text-[#4d4540]">Bar &amp; Soft Serve</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-white border border-[#211b16] text-[#020100] font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                      1 Order
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bestsellers & Kitchen Stock Warning */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white border-2 border-[#211b16] rounded-lg p-5 shadow-[3px_3px_0px_#211b16]">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#211b16]/20">
                  <div>
                    <h3 className="text-base uppercase font-extrabold text-[#020100]">BESTSELLER RANKS</h3>
                    <p className="font-mono text-[10px] text-[#7f756f]">Real-time shift depletion</p>
                  </div>
                  <span className="text-xl">🔥</span>
                </div>

                <div className="mt-3 divide-y divide-[#211b16]/10">
                  {[
                    { rank: 1, name: 'Tonkotsu Special', price: '₱280', sold: 112, inStock: true },
                    { rank: 2, name: 'Spicy Miso Ramen', price: '₱270', sold: 89, inStock: true },
                    { rank: 3, name: 'Chicken Karaage Bowl', price: '₱195', sold: 74, lowStock: 'Low: 8 left' },
                    { rank: 4, name: 'Pork Gyoza (6pcs)', price: '₱135', sold: 58, inStock: true },
                    { rank: 5, name: 'Matcha Soft Serve', price: '₱110', sold: 46, inStock: true },
                  ].map((item) => (
                    <div key={item.rank} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold border border-[#211b16] shadow-[1px_1px_0px_#211b16] ${
                            item.rank === 1
                              ? 'bg-[#020100] text-white'
                              : item.rank === 2
                              ? 'bg-[#b90c17] text-white'
                              : item.rank === 3
                              ? 'bg-[#f6bf22] text-[#020100]'
                              : 'bg-[#fbebdb] text-[#020100]'
                          }`}
                        >
                          {item.rank}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-[#020100]">{item.name}</div>
                          <div className="font-mono text-[10px] text-[#4d4540]">
                            {item.price} · {item.sold} sold
                          </div>
                        </div>
                      </div>
                      {item.inStock ? (
                        <span className="px-2 py-0.5 rounded bg-[#f5e6d6] text-[#020100] font-mono text-[10px] border border-[#211b16]">
                          In Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#b90c17] font-mono text-[10px] border border-[#b90c17] font-bold">
                          {item.lowStock}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Kitchen Prep Criticals */}
              <div className="bg-[#fbebdb] border-2 border-[#211b16] rounded-lg p-5 shadow-[3px_3px_0px_#211b16]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">⚠️</span>
                  <h4 className="text-base uppercase font-bold text-[#020100]">KITCHEN PREP CRITICALS</h4>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded bg-white border-2 border-[#b90c17] flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#b90c17] uppercase">CHASHU PORK BELLY</div>
                      <div className="font-mono text-[10px] text-[#4d4540]">Low Stock Warning</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#b90c17]">4.2 kg left</span>
                      <div className="font-mono text-[9px] text-[#7f756f]">~ 28 bowls</div>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-white border border-[#211b16]/40 flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#020100] uppercase">RAMEN NOODLES (FRESH)</div>
                      <div className="font-mono text-[10px] text-[#4d4540]">Batch #3 Prepped</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#020100]">18.5 kg</span>
                      <div className="font-mono text-[9px] text-[#7f756f]">Healthy</div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-3 py-2 bg-[#efe0d0] border border-[#211b16] rounded font-mono text-xs uppercase tracking-wider text-[#020100] font-bold hover:bg-[#e6d8c8] transition-all shadow-[1px_1px_0px_#211b16]">
                  REQUEST PREP STOCKROOM REFILL
                </button>
              </div>
            </div>
          </section>

          {/* ── 4. ORDERS DATA TABLE ── */}
          <section className="bg-white border-2 border-[#211b16] rounded-lg p-5 lg:p-6 shadow-[4px_4px_0px_#211b16]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-[#211b16]">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search order #, customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-3 py-1.5 bg-[#fff1e4] border-2 border-[#211b16] rounded text-xs font-sans text-[#020100] focus:outline-none focus:bg-[#ffdf99] shadow-[2px_2px_0px_#211b16]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {['ALL (24)', 'PREPARING (5)', 'READY TO SERVE (3)', 'COMPLETED (16)'].map((chip) => {
                    const isSelected = chip.startsWith(selectedFilter.toUpperCase());
                    return (
                      <button
                        key={chip}
                        onClick={() => setSelectedFilter(chip.split(' ')[0])}
                        className={`px-3 py-1 border-2 rounded font-mono text-[11px] uppercase font-bold transition-all ${
                          isSelected
                            ? 'bg-[#020100] text-white border-[#020100] shadow-[1px_1px_0px_#211b16]'
                            : 'bg-[#fff1e4] text-[#211b16] hover:bg-[#fbebdb] border-[#211b16]'
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#fff1e4] border-2 border-[#211b16] rounded font-mono text-xs uppercase tracking-wider text-[#020100] font-bold hover:bg-[#f5e6d6] shadow-[2px_2px_0px_#211b16] active:translate-x-[1px] active:translate-y-[1px] transition-all">
                <span>📥 EXPORT CSV</span>
              </button>
            </div>

            {/* Responsive Table (Naka-horizontal scroll kapag sa mobile para buo at kumpleto ang table gaya sa Part 1) */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full min-w-[760px] text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#211b16] bg-[#fbebdb] font-mono text-[11px] uppercase text-[#020100] tracking-wider">
                    <th className="py-3 px-4">TICKET / TYPE</th>
                    <th className="py-3 px-4">CUSTOMER</th>
                    <th className="py-3 px-4">ORDERED ITEMS BREAKDOWN</th>
                    <th className="py-3 px-4">AMOUNT</th>
                    <th className="py-3 px-4">PREP STATE</th>
                    <th className="py-3 px-4 text-right">KITCHEN ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-[#211b16]/20 text-xs">
                  {ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-[#fff1e4]/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-xs font-bold text-[#020100]">{order.id}</div>
                        <div className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-[#fbebdb] border border-[#211b16] font-mono text-[10px] uppercase font-bold">
                          {order.table}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-sm font-bold text-[#020100]">{order.customer}</div>
                        <div className="font-mono text-[10px] text-[#7f756f]">{order.party}</div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        {order.items.map((it, idx) => (
                          <span key={idx} className="mr-1">
                            <span className="font-bold text-[#020100]">{it.count}</span> {it.name}{' '}
                            {it.note && <span className="text-[#b90c17] font-bold">({it.note})</span>}
                            {idx < order.items.length - 1 && ', '}
                          </span>
                        ))}
                      </td>

                      <td className="py-3.5 px-4 text-sm font-bold text-[#020100]">{order.amount}</td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#020100] font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16] ${
                          order.actionVariant === 'danger'
                            ? 'bg-[#b90c17] text-white'
                            : order.actionVariant === 'subtle'
                            ? 'bg-[#efe0d0] text-[#020100]'
                            : 'bg-[#f6bf22] text-[#020100]'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                          {order.prepState}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          className={`px-3 py-1.5 border-2 border-[#020100] rounded font-mono text-[10px] uppercase font-bold shadow-[2px_2px_0px_#211b16] active:translate-x-[1px] active:translate-y-[1px] transition-all ${
                            order.actionVariant === 'primary'
                              ? 'bg-[#020100] text-white hover:bg-[#b90c17]'
                              : order.actionVariant === 'danger'
                              ? 'bg-[#ffdad6] text-[#b90c17] hover:bg-[#b90c17] hover:text-white'
                              : order.actionVariant === 'outline'
                              ? 'bg-white text-[#020100] hover:bg-[#fbebdb]'
                              : 'bg-[#f5e6d6] text-[#020100] hover:bg-[#e6d8c8]'
                          }`}
                        >
                          {order.actionText}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="mt-4 pt-3 border-t-2 border-[#211b16]/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px]">
              <span className="text-[#4d4540]">Showing 4 of 24 Live Shift Orders</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 bg-[#fbebdb] border border-[#211b16] rounded hover:bg-[#f5e6d6]">
                  Prev
                </button>
                <span className="px-2 py-1 bg-[#020100] text-white rounded font-bold">1</span>
                <button className="px-2 py-1 bg-[#fbebdb] border border-[#211b16] rounded hover:bg-[#f5e6d6]">
                  2
                </button>
                <button className="px-2 py-1 bg-[#fbebdb] border border-[#211b16] rounded hover:bg-[#f5e6d6]">
                  3
                </button>
                <button className="px-2 py-1 bg-[#fbebdb] border border-[#211b16] rounded hover:bg-[#f5e6d6]">
                  Next
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}
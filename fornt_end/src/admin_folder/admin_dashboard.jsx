import React, { useState } from 'react';

const ORDERS = [
  {
    id: '#KM-8846',
    type: 'Table 04 · Dine-in',
    customer: 'Kenji Sato',
    party: 'Party of 2',
    items: [
      { count: 2, name: 'Tonkotsu Special', note: 'Extra Chashu' },
      { count: 1, name: 'Pork Gyoza' },
    ],
    amount: 695,
    prepState: 'Prep: 8m left',
    actionText: 'Mark Ready',
    actionVariant: 'primary',
  },
  {
    id: '#KM-8845',
    type: 'GrabFood · Pickup',
    customer: 'Maria Santos',
    party: 'Driver Arrived',
    items: [
      { count: 1, name: 'Spicy Miso Ramen', note: 'Spicy Level 3' },
      { count: 1, name: 'Calpis Soda' },
    ],
    amount: 360,
    prepState: 'Ready for Pickup',
    actionText: 'Dispatch',
    actionVariant: 'secondary',
  },
  {
    id: '#KM-8844',
    type: 'Table 11 · Dine-in',
    customer: 'David & Sarah',
    party: 'Party of 2',
    items: [
      { count: 2, name: 'Black Garlic Tonkotsu' },
      { count: 1, name: 'Karaage Bowl' },
      { count: 2, name: 'Green Tea' },
    ],
    amount: 840,
    prepState: 'Cooking (In Pot)',
    actionText: 'View Ticket',
    actionVariant: 'neutral',
  },
  {
    id: '#KM-8843',
    type: 'Takeout · Counter',
    customer: 'Aris Thorne',
    party: 'Paid Cash',
    items: [
      { count: 1, name: 'Shoyu Ramen' },
      { count: 1, name: 'Gyoza' },
    ],
    amount: 390,
    prepState: 'Completed',
    actionText: 'Receipt',
    actionVariant: 'subtle',
  },
];

const HOURLY_CHART = [
  { time: '10A', height: '18%', isPeak: false },
  { time: '11A', height: '42%', isPeak: false },
  { time: '12P', height: '94%', isPeak: true, revenue: '₱8,920' },
  { time: '1P', height: '82%', isPeak: true },
  { time: '2P', height: '55%', isPeak: false },
  { time: '3P', height: '24%', isPrep: true },
  { time: '4P', height: '28%', isPrep: true },
  { time: '5P', height: '50%', isPeak: false },
  { time: '6P', height: '78%', isPeak: true },
  { time: '7P', height: '88%', isPeak: true },
  { time: '8P', height: '64%', isPeak: false },
];

export default function KumoAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('today');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#221a11] font-sans antialiased flex flex-col lg:flex-row">
      
      {/* ─── 1. MOBILE BACKDROP BLUR OVERLAY ─── */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-[#211b16]/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ─── 2. RESPONSIVE SIDEBAR (Slide drawer sa mobile, Persistent sa Desktop) ─── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#fff1e4] z-50 flex flex-col justify-between border-r-2 border-[#211b16] shadow-[4px_0px_0px_#211b16] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header & Mobile Close Button */}
          <div className="p-5 border-b-2 border-[#211b16] bg-[#fbebdb] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#020100] text-white rounded flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#211b16]">
                雲
              </div>
              <div>
                <div className="text-lg uppercase tracking-wider text-[#020100] font-black leading-none">
                  KUMO.
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#4d4540] mt-1 font-bold">
                  Artisanal Ramen Bar
                </div>
              </div>
            </div>

            {/* Mobile close button (X) */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden w-8 h-8 rounded bg-white border-[1.5px] border-[#211b16] flex items-center justify-center font-mono font-bold text-sm shadow-[1.5px_1.5px_0px_#211b16] active:translate-x-[1px] active:translate-y-[1px]"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 p-3.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '▦' },
              { id: 'orders', label: 'Orders', icon: '▤', badge: '14' },
              { id: 'menu', label: 'Menu & Items', icon: '🍜' },
              { id: 'kitchen', label: 'Kitchen KDS', icon: '🥣', live: true },
              { id: 'categories', label: 'Categories', icon: '▧' },
              { id: 'analytics', label: 'Analytics', icon: '📊' },
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
                    : 'text-[#4d4540] hover:bg-[#f5e6d6] hover:text-[#221a11]'
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
                {item.live && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f6bf22] animate-pulse" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Manager Profile Footer */}
        <div className="p-3.5 border-t-2 border-[#211b16] bg-[#fbebdb]">
          <div className="flex items-center justify-between p-2 rounded bg-white border-[1.5px] border-[#211b16] shadow-[2px_2px_0px_#211b16]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-[#211b16] flex items-center justify-center font-mono text-xs text-white font-bold">
                KM
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#221a11] font-bold uppercase leading-none">
                  Kenji Mori
                </span>
                <span className="font-mono text-[9px] text-[#4d4540] tracking-wider mt-0.5">
                  Floor Mgr #04
                </span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#de2e2c] animate-pulse" />
          </div>
        </div>
      </aside>

      {/* ─── 3. MAIN CONTENT CONTAINER (Naka-adjust padding sa desktop) ─── */}
      <div className="w-full flex-1 flex flex-col min-h-screen lg:pl-72 pb-16 lg:pb-0">
        
        {/* TOPBAR (May hamburger sa mobile) */}
        <header className="sticky top-0 bg-[#fff1e4]/95 backdrop-blur border-b-2 border-[#211b16] z-30 px-4 lg:px-8 py-3 h-16 flex items-center justify-between shadow-[0_2px_0px_#211b16]">
          <div className="flex items-center gap-3">
            {/* Hamburger Button (Lumalabas sa mobile lamang) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded bg-white border-2 border-[#211b16] shadow-[2px_2px_0px_#211b16] flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px]"
              aria-label="Open Menu"
            >
              <span className="text-xl font-bold">☰</span>
            </button>

            {/* Mobile Brand Name */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-7 h-7 bg-[#020100] text-white rounded flex items-center justify-center font-black text-xs shadow-[1.5px_1.5px_0px_#211b16]">
                雲
              </div>
              <span className="font-black text-sm uppercase tracking-tight text-[#020100]">
                KUMO RAMEN
              </span>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block relative w-80 xl:w-96">
              <span className="absolute left-3 top-2.5 text-[#4d4540] text-sm">🔍</span>
              <input
                type="search"
                placeholder="Search chit #, table, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border-[1.5px] border-[#211b16] rounded text-xs text-[#221a11] focus:outline-none focus:bg-[#ffdf99] shadow-[2px_2px_0px_#211b16]"
              />
            </div>
          </div>

          {/* Topbar Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border-[1.5px] border-[#211b16] rounded shadow-[2px_2px_0px_#211b16]">
              <span className="w-2 h-2 rounded-full bg-[#de2e2c] animate-pulse" />
              <span className="font-mono text-[10px] uppercase text-[#221a11] font-bold">
                Accepting Orders
              </span>
            </div>

            <button className="relative p-2 bg-white border-[1.5px] border-[#211b16] rounded hover:bg-[#f5e6d6] shadow-[2px_2px_0px_#211b16] active:translate-x-[1px] active:translate-y-[1px]">
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
          
          {/* Mobile Search input (naka-display lang kapag phone view) */}
          <div className="lg:hidden relative w-full">
            <span className="absolute left-3 top-2.5 text-[#4d4540] text-xs">🔍</span>
            <input
              type="search"
              placeholder="Search chit #, table, customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border-2 border-[#211b16] rounded-lg text-xs text-[#221a11] focus:outline-none focus:bg-[#ffdf99] shadow-[2px_2px_0px_#211b16]"
            />
          </div>

          {/* 1. LIVE OPS HERO BANNER */}
          <section className="relative overflow-hidden rounded-xl bg-[#fbebdb] border-2 border-[#211b16] shadow-[4px_4px_0px_#211b16] p-4 lg:p-8">
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border-[1.5px] border-[#211b16] rounded shadow-[2px_2px_0px_#211b16]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#de2e2c] animate-ping" />
                  <span className="font-mono text-[10px] tracking-widest text-[#020100] font-bold uppercase">
                    KUMO RAMEN · LIVE OPS DASHBOARD
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none uppercase text-[#020100]">
                  GOOD FOOD. <span className="text-[#b90c17]">GOOD BUSINESS.</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#4d4540] max-w-xl">
                  Daily restaurant performance, active kitchen tickets, and revenue telemetry for Store #04 · Shibuya Metro Branch.
                </p>
              </div>

              {/* Shift Telemetry Indicators */}
              <div className="grid grid-cols-3 xl:flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 bg-white border-2 border-[#211b16] p-2.5 sm:px-4 sm:py-2.5 rounded-lg shadow-[2px_2px_0px_#211b16] text-center sm:text-left">
                  <span className="text-xl sm:text-2xl text-[#f6bf22]">☀️</span>
                  <div>
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase text-[#7f756f]">Shift</div>
                    <div className="text-xs sm:text-sm font-bold text-[#020100]">Lunch Rush</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 bg-white border-2 border-[#211b16] p-2.5 sm:px-4 sm:py-2.5 rounded-lg shadow-[2px_2px_0px_#211b16] text-center sm:text-left">
                  <span className="text-xl sm:text-2xl text-[#b90c17]">🪑</span>
                  <div>
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase text-[#7f756f]">Seated</div>
                    <div className="text-xs sm:text-sm font-bold text-[#020100]">82% (18/22)</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 bg-white border-2 border-[#211b16] p-2.5 sm:px-4 sm:py-2.5 rounded-lg shadow-[2px_2px_0px_#211b16] text-center sm:text-left">
                  <span className="text-xl sm:text-2xl text-[#020100]">⏱️</span>
                  <div>
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase text-[#7f756f]">Ticket Time</div>
                    <div className="text-xs sm:text-sm font-bold text-[#020100]">14.2m</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative z-10 mt-4 lg:mt-6 pt-4 border-t-[1.5px] border-[#211b16]/20 flex flex-wrap items-center justify-between gap-3">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button className="inline-flex items-center justify-center gap-1.5 bg-[#020100] text-white px-3 sm:px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border-[1.5px] border-[#020100] shadow-[2px_2px_0px_#211b16] hover:bg-[#b90c17] font-bold">
                  <span>+ New Order</span>
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 bg-white text-[#020100] px-3 sm:px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border-[1.5px] border-[#020100] shadow-[2px_2px_0px_#211b16] hover:bg-[#efe0d0] font-bold">
                  <span>⏸ Pause Online</span>
                </button>
                <button className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-white text-[#020100] px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border-[1.5px] border-[#020100] shadow-[2px_2px_0px_#211b16] hover:bg-[#f5e6d6] font-bold">
                  <span>🖨️ Shift Report</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[#4d4540] font-mono text-[11px] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#de2e2c]" />
                <span>POS Sync: 2s ago</span>
              </div>
            </div>
          </section>

          {/* 2. KPI METRICS (2-col sa mobile, 4-col sa desktop) */}
          <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {/* Revenue */}
            <div className="bg-white border-2 border-[#211b16] p-4 lg:p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4d4540]">
                    Today&apos;s Revenue
                  </span>
                  <div className="text-xl sm:text-3xl font-black text-[#020100] mt-1 tracking-tight">₱38,450</div>
                </div>
                <div className="hidden sm:flex w-10 h-10 rounded bg-[#ffdf99] border-[1.5px] border-[#211b16] items-center justify-center font-bold text-[#020100] shadow-[1px_1px_0px_#211b16]">
                  ₱
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="w-full h-2.5 bg-[#efe0d0] border border-[#211b16] rounded overflow-hidden">
                  <div className="h-full bg-[#f6bf22] w-[85%]" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3 pt-2 border-t border-[#211b16]/20 flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-[#b90c17] font-bold">↑ 14.8%</span>
                <span className="text-[#7f756f] hidden sm:inline">Goal: ₱45k</span>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white border-2 border-[#211b16] p-4 lg:p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4d4540]">
                    Total Orders
                  </span>
                  <div className="text-xl sm:text-3xl font-black text-[#020100] mt-1 tracking-tight">214</div>
                </div>
                <div className="hidden sm:flex w-10 h-10 rounded bg-[#ffdad6] border-[1.5px] border-[#211b16] items-center justify-center text-lg shadow-[1px_1px_0px_#211b16]">
                  🍜
                </div>
              </div>
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1.5 text-center">
                <div className="bg-[#fbebdb] p-1 rounded border border-[#211b16]/40 text-[10px]">
                  Dine: <b>142</b>
                </div>
                <div className="bg-[#fbebdb] p-1 rounded border border-[#211b16]/40 text-[10px]">
                  Deliv: <b>72</b>
                </div>
              </div>
              <div className="mt-2 sm:mt-3 pt-2 border-t border-[#211b16]/20 flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-[#b90c17] font-bold">↑ 9.2%</span>
                <span className="text-[#7f756f] hidden sm:inline">Peak: 12:45P</span>
              </div>
            </div>

            {/* Kitchen Queue */}
            <div className="bg-white border-2 border-[#211b16] p-4 lg:p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4d4540]">
                    Kitchen Queue
                  </span>
                  <div className="text-xl sm:text-3xl font-black text-[#b90c17] mt-1 tracking-tight">8 Tickets</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#b90c17] animate-pulse" />
              </div>
              <div className="mt-3 sm:mt-4">
                <span className="px-2 py-0.5 rounded bg-[#b90c17] text-white font-mono text-[9px] sm:text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                  3 URGENT (&gt;15m)
                </span>
              </div>
              <div className="mt-2 sm:mt-3 pt-2 border-t border-[#211b16]/20 font-mono text-[10px] sm:text-[11px] text-[#020100] font-bold">
                Noodle Line: Busy
              </div>
            </div>

            {/* Avg Ticket */}
            <div className="bg-white border-2 border-[#211b16] p-4 lg:p-5 rounded-lg shadow-[3px_3px_0px_#211b16] flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4d4540]">
                  Avg Ticket
                </span>
                <div className="text-xl sm:text-3xl font-black text-[#020100] mt-1 tracking-tight">₱492</div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-end justify-between h-6 sm:h-8">
                <div className="w-2.5 bg-[#f6bf22] h-4 rounded-t border-t border-[#020100]" />
                <div className="w-2.5 bg-[#f6bf22] h-5 rounded-t border-t border-[#020100]" />
                <div className="w-2.5 bg-[#b90c17] h-7 rounded-t border-t border-[#020100]" />
                <div className="w-2.5 bg-[#020100] h-6 rounded-t" />
              </div>
              <div className="mt-2 sm:mt-3 pt-2 border-t border-[#211b16]/20 font-mono text-[10px] sm:text-[11px] text-[#b90c17] font-bold">
                ↑ 4.5% AOV
              </div>
            </div>
          </section>

          {/* 3. CHARTS + BESTSELLERS (Responsive Stack) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sales Demand Chart */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white border-2 border-[#211b16] rounded-lg p-4 sm:p-6 shadow-[3px_3px_0px_#211b16]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-[1.5px] border-[#211b16]/20">
                  <div>
                    <h3 className="text-base sm:text-xl uppercase font-black text-[#020100]">Sales &amp; Demand Velocity</h3>
                    <p className="text-xs text-[#4d4540]">Real-time bowl volume and gross revenue telemetry</p>
                  </div>

                  <div className="inline-flex bg-[#fbebdb] p-1 rounded border-[1.5px] border-[#211b16] shadow-[1px_1px_0px_#211b16]">
                    {['today', 'week', 'month'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2.5 sm:px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase font-bold rounded transition-all ${
                          activeTab === tab
                            ? 'bg-[#020100] text-white shadow-[1px_1px_0px_#211b16]'
                            : 'text-[#221a11] hover:text-[#b90c17]'
                        }`}
                      >
                        {tab === 'today' ? 'Today' : tab === 'week' ? 'Week' : 'Month'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar Graph */}
                <div className="mt-4 sm:mt-6">
                  <div className="relative h-48 sm:h-64 w-full bg-[#fbebdb]/40 border-[1.5px] border-[#211b16] rounded-lg p-2 sm:p-4 flex items-end justify-between gap-1 sm:gap-2">
                    {HOURLY_CHART.map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end relative">
                        {bar.revenue && (
                          <div className="hidden sm:block absolute -top-7 px-1.5 py-0.5 bg-[#b90c17] text-white font-mono text-[9px] rounded border border-[#020100] shadow-[1px_1px_0px_#211b16]">
                            {bar.revenue}
                          </div>
                        )}
                        <div
                          style={{ height: bar.height }}
                          className={`w-full max-w-[32px] border-[1.5px] border-[#211b16] rounded-t ${
                            bar.isPeak ? 'bg-[#b90c17]' : 'bg-[#f6bf22]'
                          }`}
                        />
                        <span className={`font-mono text-[9px] sm:text-[10px] ${bar.isPeak ? 'text-[#b90c17] font-bold' : 'text-[#7f756f]'}`}>
                          {bar.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Station Load */}
              <div className="bg-white border-2 border-[#211b16] rounded-lg p-4 sm:p-5 shadow-[3px_3px_0px_#211b16]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm sm:text-base uppercase font-bold text-[#020100]">Station Load Preview</span>
                  <span className="font-mono text-[10px] text-[#7f756f] uppercase font-bold">5 Line Cooks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-2.5 sm:p-3 bg-[#fbebdb] rounded border-[1.5px] border-[#211b16] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold uppercase text-[#020100]">Ramen Station</div>
                      <div className="text-[11px] text-[#4d4540]">Tonkotsu &amp; Broths</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#b90c17] text-white font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                      3 Pend
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-[#fbebdb] rounded border-[1.5px] border-[#211b16] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold uppercase text-[#020100]">Fryer / Karaage</div>
                      <div className="text-[11px] text-[#4d4540]">Appetizers</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#f6bf22] text-[#020100] font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                      2 Orders
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-[#fbebdb] rounded border-[1.5px] border-[#211b16] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold uppercase text-[#020100]">Bar &amp; Desserts</div>
                      <div className="text-[11px] text-[#4d4540]">Drinks</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#211b16] text-[#020100] font-mono text-[10px] font-bold shadow-[1px_1px_0px_#211b16]">
                      1 Order
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bestsellers & Kitchen Stock */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white border-2 border-[#211b16] rounded-lg p-4 sm:p-5 shadow-[3px_3px_0px_#211b16]">
                <div className="flex items-center justify-between pb-3 border-b border-[#211b16]/20">
                  <h3 className="text-base uppercase font-extrabold text-[#020100]">Bestseller Ranks</h3>
                  <span className="text-xl">🔥</span>
                </div>

                <div className="mt-3 divide-y divide-[#211b16]/10">
                  {[
                    { rank: 1, name: 'Tonkotsu Special', price: '₱280', sold: 112 },
                    { rank: 2, name: 'Spicy Miso Ramen', price: '₱270', sold: 89 },
                    { rank: 3, name: 'Chicken Karaage Bowl', price: '₱195', sold: 74, low: true },
                    { rank: 4, name: 'Pork Gyoza (6pcs)', price: '₱135', sold: 58 },
                  ].map((item) => (
                    <div key={item.rank} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold border border-[#211b16] bg-[#fbebdb] text-[#020100]">
                          {item.rank}
                        </span>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#020100]">{item.name}</div>
                          <div className="font-mono text-[10px] text-[#4d4540]">
                            {item.price} · {item.sold} sold
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${item.low ? 'bg-[#ffdad6] text-[#b90c17] border-[#b90c17] font-bold' : 'bg-[#f5e6d6] text-[#020100] border-[#211b16]'}`}>
                        {item.low ? 'Low Stock' : 'In Stock'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kitchen Stock Warning */}
              <div className="bg-[#fbebdb] border-2 border-[#211b16] rounded-lg p-4 sm:p-5 shadow-[3px_3px_0px_#211b16]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">⚠️</span>
                  <h4 className="text-xs sm:text-sm uppercase font-bold text-[#020100]">Prep Stock Warning</h4>
                </div>
                <div className="p-2.5 rounded bg-white border-[1.5px] border-[#b90c17] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#b90c17] uppercase">Chashu Pork Belly</div>
                    <div className="font-mono text-[10px] text-[#4d4540]">~ 28 bowls remaining</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#b90c17]">4.2 kg</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. ORDERS SECTION (Card Feed sa Phone, Full Table sa Desktop) */}
          <section className="bg-white border-2 border-[#211b16] rounded-lg p-4 sm:p-6 shadow-[4px_4px_0px_#211b16]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#211b16]">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {['All (24)', 'Preparing (5)', 'Ready (3)', 'Completed (16)'].map((chip) => {
                  const isSelected = chip.startsWith(selectedFilter);
                  return (
                    <button
                      key={chip}
                      onClick={() => setSelectedFilter(chip.split(' ')[0])}
                      className={`px-2.5 sm:px-3 py-1 border-[1.5px] rounded font-mono text-[10px] sm:text-[11px] uppercase font-bold transition-all ${
                        isSelected
                          ? 'bg-[#020100] text-white border-[#020100] shadow-[1px_1px_0px_#211b16]'
                          : 'bg-[#fff1e4] text-[#221a11] border-[#211b16]'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff1e4] border-[1.5px] border-[#211b16] rounded font-mono text-xs uppercase tracking-wider text-[#020100] font-bold shadow-[2px_2px_0px_#211b16]">
                <span>📥 Export CSV</span>
              </button>
            </div>

            {/* A. MOBILE VIEW CARD FEED (Lumalabas lang sa phone) */}
            <div className="block lg:hidden space-y-2.5 mt-3">
              {ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#fff8f4] border border-[#211b16] rounded-lg p-3 shadow-[2px_2px_0px_#211b16] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#020100]">{order.id} · {order.type}</span>
                    <span className="font-black text-sm text-[#020100]">₱{order.amount}</span>
                  </div>
                  <div className="text-xs">
                    <b>{order.customer}</b> ({order.party})
                    <p className="text-[#4d4540] text-[11px] mt-0.5">
                      {order.items.map((it, idx) => (
                        <span key={idx}>{it.count}x {it.name}{idx < order.items.length - 1 ? ', ' : ''}</span>
                      ))}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#211b16]/10">
                    <span className="font-mono text-[10px] font-bold text-[#b90c17]">{order.prepState}</span>
                    <button className="px-2.5 py-1 bg-[#020100] text-white rounded font-mono text-[10px] uppercase font-bold">
                      {order.actionText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* B. DESKTOP VIEW DATA TABLE (Lumalabas sa desktop) */}
            <div className="hidden lg:block overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#211b16] bg-[#fbebdb] font-mono text-[11px] uppercase text-[#020100] tracking-wider">
                    <th className="py-3 px-4">Ticket / Type</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Breakdown</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Prep State</th>
                    <th className="py-3 px-4 text-right">Kitchen Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-[1.5px] divide-[#211b16]/20 text-xs">
                  {ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-[#fff1e4]/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-[#020100]">{order.id}</div>
                        <div className="font-mono text-[10px] text-[#4d4540]">{order.type}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#020100]">{order.customer}</div>
                        <div className="font-mono text-[10px] text-[#7f756f]">{order.party}</div>
                      </td>
                      <td className="py-3 px-4">
                        {order.items.map((it, idx) => (
                          <span key={idx} className="mr-1">
                            <b>{it.count}x</b> {it.name}
                            {idx < order.items.length - 1 && ', '}
                          </span>
                        ))}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#020100]">₱{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#f6bf22] text-[#020100] border border-[#020100] font-mono text-[10px] font-bold">
                          {order.prepState}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1 border border-[#020100] rounded font-mono text-[10px] uppercase font-bold shadow-[1.5px_1.5px_0px_#211b16] bg-[#020100] text-white">
                          {order.actionText}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>

      {/* ─── 5. MOBILE BOTTOM NAVIGATION (Lumalabas sa mobile lamang) ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fff1e4] border-t-2 border-[#211b16] z-30 px-6 py-2 flex items-center justify-around shadow-[0_-2px_0px_#211b16]">
        <button
          onClick={() => setActiveMenu('dashboard')}
          className={`flex flex-col items-center font-mono text-[10px] font-bold ${
            activeMenu === 'dashboard' ? 'text-[#b90c17]' : 'text-[#4d4540]'
          }`}
        >
          <span className="text-base">▦</span>
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveMenu('orders')}
          className={`flex flex-col items-center font-mono text-[10px] font-bold ${
            activeMenu === 'orders' ? 'text-[#b90c17]' : 'text-[#4d4540]'
          }`}
        >
          <span className="text-base">▤</span>
          <span>Orders</span>
        </button>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center font-mono text-[10px] font-bold text-[#4d4540]"
        >
          <span className="text-base">☰</span>
          <span>Sidebar</span>
        </button>
      </nav>

    </div>
  );
}
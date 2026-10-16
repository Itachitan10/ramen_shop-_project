
import { useState } from "react";
import CartDrawer from "./cartDrawer";

const Navbar = ({ cartCount, cart_toogle, set_togle, click }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    ["Home", "/dashboard"],
    ["Menu", "#menu"],
    ["Combos", "#promo"],
    ["About", "#footer"],
  ];

  const menuIcons = ["⌂", "🍜", "🔥", "♡"];

  const menuDescriptions = [
    "Back to the homepage",
    "Explore our ramen menu",
    "Discover our special combos",
    "Learn more about Kumo",
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 flex h-[76px] items-center justify-between border-b border-[#211b16]/10 bg-[#fffdf8]/95 px-4 backdrop-blur-xl sm:px-6 md:px-[clamp(20px,5vw,80px)]">

      {/* LOGO */}
      <a
        href="#"
        className="shrink-0 font-['Manrope',sans-serif] text-[20px] font-extrabold tracking-[-1px] text-[#211b16] sm:text-[22px]"
      >
        KUMO <span className="text-[#d62828]">RAMEN</span>
      </a>

      {/* DESKTOP NAV */}
      <div className="hidden items-center gap-[34px] text-[14px] font-semibold md:flex">
        {navLinks.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="relative text-[#211b16] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#d62828] after:transition-all hover:after:w-full"
          >
            {label}
          </a>
        ))}

        <button
          onClick={handleLogout}
          className="font-semibold text-[#d62828] hover:underline"
        >
          Logout
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">

        {/* CART */}
        <button
          onClick={() => {
            set_togle(!cart_toogle);
            click();
          }}
          className="rounded-full bg-[#211b16] px-3 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#d62828] sm:px-[18px] sm:text-[13px]"
        >
          🛒 Cart ({cartCount})
        </button>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 md:hidden ${
            menuOpen
              ? "border-[#d62828] bg-[#d62828] text-white"
              : "border-[#211b16]/15 bg-white text-[#211b16]"
          }`}
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-5 w-5"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[76px] z-40 bg-[#211b16]/35 backdrop-blur-[2px] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE DROPDOWN */}
{menuOpen && (
  <div className="absolute left-0 right-0 top-full z-50 px-3 pt-2 md:hidden sm:px-5">
    <div className="overflow-hidden rounded-xl border border-[#211b16]/15 bg-[#fffdf8] shadow-[0_12px_30px_rgba(33,27,22,0.15)]">

      <nav className="flex flex-col p-2">
        {navLinks.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3.5 text-[15px] font-bold text-[#211b16] transition-colors active:bg-[#ffc72c]/40 hover:bg-[#f7f1e5]"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="border-t border-[#211b16]/10 p-2">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg bg-[#d62828] px-4 py-3.5 text-[15px] font-bold text-white transition-colors active:bg-[#b51f1f]"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;

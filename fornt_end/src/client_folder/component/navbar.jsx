
import { useState, useEffect } from "react";

const Navbar = ({ cartCount, cart_toogle, set_togle, click, token }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const navLinks = [
    // ['profile' , '/']
    ["Home", "/dashboard"],
    ["Menu", "#menu"],
    ["Combos", "#promo"],
    ["About", "#footer"],
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 flex h-[76px] items-center justify-between border-b border-[#211b16]/10 bg-[#fffdf8]/95 px-4 backdrop-blur-xl sm:px-6 md:px-[clamp(20px,5vw,80px)]">

      {/* LOGO */}
      <a
        href="/"
        className="shrink-0 font-['Manrope',sans-serif] text-[20px] font-extrabold tracking-[-1px] text-[#211b16] sm:text-[22px]"
      >
        KUMO <span className="text-[#d62828]">RAMEN</span>
      </a>

      {/* DESKTOP NAV - LOGGED IN */}
      {isLoggedIn && (
        <div className="hidden items-center gap-[30px] text-[14px] font-semibold md:flex">

          {/* PROFILE ICON */}
          <a href="/profile"
            title="My Profile"
            className="flex items-center justify-center text-[#211b16] transition hover:text-[#d62828]"
          >
            <svg
              className="h-[22px] w-[22px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
          </a>

          {/* NAV LINKS */}
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="relative text-[#211b16] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#d62828] after:transition-all hover:after:w-full"
            >
              {label}
            </a>
          ))}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-[#d62828] px-5 py-2.5 font-bold text-white transition hover:bg-[#b51f1f]"
          >
            Logout
          </button>
        </div>
      )}

      {/* GUEST BUTTONS - RIGHT SIDE */}
      {!isLoggedIn && (
        <div className="ml-auto flex items-center gap-3">
          <a
            href="/login"
            className="rounded-lg border border-[#211b16] bg-transparent px-4 py-2.5 text-xs font-bold text-[#211b16] transition hover:bg-[#211b16] hover:text-white sm:px-5 sm:text-sm"
          >
            LOGIN
          </a>

          <a
            href="/register"
            className="rounded-lg bg-[#d62828] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#b51f1f] sm:px-5 sm:text-sm"
          >
            SIGN UP
          </a>
        </div>
      )}

      {/* RIGHT SIDE - LOGGED IN ONLY */}
      {isLoggedIn && (
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 md:hidden">

          {/* CART */}
          <button
            onClick={() => {
              set_togle(!cart_toogle);
              click();
            }}
            className="rounded-full bg-[#211b16] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#d62828] sm:px-[18px] sm:text-[13px]"
          >
            🛒 Cart ({cartCount})
          </button>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
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
      )}

      {/* MOBILE BACKDROP */}
      {isLoggedIn && menuOpen && (
        <div
          className="fixed inset-0 top-[76px] z-40 bg-[#211b16]/35 backdrop-blur-[2px] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE DROPDOWN - LOGGED IN ONLY */}
      {isLoggedIn && menuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 px-3 pt-2 md:hidden sm:px-5">
          <div className="overflow-hidden rounded-xl border border-[#211b16]/15 bg-[#fffdf8] shadow-[0_12px_30px_rgba(33,27,22,0.15)]">

            {/* MY PROFILE */}
            <a
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 border-b border-[#211b16]/10 bg-[#f7f1e5] p-4 transition hover:bg-[#eee5d6]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b16] text-white">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-extrabold text-[#211b16]">
                  My Profile
                </p>
                <p className="text-xs text-[#211b16]/55">
                  Manage your account
                </p>
              </div>

              <svg
                className="h-5 w-5 text-[#211b16]/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>

            {/* NAV LINKS */}
            <nav className="flex flex-col p-2">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3.5 text-[15px] font-bold text-[#211b16] transition-colors hover:bg-[#f7f1e5]"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* LOGOUT */}
            <div className="border-t border-[#211b16]/10 p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg bg-[#d62828] px-4 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#b51f1f]"
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


import { useState } from "react";

const Navbar = ({ cartCount, cart_toogle, set_togle, click }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    ["Home", "/dashboard"],
    ["Menu", "#menu"],
    ["Combos", "#promo"],
    ["About", "#footer"],
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleCart = () => {
    set_togle(!cart_toogle);

    if (click) {
      click();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#211b16]/10 bg-[#fffdf8]/95 backdrop-blur-[15px]">
      <div className="relative mx-auto flex h-[64px] items-center justify-between px-4 sm:h-[76px] sm:px-6 lg:px-[clamp(20px,5vw,80px)]">

        {/* LOGO */}
        <a
          href="/dashboard"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 font-['Manrope',sans-serif] text-[17px] font-extrabold tracking-[-1px] text-[#211b16] sm:text-[22px]"
        >
          KUMO <span className="text-[#d62828]">RAMEN</span>
          <span className="ml-1 text-[#ffc72c]">.</span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-7 text-[14px] font-bold md:flex lg:gap-9">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="relative py-2 text-[#211b16] transition-colors hover:text-[#d62828] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#d62828] after:transition-all hover:after:w-full"
            >
              {label}
            </a>
          ))}

          <button
            onClick={handleLogout}
            className="font-bold text-[#d62828] transition-colors hover:text-[#a51d1d]"
          >
            Logout
          </button>
        </div>

        {/* CART + MOBILE MENU BUTTON */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            onClick={handleCart}
            className="flex items-center gap-1.5 rounded-full border-2 border-[#211b16] bg-[#211b16] px-3 py-2 text-[11px] font-extrabold text-white transition-all hover:-translate-y-0.5 hover:border-[#d62828] hover:bg-[#d62828] sm:gap-2 sm:px-[18px] sm:py-[11px] sm:text-[13px]"
          >
            <span className="text-sm sm:text-base">🛒</span>
            <span>Cart</span>

            <span className="flex min-w-[20px] items-center justify-center rounded-full bg-[#ffc72c] px-1.5 py-0.5 text-[10px] font-extrabold text-[#211b16] sm:text-[11px]">
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#211b16]/15 bg-[#f7f1e5] text-lg font-bold text-[#211b16] transition-all hover:border-[#ffc72c] hover:bg-[#ffc72c] md:hidden sm:h-10 sm:w-10"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="absolute left-0 top-full w-full border-t border-[#211b16]/10 bg-[#fffdf8] px-5 pb-6 pt-4 shadow-[0_14px_25px_rgba(33,27,22,0.10)] md:hidden">
            {/* MENU HEADER */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-base font-extrabold tracking-tight text-[#211b16]">
                  Explore <span className="text-[#d62828]">Kumo</span>
                </p>

                <p className="mt-0.5 text-[10px] font-medium text-[#211b16]/50">
                  Find your next favorite
                </p>
              </div>

              <span className="rounded-full bg-[#ffc72c] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#211b16]">
                Ramen Time!
              </span>
            </div>

            {/* MENU LINKS */}
            <div className="flex flex-col gap-2">
              {navLinks.map(([label, href], index) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-[#ffc72c] hover:bg-[#ffc72c]/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f1e5] text-xs font-extrabold text-[#d62828] transition-colors group-hover:bg-[#ffc72c]">
                      0{index + 1}
                    </span>

                    <span className="text-[14px] font-extrabold tracking-tight text-[#211b16] transition-colors group-hover:text-[#d62828]">
                      {label}
                    </span>
                  </div>

                  <span className="text-lg font-bold text-[#d62828] transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}

              {/* DIVIDER */}
              <div className="my-2 border-t border-[#211b16]/10" />

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between rounded-2xl bg-[#d62828] px-4 py-3.5 text-left text-sm font-extrabold text-white transition-colors hover:bg-[#b91f1f]"
              >
                <span>Logout</span>
                <span className="text-lg">↗</span>
              </button>
            </div>

            {/* FOOTER */}
            <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[2px] text-[#211b16]/35">
              Made with love & ramen
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

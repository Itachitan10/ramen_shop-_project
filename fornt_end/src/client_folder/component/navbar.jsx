import CartDrawer from "./cartDrawer";
import { useState } from "react";


const Navbar = ({ cartCount ,cart_toogle , set_togle, click}) => {
  
  const [menuOpen, setMenuOpen] = useState(false);

// console.log(cart_toogle);
 
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
  return (
    <nav className="sticky top-0 z-50 flex h-[76px] items-center justify-between border-b border-[#211b16]/15 bg-[#fffdf8]/95 px-[clamp(20px,5vw,80px)] backdrop-blur-[15px]">   
      {/* LOGO */}
      <a
        href="#"
        className="font-['Manrope',sans-serif] text-[22px] font-extrabold tracking-[-1px] text-[#211b16]"
      >
        KUMO <span className="text-[#d62828]">RAMEN</span>
      </a>

      {/* DESKTOP NAV */}
      <div className="hidden gap-[34px] text-[14px] font-semibold md:flex">
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
      <div className="flex items-center gap-3">

        {/* CART */}
        <button   onClick={() => {set_togle(!cart_toogle);click();}}
          className="rounded-full border-0 bg-[#211b16] px-[18px] py-[11px] text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(33,27,22,.2)]"
        >
          🛒 Cart ({cartCount})
        </button>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#211b16] bg-[#fffdf8] text-xl md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute left-0 top-[76px] w-full border-b-2 border-[#211b16] bg-[#fffdf8] px-6 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#211b16]/10 pb-3 text-[15px] font-bold text-[#211b16]"
              >
                {label}
              </a>
            ))}

            <button
              onClick={handleLogout}
              className="border-b border-[#211b16]/10 pb-3 text-left text-[15px] font-bold text-[#d62828]"
            >
              Logout
            </button>
          </div>
        </div>
        
      )}

    </nav>
    
  );
  
};

export default Navbar;
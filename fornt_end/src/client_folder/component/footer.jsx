import { useState } from "react";

const Footer = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-[#1a1a1a]' : 'bg-[#211b16]'} text-white px-[25px] pt-[70px] pb-[25px]`}>
      <div className={`max-w-[1250px] mx-auto grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[35px] lg:gap-[50px] pb-[55px] ${
        darkMode ? 'border-[#444444]' : 'border-[#4a4037]'
      } border-b`}>

        <div className="col-span-2 lg:col-span-1">
          <div className="font-['Manrope',sans-serif] text-[28px] font-extrabold">
            KUMO <span className="text-[#ffc72c]">RAMEN</span>
          </div>
          <p className={`max-w-[300px] text-[14px] leading-[1.7] mt-[15px] ${
            darkMode ? 'text-[#999]' : 'text-[#aaa097]'
          }`}>
            Slow-simmered bowls. Handmade noodles. Big Japanese-inspired flavor, made fresh every day.
          </p>
        </div>

        <div>
          <h4 className="text-[#ffc72c] font-['Space_Mono',monospace] text-[11px] mb-[18px]">MENU</h4>
          {["Ramen", "Rice Bowls", "Sides", "Combos"].map(item => (
            <a 
              key={item} 
              href="#menu" 
              className={`block text-[13px] mb-[11px] hover:text-white ${
                darkMode ? 'text-[#999]' : 'text-[#c8c0b8]'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <h4 className="text-[#ffc72c] font-['Space_Mono',monospace] text-[11px] mb-[18px]">SUPPORT</h4>
          {["Order Status", "FAQ", "Contact", "Delivery"].map(item => (
            <a 
              key={item} 
              href="#" 
              className={`block text-[13px] mb-[11px] hover:text-white ${
                darkMode ? 'text-[#999]' : 'text-[#c8c0b8]'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <h4 className="text-[#ffc72c] font-['Space_Mono',monospace] text-[11px] mb-[18px]">FOLLOW</h4>
          {["Instagram", "TikTok", "Facebook", "Messenger"].map(item => (
            <a 
              key={item} 
              href="#" 
              className={`block text-[13px] mb-[11px] hover:text-white ${
                darkMode ? 'text-[#999]' : 'text-[#c8c0b8]'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <div 
        className="max-w-[1250px] mx-auto pt-5 text-[11px] flex flex-col sm:flex-row gap-2 sm:justify-between" 
        style={{ color: darkMode ? '#666' : '#81786f' }}
      >
        <span>© 2026 Kumo Ramen</span>
        <span>Crafted with 🍜 & ❤️</span>
      </div>
    </footer>
  );
};

export default Footer;
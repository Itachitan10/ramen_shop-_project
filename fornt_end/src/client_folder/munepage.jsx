
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import { useState , useEffect } from "react";
import CartDrawer from "./component/cartDrawer";

function Menu() {
const [product, setProducts] =useState([])
const [carttoggel , set_togle ]=useState(false)



  const newLocal = JSON.parse(localStorage.getItem('token'));
  const jwt = newLocal

useEffect(() => {
  fetch("http://localhost:4000/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error(error);
    }); 
}, []);

  return (
    <div className="min-h-screen bg-[#f7f1e5] text-[#211b16] font-['DM_Sans',sans-serif]">


      
      {/* NAVBAR */}
      <Navbar cart_toogle={carttoggel}  set_togle={set_togle}/>
      <CartDrawer   isOpen={carttoggel} setIsOpen={set_togle} token={jwt} /> 

      {/* MENU */}
      <section className="max-w-[1250px] mx-auto px-5 py-[90px]">

        <div className="mb-[35px]">
          <div className="font-['Space_Mono',monospace] text-[#d62828] text-[12px] font-bold mb-2">
            // OUR MENU
          </div>

          <h1 className="font-['Manrope',sans-serif] font-extrabold text-[clamp(38px,5vw,48px)] tracking-[-2px]">
            Pick your bowl.
          </h1>

          <p className="max-w-[320px] leading-[1.6] text-[14px] text-[#766b5e]">
            From rich tonkotsu to spicy miso, every bowl is prepared fresh when you order.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-[10px] overflow-x-auto pb-[30px]">
          {["All", "Ramen", "Rice Bowls", "Sides", "Drinks", "Combos"].map(category => (
            <button
              key={category}
              className="whitespace-nowrap border-[1.5px] border-[#211b16] bg-[#fffdf8] px-[18px] py-[10px] rounded-full text-[13px] font-bold"
            >
              {category}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="grid mt-[100px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
          {product.map(product => (
            <article
              key={product.product_name}
              className="relative bg-[#fffdf8] border border-[#e8e8e8] rounded-[24px] shadow-[0_20px_45px_rgba(0,0,0,.10)]"
            >

              {/* IMAGE */}
              <div className="relative h-[125px] flex justify-center">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="absolute -top-[55px] w-[145px] h-[145px] object-cover rounded-full border-[7px] border-[#fffdf8] shadow-[0_14px_28px_rgba(0,0,0,.18)]"
                />

                {product.badge && (
                  <div className="absolute top-[14px] right-[14px] px-[10px] py-[6px] bg-[#d62828] text-white rounded-full text-[9px] font-extrabold">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="px-[21px] pb-[30px]">

                <div className="mb-[5px] text-[#d62828] text-[10px] font-extrabold uppercase tracking-[1.6px]">
                  {product.category}
                </div>

                <h3 className="mb-2 font-['Poppins',sans-serif] text-[22px] font-black tracking-[-.4px]">
                  {product.product_name}
                </h3>

                <p className="min-h-[45px] mb-[16px] text-[12px] leading-[1.6] text-[#777]">
                  {product.description}
                </p>

                <div className="mb-[16px] font-['Poppins',sans-serif] text-[22px] font-black">
                  ₱<span className="text-[#d62828]">{product.price}</span>
                </div>

                <button className="w-full py-[13px] rounded-[13px] bg-[#d62828] text-white font-['Poppins',sans-serif] text-[13px] font-extrabold">
                  Add to Cart
                </button>

              </div>
            </article>
          ))}
        </div>

      </section>

      {/* FOOTER */}

      <Footer/>
    </div>
  );
}

export default Menu;

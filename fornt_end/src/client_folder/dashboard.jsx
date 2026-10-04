import { useState , useEffect} from "react";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import CartDrawerTest from "./component/cartDrawer";
const api_url = import.meta.env.VITE_API_URL  || "http://localhost:4000"



const categories = ["All", "Ramen", "Rice Bowls", "Sides", "Drinks", "Combos"];



function dashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);   
  const [cart_toogle , set_togle] = useState(false)
  // const [cart_item , setitem] = useState('')
  const newLocal = JSON.parse(localStorage.getItem('token'));
  const jwt = newLocal

// console.log(cart_item);

// console.log('this is jwt',jwt);
const handlecartitem = async (product) => {
  console.log("product received:", JSON.stringify(product, null, 2));
  console.log("jwt:", jwt, "| token:", jwt?.token);

  if (!jwt) return;

  try {
    const response = await fetch(`${api_url}/cart_insert_item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      setCartCount((count) => count + 1);
    } else {
      const err = await response.text();
      console.error("Cart error:", response.status, err);
    }
  } catch (error) {
    console.error(error);
  }
};



const categorybutton = (e)=>{ 
  setActiveCategory(e.target.value)
}
useEffect(() => {
  fetch(`${api_url}/products`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error(error);
    }); 
}, []);


  const filteredProducts = activeCategory === "All" ? products : products.filter(product => product.category === activeCategory);
  const addToCart = () => setCartCount(count => count + 1);
  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });



  
  return (
    <div className="min-h-screen text-[#211b16] font-['DM_Sans',sans-serif]" style={{ backgroundColor: "#f7f1e5" }}>

      {/* NAVBAR */}
      
        <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 text-lg font-semibold tracking-tight">
         <Navbar cartCount={cartCount}cart_toogle={cart_toogle} set_togle={set_togle} click={handlecartitem}/>
         <CartDrawerTest isOpen={cart_toogle}  setIsOpen={set_togle} token={jwt} />
        </div>
      </header>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[650px] px-[clamp(20px,6vw,100px)] py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-[70px]" style={{ background: "radial-gradient(circle at 90% 20%, rgba(255,199,44,.35), transparent 28%), radial-gradient(circle at 10% 90%, rgba(214,40,40,.08), transparent 30%)" }}>
        <div className="absolute w-[500px] h-[500px] border border-[#211b16]/10 rounded-full -right-[180px] -bottom-[220px]" />

        <div className="relative z-10 max-w-[650px] text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#211b16] text-[#ffc72c] px-3 py-2 rounded-[5px] mb-6 font-['Space_Mono',monospace] text-[11px] font-bold"><i className="w-[7px] h-[7px] bg-[#d62828] rounded-full" />SIMMERED 12 HOURS · DAILY</div>

          <h1 className="font-['Manrope',sans-serif] font-extrabold text-[clamp(54px,7vw,94px)] leading-[.91] tracking-[-5px]">BOLD BROTH.<br />BIG <span className="text-[#d62828]">FLAVOR.</span></h1>

          <p className="max-w-[500px] mt-7 mx-auto lg:mx-0 text-[17px] leading-[1.7] text-[#766b5e]">Slow-simmered tonkotsu broth, handmade noodles, and toppings stacked high. Your favorite ramen, ready in around 20 minutes.</p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-[14px] mt-8">
            <button onClick={scrollToMenu} className="border-2 border-[#211b16] px-6 py-[14px] rounded-[9px] font-extrabold bg-[#d62828] text-white shadow-[5px_5px_0_#211b16] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#211b16] transition-all">Order Now →</button>
            <button onClick={scrollToMenu} className="border-2 border-[#211b16] px-6 py-[14px] rounded-[9px] font-extrabold bg-[#fffdf8] hover:bg-[#ffc72c] transition-all">View Menu</button>
          </div>
        </div>

        <div className="min-h-[440px] relative flex items-center justify-center">
          <div className="relative flex items-center justify-center w-[min(430px,80vw)] aspect-square rounded-full bg-[#ffc72c] shadow-[20px_20px_0_#211b16]">
            <div className="absolute -inset-5 border-2 border-dashed border-[#211b16] rounded-full" />

            <div className="w-[78%] aspect-square rounded-full flex items-center justify-center border-[10px] border-[#211b16] shadow-[inset_0_-20px_30px_rgba(0,0,0,.25),0_18px_25px_rgba(33,27,22,.3)]" style={{ background: "radial-gradient(circle at 50% 45%, #e7a52e 0 12%, #5b301c 13% 17%, #c47726 18% 30%, #e6a638 31% 48%, #8a4a20 49% 53%, #f2b83d 54% 67%, #332019 68% 100%)" }}>
              <span className="text-[80px] sm:text-[100px] drop-shadow-[0_8px_5px_rgba(0,0,0,.25)]">🍜</span>
            </div>

            <div className="absolute top-5 right-0 bg-[#fffdf8] border-2 border-[#211b16] px-[18px] py-[14px] rounded-[10px] shadow-[5px_5px_0_#211b16] rotate-[5deg] font-['Space_Mono',monospace] text-[11px] font-bold">🔥 SPICY MISO</div>
            <div className="absolute bottom-[30px] left-0 bg-[#fffdf8] border-2 border-[#211b16] px-[18px] py-[14px] rounded-[10px] shadow-[5px_5px_0_#211b16] -rotate-[5deg] font-['Space_Mono',monospace] text-[11px] font-bold">★ 4.9 · BESTSELLER</div>
          </div>
        </div>
      </section>

 

      {/* MENU */}
      <section id="menu" className="max-w-[1250px] mx-auto px-5 py-[90px]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-[35px]">
          <div>
            <div className="font-['Space_Mono',monospace] text-[#d62828] text-[12px] font-bold mb-2">// OUR MENU</div>
            <h2 className="font-['Manrope',sans-serif] font-extrabold text-[clamp(38px,5vw,48px)] tracking-[-2px]">Pick your bowl.</h2>
          </div>
          <p className="max-w-[320px] text-[#766b5e] leading-[1.6] text-[14px]">From rich tonkotsu to spicy miso, every bowl is prepared fresh when you order.</p>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-[10px] overflow-x-auto pb-[30px]">

           {categories.map(category =>( 
            <button value={category} key={category} onClick={(e) =>
              categorybutton(e)}  className={`whitespace-nowrap border-[1.5px] border-[#211b16] px-[18px] py-[10px] rounded-full text-[13px] font-bold transition-all ${activeCategory === category ? "bg-[#211b16] text-[#ffc72c]" : "bg-[#fffdf8] hover:bg-[#211b16] hover:text-[#ffc72c]"}`} >
                {category}</button>
           ))}


        </div>

        {/* PRODUCTS */}
     <div className="grid mt-[100px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
     {filteredProducts.slice(0,6).map(product =>(
       <article
          key={product.product_name}
          className="relative bg-[#fffdf8] border border-[#e8e8e8] rounded-[24px] shadow-[0_20px_45px_rgba(0,0,0,0.10)] overflow-visible transition-all duration-300 hover:-translate-y-2" >
          {/* IMAGE AREA */}
          <div className="relative h-[125px] flex justify-center items-start overflow-visible">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="absolute -top-[55px] w-[145px] h-[145px] object-cover rounded-full border-[7px] border-[#fffdf8] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.06] hover:rotate-[2deg]"
            />
            {product.badge && (
              <div className="absolute top-[14px] right-[14px] z-10 px-[10px] py-[6px] bg-[#d62828] text-white rounded-full text-[9px] font-extrabold tracking-[0.5px]">
                {product.badge}
              </div>
            )}
          </div>
 
          {/* CONTENT */}
          <div className="px-[21px] pb-[100px]">
            <div className="mb-[5px] text-[#d62828] text-[10px] font-extrabold uppercase tracking-[1.6px]">
              {product.category}
            </div>
 
            <h3 className="mb-2 font-['Poppins',sans-serif] text-[22px] font-black tracking-[-0.4px]">
              {product.product_name}
            </h3>
 
            <p className="min-h-[45px] mb-[16px] text-[#777] text-[12px] leading-[1.6]">
              {product.description}
            </p>
 
            <div className="mb-[16px] font-['Poppins',sans-serif] text-[22px] font-black">
              ₱<span className="text-[#d62828]">{product.price}</span>
              {product.oldPrice && (
                <span className="ml-2 text-[11px] text-[#999] line-through">
                  ₱{product.oldPrice}
                </span>
              )}
            </div>
 
                  <button onClick={() => handlecartitem(product)} className="w-full py-[13px] rounded-[13px] bg-[#d62828] text-white font-['Poppins',sans-serif] text-[13px] font-extrabold hover:bg-[#ff4b30] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(230,57,32,0.22)] active:scale-[0.97] transition-all"> Add to Cart</button>
          </div>
             </article>
          ))}  
      </div>
        {filteredProducts.length === 0 && <div className="text-center py-20 text-[#766b5e]">No products found in this category.</div>}
          {/* Your "See More" button here */}
          <div className="flex justify-center mt-[40px]">
            <button onClick={() => window.location.href ='/menu'} className="...">
              See More
            </button>
          </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="max-w-[1250px] mx-auto mb-[90px] mx-[20px] lg:mx-auto px-[45px] py-[45px] rounded-[18px] bg-[#d62828] text-white border-[3px] border-[#211b16] flex flex-col lg:flex-row items-center justify-between gap-[25px] text-center lg:text-left shadow-[10px_10px_0_#211b16]">
        <div>
          <h2 className="font-['Manrope',sans-serif] text-[32px] lg:text-[42px] font-extrabold tracking-[-2px]">Hungry already?</h2>
          <p className="mt-2 opacity-85">Get your favorite bowl delivered to your door.</p>
        </div>
        <button onClick={scrollToMenu} className="bg-[#ffc72c] text-[#211b16] border-2 border-[#211b16] px-[22px] py-[14px] rounded-[9px] font-extrabold hover:-translate-y-1 transition-all">Start Your Order →</button>
      </section>

      {/* FOOTER */}
      <Footer/>
      
    </div>
  );
}

export default dashboard;
   
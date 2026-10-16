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
  // const [cart_item , setitem] = useState('')
  const newLocal = JSON.parse(localStorage.getItem('token'));
  const jwt = newLocal



const [cart_toogle, set_togle] = useState(()=>{ 
  return localStorage.getItem('toggle') === "true"
});

useEffect(()=>{ 
localStorage.setItem('toggle', cart_toogle)
},[cart_toogle])

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
     
      <section
        className="relative overflow-hidden px-5 py-8 sm:px-8 sm:py-14 lg:min-h-[650px] lg:px-[clamp(20px,6vw,100px)] lg:py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-[70px]"
        style={{
          background:
            "radial-gradient(circle at 90% 20%, rgba(255,199,44,.35), transparent 28%), radial-gradient(circle at 10% 90%, rgba(214,40,40,.08), transparent 30%)",
        }}
      >
        <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] border border-[#211b16]/10 rounded-full -right-[180px] -bottom-[220px] pointer-events-none" />

        {/* IMAGE: sa taas sa mobile, sa kanan sa desktop */}
        <div className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] mx-auto lg:max-w-none lg:order-2">
          <img
            src="https://png.pngtree.com/png-clipart/20230516/original/pngtree-colorful-ramen-noodle-artwork-png-image_9162654.png"
            alt="Colorful ramen noodles"
            className="block w-full h-auto max-h-[260px] sm:max-h-[350px] lg:max-h-none object-contain drop-shadow-xl"
          />
        </div>

        {/* TEXT */}
        <div className="relative z-10 min-w-0 text-center lg:text-left lg:order-1">
          <div className="inline-flex items-center gap-2 bg-[#211b16] text-[#ffc72c] px-3 py-2 rounded-md mb-4 font-['Space_Mono',monospace] text-[11px] sm:text-xs font-bold">
            <i className="w-[6px] h-[6px] shrink-0 bg-[#d62828] rounded-full" />
            SIMMERED 12 HOURS · DAILY
          </div>

          <h1 className="font-['Manrope',sans-serif] font-extrabold text-[clamp(40px,11vw,94px)] leading-[1] tracking-[-1px] sm:tracking-[-3px] lg:tracking-[-5px]">
            BOLD BROTH.
            <br />
            BIG <span className="text-[#d62828]">FLAVOR.</span>
          </h1>

          <p className="max-w-[500px] mx-auto lg:mx-0 mt-4 lg:mt-6 text-[15px] sm:text-base lg:text-[17px] leading-[1.6] text-[#766b5e]">
            Slow-simmered tonkotsu broth, handmade noodles, and toppings stacked
            high. Your favorite ramen, ready in around 20 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mt-6 lg:mt-8">
            <button
              onClick={scrollToMenu}
              className="min-h-[48px] border-2 border-[#211b16] px-6 py-3 rounded-[8px] text-sm font-extrabold bg-[#211b16] text-white shadow-[3px_3px_0_#d62828] active:translate-x-[2px] active:translate-y-[2px] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Order Now →
            </button>

            <button
              onClick={scrollToMenu}
              className="min-h-[48px] border-2 border-[#211b16] px-6 py-3 rounded-[8px] text-sm font-extrabold bg-[#fffdf8] text-[#211b16] hover:bg-[#ffc72c] active:bg-[#ffc72c] transition-all"
            >
              View Menu
            </button>
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
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.slice(0, 6).map((product) => (
          <article
            key={product.product_name}
            className="group rounded-2xl overflow-hidden border border-[#e4d9c8] bg-[#fffdf8]"
          >

            {/* IMAGE */}
            <div className="relative aspect-[1/0.9] overflow-hidden bg-[#eee6da]">

              <img
                src={product.image_url}
                alt={product.product_name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />

              {/* BADGE */}
              {product.badge && (
                <span className="absolute left-3 top-3 bg-[#8f1d18] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white">
                  {product.badge}
                </span>
              )}

              {/* FAVORITE */}
              <button
                type="button"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/90 text-lg text-[#171412] transition hover:text-[#8f1d18]"
              >
                ♡
              </button>

            </div>


            {/* PRODUCT INFO */}
            <div className="p-4">

              {/* CATEGORY */}
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[1.5px] text-[#8f1d18]">
                {product.category}
              </p>

              {/* NAME */}
              <h3 className="text-[16px] font-bold leading-tight text-[#171412] sm:text-[17px]">
                {product.product_name}
              </h3>

              {/* RATING */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] tracking-[-1px] text-[#b18a52]">
                  ★★★★★
                </span>

                <span className="text-[10px] text-[#756e66]">
                  {product.rating || "4.9"}
                </span>
              </div>

              {/* DESCRIPTION */}
              {product.description && (
                <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-[#756e66]">
                  {product.description}
                </p>
              )}

              {/* PRICE + CART */}
              <div className="mt-4 flex items-center justify-between border-t border-[#e4d9c8] pt-3">

                <div>
                  <span className="text-[17px] font-bold text-[#171412]">
                    ₱{product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="ml-2 text-[10px] text-[#999] line-through">
                      ₱{product.oldPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlecartitem(product)}
                  className="flex h-8 w-8 items-center justify-center bg-[#8f1d18] text-lg leading-none text-white transition hover:bg-[#a92820] active:scale-95"
                >
                  +
                </button>

              </div>

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
   
import { useState, useEffect } from "react";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import CartDrawerTest from "./component/cartDrawer";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:4000";

const categories = ["All", "Ramen", "Rice Bowls", "Sides", "Drinks", "Combos"];

const heading = { fontFamily: "'Manrope', sans-serif" };

function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [showTop, setShowTop] = useState(false);
  const jwt = JSON.parse(localStorage.getItem("token"));

  const [cart_toogle, set_togle] = useState(() => {
    return localStorage.getItem("toggle") === "true";
  });

  useEffect(() => {
    localStorage.setItem("toggle", cart_toogle);
  }, [cart_toogle]);

  // back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handlecartitem = async (product) => {
    if (!jwt) {
      showToast("Mag-login muna para makapag-order.");
      return;
    }

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
        showToast(`${product.product_name} added to cart`);
      } else {
        const err = await response.text();
        console.error("Cart error:", response.status, err);
        showToast("May nangyaring mali. Subukan ulit.");
      }
    } catch (error) {
      console.error(error);
      showToast("Hindi maabot ang server.");
    }
  };

  useEffect(() => {
    fetch(`${api_url}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const featured =
    products.find((p) => p.badge) ||
    products.find((p) => p.category === "Ramen") ||
    products[0];

  const scrollToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="min-h-screen bg-[#f7f1e5] text-[#211b16]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* NAVBAR */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <Navbar
            cartCount={cartCount}
            cart_toogle={cart_toogle}
            set_togle={set_togle}
            click={handlecartitem}
          />
          <CartDrawerTest
            isOpen={cart_toogle}
            setIsOpen={set_togle}
            token={jwt}
          />
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1250px] grid-cols-1 items-center gap-8 px-5 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:order-2 lg:max-w-none">
          <div className="absolute inset-[8%] rounded-full bg-[#ffc72c]" />
          <img
            src="https://png.pngtree.com/png-clipart/20230516/original/pngtree-colorful-ramen-noodle-artwork-png-image_9162654.png"
            alt="Bowl of ramen"
            className="relative block h-auto w-full max-h-[300px] object-contain drop-shadow-xl lg:max-h-[460px]"
          />
        </div>

        <div className="text-center lg:order-1 lg:text-left">
          <h1
            className="text-[clamp(40px,10vw,84px)] font-extrabold leading-[1.02] tracking-[-1px] lg:tracking-[-3px]"
            style={heading}
          >
            Bold broth.
            <br />
            Big <span className="text-[#d62828]">flavor.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[480px] text-base leading-relaxed text-[#6b6054] lg:mx-0 lg:text-lg">
            Tonkotsu broth simmered for 12 hours, fresh noodles, and generous
            toppings. Ready in about 20 minutes.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              onClick={scrollToMenu}
              className="min-h-[48px] rounded-lg bg-[#d62828] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#b51f1f] active:scale-[0.98]"
            >
              Order now
            </button>

            <button
              onClick={scrollToMenu}
              className="min-h-[48px] rounded-lg border border-[#211b16]/30 px-7 py-3 text-sm font-bold text-[#211b16] transition hover:border-[#211b16] active:scale-[0.98]"
            >
              View menu
            </button>
          </div>
        </div>
      </section>

      {/* DARK STRIP */}
      <div className="bg-[#211b16] py-4 text-[#ffc72c]">
        <div className="mx-auto flex max-w-[1250px] flex-wrap items-center justify-center gap-x-10 gap-y-2 px-5 text-sm font-bold uppercase tracking-wider">
          <span>12-hour broth</span>
          <span className="text-[#d62828]">●</span>
          <span>Fresh noodles</span>
          <span className="text-[#d62828]">●</span>
          <span>Ready in 20 mins</span>
        </div>
      </div>

      {/* MENU */}
      <section id="menu" className="bg-[#fffdf8]">
        <div className="mx-auto max-w-[1250px] px-5 py-16 lg:py-20">
          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className="text-[clamp(32px,5vw,44px)] font-extrabold tracking-[-1.5px]"
              style={heading}
            >
              Our menu
            </h2>
            <p className="max-w-[340px] text-sm leading-relaxed text-[#6b6054]">
              Every bowl is cooked fresh when you order.
            </p>
          </div>

          {/* CATEGORIES */}
          <div className="flex gap-2 overflow-x-auto pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-[#211b16] bg-[#211b16] text-white"
                    : "border-[#211b16]/20 bg-white hover:border-[#211b16]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PRODUCTS */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-xl border border-[#e4d9c8] bg-white"
                >
                  <div className="aspect-[1/0.9] bg-[#eee6da]" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 rounded bg-[#eee6da]" />
                    <div className="h-3 w-full rounded bg-[#eee6da]" />
                    <div className="h-5 w-1/3 rounded bg-[#eee6da]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.slice(0, 6).map((product) => (
                <article
                  key={product.product_name}
                  className="overflow-hidden rounded-xl border border-[#e4d9c8] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[1/0.9] overflow-hidden bg-[#eee6da]">
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {product.badge && (
                      <span className="absolute left-2 top-2 rounded bg-[#d62828] px-2 py-1 text-xs font-bold text-white">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="text-base font-bold leading-snug">
                      {product.product_name}
                    </h3>

                    {product.description && (
                      <p className="mt-1 line-clamp-2 text-sm leading-snug text-[#6b6054]">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">
                          ₱{product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="ml-2 text-sm text-[#999] line-through">
                            ₱{product.oldPrice}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handlecartitem(product)}
                        aria-label={`Add ${product.product_name} to cart`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d62828] text-xl leading-none text-white transition hover:bg-[#b51f1f] active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="py-20 text-center text-[#6b6054]">
              No products found in this category.
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <a
              href="/menu"
              className="rounded-lg border border-[#211b16] px-8 py-3 text-sm font-bold transition hover:bg-[#211b16] hover:text-white"
            >
              See full menu
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[1250px] px-5 py-16 lg:py-20">
        <h2
          className="mb-8 text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-1px]"
          style={heading}
        >
          Paano umorder
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ["1", "Pumili ng bowl", "I-browse ang menu at i-add sa cart."],
            ["2", "Mag-checkout", "Ilagay ang address at piliin ang payment."],
            ["3", "Hintayin ang hatid", "Luto pagka-order, mga 20 minuto."],
          ].map(([num, title, desc]) => (
            <div
              key={num}
              className="flex gap-4 rounded-xl border border-[#e4d9c8] bg-[#fffdf8] p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffc72c] font-extrabold">
                {num}
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6b6054]">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BOWL */}
      {featured && (
        <section className="mx-5 mb-16 lg:mx-auto lg:mb-20 lg:max-w-[1250px]">
          <div className="grid overflow-hidden rounded-2xl bg-[#211b16] text-white lg:grid-cols-2">
            <img
              src={featured.image_url}
              alt={featured.product_name}
              loading="lazy"
              className="h-[260px] w-full object-cover lg:h-full lg:min-h-[380px]"
            />

            <div className="flex flex-col justify-center gap-4 p-7 lg:p-12">
              <p className="text-sm font-semibold text-[#ffc72c]">
                {featured.badge || "Paborito ng mga customer"}
              </p>

              <h2
                className="text-[30px] font-extrabold leading-tight tracking-[-1px] lg:text-[42px]"
                style={heading}
              >
                {featured.product_name}
              </h2>

              {featured.description && (
                <p className="max-w-[440px] leading-relaxed text-white/75">
                  {featured.description}
                </p>
              )}

              <div className="mt-2 flex items-center gap-5">
                <span className="text-2xl font-bold">₱{featured.price}</span>
                <button
                  onClick={() => handlecartitem(featured)}
                  className="min-h-[48px] rounded-lg bg-[#d62828] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#b51f1f] active:scale-[0.98]"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VISIT US */}
      <section className="mx-auto max-w-[1250px] px-5 pb-16 lg:pb-20">
        <div className="grid gap-6 rounded-2xl border border-[#e4d9c8] bg-[#fffdf8] p-7 sm:grid-cols-3 lg:p-10">
          <div>
            <h3 className="text-sm font-bold text-[#d62828]">Oras ng bukas</h3>
            <p className="mt-2 leading-relaxed text-[#6b6054]">
              Lunes - Linggo
              <br />
              10:00 AM - 10:00 PM
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#d62828]">Address</h3>
            <p className="mt-2 leading-relaxed text-[#6b6054]">
              Ilagay dito ang address ng shop
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#d62828]">Contact</h3>
            <p className="mt-2 leading-relaxed text-[#6b6054]">
              0900 000 0000
              <br />
              hello@kumoramen.com
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#211b16] px-5 py-3 text-sm font-semibold text-white shadow-lg lg:bottom-8">
          {toast}
        </div>
      )}

      {/* STICKY CART BAR (phone only) */}
      {cartCount > 0 && (
        <button
          onClick={() => set_togle(true)}
          className="fixed inset-x-4 bottom-4 z-40 flex min-h-[52px] items-center justify-between rounded-xl bg-[#d62828] px-5 text-sm font-bold text-white shadow-lg active:scale-[0.99] lg:hidden"
        >
          <span>View cart</span>
          <span>
            {cartCount} item{cartCount > 1 ? "s" : ""}
          </span>
        </button>
      )}

      {/* BACK TO TOP (desktop only, para hindi mag-overlap sa cart bar) */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-[#211b16] text-lg text-white shadow-lg transition hover:bg-[#d62828] lg:flex"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Dashboard;
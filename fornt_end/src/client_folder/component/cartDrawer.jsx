import { useState , useEffect} from "react";
const api_url = import.meta.env.VITE_API_URL ||  "http://localhost:4000"
import icon from '../icons/naruto-japanese-cuisine-japan-ramen-japanese-food-food-svgrepo-com.svg'




export default function CartDrawer({ isOpen, setIsOpen ,token ,}) {
const [items, setItems] = useState([]);
const [filter, setfilter] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem('user_item') || '[]'
    );
  } catch {
    return [];
  }
});


console.log(filter);





const handle_checkout = () => { 

  
  
}

useEffect(() => {
  
  const save = JSON.parse(localStorage.getItem('user_item'))
  const cart_val = [];
  items.forEach((v) => {
   const existing = cart_val.find((p) => p.product_name === v.product_name);

    if (existing) {
      existing.quantity += 1;
        existing.realprice = existing.quantity * Number(existing.price);
        //  existing.all_Id.push(v.product_id);
      existing.all_Id.push(v.product_id);
    } 
    else{
      cart_val.push({
        product_id: v.product_id,
        all_Id: [v.product_id],
        product_name: v.product_name,
        description: v.description,
        price: Number(v.price),
        image_url: v.image_url,
        quantity : 1,
        realprice: Number(v.price),
      });
    }
  });

  setfilter(cart_val);
}, [items]);


useEffect(() => {
  localStorage.setItem("user_item", JSON.stringify(filter));
}, [filter]);

useEffect(()=>{ 
    if(!token) return

    fetch(`${api_url}/cart_item`,{ 
      method: 'GET', 
      headers: { 
        Authorization: `Bearer ${token.token}`
      }
    })
    .then(res => {
      // Check kung 200-299 ang status
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      // Handle empty data
      setItems(data || []);
    })
    .catch(error => {
      console.log('Fetch error:', error);
      setItems([]); // Set empty array on error
    });

  },[token])

   const increment = (item) => {
  setfilter((prevCart) =>
    prevCart.map((cartItem) =>
      cartItem.product_name === item.product_name
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            realprice: (cartItem.quantity + 1) * cartItem.price,
          }
        : cartItem
    )
  );
};

const decrement = (item) => {
  setfilter((prevCart) =>
    prevCart.map((cartItem) =>
      cartItem.product_name === item.product_name
        ? {
            ...cartItem,
            quantity: Math.max(1, cartItem.quantity - 1),
            realprice:
              Math.max(1, cartItem.quantity - 1) * cartItem.price,
          }
        : cartItem
    )
  );
};
  

const removeItem = async (id , product_id) => {
const save = JSON.parse(localStorage.getItem('user_item') );

const update = save.filter(item => item.product_id !== product_id)
  try {
    const response = await fetch(`${api_url}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,},
      body: JSON.stringify({  id: id, }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data); 
       return;
      }
     !data ? console.log("Item not found") : window.location.reload()
    setfilter((prev) => prev.filter((item) => item.product_id !== product_id) ); 
       localStorage.setItem('user_item', JSON.stringify(update));
  } catch (error) {
    console.error(error);
  }
};




const subtotal = filter.reduce(
  (total, item) => total + item.realprice,0);

const deliveryFee = subtotal >= 800 ? 0 : 49;

const total = subtotal + deliveryFee;

const totalItems = filter.reduce((total, item) => total + item.quantity,0);

if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-[100]">
    {/* BACKDROP */}
    <div
      onClick={() => setIsOpen(false)}
      className="absolute inset-0 bg-[#2B2118]/40 backdrop-blur-[2px]"
    />

    {/* CART DRAWER */}
    <div className="absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col border-l-[3px] border-[#2B2118] bg-[#F7F1E5] shadow-[-8px_0_24px_rgba(43,33,24,0.12)]">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#E5DCCB] bg-[#FFFDF7] px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            
          <img src={icon} alt="Ramen icon" className="sm:block w-16 h-16 object-contain"/>

            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-[#2B2118]">
                Your Cart
              </h2>
              <p className="text-xs text-[#766B5E]">
                Your ramen favorites
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#F7F1E5] px-3 py-1 text-xs font-bold text-[#2B2118]">
            {totalItems} items
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DCCB] bg-white text-[#2B2118] transition hover:border-[#D62828] hover:bg-[#D62828] hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* CART ITEMS */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filter.length === 0 ? (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
            <img src={icon} alt="Ramen icon"className=" hidden sm:block w-16 h-16 object-contain"/>
            <h3 className="font-bold text-[#2B2118]">
              Your cart is empty
            </h3>
            <p className="mt-1 max-w-[230px] text-sm text-[#766B5E]">
              Looks like you haven't added any ramen yet.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-lg bg-[#D62828] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#B91F24]"
            >
              Explore menu
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filter.map((item) => (
              <div
                key={item.product_id}
                className="relative flex gap-3 rounded-xl border border-[#E5DCCB] bg-[#FFFDF7] p-3 shadow-sm"
              >
                {/* PRODUCT IMAGE */}
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  className="h-[76px] w-[76px] shrink-0 rounded-lg bg-[#F7F1E5] object-cover"
                />

                {/* PRODUCT DETAILS */}
                <div className="min-w-0 flex-1 pr-4">
                  <h4 className="line-clamp-2 text-sm font-bold leading-5 text-[#2B2118]">
                    {item.product_name}
                  </h4>

                  <p className="mt-1 font-mono text-sm font-bold text-[#D62828]">
                    ₱{Number(item.realprice).toLocaleString("en-PH")}
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decrement(item)}
                      aria-label="Decrease quantity"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E5DCCB] bg-white font-bold text-[#2B2118] transition hover:border-[#D62828] hover:text-[#D62828]"
                    >
                      −
                    </button>

                    <span className="min-w-4 text-center text-sm font-bold text-[#2B2118]">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increment(item)}
                      aria-label="Increase quantity"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E5DCCB] bg-white font-bold text-[#2B2118] transition hover:border-[#D62828] hover:text-[#D62828]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  type="button"
                  onClick={() => removeItem(item.all_Id , item.product_id)}
                  aria-label={`Remove ${item.product_name}`}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md text-[#A49A89] transition hover:bg-red-50 hover:text-[#D62828]"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ORDER SUMMARY */}
      <div className="border-t border-[#E5DCCB] bg-[#FFFDF7] px-5 pb-5 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold text-[#2B2118]">
            Order summary
          </h3>
          <span className="text-xs text-[#766B5E]">
            {totalItems} items
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-[#766B5E]">
            <span>Subtotal</span>
            <span className="font-medium text-[#2B2118]">
              ₱{subtotal.toLocaleString("en-PH")}
            </span>
          </div>

          <div className="flex justify-between text-sm text-[#766B5E]">
            <span>Delivery fee</span>
            <span className={`font-semibold ${deliveryFee === 0 ? "text-[#168AAD]" : "text-[#2B2118]"}`}>
              {deliveryFee === 0
                ? "FREE"
                : `₱${deliveryFee.toLocaleString("en-PH")}`}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-[#E5DCCB] pt-3">
            <span className="font-bold text-[#2B2118]">
              Total
            </span>
            <span className="font-mono text-xl font-extrabold text-[#D62828]">
              ₱{total.toLocaleString("en-PH")}
            </span>
          </div>
        </div>

        {/* CHECKOUT */}
        <button
          type="button"
          disabled={filter.length === 0}
          onClick={() => {
            handle_checkout()
            // window.location.href = "/proceed";
          }}
          className="mt-4 w-full rounded-lg border-2 border-[#2B2118] bg-[#D62828] px-4 py-3 text-sm font-bold text-white shadow-[3px_3px_0_#2B2118] transition hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#2B2118] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50" > Proceed to checkout →</button>

        <p className="mt-3 text-center text-xs text-[#766B5E]">
          {deliveryFee === 0
            ? " You've unlocked free delivery!"
            : ` Add ₱${(800 - subtotal).toLocaleString("en-PH")} more for free delivery.`}
        </p>
      </div>
    </div>
  </div>
)}





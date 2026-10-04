import { useState , useEffect} from "react";
const api_url = import.meta.env.VITE_API_URL ||  "http://localhost:4000"







export default function CartDrawer({ isOpen, setIsOpen ,token ,}) {
const [items, setItems] = useState([]);
const [filter , setfilter] = useState(() =>{ 
  return JSON.parse(localStorage.getItem('cart')) || []
})

console.log(filter);






useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(filter));
}, [filter]);

useEffect(() => {
  const cart_val = [];
  items.forEach((v) => {
    const item = cart_val.find((p) => p.product_name === v.product_name);

    if (item) {
      item.quantity += 1;
      item.realprice = item.quantity * Number(item.price);
      item.all_Id.push(v.product_id);
    } else {cart_val.push({
        product_id: v.product_id,
        all_Id: [v.product_id],
        product_name: v.product_name,
        description: v.description,
        price: Number(v.price),
        image_url: v.image_url,
        quantity: 1,
        realprice: Number(v.price),
      });
    }
  });

  setfilter(cart_val);
}, [items]);

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
  



  
const removeItem = async (id) => {
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
       return;}
     !data ? console.log("Item not found") : window,location.reload()
    setfilter((prev) =>
      prev.filter((item) => item.product_id !== id)
    );

  } catch (error) {
    console.error(error);
  }
};



const subtotal = filter.reduce(
  (total, item) => total + item.realprice,
  0
);

const deliveryFee = subtotal >= 800 ? 0 : 49;

const total = subtotal + deliveryFee;

const totalItems = filter.reduce(
  (total, item) => total + item.quantity,
  0
);



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">

      {/* BACKDROP */}
      <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-[#2B2118]/40"  />

      {/* DRAWER */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col border-l-4 border-[#2B2118] bg-[#FDF6E3] shadow-[-10px_0_30px_rgba(0,0,0,0.15)]">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b-[3px] border-dashed border-[#2B2118] bg-[#FFFDF7] px-6 py-5">

          <div className="flex items-center">
            <h2 className="font-black text-[22px] text-[#2B2118]">
              Your Order
            </h2>

            <span className="ml-2 rounded-full bg-[#2B2118] px-2.5 py-1 font-mono text-[11px] font-bold text-[#FFC72C]">
              {totalItems} items
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#2B2118] bg-[#FFFDF7] font-bold transition hover:border-[#D62828] hover:bg-[#D62828] hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-6 py-[18px]">
          <div className="flex flex-col gap-4">

            {filter.length === 0 ? ( <div className="py-10 text-center font-bold text-[#5C4F42]">   Your cart is empty 🛒 </div>  ) : (
              filter.map((item) => (
                <div
                  key={item.product_id     }
                  className="relative flex gap-3.5 rounded-xl border-2 border-[#2B2118] bg-[#FFFDF7] p-3" >

                  {/* ICON */}
                <img
                src={item.image_url}
                alt={item.name}
                className="h-[60px] w-[60px] rounded-[10px] object-cover"/>

                  {/* INFO */}
                  <div className="min-w-0 flex-1 pr-5">

                    <h4 className="text-[15px] font-bold text-[#2B2118]">
                      {item.product_name}
                    </h4>

                    <div className="mt-1 font-mono text-[14px] font-bold text-[#D62828]">
                      ₱{item.realprice}
                    </div>

                    {/* QUANTITY */}
                    <div className="mt-2 flex items-center gap-2.5">

                      <button  onClick={() => decrement(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-[#2B2118] bg-[#FFFDF7] font-bold hover:bg-[#FFC72C]"
                      >
                        −
                      </button>

                      <span className="min-w-4 text-center font-mono font-bold">
                        {item.quantity}
                      </span>
                      <button onClick={() => increment(item)} className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-[#2B2118] bg-[#FFFDF7] font-bold hover:bg-[#FFC72C]">
                        +
                      </button>

                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.all_Id)} className="absolute right-2 top-2 text-xs text-[#5C4F42] hover:text-[#D62828]" >
                    ✕
                  </button>

                </div>
              ))
            )}

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t-[3px] border-dashed border-[#2B2118] bg-[#FFFDF7] px-6 pb-6 pt-5">

          {/* SUBTOTAL */}
          <div className="mb-2 flex justify-between text-sm text-[#5C4F42]">
            <span>Subtotal</span>
            <span className="font-mono font-bold">
              ₱{subtotal}
            </span>
          </div>

          {/* DELIVERY */}
          <div className="mb-2 flex justify-between text-sm text-[#5C4F42]">
            <span>Delivery Fee</span>

            <span className="font-mono font-bold">
              {deliveryFee === 0 ? "FREE" : `₱${deliveryFee}`}
            </span>
          </div>

          {/* TOTAL */}
          <div className="mt-2 flex justify-between border-t-2 border-dashed border-[#ccc] pt-3 font-mono text-lg font-black text-[#2B2118]">
            <span>Total</span>
            <span>₱{total}</span>
          </div>

          {/* CHECKOUT */}
          <button onClick={() =>  {window,location.href='proceed'} } className="mt-4 w-full rounded-[10px] border-[3px] border-[#2B2118] bg-[#D62828] px-4 py-[15px] text-base font-extrabold text-white shadow-[5px_5px_0_#2B2118] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#2B2118]">
            Proceed to Checkout →
          </button>

          {/* NOTE */}
          <div className="mt-2.5 text-center text-xs text-[#5C4F42]">
            🔥 Free delivery on orders over ₱800
          </div>

        </div>
      </div>
    </div>
  );
}


import { Lock, ArrowLeft, Check } from "lucide-react";
import { useState , useEffect } from "react";

const heading = { fontFamily: "'Manrope', sans-serif" };
const user_item = localStorage.getItem("user_item");
const user_item_parsed = user_item ? JSON.parse(user_item) : null;

const api_url = import.meta.env.VITE_API_URL  || "http://localhost:4000"

const newLocal = JSON.parse(localStorage.getItem('token'));
  const jwt = newLocal


  
const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard delivery", eta: "30–45 mins", cost: 49 },
  { id: "express", label: "Express delivery", eta: "15–20 mins", cost: 99 },
];

const PAY_METHODS = [
  { id: "cod", label: "Cash on Delivery", note: "Pay when your order arrives" },
  { id: "gcash", label: "GCash", note: "Pay using your GCash account" },
  { id: "card", label: "Credit or debit card", note: "Visa or Mastercard" },
];

export default function CheckoutPage() { 
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  
// Get selected delivery fee
const deliveryFee_number = SHIPPING_OPTIONS.find((option) => option.id === selectedShipping)?.cost || 0;

const deliveryFee_text = SHIPPING_OPTIONS.find((option) => option.id === selectedShipping)?.label || ' ';
// Get selected payment label
const paymentMethod = PAY_METHODS.find((method) => method.id === selectedPayment)?.label || "";

const subtotal = user_item_parsed.reduce((sum, item) => sum + item.price * item.quantity,0);

const discount = 0 ;
const total = subtotal + deliveryFee_number - discount;

console.log(deliveryFee_number , deliveryFee_text, paymentMethod, total);

const shipCost = SHIPPING_OPTIONS.find(
  (option) => option.id === selectedShipping
)?.cost || 0;

 const [deliveryDetails, setDeliveryDetails] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
});




const handlePlaceOrder = () => {
const jwt = JSON.parse(localStorage.getItem("token"));

fetch(`${api_url}/orders`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt.token}`,
  },
  body: JSON.stringify({
    full_name: deliveryDetails.fullName,
    mobile_number: deliveryDetails.phone,
    address: deliveryDetails.address,
    city: deliveryDetails.city,
    postal_code: deliveryDetails.postalCode,
    delivery_option: deliveryFee_text, 
    payment_method: paymentMethod, 
    items: user_item_parsed .map((i) => ({
      product_id: i.product_id,
      quantity: i.quantity,
    })),
  }),
});
}


const handleInputChange = (e) => {
  const { name, value } = e.target;

  setDeliveryDetails((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  return (
    <div
      className="min-h-screen bg-[#faf7f0] pb-24 text-[#29231e] lg:pb-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <header className="border-b border-[#29231e]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <a
            href="/"
            className="text-lg font-extrabold tracking-tight"
            style={heading}
          >
            KUMO <span className="text-[#d62828]">RAMEN</span>
          </a>

          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#655b50] transition hover:text-[#d62828]"
          >
            <ArrowLeft size={16} />
            Back to menu
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.8fr] lg:gap-16 lg:py-12">
        <div className="min-w-0">
          <div className="mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d62828]">
              Kumo Ramen / Checkout
            </p>

            <h1  className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={heading} >Your order,
              <br />
              <span className="text-[#d62828]">your way.</span>
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#756b60]">
              Just a few details and we'll get your ramen on its way.
            </p>
          </div>

          {/* Delivery details */}
   <section className="border-t border-[#29231e]/15 py-7">
  <StepTitle num="01" title="Delivery details" />

  <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">

    {/* Full Name */}
    <input
      type="text"
      name="fullName"
      value={deliveryDetails.fullName}
      onChange={handleInputChange}
      placeholder="Full name"
      required
      className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#D62828]"
    />

    {/* Mobile Number */}
    <input
      type="tel"
      name="phone"
      value={deliveryDetails.phone}
      onChange={handleInputChange}
      placeholder="09XX XXX XXXX"
      required
      className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#D62828]"
    />

    {/* Address */}
    <input
      type="text"
      name="address"
      value={deliveryDetails.address}
      onChange={handleInputChange}
      placeholder="Complete address"
      required
      className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#D62828] sm:col-span-2"
    />

    {/* City / Municipality */}
    <input
      type="text"
      name="city"
      value={deliveryDetails.city}
      onChange={handleInputChange}
      placeholder="City / Municipality"
      required
      className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#D62828]"
    />

    {/* Postal Code */}
    <input
      type="text"
      name="postalCode"
      value={deliveryDetails.postalCode}
      onChange={handleInputChange}
      placeholder="Postal code"
      required
      className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#D62828]"
    />

  </div>
</section>

<section className="border-t border-[#29231e]/15 py-7">
  <StepTitle num="02" title="Delivery option" />

  <div className="space-y-3">
    {SHIPPING_OPTIONS.map((option) => (
      <Tile
        key={option.id}
        active={selectedShipping === option.id}
        title={option.label}
        note={option.eta}
        price={`₱${option.cost}`}
        onClick={() => setSelectedShipping(option.id)}
      />
    ))}
  </div>
</section>

<section className="border-t border-[#29231e]/15 py-7">
  <StepTitle num="03" title="Payment method" />

  <div className="space-y-3">
    {PAY_METHODS.map((method) => (
      <Tile
        key={method.id}
        active={selectedPayment === method.id}
        title={method.label}
        note={method.note}
        onClick={() => setSelectedPayment(method.id)}
      />
    ))}
  </div>
</section>
   
      </div>

        {/* Order summary */}
        <aside className="h-fit lg:sticky lg:top-6">
          <div className="border border-[#29231e]/10 bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#29231e]/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8b7d6d]">
                  Order summary
                </p>

                <h2 className="mt-1 text-2xl font-extrabold" style={heading}>
                  Ang order mo
                </h2>
              </div>

              <span className="text-sm font-bold text-[#756b60]">
                {user_item_parsed.reduce((sum, item) => sum + item.quantity, 0)} items
              
              </span>
            </div>

            <ul className="divide-y divide-[#29231e]/10">
              {user_item_parsed.map((item) => (
                <li key={item.all_Id} className="flex items-center gap-3 py-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#f3ede1] text-xs font-bold text-[#d62828]">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-lg bg-[#f5f0eb] object-cover shadow-sm"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{item.name}</p>
                    <p className="mt-1 text-xs text-[#82766a]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="text-sm font-bold">
                    ₱{item.price.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>

            {/* Promo code */}
            <div className="border-t border-[#29231e]/10 pt-5">
              <label className="mb-2 block text-sm font-bold">
                Promo code
              </label>

              <div className="flex border border-[#29231e]/20">
                <input
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                />

                <button className="px-4 text-sm font-bold text-[#d62828]">
                  Apply
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mt-6 space-y-3 text-sm">
              <Row label="Subtotal" value={`₱${subtotal.toLocaleString()}`} />
              <Row label="Delivery fee" value={`₱${shipCost}`} />
              <Row label="Discount" value={`−₱${discount}`} accent />
            </div>

            <div className="mt-5 flex items-end justify-between border-t-2 border-[#29231e] pt-5">
              <div>
                <p className="text-sm font-bold">Total to pay</p>
                <p className="mt-1 text-xs text-[#82766a]">
                  Including delivery
                </p>
              </div>

              <span
                className="text-3xl font-extrabold tracking-tight text-[#d62828] sm:text-4xl"
                style={heading}
              >
                ₱{total.toLocaleString()}
              </span>
            </div>

            <button onClick={handlePlaceOrder} className="mt-6 flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#d62828] px-5 font-bold text-white">
              <Lock size={16} />
              Place order
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-[#82766a]">
              <Lock size={13} />
              Your order details stay private.
            </p>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-[#82766a]">
            Need help with your order? Contact Kumo Ramen.
          </p>
        </aside>
       </main>
   </div>
  );
}

function StepTitle({ num, title }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-sm font-extrabold text-[#d62828]">{num}</span>
      <h2 className="text-lg font-extrabold tracking-tight" style={heading}>
        {title}
      </h2>
    </div>
  );
}

function Field({ label, name, type = "text", className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <input
        type={type}
        name={name}
        className="min-h-[48px] w-full border border-[#29231e]/20 bg-transparent px-3 text-sm outline-none transition focus:border-[#d62828] focus:bg-white"
      />
    </label>
  );
}

function Tile({ active, title, note, price, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[76px] w-full items-center justify-between gap-3 border p-4 text-left ${
        active
          ? "border-[#d62828] bg-[#fff8f3]"
          : "border-[#29231e]/15 bg-transparent"
      }`}
    >
      <span className="flex min-w-0 items-start gap-3">
        <span
          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border ${
            active
              ? "border-[#d62828] bg-[#d62828] text-white"
              : "border-[#b6aa9b]"
          }`}
        >
          {active && <Check size={12} strokeWidth={3} />}
        </span>

        <span className="min-w-0">
          <span className="block text-sm font-bold">{title}</span>
          <span className="mt-1 block text-xs leading-5 text-[#82766a]">
            {note}
          </span>
        </span>
      </span>

      {price && (
        <span className="shrink-0 text-sm font-extrabold">{price}</span>
      )}
    </button>
  );
}
function Row({ label, value, accent = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={accent ? "text-[#d62828]" : "text-[#756b60]"}>
        {label}
      </span>

      <span
        className={`font-semibold ${
          accent ? "text-[#d62828]" : "text-[#29231e]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

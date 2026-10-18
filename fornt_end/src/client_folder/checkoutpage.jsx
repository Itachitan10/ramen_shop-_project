import { useState } from "react";
import { Lock, ArrowLeft, Check } from "lucide-react";

const heading = { fontFamily: "'Manrope', sans-serif" };




const CART_ITEMS = [
  { id: 1, name: "Tonkotsu Ramen", qty: 2, price: 560 },
  { id: 2, name: "Gyoza (6 pcs)", qty: 1, price: 160 },
  { id: 3, name: "Iced Green Tea", qty: 2, price: 150 },
];

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
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const [promo, setPromo] = useState("");

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
  const selectedShipping = SHIPPING_OPTIONS.find(
    (option) => option.id === shipping
  );
  const shipCost = selectedShipping.cost;
  const discount = 50;
  const total = subtotal + shipCost - discount;

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
            href="/menu"
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

            <h1
              className="text-4xl font-extrabold tracking-tight sm:text-5xl"
              style={heading}
            >
              Your order,
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
              <Field label="Full name" name="fullName" />
              <Field label="Mobile number" name="phone" type="tel" />

              <Field
                label="Address"
                name="address"
                className="sm:col-span-2"
              />

              <Field label="City / Municipality" name="city" />
              <Field label="Postal code" name="postalCode" />
            </div>
          </section>

          {/* Delivery option */}
          <section className="border-t border-[#29231e]/15 py-7">
            <StepTitle num="02" title="Delivery option" />

            <div className="space-y-3">
              {SHIPPING_OPTIONS.map((option) => (
                <Tile
                  key={option.id}
                  active={shipping === option.id}
                  onClick={() => setShipping(option.id)}
                  title={option.label}
                  note={option.eta}
                  price={`₱${option.cost}`}
                />
              ))}
            </div>
          </section>

          {/* Payment method */}
          <section className="border-t border-[#29231e]/15 py-7">
            <StepTitle num="03" title="Payment method" />

            <div className="space-y-3">
              {PAY_METHODS.map((method) => (
                <Tile
                  key={method.id}
                  active={payment === method.id}
                  onClick={() => setPayment(method.id)}
                  title={method.label}
                  note={method.note}
                />
              ))}
            </div>

            {payment === "card" && (
              <div className="mt-5 grid grid-cols-2 gap-4">
                <Field
                  label="Card number"
                  name="cardNumber"
                  className="col-span-2"
                />
                <Field label="Expiry date" name="expiry" />
                <Field label="Security code" name="cvc" />
              </div>
            )}

            {payment === "gcash" && (
              <p className="mt-4 border-l-2 border-[#d62828] pl-3 text-sm leading-6 text-[#756b60]">
                GCash payment instructions will appear here when payment
                integration is set up.
              </p>
            )}
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

                <h2
                  className="mt-1 text-2xl font-extrabold"
                  style={heading}
                >
                  Ang order mo
                </h2>
              </div>

              <span className="text-sm text-[#756b60]">
                {CART_ITEMS.reduce((sum, item) => sum + item.qty, 0)} items
              </span>
            </div>

            <ul className="divide-y divide-[#29231e]/10">
              {CART_ITEMS.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#f3ede1] text-xs font-bold text-[#d62828]">
                    {String(item.id).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{item.name}</p>
                    <p className="mt-1 text-xs text-[#82766a]">
                      Qty: {item.qty}
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
              <label
                htmlFor="promo-code"
                className="mb-2 block text-sm font-bold"
              >
                Promo code
              </label>

              <div className="flex border border-[#29231e]/20">
                <input
                  id="promo-code"
                  value={promo}
                  onChange={(event) => setPromo(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-[#d62828]"
                />

                <button
                  type="button"
                  onClick={() => {
                    // Add promo validation here.
                  }}
                  className="px-4 text-sm font-bold text-[#d62828] transition hover:bg-[#faf1e9]"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mt-6 space-y-3 text-sm">
              <Row
                label="Subtotal"
                value={`₱${subtotal.toLocaleString()}`}
              />
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

            <button
              type="button"
              className="mt-6 flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#d62828] px-5 font-bold text-white transition hover:bg-[#b51f1f] active:scale-[0.99]"
            >
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

function Tile({ active, onClick, title, note, price }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-[76px] w-full items-center justify-between gap-3 border p-4 text-left transition ${
        active
          ? "border-[#d62828] bg-[#fff8f3]"
          : "border-[#29231e]/15 bg-transparent hover:border-[#29231e]/40"
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
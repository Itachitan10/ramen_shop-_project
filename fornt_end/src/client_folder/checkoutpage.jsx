import { useState } from "react";
import {
  Truck,
  Zap,
  CreditCard,
  Smartphone,
  Landmark,
  Banknote,
  Lock,
  Tag,
} from "lucide-react";

const CART_ITEMS = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    qty: 1,
    price: 899,
    emoji: "🎧",
    bg: "bg-amber-100",
  },
  {
    id: 2,
    name: "Oversized Tee — Beige",
    qty: 2,
    price: 698,
    emoji: "👕",
    bg: "bg-sky-100",
  },
  {
    id: 3,
    name: "French Press Coffee Set",
    qty: 1,
    price: 599,
    emoji: "☕",
    bg: "bg-rose-100",
  },
];

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    eta: "3–5 days",
    cost: 49,
    icon: Truck,
  },
  {
    id: "express",
    label: "Express Delivery",
    eta: "1–2 days",
    cost: 129,
    icon: Zap,
  },
];

const PAY_METHODS = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "gcash", label: "GCash", icon: Smartphone },
  { id: "bank", label: "Bank Transfer", icon: Landmark },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("card");

  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price, 0);

  const shipCost = SHIPPING_OPTIONS.find(
    (s) => s.id === shipping
  ).cost;

  const discount = 200;
  const total = subtotal + shipCost - discount;

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-stone-800">
      {/* Top bar */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight">
            Presyo<span className="text-red-600">Palengke</span>
          </div>

          <ol className="flex items-center gap-2 text-xs font-medium text-stone-400">
            <li>Cart</li>
            <li className="text-stone-300">—</li>
            <li className="text-stone-900">Checkout</li>
            <li className="text-stone-300">—</li>
            <li>Confirmation</li>
          </ol>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT: forms */}
        <div className="space-y-8">
          {/* Shipping information */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
              Shipping Information
            </h2>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  placeholder="Juan Dela Cruz"
                />

                <Field
                  label="Phone Number"
                  placeholder="09XX XXX XXXX"
                />

                <Field
                  label="Address"
                  placeholder="Blk/Lot, Street, Barangay"
                  className="sm:col-span-2"
                />

                <Field
                  label="City"
                  placeholder="Urbiztondo, Pangasinan"
                />

                <Field
                  label="Zip Code"
                  placeholder="2427"
                />
              </div>
            </div>
          </section>

          {/* Shipping method */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
              Delivery Method
            </h2>

            <div className="space-y-2">
              {SHIPPING_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = shipping === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setShipping(opt.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition ${
                      active
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className="h-4 w-4 text-stone-500"
                        strokeWidth={1.75}
                      />

                      <span>
                        <span className="block text-sm font-medium">
                          {opt.label}
                        </span>

                        <span className="block text-xs text-stone-400">
                          {opt.eta}
                        </span>
                      </span>
                    </span>

                    <span className="font-mono text-sm font-medium">
                      ₱{opt.cost}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
              Payment Method
            </h2>

            <div className="mb-4 flex flex-wrap gap-2">
              {PAY_METHODS.map((m) => {
                const Icon = m.icon;
                const active = payment === m.id;

                return (
                  <button
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-stone-800 bg-stone-800 text-white"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <Icon
                      className="h-3.5 w-3.5"
                      strokeWidth={1.75}
                    />

                    {m.label}
                  </button>
                );
              })}
            </div>

            {payment === "card" && (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    mono
                    className="sm:col-span-3"
                  />

                  <Field
                    label="Expiry"
                    placeholder="MM/YY"
                    mono
                  />

                  <Field
                    label="CVC"
                    placeholder="•••"
                    mono
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT: order summary */}
        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
          <h3 className="mb-4 text-base font-semibold">
            Order Summary
          </h3>

          <ul className="space-y-4">
            {CART_ITEMS.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.bg} text-lg`}
                >
                  {item.emoji}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium leading-tight">
                    {item.name}
                  </p>

                  <p className="text-xs text-stone-400">
                    Qty: {item.qty}
                  </p>
                </div>

                <span className="font-mono text-sm">
                  ₱{item.price}
                </span>
              </li>
            ))}
          </ul>

          {/* Promo code */}
          <div className="my-5 flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-stone-200 px-3 py-2">
              <Tag
                className="h-3.5 w-3.5 text-stone-400"
                strokeWidth={1.75}
              />

              <input
                placeholder="Promo code"
                className="w-full bg-transparent text-xs font-mono outline-none placeholder:text-stone-400"
              />
            </div>

            <button className="rounded-lg bg-teal-700 px-4 text-xs font-semibold text-white hover:bg-teal-800">
              Apply
            </button>
          </div>

          {/* Order totals */}
          <div className="space-y-2 border-t border-dashed border-stone-200 pt-4 text-sm">
            <Row
              label="Subtotal"
              value={`₱${subtotal.toLocaleString()}`}
            />

            <Row
              label="Shipping"
              value={`₱${shipCost}`}
            />

            <Row
              label="Discount"
              value={`−₱${discount}`}
              valueClass="text-emerald-600"
            />

            <div className="mt-2 flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold">
              <span>Total</span>

              <span className="font-mono text-red-600">
                ₱{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Place order */}
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.99]">
            <Lock
              className="h-4 w-4"
              strokeWidth={2}
            />

            Place Order
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-400">
            <Lock
              className="h-3 w-3"
              strokeWidth={1.75}
            />

            Secure checkout — your payment information is protected
          </p>
        </aside>
      </main>
    </div>
  );
}

function Field({
  label,
  placeholder,
  mono,
  className = "",
}) {
  return (
    <label
      className={`flex flex-col gap-1.5 ${className}`}
    >
      <span className="text-xs font-medium text-stone-500">
        {label}
      </span>

      <input
        placeholder={placeholder}
        className={`rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 ${
          mono ? "font-mono" : ""
        }`}
      />
    </label>
  );
}

function Row({
  label,
  value,
  valueClass = "text-stone-500",
}) {
  return (
    <div className="flex items-center justify-between text-stone-500">
      <span>{label}</span>

      <span className={`font-mono ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}
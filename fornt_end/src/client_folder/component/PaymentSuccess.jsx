
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen bg-[#F7F1E5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#FFFDF7] rounded-3xl shadow-xl p-8 text-center border border-[#2B2118]/10">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={58} className="text-green-600" strokeWidth={1.8} />
          </div>
        </div>

        {/* Heading */}
        <p className="text-sm font-bold tracking-[3px] text-[#D62828] uppercase mb-3">
          Kumo Ramen
        </p>

        <h1 className="text-3xl font-extrabold text-[#2B2118] mb-3">
          Payment Successful!
        </h1>

        <p className="text-[#2B2118]/65 leading-relaxed mb-7">
          Thank you for your order! Your payment has been submitted successfully.
          We're excited to prepare your delicious meal.
        </p>

        {/* Order Details */}
        {orderId && (
          <div className="bg-[#F7F1E5] rounded-2xl p-4 mb-7">
            <p className="text-xs uppercase tracking-widest text-[#2B2118]/50 mb-1">
              Order Reference
            </p>
            <p className="text-xl font-bold text-[#2B2118]">
              #{orderId}
            </p>
          </div>
        )}

        {/* Buttons */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#D62828] hover:bg-[#b91f1f] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <ShoppingBag size={20} />
          Continue Shopping
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-3 text-[#2B2118] font-semibold py-3 hover:text-[#D62828] transition"
        >
          Back to Home
        </button>

        <p className="text-xs text-[#2B2118]/40 mt-8">
          Thank you for choosing Kumo Ramen.
        </p>
      </div>
    </div>
  );
}

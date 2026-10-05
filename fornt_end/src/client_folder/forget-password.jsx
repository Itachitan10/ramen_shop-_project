import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage({ onBack }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!value.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    // Temporary muna habang wala pa yung actual forgot-password API
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-[#F7F1E5] px-4 py-8 text-[#2B2118]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">

        <div className="w-full">

          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-[#6F6256] transition hover:text-[#D62828]"
          >
            <ArrowLeft
              className="h-4 w-4"
              strokeWidth={2}
            />
            Back to log in
          </button>

          {/* Main Card */}
          <div className="border-2 border-[#2B2118] bg-[#FFFDF7] p-6 shadow-[5px_5px_0px_#2B2118] sm:p-8">

            {/* Brand */}
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2B2118] bg-[#FFC72C] text-lg">
                🍜
              </div>

              <div>
                <p className="text-sm font-black tracking-[0.15em]">
                  KUMO
                </p>
                <p className="text-[10px] font-bold tracking-[0.25em] text-[#D62828]">
                  RAMEN SHOP
                </p>
              </div>
            </div>

            {sent ? (
              /* SUCCESS */
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#2B2118] bg-[#FFC72C] text-xl">
                  ✓
                </div>

                <h1 className="text-2xl font-black tracking-tight">
                  Check your inbox
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#6F6256]">
                  If an account matches{" "}
                  <span className="font-semibold text-[#2B2118]">
                    {value}
                  </span>
                  , we've sent you a link to reset your password.
                </p>

                <button
                  type="button"
                  onClick={onBack}
                  className="mt-7 w-full border-2 border-[#2B2118] bg-[#D62828] py-3 text-sm font-bold text-white shadow-[3px_3px_0px_#2B2118] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2B2118]"
                >
                  Back to login
                </button>
              </div>
            ) : (
              /* FORM */
              <>
                <div className="mb-7">
                  <h1 className="text-2xl font-black tracking-tight">
                    Forgot your password?
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-[#6F6256]">
                    Enter the email connected to your Kumo Ramen account and
                    we'll send you a password reset link.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#2B2118]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoComplete="email"
                    className="w-full border-2 border-[#2B2118] bg-[#FDF6E3] px-4 py-3 text-sm text-[#2B2118] outline-none placeholder:text-[#9A8D7D] focus:border-[#D62828]"
                  />

                  {error && (
                    <p className="mt-2 text-sm font-medium text-[#D62828]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-2 border-2 border-[#2B2118] bg-[#D62828] py-3 text-sm font-bold text-white shadow-[3px_3px_0px_#2B2118] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2B2118] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading && (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        strokeWidth={2}
                      />
                    )}

                    {loading ? "Sending..." : "Send reset link"}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Small footer */}
          <p className="mt-6 text-center text-xs text-[#8A7B6B]">
            Kumo Ramen · Simple food, good mood 🍜
          </p>

        </div>
      </div>
    </div>
  );
}
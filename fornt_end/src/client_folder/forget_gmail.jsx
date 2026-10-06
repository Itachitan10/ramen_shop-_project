import { ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-[#F7F1E5] px-4 py-8 text-[#2B2118]">

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm items-center justify-center">

        <div className="w-full">

          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="mb-4 flex items-center gap-1.5 text-sm font-medium text-[#6F6256] hover:text-[#D62828]"
          >
            <ArrowLeft size={16} />
            Back to login
          </button>

          <div className="border-2 border-[#2B2118] bg-[#FFFDF7] p-6 shadow-[4px_4px_0px_#2B2118]">

            {/* Logo */}
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#2B2118] bg-[#FFC72C]">
                🍜
              </div>

              <div>
                <p className="text-sm font-black tracking-widest">
                  KUMO
                </p>

                <p className="text-[9px] font-bold tracking-[0.2em] text-[#D62828]">
                  RAMEN SHOP
                </p>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-xl font-black">
              Reset your password
            </h1>

            <p className="mt-2 text-sm leading-5 text-[#6F6256]">
              Create a new password for your Kumo Ramen account.
            </p>

            {/* Form */}
            <div className="mt-5">

              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide">
                New password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border-2 border-[#2B2118] bg-[#FDF6E3] px-3 py-2.5 text-sm outline-none placeholder:text-[#9A8D7D] focus:border-[#D62828]"
              />

              <label className="mb-1.5 mt-4 block text-xs font-bold uppercase tracking-wide">
                Confirm password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full border-2 border-[#2B2118] bg-[#FDF6E3] px-3 py-2.5 text-sm outline-none placeholder:text-[#9A8D7D] focus:border-[#D62828]"
              />

              <button
                type="button"
                className="mt-5 w-full border-2 border-[#2B2118] bg-[#D62828] py-2.5 text-sm font-bold text-white shadow-[2px_2px_0px_#2B2118] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                Change password
              </button>

            </div>

          </div>

          <p className="mt-4 text-center text-[11px] text-[#8A7B6B]">
            Kumo Ramen · Account Security 🍜
          </p>

        </div>
      </div>
    </div>
  );
}
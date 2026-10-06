import { ArrowLeft } from "lucide-react";
import { useState  } from "react";  
const api_url = import.meta.env.VITE_API_URL  || "http://localhost:4000"

import { sileo, Toaster } from "sileo";
console.log(api_url);



export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    
    
    const handleSubmit  =  async() => {
        try{ 
        if(!email.includes("@")){ 
            // babalikan para i fix
            sileo.error({
        title: "Something went wrong",
      });
        }else{
      const req = await fetch(`${api_url}/forgot-password`, { 
            method: "POST",
             headers: {
             "Content-Type": "application/json",
             },
            body: JSON.stringify({gmail : email}),
            }) 
            if(!req.ok){ 
                   sileo.error({title: "Something went wrong" });
                   return
            }
           sileo.success({ title: "Reset email sent",});
            }
            }catch(err){ 
              console.error(err);
                sileo.error({
                title: "Server error",
                });
            }
 
    } 
  return (
    <div className="min-h-screen bg-[#F7F1E5] px-4 py-8 text-[#2B2118]">

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm items-center justify-center">
             
        <div className="w-full">
             <Toaster position="center-top" />
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="mb-4 flex items-center gap-1.5 text-sm font-medium text-[#6F6256] hover:text-[#D62828]"
          >
            <ArrowLeft size={16} />
            Back to log in
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
              Forgot your password?
            </h1>

            <p className="mt-2 text-sm leading-5 text-[#6F6256]">
              Enter your email and we'll send you a password reset link.
            </p>

            {/* Form Design */}
            <div className="mt-5">

              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide">
                Email address
              </label>

              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border-2 border-[#2B2118] bg-[#FDF6E3] px-3 py-2.5 text-sm outline-none placeholder:text-[#9A8D7D] focus:border-[#D62828]" />

              <button onClick={() =>handleSubmit(email)}  type="button" className="mt-4 w-full border-2 border-[#2B2118] bg-[#D62828] py-2.5 text-sm font-bold text-white shadow-[2px_2px_0px_#2B2118] hover:translate-x-[1px] hover:translate-y-[1px]" >
                Send reset link
              </button>

            </div>

          </div>

          <p className="mt-4 text-center text-[11px] text-[#8A7B6B]">
            Kumo Ramen · Simple food, good mood 🍜
          </p>

        </div>
      </div>
    </div>
  );
}
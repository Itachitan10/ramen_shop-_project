import { ArrowLeft } from "lucide-react";
import { useState , useEffect} from "react";
import { sileo, Toaster } from "sileo";




const parameter = new URLSearchParams(window.location.search)
const TokenForUrl  = parameter.get('token')



export default function ResetPassword() {


const api_url = import.meta.env.VITE_API_URL || "http://localhost:4000";


  const [newpass , setnewpass] = useState('')
  const [confirmpass , setconfirr] = useState('')
  

  

    const handle_submit = async () => {
        try {          
            // Check password fields
            if (!newpass || !confirmpass) {

              sileo.warning({ title: "Please fill in both password fields." });
                
                return;
            }
            if (newpass !== confirmpass) {
              sileo.warning({ title: "Passwords do not match." });
                
                return;
            }
            if (newpass.length < 8) {
               sileo.warning({ title: "Password must be at least 8 characters." });

                return;
            }
            if (!TokenForUrl) {
              sileo.warning({ title: "Invalid or missing reset token.." });
                return ;
            }

            const response = await fetch(`${api_url}/forgot-password2`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    token: TokenForUrl,
                    newPassword: newpass
                })
              
            });


              if (!response.ok) {
                  if (response.status === 401 || response.status === 410) {
                     sileo.warning()
                     sileo.error({title: "Something went wrong", description: "Please try again later.",});
                      window.location.href = "/forgot-password";
                      return;
                  }                
              }
           sileo.success({
              title: "Password reset successful",
              description: "You can now log in with your new password.",
            });
            
            setInterval(() => {
              window.location.reload()
            }, 5000);


        } catch (error) {
            console.error("Reset password error:", error);
            alert("Something went wrong.");
        }
    };



  return (
    <div className="min-h-screen bg-[#F7F1E5] px-4 py-8 text-[#2B2118]">
           <Toaster position="center"  />
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

              <input value={newpass}
                
                onChange={(e) => setnewpass(e.target.value)}
                placeholder="Enter new password"
                className="w-full border-2 border-[#2B2118] bg-[#FDF6E3] px-3 py-2.5 text-sm outline-none placeholder:text-[#9A8D7D] focus:border-[#D62828]"
              />

              <label className="mb-1.5 mt-4 block text-xs font-bold uppercase tracking-wide">
                Confirm password
              </label>

              <input
              value={confirmpass}
              onChange={(e) => setconfirr(e.target.value)}
                  bd
                placeholder="Confirm new password"
                className="w-full border-2 border-[#2B2118] bg-[#FDF6E3] px-3 py-2.5 text-sm outline-none placeholder:text-[#9A8D7D] focus:border-[#D62828]"
              />

              <button onClick={handle_submit}
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
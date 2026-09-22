import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:4000"

export default function Register() {

    // const [user_info , setuser_in] = useState({first_name:"ellow" , last_name :" " , email : " " ,mobile_number : " "}) 
   const [first_name , set_first] = useState('')
   const [last_name ,set_last] = useState('')
   const [email , set_email] = useState('')
   const [mobile , set_mobile] = useState('')    
   const [password , setpass] = useState('')
    
console.log(first_name , last_name , email, mobile , password);
   const handle_submit = async(e) =>{

    const response = await fetch(`${api_url}/register`, { 
          method: "POST",
        credentials : "include" , 
       headers: {"Content-Type": "application/json"},
        body : JSON.stringify({first_name : first_name  , last_name : last_name  , email : email, mobile_number :mobile , password : password})
    })
   const data =  await response.json()
    


    
   }

  return (
    <div className="min-h-screen bg-[#ffc72c] flex items-center justify-center p-5">

      <div className="w-full max-w-[500px]">

        <Link to="/"   className="block text-center text-3xl font-black tracking-[-2px] text-[#211b16] mb-8" >
          KUMO <span className="text-[#d62828]">RAMEN</span>
        </Link>

        <div className="relative bg-[#fffdf8] border-[4px] border-[#211b16] rounded-2xl p-8 shadow-[8px_8px_0_#211b16]">
          <span className="absolute -top-4 right-6 bg-[#ffc72c] border-2 border-[#211b16] px-3 py-1 rounded font-mono text-xs font-bold rotate-3">  NEW 🍜 </span>

          <span className="inline-block bg-[#211b16] text-[#ffc72c] px-3 py-1.5 rounded font-mono text-xs font-bold -rotate-2 mb-4"> JOIN THE BOWL CLUB </span>

          <h1 className="text-4xl font-black leading-none tracking-[-2px]">MAKE AN  <br />  ACCOUNT,{" "}
            <span className="text-[#d62828]">  EAT FAST.  </span>
          </h1>

          <p className="text-[#766b5e] text-sm mt-3 mb-7">
            Save your address, track orders, and get member-only deals.
          </p>

          <form className="space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-2">
                  First name
                </label>

                <input value={first_name} onChange={(e) => set_first(e.target.value)}
                type="text"
                  placeholder="Juan"
                  className="w-full bg-[#f7f1e5] border-2 border-[#211b16] rounded-lg px-4 py-3 outline-none focus:bg-white focus:border-[#168aad]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-2">
                  Last name
                </label>

                <input value={last_name} onChange={(e)=> set_last(e.target.value)}
                  type="text"
                  placeholder="Dela Cruz"
                  className="w-full bg-[#f7f1e5] border-2 border-[#211b16] rounded-lg px-4 py-3 outline-none focus:bg-white focus:border-[#168aad]"
                />
              </div>

            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-2">
                Email
              </label>

              <input value={email} onChange={(e) => set_email(e.target.value)}
                type="email"
                placeholder="you@email.com"
                className="w-full bg-[#f7f1e5] border-2 border-[#211b16] rounded-lg px-4 py-3 outline-none focus:bg-white focus:border-[#168aad]"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-2">
                Mobile number
              </label>

              <input value={mobile} onChange={(e) =>set_mobile(e.target.value)}
                type="numberda"
                placeholder="09XX XXX XXXX"
                className="w-full bg-[#f7f1e5] border-2 border-[#211b16] rounded-lg px-4 py-3 outline-none focus:bg-white focus:border-[#168aad]"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-2">
                Password
              </label>

              <input value={password } onChange={(e) =>setpass(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#f7f1e5] border-2 border-[#211b16] rounded-lg px-4 py-3 outline-none focus:bg-white focus:border-[#168aad]"
              />

              <div className="flex gap-1 mt-2">
                <span className="flex-1 h-1 bg-[#d62828] rounded" />
                <span className="flex-1 h-1 bg-[#d62828] rounded" />
                <span className="flex-1 h-1 bg-[#e8e0cf] rounded" />
                <span className="flex-1 h-1 bg-[#e8e0cf] rounded" />
              </div>

              <p className="text-xs text-[#766b5e] mt-2">
                At least 8 characters, with a number.
              </p>
            </div>

            <label className="flex gap-3 text-sm text-[#766b5e]">
              <input type="checkbox" className="mt-1 accent-[#d62828]" />
              <span>
                I agree to the{" "}
                <a className="text-[#168aad] font-bold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-[#168aad] font-bold">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <button onClick={handle_submit}
              type="submit"
              className="w-full bg-[#d62828] text-white border-[3px] border-[#211b16] py-3.5 rounded-lg font-black shadow-[5px_5px_0_#211b16] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_#211b16] transition"
            >
              CREATE ACCOUNT →
            </button>

          </form>

          <div className="flex items-center gap-3 my-7 text-xs font-bold text-[#766b5e]">
            <div className="flex-1 border-t-2 border-dashed border-[#cfc4b0]" />
            OR
            <div className="flex-1 border-t-2 border-dashed border-[#cfc4b0]" />
          </div>

          <button onClick={ () =>{ 
             window.location.href ="http://localhost:4000/auth/google"
          }} className="w-full border-2 border-[#211b16] py-3 rounded-lg font-bold hover:bg-[#168aad] hover:text-white hover:border-[#168aad] transition">
            🌐 Sign up with Google
          </button>

          <p className="text-center text-sm text-[#766b5e] mt-7">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-[#d62828] font-bold hover:underline"
            >
              Log in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import Sileo_Toggle from "./sileo_toogle";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:4000"
import icon from './icons/naruto-japanese-cuisine-japan-ramen-japanese-food-food-svgrepo-com.svg'
export default function Register() {

    // const [user_info , setuser_in] = useState({first_name:"ellow" , last_name :" " , email : " " ,mobile_number : " "}) 
   const [first_name , set_first] = useState('')
   const [last_name ,set_last] = useState('')
   const [email , set_email] = useState('')
   const [mobile , set_mobile] = useState('')    
   const [password , setpass] = useState('')

   const [identify , setidentify ] = useState(null) 


   console.log(identify);
   

   const handle_submit = async(e) =>{
        e.preventDefault()

    const req= await fetch(`${api_url}/register`, { 
          method: "POST",
        credentials : "include" , 
       headers: {"Content-Type": "application/json"},
        body : JSON.stringify({first_name : first_name  , last_name : last_name  , email : email, mobile_number :mobile , password : password})
    })
   const data =  await req.json()
   console.log(data)
   if(req.ok){
    setidentify({status: true  , title : "Registration Successful!", description: "Your account has been created. Would you like to log in now?", distanation  : '/'})
    return
   }else{ 
    setidentify({status: false, title: "Registration Failed!", description: data.message || "Registration failed" , distanation  : '/register'})
    throw new Error(data.message  || "Registration failed");
   }
  }
  

return (
  <div className="min-h-screen bg-[#F7F1E5] text-[#2B2118]">
    {/* NAVBAR — SAME AS LOGIN */}
    <nav className="flex h-16 items-center justify-between border-b-2 border-[#2B2118] bg-[#FFFDF7] px-5 md:px-10">
      <Link to="/" className="text-xl font-black">
        KUMO <span className="text-[#D62828]">RAMEN</span>
      </Link>

      <Link
        to="/"
        className="text-sm font-bold transition hover:text-[#D62828]"
      >
        ← Back to Login
      </Link>
    </nav>

    {/* REGISTRATION NOTICE */}
    <Sileo_Toggle identify={identify} />

    {/* REGISTER CARD */}
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8">
      <section className="w-full max-w-sm rounded-xl border-2 border-[#2B2118] bg-[#FFFDF7] p-6 shadow-[5px_5px_0_#2B2118]">
        {/* LOGO — SAME AS LOGIN */}
        <div className="mb-5 flex items-center gap-3">
          <img
            src={icon}
            alt="Ramen icon"
            className="h-16 w-16 object-contain"
          />

          <div>
            <p className="font-black tracking-widest">KUMO</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#D62828]">
              RAMEN SHOP
            </p>
          </div>
        </div>

        {/* HEADING */}
        <h1 className="text-3xl font-black tracking-tight">
          Create <span className="text-[#D62828]">account.</span>
        </h1>

        <p className="mb-5 mt-2 text-sm leading-5 text-[#766B5E]">
          Join Kumo Ramen and order your favorite ramen.
        </p>

        <form onSubmit={handle_submit}>
          {/* FIRST NAME + LAST NAME */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold">
                First name
              </label>

              <input
                value={first_name}
                onChange={(e) => set_first(e.target.value)}
                type="text"
                placeholder="Juan"
                required
                className="w-full rounded-lg border-2 border-[#2B2118] bg-[#F7F1E5] px-3 py-2.5 text-sm outline-none transition focus:border-[#168AAD] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold">
                Last name
              </label>

              <input
                value={last_name}
                onChange={(e) => set_last(e.target.value)}
                type="text"
                placeholder="Dela Cruz"
                required
                className="w-full rounded-lg border-2 border-[#2B2118] bg-[#F7F1E5] px-3 py-2.5 text-sm outline-none transition focus:border-[#168AAD] focus:bg-white"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold">
              Email address
            </label>

            <input
              value={email}
              onChange={(e) => set_email(e.target.value)}
              type="email"
              placeholder="you@email.com"
              required
              className="w-full rounded-lg border-2 border-[#2B2118] bg-[#F7F1E5] px-3 py-2.5 text-sm outline-none transition focus:border-[#168AAD] focus:bg-white"
            />
          </div>

          {/* MOBILE */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold">
              Mobile number
            </label>

            <input
              value={mobile}
              onChange={(e) => set_mobile(e.target.value)}
              type="tel"
              placeholder="09XX XXX XXXX"
              required
              className="w-full rounded-lg border-2 border-[#2B2118] bg-[#F7F1E5] px-3 py-2.5 text-sm outline-none transition focus:border-[#168AAD] focus:bg-white"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold">
              Password
            </label>

            <input
              value={password}
              onChange={(e) => setpass(e.target.value)}
              type="password"
              placeholder="At least 8 characters"
              required
              className="w-full rounded-lg border-2 border-[#2B2118] bg-[#F7F1E5] px-3 py-2.5 text-sm outline-none transition focus:border-[#168AAD] focus:bg-white"
            />

            <p className="mt-2 text-xs leading-4 text-[#766B5E]">
              Use at least 8 characters and include a number.
            </p>
          </div>

          {/* TERMS */}
          <label className="mb-5 flex cursor-pointer items-start gap-2 text-xs leading-5 text-[#766B5E]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#D62828]"
            />

            <span>
              I agree to the{" "}
              <a
                href="/terms"
                className="font-bold text-[#D62828] hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="font-bold text-[#D62828] hover:underline"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>

          {/* CREATE ACCOUNT — SAME BUTTON STYLE */}
          <button
            type="submit"
            className="w-full rounded-lg border-2 border-[#2B2118] bg-[#D62828] py-3 text-sm font-extrabold text-white shadow-[3px_3px_0_#2B2118] transition hover:translate-y-0.5 hover:shadow-[1px_1px_0_#2B2118]"
          >
            Create account →
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-5 flex items-center gap-3 text-xs text-[#766B5E]">
          <div className="h-px flex-1 bg-[#D0C5B5]" />
          OR
          <div className="h-px flex-1 bg-[#D0C5B5]" />
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={() => {
            window.location.href = `${api_url}/auth/google`;
          }}
          className="w-full rounded-lg border-2 border-[#2B2118] bg-white py-2.5 text-sm font-bold transition hover:bg-[#168AAD] hover:text-white"
        >
          <span className="mr-2">G</span>
          Sign up with Google
        </button>

        {/* LOGIN LINK */}
        <p className="mt-5 text-center text-xs text-[#766B5E]">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-bold text-[#D62828] hover:underline"
          >
            Log in
          </Link>
        </p>
      </section>
    </main>
  </div>
);
}
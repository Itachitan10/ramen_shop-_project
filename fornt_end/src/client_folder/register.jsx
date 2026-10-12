import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import Toggle from './toogle'
const api_url = import.meta.env.VITE_API_URL || "http://localhost:4000"



export default function Register() {

    // const [user_info , setuser_in] = useState({first_name:"ellow" , last_name :" " , email : " " ,mobile_number : " "}) 
   const [first_name , set_first] = useState('')
   const [last_name ,set_last] = useState('')
   const [email , set_email] = useState('')
   const [mobile , set_mobile] = useState('')    
   const [password , setpass] = useState('')

   const [identify , setidentify ] = useState(null) 



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
  <div className="min-h-screen bg-[#F7F1E5] flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-md">
      <Toggle identify={identify} />

      <Link
        to="/"
        className="mb-5 flex items-center justify-center gap-2 text-xl font-black tracking-tight text-[#2B2118]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D62828] text-lg">
          🍜
        </span>
        KUMO <span className="text-[#D62828]">RAMEN</span>
      </Link>

      <div className="rounded-2xl border border-[#E5DCCB] bg-[#FFFDF7] p-5 shadow-[0_8px_30px_rgba(43,33,24,0.07)] sm:p-7">
        <div className="mb-5">
          <span className="text-xs font-bold uppercase tracking-[2px] text-[#D62828]">
            Join the bowl club
          </span>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#2B2118]">
            Create your account
          </h1>

          <p className="mt-1 text-sm text-[#766B5E]">
            Sign up to enjoy your favorite ramen.
          </p>
        </div>

        <form onSubmit={handle_submit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#2B2118]">
                First name
              </label>
              <input
                value={first_name}
                onChange={(e) => set_first(e.target.value)}
                type="text"
                placeholder="Juan"
                className="w-full rounded-lg border border-[#E5DCCB] bg-white px-3 py-2.5 text-sm text-[#2B2118] outline-none transition focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#2B2118]">
                Last name
              </label>
              <input
                value={last_name}
                onChange={(e) => set_last(e.target.value)}
                type="text"
                placeholder="Dela Cruz"
                className="w-full rounded-lg border border-[#E5DCCB] bg-white px-3 py-2.5 text-sm text-[#2B2118] outline-none transition focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#2B2118]">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => set_email(e.target.value)}
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-lg border border-[#E5DCCB] bg-white px-3 py-2.5 text-sm text-[#2B2118] outline-none transition focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#2B2118]">
              Mobile number
            </label>
            <input
              value={mobile}
              onChange={(e) => set_mobile(e.target.value)}
              type="tel"
              placeholder="09XX XXX XXXX"
              className="w-full rounded-lg border border-[#E5DCCB] bg-white px-3 py-2.5 text-sm text-[#2B2118] outline-none transition focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#2B2118]">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpass(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#E5DCCB] bg-white px-3 py-2.5 text-sm text-[#2B2118] outline-none transition focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/10"
            />

            <p className="mt-1.5 text-xs text-[#766B5E]">
              Use at least 8 characters and include a number.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-2 pt-1 text-xs leading-5 text-[#766B5E]">
            <input
              type="checkbox"
              className="mt-1 accent-[#D62828]"
            />
            <span>
              I agree to the{" "}
              <a href="/terms" className="font-semibold text-[#D62828] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="font-semibold text-[#D62828] hover:underline">
                Privacy Policy
              </a>.
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#D62828] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#B91F24] active:scale-[0.99]"
          >
            Create account <span className="ml-1">→</span>
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E5DCCB]" />
          <span className="text-xs text-[#A49A89]">OR</span>
          <div className="h-px flex-1 bg-[#E5DCCB]" />
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = `${api_url}/auth/google`;
          }}
          className="w-full rounded-lg border border-[#E5DCCB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2B2118] transition hover:border-[#168AAD] hover:bg-[#168AAD]/5"
        >
          🌐 Sign up with Google
        </button>

        <p className="mt-5 text-center text-sm text-[#766B5E]">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-bold text-[#D62828] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-[#A49A89]">
        Made with ❤️ for ramen lovers.
      </p>
    </div>
  </div>
);

}
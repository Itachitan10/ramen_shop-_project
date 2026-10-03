import { useState } from "react";
import { Link } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL  || "http://localhost:4000"






export default function Login() {

console.log(api_url);

  const [info, set_info] = useState({email: ""  ,password : "" , remember : false })


  const handechange_email= (e)=>{ 
    e.preventDefault()
 
    const {name , value} = e.target;

    set_info({...info , [name] : value})
  }
  const handechange_password = (e)=>{ 
    e.preventDefault()
    
    const {name , value } =e.target

    set_info({...info, [name] : value })
  }

  const handelechange_checkbox = (e) =>{
    e.preventDefault()
   
    const {name ,type , value , checked} = e.target

    set_info({ ...info  , [name] : type === 'checkbox' ?  checked  : value })
  }





const handle_submit = async (e) => {

  
  e.preventDefault();

  const response = await fetch(`${api_url}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: info.email,
      password: info.password,
    }),
  
  });
  const data = await response.json();

  console.log(data);
  
  if(!data){ 
    localStorage.removeItem('token')
  }else{
    // window.location.href='/dashboard'
    localStorage.setItem('token' ,JSON.stringify(data))
    // const data1 =JSON.parse(localStorage.getItem('token'))  

  }
};
  return (
    <div className="min-h-screen bg-[#f7f1e5] text-[#211b16]">

      {/* NAVBAR */}
      <nav className="h-[74px] bg-[#fffdf8] border-b-[3px] border-dashed border-[#211b16] flex items-center justify-between px-5 md:px-12">
        <Link to="/" className="font-display font-extrabold text-[22px]">
          KUMO <span className="text-[#d62828]">RAMEN</span>
        </Link>

        <Link to="/register" className="font-bold text-sm hover:text-[#d62828] transition">
          Create Account →
        </Link>
      </nav>

      {/* BACKGROUND */}
      <main className="min-h-[calc(100vh-74px)] flex items-center justify-center px-5 py-12 bg-[repeating-linear-gradient(-45deg,#ffc72c_0px,#ffc72c_40px,#ffd35c_40px,#ffd35c_80px)]">

        {/* CARD */}
        <section className="relative w-full max-w-[440px] bg-[#fffdf8] border-[4px] border-[#211b16] rounded-2xl p-7 sm:p-10 shadow-[10px_10px_0_#211b16]">

          {/* BADGE */}
          <div className="absolute -top-4 right-6 bg-[#ffc72c] border-[2px] border-[#211b16] px-3 py-1.5 rounded rotate-3 shadow-[3px_3px_0_#211b16]">
            <span className="font-mono text-[9px] font-bold">
              WELCOME BACK 🍜
            </span>
          </div>

          {/* ICON */}
          <div className="w-16 h-16 bg-[#211b16] rounded-xl flex items-center justify-center text-3xl mb-5">
            🍜
          </div>

          {/* EYEBROW */}
          <div className="inline-block bg-[#211b16] text-[#ffc72c] px-3 py-1.5 rounded mb-4 rotate-[-2deg]">
            <span className="font-mono text-[9px] font-bold">
              KUMO RAMEN ACCOUNT
            </span>
          </div>

          <h1 className="font-display font-extrabold text-[40px] leading-[.95] tracking-[-2px]">
            WELCOME
            <br />
            <span className="text-[#d62828]">BACK.</span>
          </h1>

          <p className="text-[#766b5e] text-sm leading-6 mt-3 mb-7">
            Sign in to order your favorite bowl, track deliveries, and get member deals.
          </p>

          {/* FORM */}
          <form  onSubmit={handle_submit} >

            {/* EMAIL */}
            <div className="mb-5">
              <label className="block font-mono text-[10px] font-bold uppercase text-[#766b5e] mb-2">
                Email Address
              </label>

              <input
                placeholder="you@email.com"
                onChange={handechange_email}
                type="email"
               name='email'
                required
                className="w-full p-3.5 bg-[#f7f1e5] border-2 border-[#211b16] rounded-lg outline-none transition focus:bg-white focus:border-[#168aad] focus:shadow-[4px_4px_0_#211b16]"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block font-mono text-[10px] font-bold uppercase text-[#766b5e] mb-2">
                Password
              </label>

              <div className="relative">
          
                <input
                onChange={handechange_password}
                  name="password"
                  required
                  className="w-full p-3.5 pr-12 bg-[#f7f1e5] border-2 border-[#211b16] rounded-lg outline-none transition focus:bg-white focus:border-[#168aad] focus:shadow-[4px_4px_0_#211b16]"
                />

                <button required
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 hover:bg-[#ffc72c] rounded"
                >
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex justify-between items-center mb-6 text-xs">
              <label className="flex items-center gap-2 text-[#766b5e]">
              <input type="checkbox" checked={info.remember} name='remember' onChange={handelechange_checkbox}/>
              </label>

              <Link to= "/forgot-password" className="text-[#d62828] font-bold hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* LOGIN */}
            <button
              type="submit"
              className="w-full bg-[#d62828] text-white border-[3px] border-[#211b16] rounded-lg py-3.5 font-extrabold shadow-[6px_6px_0_#211b16] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#211b16] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#211b16]"
            >
              LOGIN →
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-7 text-[#766b5e] text-xs font-bold">
            <div className="flex-1 border-t-2 border-dashed border-[#d0c5b5]" />
            OR
            <div className="flex-1 border-t-2 border-dashed border-[#d0c5b5]" />
          </div>

          {/* GOOGLE */}
          <button 
          
          
            type="button"
            className="w-full bg-white border-2 border-[#211b16] rounded-lg py-3 font-bold text-sm hover:bg-[#168aad] hover:text-white transition"
          >
            <span className="mr-2">G</span>
            Continue with Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-[#766b5e] mt-7">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#d62828] font-bold hover:underline"
            >
              Create one
            </Link>
          </p>

        </section>
      </main>
    </div>
  );
}
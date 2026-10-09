import { useState } from "react";
import { Link } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL  || "http://localhost:4000"
import { sileo, Toaster } from "sileo";
import { FaEye, FaEyeSlash } from "react-icons/fa";



export default function Login() {
  const [info, set_info] = useState({email: ""  ,password : ""  })
  const [loading, set_loading] = useState(false)
  const [showpass , setshowpass ] = useState(false)
  const [remember , setremeber ]= useState(false)
  
;
  
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

  set_loading(true);
  e.preventDefault();

  const request =  fetch(`${api_url}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: info.email,
      password: info.password,
      remember : remember
    }),
  
  }).then(async(response) => {
   const data = await response.json();
 if (!response.ok) {
    localStorage.removeItem("token");
    throw new Error(data.message || "Login failed");
  }
else{
   localStorage.setItem('token' ,JSON.stringify(data))

    setTimeout(() => {
      window.location.href='/dashboard'
    }, 1000);
   }
  })
 sileo.promise(request, {
    loading: {
      title: "Logging in..."
    },
    success: {
      title: "Login successful"
    },
    error: {
      title: "Failed to login, check your email or password"
    }
  });

    try {
    await request;
  } catch (err) {
    localStorage.removeItem("token");
  } finally {
    set_loading(false);
  }

};

 
return (
  <div className="min-h-screen bg-[#F7F1E5] text-[#2B2118]">
    {/* NAVBAR */}
    <nav className="h-16 flex items-center justify-between px-5 md:px-10 bg-[#FFFDF7] border-b-2 border-[#2B2118]">
      <Link to="/" className="text-xl font-black">
        KUMO <span className="text-[#D62828]">RAMEN</span>
      </Link>

      <Link
        to="/register"
        className="text-sm font-bold hover:text-[#D62828] transition"
      >
        Create Account →
      </Link>
    </nav>

    <Toaster position="center" />

    {/* LOGIN CARD */}
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
      <section className="w-full max-w-sm rounded-xl border-2 border-[#2B2118] bg-[#FFFDF7] p-6 shadow-[5px_5px_0_#2B2118]">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[#2B2118] bg-[#FFC72C] text-2xl">
            🍜
          </div>
          <div>
            <p className="font-black tracking-widest">KUMO</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#D62828]">
              RAMEN SHOP
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight">
          Welcome <span className="text-[#D62828]">back.</span>
        </h1>

        <p className="mt-2 mb-5 text-sm leading-5 text-[#766B5E]">
          Sign in to order your favorite ramen.
        </p>

        <form onSubmit={handle_submit}>
          {/* EMAIL */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold">
              Email address
            </label>

            <input
              placeholder="you@email.com"
              onChange={handechange_email}
              type="email"
              name="email"
              required
              className="w-full rounded-lg border-2 border-[#2B2118] bg-[#F7F1E5] px-3 py-2.5 text-sm outline-none transition focus:border-[#168AAD] focus:bg-white"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-bold">
              Password
            </label>

            <div className="relative">
              <input
                type={showpass ? 'password' : 'text'}
                name="password"
                required
                className="w-full rounded-lg border-2 border-[#2B2118] bg-[#F7F1E5] px-3 py-2.5 pr-14 text-sm outline-none transition focus:border-[#168AAD] focus:bg-white"
              />

              <button
              type="button"
              onClick={() =>setshowpass(!showpass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#766B5E] hover:text-[#D62828]"
              >
                {showpass ? <FaEyeSlash /> : <FaEye />}
            
              </button>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="mb-5 flex items-center justify-between gap-2 text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-[#766B5E]">
              <input
              value={remeber}
              type="checkbox"
              onClick={(e) => setremeber(true)}
                className="h-4 w-4 cursor-pointer accent-[#D62828]"/>
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="font-bold text-[#D62828] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg border-2 border-[#2B2118] bg-[#D62828] py-3 text-sm font-extrabold text-white shadow-[3px_3px_0_#2B2118] transition hover:translate-y-0.5 hover:shadow-[1px_1px_0_#2B2118] disabled:opacity-60"
          >
            {loading ? "Loading..." : "Login"}
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
          className="w-full rounded-lg border-2 border-[#2B2118] bg-white py-2.5 text-sm font-bold transition hover:bg-[#168AAD] hover:text-white"
        >
          <span className="mr-2">G</span>
          Continue with Google
        </button>

        {/* REGISTER */}
        <p className="mt-5 text-center text-xs text-[#766B5E]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-[#D62828] hover:underline"
          >
            Create one
          </Link>
        </p>
      </section>
    </main>
  </div>
);

}
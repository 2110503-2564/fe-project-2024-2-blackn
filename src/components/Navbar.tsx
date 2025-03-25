"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(Cookies.get("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Checking for token");
      const newToken = Cookies.get("token");
      if(newToken) {
        setToken(newToken);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="flex justify-between items-center mb-10 max-sm:flex-col max-sm:gap-5 sticky top-0 z-50 backdrop-blur-sm bg-white/70 p-4 rounded-b-2xl shadow-sm">
      
    <div className="flex items-center pl-3 pr-6 bg-gradient-to-r from-sky-200 to-green-200 h-[75px] rounded-[37.5px] max-sm:w-full transform hover:scale-105 transition-all duration-300">
    
    <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-white flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="Logo"
        fill
        className="object-contain"
        sizes="60px"
      />


    {/* <div className="ml-7 text-3xl font-medium text-black max-sm:hidden">
      BlackN Dentist
    </div> */}

  </div>

  <div className="ml-3 text-3xl font-medium text-black max-sm:hidden">
    BlackN Dentist
  </div>

  {/* Optional: Show alternate text on small screens */}
  {/* <div className="ml-7 text-3xl font-medium text-black hidden max-sm:block">
    Logo
  </div> */}
</div>

      <button
        onClick={() => router.push(token ? "/profile" : "/login")}
        className="text-3xl text-white rounded-3xl bg-gradient-to-r from-slate-500 to-slate-600 h-[75px] w-[221px] max-sm:w-full hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center transform active:scale-95"
      >
        {token ? "Profile" : "Login"}
      </button>
    </div>
  );
};

"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(Cookies.get("token"));

  useEffect(() => {
    const interval = setInterval(() => {
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
      <div className="flex items-center px-5 py-0 bg-gradient-to-r from-sky-200 to-green-200 h-[75px] rounded-[37.5px] max-sm:w-full transform hover:scale-105 transition-all duration-300">
        <div>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="30" fill="white" />
          </svg>
        </div>
        <div className="ml-7 text-3xl max-sm:hidden">BlackN Dentist</div>
        <div className="ml-7 text-3xl hidden max-sm:block">Logo</div>
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

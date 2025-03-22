"use client";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { InputField } from "@/components/InputField";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import userLogin from "@/libs/(auth)/userLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const login = await userLogin(email, password);
    if (!login.success) {
      alert("Wrong Email or Password");
    } else {
      Cookies.set("token", login?.token, { expires: 30 });
      router.push("/");
    }
  };
  return (
    <main className="flex justify-center items-center w-full bg-green-100 min-h-screen">
      <div className="flex flex-col items-center p-16 bg-white rounded-3xl w-[655px] max-md:p-10 max-md:w-[90%] max-sm:p-6 max-sm:w-[95%]">
        <h1 className="mb-6 text-3xl">Login</h1>
        <Divider />
        <form onSubmit={handleSubmit} className="w-full">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <div className="relative w-full">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[20px] top-[70px] transform-[translateY(-50%)]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {/* <button
            type="button"
            className="mb-4 text-xl text-indigo-700 cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Forgot Password?
          </button> */}
          <div className="flex justify-center w-full">
            <Button type="submit">Login</Button>
          </div>
          <p className="text-xl text-center">
            Don't have any account?{" "}
            <button
              type="button"
              className="text-indigo-700 underline cursor-pointer hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}

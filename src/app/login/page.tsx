"use client";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { InputField } from "@/components/InputField";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import userLogin from "@/libs/(auth)/userLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import getMe from "@/libs/(auth)/getMe";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  if (Cookies.get("token")) {
    const userCheck = async () => {
      try {
        await getMe(Cookies.get("token") as string);
        router.push("/");
      } catch (err) {}
    };
    userCheck();
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const login = await userLogin(email, password);
      Cookies.set("token", login?.token, { expires: 30 });
      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };
  return (
    <main className="flex justify-center items-center w-full bg-gradient-to-b from-green-100 to-white min-h-screen p-4">
      <div className="flex flex-col items-center p-16 bg-white rounded-3xl w-[655px] max-md:p-10 max-md:w-[90%] max-sm:p-6 max-sm:w-[95%] shadow-xl transform hover:scale-[1.01] transition-all duration-300">
        <h1 className="mb-6 text-3xl text-center">Login</h1>
        <Divider />
        <form onSubmit={handleSubmit} className="w-full">
          {error && (
            <div className="text-red-500 text-base mb-4 text-center">
              {error}
            </div>
          )}
          <div className="mb-6">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative w-full mb-6">
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
          <div className="flex justify-center w-full transform hover:scale-105 active:scale-95 transition-all duration-300">
            <Button type="submit">Login</Button>
          </div>
          <p className="text-2xl text-center mt-8">
            Don't have any account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-indigo-700 underline cursor-pointer hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:-translate-y-1 transition-all"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}

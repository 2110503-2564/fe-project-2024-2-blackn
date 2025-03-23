"use client";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { InputField } from "@/components/InputField";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/(auth)/userRegister";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";

export default async function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  if (Cookies.get("token")) {
    const userCheck = async () => {
      try {
        await getMe(Cookies.get("token") as string);
        router.push("/");
      } catch (err) {
        Cookies.remove("token");
      }
    };
    userCheck();
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !formData.name ||
      !formData.email ||
      !formData.tel ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const register = await userRegister(
        formData.name,
        formData.email,
        formData.password,
        formData.tel
      );
      Cookies.set("token", register?.token, { expires: 30 });
      router.push("/");
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-20 py-24 text-3xl text-black bg-green-100 min-h-screen max-md:px-5">
      <div className="flex flex-col items-start px-20 py-14 max-w-full bg-white rounded-3xl w-[655px] max-md:px-5">
        <h1 className="self-center text-3xl text-center mb-10">Register</h1>
        <Divider />

        <form onSubmit={handleSubmit} className="w-full">
          {error && (
            <div className="text-red-500 text-base mb-4 text-center">
              {error}
            </div>
          )}

          <InputField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <InputField
            label="Telephone"
            name="tel"
            type="tel"
            value={formData.tel}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative w-full">
            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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

          <div className="relative w-full">
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-[20px] top-[70px] transform-[translateY(-50%)]"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>

          <div className="flex justify-center mt-20 max-md:mt-10">
            <Button type="submit">Register</Button>
          </div>

          <p className="text-2xl text-center mt-11 max-md:mt-10">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-indigo-700 underline cursor-pointer hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}

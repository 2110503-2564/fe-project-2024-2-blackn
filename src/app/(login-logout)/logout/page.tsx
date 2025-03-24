"use client";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Logout() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("token")
    if(token) {
      Cookies.set("token", token, { expires: 0 });
    }
    router.push("/");
  };
  return (
    <main className="flex justify-center items-center w-full bg-gradient-to-b from-green-100 to-white min-h-screen p-4">
      <div className="flex flex-col items-center p-16 bg-white rounded-3xl w-[655px] max-md:p-10 max-md:w-[90%] max-sm:p-6 max-sm:w-[95%] shadow-xl transform hover:scale-[1.01] transition-all duration-300">
        <h1 className="mb-6 text-3xl text-center">Logout</h1>
        <Divider />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-center w-full transform hover:scale-105 active:scale-95 transition-all duration-300">
            <Button type="submit">Logout</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

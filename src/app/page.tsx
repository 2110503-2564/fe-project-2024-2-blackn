"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DentistCard } from "@/components/DentistCard";
import getDentists from "@/libs/(dentist)/getDentists";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import getMe from "@/libs/(auth)/getMe";

export default function Home() {
  const [dentists, setDentists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = Cookies.get("token");
  const router = useRouter();
  if (!token) {
    router.push("/login");
    return;
  } else {
    const userCheck = async () => {
      try {
        await getMe(token);
      } catch (err) {
        Cookies.remove("token");
        router.push("/login");
      }
    };
    userCheck();
  }
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const data = await getDentists();
        setDentists(data.data);
      } catch (err) {
        setError("Failed to load dentists");
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <div className="text-3xl">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <div className="text-3xl text-red-500">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="p-5 mx-auto my-0 max-w-screen-xl transition-all duration-300 ease-in-out">
        <Navbar />

        {/* Hero Section */}
        <div className="mb-10 bg-gradient-to-r from-green-100 to-sky-100 rounded-3xl h-[380px] max-sm:h-[250px] flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
          <h1 className="text-4xl max-sm:text-3xl font-bold text-gray-800 text-center px-4 animate-fadeIn">
            Find Your Perfect Dentist
          </h1>
        </div>

        <div className="mx-0 my-10 h-2 bg-gradient-to-r from-green-200 to-sky-200 rounded-3xl transform hover:scale-x-105 transition-all duration-300" />

        <div className="mb-10 text-3xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-sky-600">
          Our Professional Dentists
        </div>

        <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] max-md:gap-5">
          {dentists.map((dentist) => (
            <DentistCard
              key={dentist._id}
              name={dentist.name}
              expertise={dentist.area_of_expertise}
              experience={dentist.year_of_experience}
              imageUrl={dentist.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

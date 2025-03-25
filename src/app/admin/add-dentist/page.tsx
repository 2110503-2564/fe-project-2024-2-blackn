"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";
import addDentist from "@/libs/(dentist)/addDentist";

export default function AddDentist() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    area_of_expertise: "",
    year_of_experience: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const userData = await getMe(token);
        if (!(userData.data.role === "admin")) {
          router.push("/");
          return;
        }
      } catch (err) {
        // Cookies.remove("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);

    if (
      !formData.name ||
      !formData.area_of_expertise ||
      !formData.year_of_experience
    ) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }

      await addDentist(token, {
        name: formData.name,
        area_of_expertise: formData.area_of_expertise,
        year_of_experience: parseInt(formData.year_of_experience),
      });

      router.push("/");
    } catch (err) {
      setError("Failed to add dentist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-green-100">
        <div className="text-3xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-100 to-white p-4">
      <div
        className={`flex flex-col items-center justify-center bg-white rounded-3xl w-[655px] h-[80%] max-md:w-[90%] max-sm:pb-6 max-sm:h-auto max-sm:w-[95%] shadow-xl transform /*hover:scale-[1.01]*/ transition-all duration-300`}
      >
        <div className="mt-14 text-3xl font-bold text-center text-black max-sm:mt-8 max-sm:text-3xl">
          Add New Dentist
        </div>
        <div className="mt-10 h-2 bg-sky-200 rounded-3xl w-[510px] max-md:w-4/5 max-sm:w-[90%]" />

        {error && (
          <div className="mt-4 text-red-500 text-center text-xl w-[491px] max-md:w-4/5 max-sm:w-[90%]">
            {error}
          </div>
        )}

        <div className="flex flex-col mt-10 w-[491px] max-md:w-4/5 max-sm:w-[90%]">
          <div className="mb-3 text-3xl text-black max-sm:text-2xl">Name</div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 w-full text-xl rounded-3xl bg-zinc-100 h-[62px] max-sm:h-[50px]"
          />
        </div>

        <div className="flex flex-col mt-6 w-[491px] max-md:w-4/5 max-sm:w-[90%]">
          <div className="mb-3 text-3xl text-black max-sm:text-2xl">
            Area of expertise
          </div>
          <input
            name="area_of_expertise"
            value={formData.area_of_expertise}
            onChange={handleChange}
            className="px-4 w-full text-xl rounded-3xl bg-zinc-100 h-[62px] max-sm:h-[50px]"
          />
        </div>

        <div className="flex flex-col mt-6 w-[491px] max-md:w-4/5 max-sm:w-[90%]">
          <div className="flex justify-between items-center">
            <div className="mb-3 text-3xl text-black max-sm:text-2xl">
              Years of experience
            </div>
            <input
              name="year_of_experience"
              type="number"
              value={formData.year_of_experience}
              onChange={handleChange}
              className="px-4 rounded-3xl text-xl bg-zinc-100 h-[62px] w-[177px] max-sm:h-[50px] max-sm:w-[120px]"
            />
          </div>
        </div>

        <div className="flex justify-center mt-11 mb-14 w-[491px] max-md:w-4/5 max-sm:w-[90%]">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-48 text-3xl text-black bg-gradient-to-r from-sky-200 to-green-200 rounded-3xl h-[62px] max-sm:text-2xl max-sm:h-[50px] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "Adding..." : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
}

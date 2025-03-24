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
    imageUrl: "",
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
        Cookies.remove("token");
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
      !formData.year_of_experience ||
      !formData.imageUrl
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
        imageUrl: formData.imageUrl,
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
    <div className="flex justify-center items-start pt-24 min-h-screen bg-gradient-to-b from-green-100 to-white p-4">
      <div className="flex relative flex-col items-center bg-white rounded-3xl w-[655px] max-md:w-[90%] max-sm:pb-6 max-sm:h-auto max-sm:w-[95%] shadow-xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="mt-14 text-3xl text-center text-black max-sm:mt-8 max-sm:text-3xl">
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
            className="px-4 w-full rounded-3xl bg-zinc-100 h-[62px] max-sm:h-[50px]"
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
            className="px-4 w-full rounded-3xl bg-zinc-100 h-[62px] max-sm:h-[50px]"
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
              className="px-4 rounded-3xl bg-zinc-100 h-[62px] w-[177px] max-sm:h-[50px] max-sm:w-[120px]"
            />
          </div>
        </div>

        <div className="flex flex-col mt-8 w-[491px] max-md:w-4/5 max-sm:w-[90%]">
          <div className="px-4 py-1 w-full rounded border bg-zinc-100 border-zinc-500">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="mb-1 text-xs text-zinc-700">Picture</div>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="URL"
                  className="bg-transparent text-base text-zinc-700 focus:outline-none"
                />
              </div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[24px] h-[24px]"
                >
                  <path
                    d="M8.4 17L12 13.4L15.6 17L17 15.6L13.4 12L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4L10.6 12L7 15.6L8.4 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                    fill="#49454F"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-11 w-[491px] max-md:w-4/5 max-sm:w-[90%]">
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

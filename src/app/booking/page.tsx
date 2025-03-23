"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";
import getDentists from "@/libs/(dentist)/getDentists";
import addBooking from "@/libs/(booking)/addBooking";

export default function Booking() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<string>("");
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await getMe(token);
        const dentistsData = await getDentists();
        setDentists(dentistsData.data);
      } catch (err) {
        Cookies.remove("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async () => {
    try {
      if (!selectedDate || !selectedDentist) {
        setError("Please select both date and dentist");
        return;
      }

      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const bookingData = {
        bookingDate: selectedDate.format("YYYY-MM-DD"),
        dentist: selectedDentist,
      };

      await addBooking(token, bookingData as any);
      router.push("/");
    } catch (err) {
      setError("Failed to create booking. Please try again.");
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
      <div className="flex flex-col items-center px-10 py-16 bg-white rounded-3xl w-[655px] max-md:w-[90%] max-sm:px-5 max-sm:py-10 max-sm:w-[95%] shadow-xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="mb-8 text-3xl text-center text-black">Booking</div>
        <div className="mb-10 w-full h-2 bg-sky-200 rounded-3xl">
          {error && (
            <div className="mt-4 text-red-500 text-center text-lg">{error}</div>
          )}
          <div className="mt-10 text-3xl text-black">The Date</div>
          <div className="mt-5 w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disablePast
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    borderRadius: "1.5rem",
                    height: "62px",
                    backgroundColor: "rgb(243 244 246)",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="mt-10 text-3xl text-black">The Preferred Dentist</div>
          <div className="mt-5 w-full">
            <select
              value={selectedDentist}
              onChange={(e) => setSelectedDentist(e.target.value)}
              className="w-full rounded-3xl bg-zinc-100 h-[62px] px-4 text-xl"
            >
              <option value="">Select a dentist</option>
              {dentists.map((dentist) => (
                <option key={dentist._id} value={dentist._id}>
                  {dentist.name} - {dentist.area_of_expertise}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-14 text-3xl text-black bg-gradient-to-r from-sky-200 to-green-200 rounded-3xl cursor-pointer h-[62px] w-[341px] max-sm:w-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center mx-auto shadow-md hover:shadow-lg"
          >
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}

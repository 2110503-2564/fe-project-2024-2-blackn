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
import getBooking from "@/libs/(booking)/getBooking";
import updateBooking from "@/libs/(booking)/updateBooking";

interface Booking {
  _id: string;
  bookingDate: string;
  dentist: {
    _id: string;
    name: string;
    area_of_expertise: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  __v: number;
}

interface BookingUpdateData {
  bookingDate: string;
  dentist: string;
}

export default function EditBooking({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<string>("");
  const [dentists, setDentists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

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

        const [dentistsData, bookingData] = await Promise.all([
          getDentists(),
          getBooking(params.id),
        ]);

        setDentists(dentistsData.data);
        setBooking(bookingData.data);
        setSelectedDentist(bookingData.data.dentist._id);
        setSelectedDate(dayjs(bookingData.data.bookingDate));
      } catch (err) {
        setError("Failed to load booking details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [params.id, router]);

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

      const bookingUpdateData: BookingUpdateData = {
        bookingDate: selectedDate.format("YYYY-MM-DD"),
        dentist: selectedDentist,
      };

      await updateBooking(token, params.id, bookingUpdateData as any);
      router.push("/admin/bookings");
    } catch (err) {
      setError("Failed to update booking. Please try again.");
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
        <div className="mb-8 text-3xl text-center text-black">Edit Booking</div>
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
          <div className="mt-10 text-3xl text-black">The Dentist</div>
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
          <div className="flex gap-4 justify-end mt-14">
            <button
              onClick={() => router.push("/admin/bookings")}
              className="px-8 py-4 text-2xl text-black bg-gray-200 rounded-3xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-4 text-2xl text-black bg-gradient-to-r from-sky-200 to-green-200 rounded-3xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Update Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

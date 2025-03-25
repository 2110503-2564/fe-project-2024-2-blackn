"use client";
import { useState, useEffect, useLayoutEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";
import getDentists from "@/libs/(dentist)/getDentists";
import addBooking from "@/libs/(booking)/addBooking";

function BookingContent({ token }: { token: string | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<Dentist>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    const getDentist = async () => {
      try {
        await getMe(token || "");
        const dentistParams = searchParams.get("dentist");
        if (!dentistParams) {
          router.push("/");
          return;
        }
        const dentist = await getDentists([`name=${dentistParams}`]);
        setSelectedDentist(dentist.data[0]);
        if (dentist.data.length === 0) {
          throw new Error("Dentist not found");
        }
      } catch (err) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    getDentist();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        router.push("/login");
        return;
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

      const bookingData = {
        bookingDate: selectedDate.format("YYYY-MM-DD"),
        dentist: selectedDentist._id,
      };

      await addBooking(token || "", bookingData as any);
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-100 to-white">
      <div
        className={`flex flex-col items-center px-10 py-20 bg-white rounded-3xl h-[80vh] w-[40vw] max-md:w-[90%] max-sm:px-5 max-[md]:py-14 max-sm:py-10 max-sm:w-[95%] shadow-xl transform transition-all duration-300`}
      >
        <div className="mb-8 text-3xl text-center text-black">Booking</div>
        <div className="mb-10 w-full h-2 bg-sky-200 rounded-3xl">
          {error && (
            <div className="mt-4 text-red-500 text-center text-lg">{error}</div>
          )}
          <div className="mt-[8%] text-3xl text-black">The Date</div>
          <div className="mt-[5%] w-full">
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
                    fontSize: "1.25rem",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="mt-[8%] text-3xl text-black">
            The Preferred Dentist
          </div>
          <div className="mt-[5%] w-full">
            <input
              className="w-full text-xl rounded-3xl bg-zinc-100 h-[62px] px-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="dentist"
              type="text"
              value={selectedDentist?.name}
              readOnly
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-[8%] text-3xl text-black bg-gradient-to-r from-sky-200 to-green-200 rounded-3xl cursor-pointer h-[62px] w-[341px] max-sm:w-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center mx-auto shadow-md hover:shadow-lg"
          >
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Booking() {
  const token = Cookies.get("token");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent token={token} />
    </Suspense>
  );
}

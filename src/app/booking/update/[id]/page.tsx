"use client";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import getBooking from "@/libs/(booking)/getBooking";
import getDentists from "@/libs/(dentist)/getDentists";
import { Button, Divider } from "@mui/material";
import updateBooking from "@/libs/(booking)/updateBooking";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import deleteBooking from "@/libs/(booking)/deleteBooking";

interface BookingUpdateData {
  bookingDate: string;
  dentist: string;
};

export default function UpdateBooking({ params }: { params: { id: string } }) {
   const router = useRouter();
   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
   const [selectedDentist, setSelectedDentist] = useState<string>("");
   const [dentists, setDentists] = useState<Dentist[]>([]);
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
            const [dentistsData, bookingData] = await Promise.all([
               getDentists(["limit=1000"]),
               getBooking(token, params.id),
            ]);
            
            console.log("id", bookingData.data.dentist._id);
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
         router.push(`/bookings/update/${params.id}`);
      } catch (err) {
         setError("Failed to update booking. Please try again.");
      }
   };

   const handleDelete = async () => {
      let input = confirm("Are you sure you want to delete this booking?");
      if (!input) return;
      
       try {
         const token = Cookies.get("token");
         if (!token) {
            router.push("/login");
            return;
         }

         await deleteBooking(token, params.id);
         router.push("/profile");
      }
      catch (err) {
         setError("Failed to delete booking. Please try again.");
      }
      
   };

   return (
      <main className="flex justify-center items-center w-full bg-gradient-to-b from-green-100 to-white min-h-screen p-4">
         <div className="flex flex-col items-center p-16 bg-white rounded-3xl w-[655px] max-md:p-10 max-md:w-[90%] max-sm:p-6 max-sm:w-[95%] shadow-xl transform hover:scale-[1.01] transition-all duration-300">
         <h1 className="mb-6 text-3xl text-center">Edit Booking</h1>
         <Divider />
         <form onSubmit={handleSubmit} className="w-full">
            {error && (
               <div className="text-red-500 text-base mb-4 text-center">
               {error}
               </div>
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
            <div className="flex justify-center w-full transform hover:scale-105 active:scale-95 transition-all duration-300">
               <Button
                  type="submit"
                  onClick={handleSubmit}
               >
                  Change
               </Button>
            </div>
            <div className="flex justify-center w-full transform hover:scale-105 active:scale-95 transition-all duration-300">
               <Button
                  type="button"
                  onClick={handleDelete}
               >
                  Delete
               </Button>
            </div>
         </form>
         </div>
      </main>
   );
}
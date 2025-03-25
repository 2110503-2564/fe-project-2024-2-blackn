"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";
import getBookings from "@/libs/(booking)/getBookings";
import deleteBooking from "@/libs/(booking)/deleteBooking";

export default function BookingsAdmin() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
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
        const userData = await getMe(token);
        if (!(userData.data.role === "admin")) {
          router.push("/");
          return;
        }
        const bookingsData = await getBookings(token);
        setBookings(bookingsData.data);
      } catch (err) {
        Cookies.remove("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleDelete = async (bookingId: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }
      await deleteBooking(token, bookingId);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      setError("Failed to delete booking");
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
    <div className="overflow-hidden py-12 bg-white">
      <div className="flex flex-col ml-8 max-w-full text-3xl text-black w-[700px]">
        <div className="flex gap-7 self-start px-2.5 py-2 bg-sky-200 rounded-[38px]">
          <img
            src="/dentist-logo.png"
            alt="Dentist Logo"
            className="object-contain shrink-0 aspect-square w-[60px]"
          />
          <div className="flex-auto my-auto">BlackN Dentist</div>
        </div>
        <div className="self-end mt-11 text-center max-md:mt-10">
          Booking List
        </div>
      </div>
      <div className="flex flex-col px-20 mt-8 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex shrink-0 max-w-full h-2 bg-sky-200 rounded-3xl w-[1109px]" />
        <div className="flex flex-wrap gap-10 self-center mt-14 w-full max-w-[1081px] max-md:mt-10 max-md:max-w-full">
          <div className="grow shrink-0 basis-0 w-fit max-md:max-w-full">
            <div className="flex gap-10 text-3xl text-black max-md:max-w-full">
              <div>Date</div>
              <div className="grow shrink w-[89px]">Dentist</div>
              <div className="grow shrink w-[177px]">Booking Date</div>
              <div>User</div>
              <div className="grow shrink w-[92px]">Update</div>
            </div>
            <div className="flex flex-wrap gap-10 mt-16 w-full max-w-[891px] max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                <div className="w-full max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <div className="w-[82%] max-md:ml-0 max-md:w-full">
                      <div className="grow max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col">
                          {bookings.map((booking) => (
                            <div
                              key={booking._id}
                              className="flex gap-10 w-full text-3xl"
                            >
                              <div className="w-[33%]">
                                {new Date(
                                  booking.createdAt
                                ).toLocaleDateString()}
                              </div>
                              <div className="w-[33%]">
                                {booking.dentist.name}
                              </div>
                              <div className="w-[33%]">
                                {new Date(
                                  booking.bookingDate
                                ).toLocaleDateString()}
                              </div>
                              <div className="w-[18%]">{booking.user.name}</div>
                              <button
                                onClick={() =>
                                  router.push(`/admin/bookings/${booking._id}`)
                                }
                                className="cursor-pointer"
                              >
                                <img
                                  src="/edit-icon.png"
                                  alt="Edit"
                                  className="object-contain aspect-[1.11] w-[31px]"
                                />
                              </button>
                              <button
                                onClick={() => handleDelete(booking._id)}
                                className="cursor-pointer"
                              >
                                <img
                                  src="/delete-icon.png"
                                  alt="Delete"
                                  className="object-contain aspect-square w-[33px]"
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/booking")}
                  className="self-end px-14 py-6 mt-24 mr-28 text-3xl text-center text-white rounded-3xl bg-slate-500 max-md:px-5 max-md:mt-10 max-md:mr-2.5 hover:bg-slate-600 transition-colors"
                >
                  Add Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";
import getBookings from "@/libs/(booking)/getBookings";
import { Button } from "@/components/Button";
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
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
        const bookingsData = await getBookings(token);
        setBookings(bookingsData.data);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
      try {
        const userData = await getMe(token);
        setUser(userData.data);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-green-100">
        <div className="text-3xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleChangePassword = () => {
    // Implement password change functionality
    console.log("Change password clicked");
  };

  const handleUpdateBooking = (bookingId: string) => {
    router.push(`/booking/${bookingId}`);
  }

  return (
    <div className="flex overflow-hidden flex-col justify-center px-12 py-7 bg-gradient-to-b from-green-100 to-white min-h-screen max-md:px-5">
      <div className="px-12 py-7 bg-white rounded-3xl max-md:px-5 max-md:max-w-full shadow-xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[39%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start mt-10 w-full text-3xl text-black max-md:mt-10">
              <div className="ml-8 text-3xl text-center max-md:ml-2.5">
                {user.name}'s Profile
              </div>
              <div className="flex shrink-0 self-stretch mt-3.5 h-2 bg-sky-200 rounded-3xl" />
              <div className="mt-24 max-md:mt-10">Name</div>
              <div className="flex gap-9 items-start mt-6 ml-11 whitespace-nowrap max-md:ml-2.5">
                <div>{user.name}</div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/d880f56b9566450481aec8b7732b7738/58deba2f9928c5564ba610e74f8508d332395dd1?placeholderIfAbsent=true"
                  alt="edit"
                  className="object-contain shrink-0 mt-1 aspect-[1.11] w-[31px]"
                />
              </div>
              <div className="mt-20 max-md:mt-10">Email</div>
              <div className="flex gap-10 mt-11 ml-11 whitespace-nowrap max-md:mt-10 max-md:ml-2.5">
                <div className="basis-auto">{user.email}</div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/d880f56b9566450481aec8b7732b7738/58deba2f9928c5564ba610e74f8508d332395dd1?placeholderIfAbsent=true"
                  alt="edit"
                  className="object-contain shrink-0 aspect-[1.11] w-[31px]"
                />
              </div>
              <div className="mt-24 max-md:mt-10">Phone Number</div>
              <div className="flex gap-10 self-center mt-14 max-w-full whitespace-nowrap w-[241px] max-md:mt-10">
                <div className="grow shrink my-auto w-[159px]">
                  {user.tel_number}
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/d880f56b9566450481aec8b7732b7738/58deba2f9928c5564ba610e74f8508d332395dd1?placeholderIfAbsent=true"
                  alt="edit"
                  className="object-contain shrink-0 aspect-[1.11] w-[31px]"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="mt-14 text-center text-indigo-700 underline max-md:mt-10 hover:text-indigo-800 transition-colors mb-5"
              >
                Change Password
              </button>
              <Button onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                router.push("/logout");
              }}>Logout</Button>
            </div>
          </div>
          {error === "Failed to load bookings" ? (
            ""
          ) : (
            <div className="ml-5 w-[61%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col px-12 pt-10 mx-auto w-full bg-gradient-to-r from-green-100 to-sky-100 rounded-3xl pb-[464px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full shadow-lg transform hover:scale-[1.01] transition-all duration-300">
                <div className="self-center text-3xl font-extrabold text-black">
                  {user.role === "admin" ? "All Bookings" : `${user.name}'s Bookings`}
                </div>
                <div className="mt-7 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <div className="w-[30%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-xl text-black whitespace-nowrap max-md:mt-10">
                        <div className="self-center font-semibold">Date</div>
                        {bookings.map((booking) => (
                          <div
                            key={booking._id}
                            className="mt-12 max-md:mt-10 max-md:mr-2"
                          >
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-5 w-[31%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-xl text-black max-md:mt-10">
                        <div className="self-center font-semibold">Dentist</div>
                        {bookings.map((booking) => (
                          <div key={booking._id} className="mt-12 max-md:mt-10">
                            {booking.dentist.name || "N/A"}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-5 w-[39%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-xl text-black max-md:mt-10">
                        <div className="font-semibold">Booking Date</div>
                        {bookings.map((booking) => (
                          <div
                            key={booking._id}
                            className="self-center mt-11 max-md:mt-10"
                          >
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

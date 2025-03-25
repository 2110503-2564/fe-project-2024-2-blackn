"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";
import getBookings from "@/libs/(booking)/getBookings";
import { Button } from "@/components/Button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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

  // const handleChangePassword = () => {
  //   // Implement password change functionality
  //   console.log("Change password clicked");
  // };

  const handleUpdateBooking = (bookingId: string) => {
    router.push(`/booking/update/${bookingId}`);
  }

  return (
    <div className={`flex flex-col justify-center px-[1.5%] py-[1%] bg-gradient-to-b from-green-100 to-white min-h-screen max-md:px-5`}>
      <div className={`px-28  bg-white rounded-3xl h-[calc(100vh-2%)] max-md:px-5 max-md:max-w-full shadow-xl transform /*hover:scale-[1.01]*/ transition-all duration-300`}>
        <div className="flex gap-5 max-md:flex-col h-lvh">
          <div className="w-[39%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col gap-[1%] overflow-auto h-full justify-between mt-[3%] w-full text-3xl text-black max-md:mt-10">
              <div className="ml-8 text-3xl text-center max-md:ml-2.5">
                {user.name}'s Profile
              </div>
              <div className={`flex shrink-0 self-stretch /*mt-3.5*/ h-2 bg-sky-200 rounded-3xl`} />
              <div className={`/*mt-[10%]*/ max-md:mt-10`}>Name</div>
              <div className={`flex gap-9 items-start /*mt-6*/ w-auto /*ml-11*/ whitespace-nowrap max-md:ml-2.5`}>
              <input
              className="w-full text-xl rounded-3xl bg-zinc-100 h-[62px] px-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              type="text"
              value={user.name}
              readOnly
              required
            />
                {/* <img
                  src="https://cdn.builder.io/api/v1/image/assets/d880f56b9566450481aec8b7732b7738/58deba2f9928c5564ba610e74f8508d332395dd1?placeholderIfAbsent=true"
                  alt="edit"
                  className="object-contain shrink-0 mt-1 aspect-[1.11] w-[31px]"
                /> */}
              </div>
              <div className={`/*mt-[16%]*/ max-md:mt-10`}>Email</div>
              <div className={`flex gap-10 /*mt-6*/ /*ml-11*/ w-auto whitespace-nowrap max-md:mt-10 max-md:ml-2.5`}>
                  <input
                  className="w-full text-xl rounded-3xl bg-zinc-100 h-[62px] px-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="email"
                  type="text"
                  value={user.email}
                  readOnly
                  required
                />
                {/* <img
                  src="https://cdn.builder.io/api/v1/image/assets/d880f56b9566450481aec8b7732b7738/58deba2f9928c5564ba610e74f8508d332395dd1?placeholderIfAbsent=true"
                  alt="edit"
                  className="object-contain shrink-0 aspect-[1.11] w-[31px]"
                /> */}
              </div>
              <div className={`/*mt-[16%]*/ max-md:mt-10`}>Phone Number</div>
              <div className={`flex gap-10 /*ml-10*/ /*mt-6*/ w-auto whitespace-nowrap /*mb-[16%]*/ max-md:mt-10`}>                
                <div className="grow shrink my-auto w-auto">
                  <input
                    className="w-full text-xl rounded-3xl bg-zinc-100 h-[62px] px-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="tel_number"
                    type="text"
                    value={user.tel_number}
                    readOnly
                    required
                  />
                </div>
                {/* <img
                  src="https://cdn.builder.io/api/v1/image/assets/d880f56b9566450481aec8b7732b7738/58deba2f9928c5564ba610e74f8508d332395dd1?placeholderIfAbsent=true"
                  alt="edit"
                  className="object-contain shrink-0 aspect-[1.11] w-[31px]"
                /> */}
              </div>
              {/* <button
                onClick={handleChangePassword}
                className="mt-14 text-center text-indigo-700 underline max-md:mt-10 hover:text-indigo-800 transition-colors mb-5"
              >
                Change Password
              </button> */}
              <Button onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                router.push("/logout");
              }}>Logout</Button>
            </div>
          </div>
          {error === "Failed to load bookings" ? (
            ""
          ) : (
            <div className="flex justify-end w-full max-md:ml-0 max-md:w-full">
              <div className={`flex flex-col mt-2 px-12 pt-10 w-[90%] h-[98%] overflow-auto bg-gradient-to-r from-green-100 to-sky-100 rounded-3xl /*pb-[464px]*/ max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full shadow-lg transform /*hover:scale-[1.01]*/ transition-all duration-300`}>
                <div className="self-center text-3xl font-extrabold text-black">
                  {user.role === "admin" ? "All Bookings" : `${user.name}'s Bookings`}
                </div>
                <Table
                  className="mt-10 w-full text-3xl max-md:mt-10"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className="self-center text-3xl font-semibold"
                        style={{fontSize: "1.5rem", fontWeight: 500}}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        className="self-center font-semibold"
                        style={{fontSize: "1.5rem", fontWeight: 500}}
                      >
                        Dentist
                      </TableCell>
                      <TableCell
                        className="self-center font-semibold"
                        style={{fontSize: "1.5rem", fontWeight: 500}}
                      >
                        Booking Date
                      </TableCell>
                      <TableCell
                        style={{fontSize: "1.5rem", fontWeight: 500}}
                      >
                        Update or Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell
                          style={{fontSize: "1.1rem"}}
                        >
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          style={{fontSize: "1.1rem"}}
                        >
                          {booking.dentist.name || "N/A"}
                        </TableCell>
                        <TableCell
                          style={{fontSize: "1.1rem"}}
                        >
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          style={{alignItems: "center"}}
                        >
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/d880f56b9566450481aec8b7732b7738/58deba2f9928c5564ba610e74f8508d332395dd1?placeholderIfAbsent=true"
                            alt="edit"
                            className="object-contain shrink-0 aspect-[1.11] w-[31px] cursor-pointer "
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              handleUpdateBooking(booking._id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

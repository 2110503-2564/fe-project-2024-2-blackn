export default async function updateBooking(token: string, bookingId: string, booking: Booking) {
   const res = await fetch(`${process.env.BACKEND_URL}/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
         authorization: `Bearer ${token}`,
         "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
   });

   if(!res.ok) {
      throw new Error("Failed to update a booking");
   }

   return await res.json();
}
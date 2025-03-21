export default async function deleteBooking(token: string, bookingId: string) {
   const res = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
         authorization: `Bearer ${token}`
      }
   });

   if(!res.ok) {
      throw new Error("Failed to delete a booking");
   }

   return await res.json();
}
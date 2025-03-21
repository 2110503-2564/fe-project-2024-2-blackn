export default async function addBooking(token: string, booking: Booking) {
   const res = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`, {
      method: "POST",
      headers: {
         authorization: `Bearer ${token}`,
         "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
   });

   if(!res.ok) {
      throw new Error("Failed to add a booking");
   }

   return await res.json();
}
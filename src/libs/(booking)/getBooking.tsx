export default async function getBooking(id: string) {
   const res = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`);

   if(!res.ok) {
      throw new Error("Failed to fetch a booking");
   }

   return await res.json();
}
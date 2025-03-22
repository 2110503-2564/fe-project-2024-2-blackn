export default async function getBooking(id: string) {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/${id}`);

   if(!res.ok) {
      throw new Error("Failed to fetch a booking");
   }

   return await res.json();
}
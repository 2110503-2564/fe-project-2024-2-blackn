export default async function getBookings() {
   const res = await fetch(`${process.env.BACKEND_URL}/bookings`, {next: {tags:['bookings']}});

   if(!res.ok) {
      throw new Error("Failed to fetch bookings");
   }

   return await res.json();
}
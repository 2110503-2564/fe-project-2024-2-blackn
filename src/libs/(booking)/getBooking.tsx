export default async function getBooking(token: string, id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch a booking");
  }

  return await res.json();
}

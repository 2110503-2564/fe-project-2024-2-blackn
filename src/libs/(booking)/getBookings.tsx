export default async function getBookings(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`, {
    next: { tags: ["bookings"] },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return await res.json();
}

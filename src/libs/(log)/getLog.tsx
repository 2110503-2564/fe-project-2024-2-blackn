export default async function getLog(token: string, id: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/logs/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch log");
  }

  return await response.json();
}

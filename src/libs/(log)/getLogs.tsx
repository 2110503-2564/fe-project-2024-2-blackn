export default async function getLogs(token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/logs`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }

  return await response.json();
}

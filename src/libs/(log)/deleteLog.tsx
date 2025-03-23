export default async function deleteLog(token: string, id: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/logs/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete log");
  }

  return await response.json();
}

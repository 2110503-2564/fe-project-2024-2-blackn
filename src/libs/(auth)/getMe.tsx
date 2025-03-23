export default async function getMe(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log("response", response.json());
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}

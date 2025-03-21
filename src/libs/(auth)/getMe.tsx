export default async function getMe(token: string) {
   const response = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
      method: "GET",
      headers: {
         authorization: `Bearer ${token}`
      }
   });

   if(!response.ok) {
      throw new Error("Failed to fetch user profile");
   }

   return await response.json();
}
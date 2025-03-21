export default async function userRegister(
   name: string, email: string, password: string, tel: string
) {
   const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         name,
         email,
         password,
         tel_number: tel,
         role: "user"
      })
   });

   if(!res.ok) {
      throw new Error("Failed to register user");
   }

   return await res.json();
}
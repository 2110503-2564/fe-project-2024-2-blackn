export default async function updateDentist(token: string, DentistId: string, dentist: Dentist) {
   const res = await fetch(`${process.env.BACKEND_URL}/dentists/${DentistId}`, {
      method: "PUT",
      headers: {
         authorization: `Bearer ${token}`,
         "Content-Type": "application/json"
      },
      body: JSON.stringify(dentist)
   });

   if(!res.ok) {
      throw new Error("Failed to update dentist");
   }

   return await res.json();
}
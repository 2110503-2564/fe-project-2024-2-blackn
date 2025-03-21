export default async function deleteDentist(token: string, DentistId: string) {
   const res = await fetch(`${process.env.BACKEND_URL}/dentists/${DentistId}`, {
      method: "DELETE",
      headers: {
         authorization: `Bearer ${token}`
      }
   });

   if(!res.ok) {
      throw new Error("Failed to delete dentist");
   }

   return await res.json();
}
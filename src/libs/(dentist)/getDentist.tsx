export default async function getDentist(DentistId: string) {
   const res = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${DentistId}`);

   if(!res.ok) {
      throw new Error("Failed to fetch dentist");
   }

   return await res.json();
}
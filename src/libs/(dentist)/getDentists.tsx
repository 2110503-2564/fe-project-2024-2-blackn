export default async function getDentists() {
   const res = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists`, {next: {tags:['dentists']}});

   if(!res.ok) {
      throw new Error("Failed to fetch dentists");
   }

   return await res.json();
}
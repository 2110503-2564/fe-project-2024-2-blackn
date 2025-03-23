export default async function getDentists() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists`, {next: {tags:['dentists']}});

   if(!res.ok) {
      throw new Error("Failed to fetch dentists");
   }

   return await res.json();
}
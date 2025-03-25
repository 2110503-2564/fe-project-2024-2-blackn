export default async function getArea() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists/area_of_expertise`,
    { next: { tags: ["area"] } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch area");
  }

  return await res.json();
}

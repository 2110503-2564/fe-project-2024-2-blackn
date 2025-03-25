interface AddDentistData {
  name: string;
  area_of_expertise: string;
  year_of_experience: number;
}

export default async function addDentist(
  token: string,
  dentistData: AddDentistData
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dentistData),
  });

  if (!res.ok) {
    throw new Error("Failed to add dentist");
  }

  return res.json();
}

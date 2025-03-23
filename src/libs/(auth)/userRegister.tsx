export default async function userRegister(
  name: string,
  email: string,
  password: string,
  tel: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        tel_number: tel,
        role: "user",
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.msg);
  }

  return await res.json();
}

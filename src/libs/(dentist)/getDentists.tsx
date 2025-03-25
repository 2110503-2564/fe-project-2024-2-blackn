export default async function getDentists(value?: string[], page?: number) {
  var content: string = "";
  if (value) {
    for (const val of value) {
      content += val + "&";
    }
  }
  if (page) {
    content += "page=" + page;
  } else if (content != "") {
    content = content.substring(0, content.length - 1);
  }
  // console.log("content", content);
  // console.log(
  //   "URL",
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists` +
  //     (content == "" ? "" : `?${content}`)
  // );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists` +
      (content == "" ? "" : `?${content}`),
    { next: { tags: ["dentists"] } }
  );
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists`, {next: {tags:['dentists']}});

  if (!res.ok) {
    throw new Error("Failed to fetch dentists");
  }

  return await res.json();
}

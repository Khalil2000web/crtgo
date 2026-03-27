import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // use private env
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2023-03-13",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return new Response("No file", { status: 400 });

    // Convert file to blob buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Sanity
    const data = await client.assets.upload("image", buffer, { filename: file.name });

    return new Response(JSON.stringify({ url: data.url }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Upload failed", { status: 500 });
  }
};
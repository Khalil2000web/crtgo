import { createClient } from "next-sanity";
import jwt from "jsonwebtoken"

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // use private env
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2023-03-13",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});


export const POST = async (req) => {
const token = req.headers.get("authorization")

if (!token) return new Response("Unauthorized", { status: 401 })

try {
  jwt.verify(token, process.env.JWT_SECRET)
} catch {
  return new Response("Invalid token", { status: 401 })
}

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
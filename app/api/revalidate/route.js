// app/api/revalidate/route.js

import { revalidatePath } from "next/cache"

export async function POST(req) {
  const { slug, secret } = await req.json()

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 })
  }

  revalidatePath(`/r/${slug}`)

  return Response.json({ revalidated: true })
}
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import jwt from "jsonwebtoken"

export async function POST(req) {
  const token = req.headers.get("authorization");
  const { site_data } = await req.json();

  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const restaurantId = decoded.restaurantId

  // Update restaurant
  const { error } = await supabase
    .from("restaurants")
    .update({ site_data })
    .eq("id", restaurantId)

  if (error) return new Response(JSON.stringify({ error }), { status: 500 })

  // Revalidate public page
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("slug")
    .eq("id", restaurantId)
    .single()

  revalidatePath(`/r/${restaurant.slug}`)

  console.log("UPDATED:", site_data)

  return new Response(JSON.stringify({ success: true }))
}
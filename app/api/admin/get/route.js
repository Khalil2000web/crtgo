import { supabase } from "@/lib/supabase"
import jwt from "jsonwebtoken"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const token = req.headers.get("authorization")
  const restaurant = searchParams.get("restaurant")

  if (!token || !restaurant) return new Response("Missing token or restaurant", { status: 400 })

  let decoded
try {
  decoded = jwt.verify(token, process.env.JWT_SECRET)
} catch {
  return new Response("Invalid token", { status: 401 })
}

  // Get restaurant by slug
const { data: restaurantData, error: restError } = await supabase
  .from("restaurants")
  .select("id")
  .eq("slug", restaurant)
  .single()

if (!restaurantData || restError) {
  return new Response("Restaurant not found", { status: 404 })
}

// Compare IDs correctly
if (decoded.restaurantId !== restaurantData.id) {
  return new Response("Unauthorized", { status: 401 })
}

  const { data, error } = await supabase
    .from("restaurants")
    .select("site_data")
    .eq("id", decoded.restaurantId)
    .single()

  if (error || !data) return new Response("Not found", { status: 404 })

  return new Response(JSON.stringify({ site_data: data.site_data }), { status: 200 })
}
import { supabase } from "@/lib/supabase"
import bcrypt from "bcrypt"

export async function POST(req) {

  const { username, password, restaurant } = await req.json()

  // 🔹 Step 1: get restaurant by slug
  const { data: restaurantData, error: restError } = await supabase
    .from("restaurants")
    .select("id")
    .eq("slug", restaurant)
    .single()

  if (!restaurantData || restError) {
    return new Response(JSON.stringify({ error: "Restaurant not found" }), { status: 404 })
  }

  // 🔹 Step 2: find admin using restaurant ID
  const { data: admin, error } = await supabase
    .from("admins")
    .select("*")
    .eq("username", username)
    .eq("restaurant_id", restaurantData.id)
    .single()

  if (!admin || error) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 401 })
  }

  console.log("ADMIN:", admin)

  const match = await bcrypt.compare(password, admin.password_hash)
  if (!match) {
    return new Response(JSON.stringify({ error: "Wrong password" }), { status: 401 })
  }

  // 🔹 Step 3: create token with REAL ID
  const token = Buffer.from(
    JSON.stringify({
      adminId: admin.id,
      restaurantId: restaurantData.id
    })
  ).toString("base64")

  return new Response(JSON.stringify({ token }), { status: 200 })
}
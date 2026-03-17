// app/u/[username]/page.js
import { supabase } from "@/lib/supabase"
import TemplateOne from "@/components/templates/TemplateOne"

export default async function UserPage({ params }) {

  const { data:user } = await supabase
    .from("users")
    .select("*")
    .eq("username",params.username)
    .single()

  if(!user){
    return <p>User not found</p>
  }

  return (
    <TemplateOne data={user.data}/>
  )
}

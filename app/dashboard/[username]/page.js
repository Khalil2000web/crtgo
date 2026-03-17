import { supabase } from "@/lib/supabase"

export default async function Dashboard({ params }) {

  const { data:user } = await supabase
    .from("users")
    .select("*")
    .eq("username",params.username)
    .single()

  if(!user){
    return <p>User not found</p>
  }

  return (

    <div className="max-w-xl mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard: {user.username}
      </h1>

      <p>Template: {user.template}</p>

      <pre className="bg-white text-black p-4 rounded mt-6">
        {JSON.stringify(user.data,null,2)}
      </pre>

    </div>

  )
}

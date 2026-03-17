// app/login/page.js
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function Login() {

  const router = useRouter()

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    const { data:user } = await supabase
      .from("users")
      .select("*")
      .eq("username",username)
      .eq("password",password)
      .single()

    if(!user){
      setError("Invalid username or password")
      return
    }

    router.push("/dashboard/"+user.username)
  }

  return (
    <div className="max-w-md mx-auto mt-32 bg-white text-black p-6 rounded-lg">

      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">

        <input
          className="w-full border p-2"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-black text-white w-full p-2">
          Login
        </button>

      </form>

    </div>
  )
}

"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const params = useParams()
  const restaurant = params.restaurant

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, restaurant })
    })

    const data = await res.json()
    if (!res.ok) return setError(data.error || "Login failed")

    localStorage.setItem("admin_token", data.token)
    router.push(`/r/${restaurant}/edit`)
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black text-white p-10 mx-auto">
    <div className="flex flex-col items-center justify-center w-[90vw] h-full md:max-w-md mx-auto">  
      <h1 className="text-xl mb-4 w-full">Login for {restaurant}</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 items-center justify-center mx-auto">
        <input
          value={username}
          onChange={e => setUsername(e.target.value.toLowerCase())}
          placeholder="Username"
          className="border rounded p-2 w-full"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="w-full rounded cursor-pointer bg-white text-black p-2 hover:bg-black hover:text-white transition border border-transparent hover:border-white font-bold">Login</button>
        {error && <p className="text-red-500 bold uppercase pt-3 text-left">{error}</p>}
      </form>
    </div>
    </div>
  )
}
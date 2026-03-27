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
    <div className="bg-black text-white p-10 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login for {restaurant}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border p-2"
        />
        <button type="submit" className="bg-white text-black p-2">Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}
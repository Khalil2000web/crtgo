// app/page.js
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-4xl font-bold mb-6">
        My Website Builder
      </h1>

      <Link
        href="/login"
        className="bg-white text-black px-6 py-3 rounded-lg"
      >
        Login
      </Link>

    </div>
  )
}

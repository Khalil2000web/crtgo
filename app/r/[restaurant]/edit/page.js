"use client"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"

import Template1Edit from "@/components/templates/template1Edit"
import Template2Edit from "@/components/templates/template2Edit"
import Template3Edit from "@/components/templates/template3Edit"
import Template4Edit from "@/components/templates/template4Edit"

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const restaurant = params.restaurant

  const [siteData, setSiteData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token")

    // 🔒 No token → redirect
    if (!storedToken) {
      router.push(`/r/${restaurant}/login`)
      return
    }

    // Save token in state (for passing to template)
    setToken(storedToken)

    // Fetch site data
    fetch(`/api/admin/get?restaurant=${restaurant}`, {
      headers: {
        Authorization: storedToken
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then(data => {
        setSiteData(data.site_data)
        setLoading(false)
      })
      .catch(() => {
        router.push(`/r/${restaurant}/login`)
      })

  }, [restaurant, router])

  // ⏳ Loading screen
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    )
  }

  // ❌ Error state
  if (!siteData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading data</p>
      </div>
    )
  }

  // 🎨 Render correct template editor
  switch (siteData.template) {
    case "template1":
      return <Template1Edit data={siteData} token={token} />

    case "template2":
      return <Template2Edit data={siteData} token={token} />

    case "template3":
      return <Template3Edit data={siteData} token={token} />

    case "template4":
      return <Template4Edit data={siteData} token={token} />

    default:
      return <p>Unknown template</p>
  }
}
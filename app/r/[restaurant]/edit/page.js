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
    const token = localStorage.getItem("admin_token")
    setToken(token)
    if (!token) return router.push(`/r/${restaurant}/login`)

    fetch(`/api/admin/get?restaurant=${restaurant}&token=${encodeURIComponent(token)}`)
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then(data => {
        setSiteData(data.site_data)
        setLoading(false)
      })
      .catch(() => router.push(`/r/${restaurant}/login`))
  }, [restaurant, router])

if (loading)
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );

if (!siteData)
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-xl font-semibold">Error loading data</p>
    </div>
  );

  // Dynamically render based on template type
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
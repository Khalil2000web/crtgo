"use client"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Template1Edit from "@/components/templates/template1Edit"

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const restaurant = params.restaurant

  const [siteData, setSiteData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
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

  if (loading) return <p>Loading...</p>
  if (!siteData) return <p>Error loading data</p>

  return <Template1Edit data={siteData} token={localStorage.getItem("admin_token")} />
}
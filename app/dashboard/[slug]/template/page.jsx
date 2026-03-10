"use client"

import { sites } from "@/lib/sites"
import { useParams, useRouter } from "next/navigation"

export default function TemplateSelection() {
  const params = useParams()
  const slug = params.slug
  const router = useRouter()

  const siteIndex = sites.findIndex(s => s.slug === slug)
  if (siteIndex === -1) return <div>Site not found</div>

  const templates = [
    { id: "cafe-modern", name: "Modern Cafe" },
    { id: "cafe-minimal", name: "Minimal Cafe" },
    { id: "restaurant-classic", name: "Classic Restaurant" }
  ]

  const selectTemplate = (id) => {
    sites[siteIndex].template = id
    alert(`Template ${id} selected!`)
    router.push(`/dashboard/${slug}`)
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Choose a Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map(t => (
          <div
            key={t.id}
            onClick={() => selectTemplate(t.id)}
            className="border p-4 rounded cursor-pointer hover:shadow-lg"
          >
            <h2 className="font-semibold mb-2">{t.name}</h2>
            <div className="h-32 bg-gray-200 flex items-center justify-center rounded">
              Preview
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
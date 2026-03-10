"use client"

import { useState } from "react"
import { sites } from "@/lib/sites"
import { useParams, useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug

  // Find the site in your "database"
  const siteData = sites.find(s => s.slug === slug)

  // State for general info
  const [name, setName] = useState(siteData?.name || "")
  const [description, setDescription] = useState(siteData?.description || "")
  const [heroImage, setHeroImage] = useState(siteData?.heroImage || "")
  const [location, setLocation] = useState(siteData?.location || "")

  // Hours object
  const [hours, setHours] = useState(siteData?.hours || {
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  })

  // Products array
  const [products, setProducts] = useState(siteData?.products || [])

  // Update hours
  const handleHourChange = (day, value) => {
    setHours(prev => ({ ...prev, [day]: value }))
  }

  // Update product fields
  const handleProductChange = (i, key, value) => {
    const newProducts = [...products]
    newProducts[i][key] = value
    setProducts(newProducts)
  }

  // Add new product
  const addProduct = () => {
    setProducts([...products, { name: "", price: "", description: "", image: "" }])
  }

  // Save function
  const handleSave = () => {
    const index = sites.findIndex(s => s.slug === slug)
    if (index !== -1) {
      sites[index] = {
        ...sites[index],
        name,
        description,
        heroImage,
        location,
        hours,
        products
      }
      alert("Saved! Refresh /cl/[slug] to see changes")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit your restaurant</h1>

      {/* General info */}
      <div className="mb-4">
        <label className="block font-semibold">Name</label>
        <input className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Description</label>
        <textarea className="w-full border p-2 rounded" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Hero Image URL</label>
        <input className="w-full border p-2 rounded" value={heroImage} onChange={e => setHeroImage(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Location</label>
        <input className="w-full border p-2 rounded" value={location} onChange={e => setLocation(e.target.value)} />
      </div>

      {/* Hours */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Hours</label>
        {["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].map(day => (
          <input
            key={day}
            className="w-full border p-2 rounded mb-1"
            placeholder={`${day.charAt(0).toUpperCase() + day.slice(1)} hours`}
            value={hours[day] || ""}
            onChange={e => handleHourChange(day, e.target.value)}
          />
        ))}
      </div>

      {/* Products */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Menu Items</h2>
        {products.map((p, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-2 mb-2">
            <input
              className="flex-1 border p-1 rounded"
              placeholder="Name"
              value={p.name}
              onChange={e => handleProductChange(i, "name", e.target.value)}
            />
            <input
              className="w-24 border p-1 rounded"
              placeholder="Price"
              value={p.price}
              onChange={e => handleProductChange(i, "price", e.target.value)}
            />
            <input
              className="flex-1 border p-1 rounded"
              placeholder="Description"
              value={p.description}
              onChange={e => handleProductChange(i, "description", e.target.value)}
            />
            <input
              className="flex-1 border p-1 rounded"
              placeholder="Image URL"
              value={p.image}
              onChange={e => handleProductChange(i, "image", e.target.value)}
            />
          </div>
        ))}
        <button className="mt-2 px-3 py-1 bg-black text-white rounded" onClick={addProduct}>Add Product</button>
      </div>

      {/* Save */}
      <button className="px-6 py-2 bg-green-600 text-white rounded mt-4" onClick={handleSave}>Save</button>
    </div>
  )
}
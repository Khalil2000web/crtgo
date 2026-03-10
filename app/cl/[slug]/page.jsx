import { getSite } from "@/lib/getSite"
import CafeModern from "@/components/templates/CafeModern"
// import CafeMinimal from "@/components/templates/CafeMinimal"
//import RestaurantClassic from "@/components/templates/RestaurantClassic"
import { notFound } from "next/navigation"

export default async function Page({ params }) {

  // Unwrap params (Next.js 16)
  const { slug } = await params
  const site = await getSite(slug)

  if (!site) {
    notFound()
  }

if (site.template === "cafe-modern") return <CafeModern data={site} />
//if (site.template === "cafe-minimal") return <CafeMinimal data={site} />
//if (site.template === "restaurant-classic") return <RestaurantClassic data={site} />

  return <div>Template not found</div>
}
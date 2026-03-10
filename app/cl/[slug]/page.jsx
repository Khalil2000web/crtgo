import { getSite } from "@/lib/getSite"
import CafeModern from "@/components/templates/CafeModern"
import { notFound } from "next/navigation"

export default async function Page({ params }) {

  const site = await getSite(params.slug)

  if (!site) {
    notFound()
  }

  if (site.template === "cafe-modern") {
    return <CafeModern data={site} />
  }

}
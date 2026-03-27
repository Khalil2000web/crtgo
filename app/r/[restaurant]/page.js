import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"

import Template1 from "@/components/templates/template1"
import Template2 from "@/components/templates/template2"
import Template3 from "@/components/templates/template3"
import Template4 from "@/components/templates/template4"
import Template5 from "@/components/templates/template5"
import Template6 from "@/components/templates/template6"

export const revalidate = 0;

export default async function Page({ params }) {
  const { restaurant } = await params

  const { data, error } = await supabase
    .from("restaurants")
    .select("site_data")
    .eq("slug", restaurant)
    .single()

  if (error || !data) {
    notFound()
  }

  const site = data.site_data

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
    template5: Template5,
    template6: Template6,
  }

  const Template = templates[site.template] || Template1

  return <Template data={site} />
}
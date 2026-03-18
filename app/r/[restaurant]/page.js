import { supabase } from "@/lib/supabase"

import Template1 from "@/components/templates/template1"
import Template2 from "@/components/templates/template2"

export default async function Page({ params }) {

  const { data, error } = await supabase
    .from("restaurants")
    .select("site_data")
    .eq("slug", params.restaurant)
    .single()

  if (error || !data) {
    return <div className="p-10 text-2xl">Restaurant not found</div>
  }

  const site = data.site_data

  const templates = {
    template1: Template1,
    template2: Template2
  }

  const Template = templates[site.template] || Template1

  return <Template data={site} />
}

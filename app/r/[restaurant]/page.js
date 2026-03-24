import { supabase } from "@/lib/supabase"

import Template1 from "@/components/templates/template1"
import Template2 from "@/components/templates/template2"
import Template3 from "@/components/templates/template3"
import Template4 from "@/components/templates/template4"

export default async function Page({ params }) {

  const { restaurant } = await params

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", restaurant)
    .single()

  console.log(data, error)

  if (error || !data) {
    return <div className="p-10 text-2xl">Restaurant not found</div>
  }

  const site = data.site_data

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
  }

  const Template = templates[site.template] || Template1

  return <Template data={site} />
}
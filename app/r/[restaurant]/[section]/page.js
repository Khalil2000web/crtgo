import { supabase } from "@/lib/supabase";
import Template5 from "@/components/templates/template5";

export async function generateStaticParams() {
  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("*");

  const paths = [];

  restaurants.forEach((restaurant) => {
    restaurant.site_data.sections.forEach((section) => {
      paths.push({ restaurant: restaurant.slug, section: section.id });
    });
  });

  return paths;
}

export default async function SectionPage({ params }) {
  const { restaurant, section } = params;

  const { data: restaurantData, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", restaurant)
    .single();

  if (error || !restaurantData) {
    return <div className="p-10 text-2xl">Restaurant not found</div>;
  }

  const site = restaurantData.site_data;

  // Make sure `section.id` matches the param
  const currentSection = site.sections.find((s) => s.id === section);

  if (!currentSection) {
    return <div className="p-10 text-2xl">Section not found</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">{currentSection.title.en || currentSection.title[site.lang]}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {currentSection.items.map((item, i) => (
          <div key={i} className="border p-3 rounded shadow flex flex-col gap-2">
            <img src={item.img} alt={item.name[site.lang]} className="w-full h-40 object-cover rounded" />
            <h2 className="font-bold">{item.name[site.lang]}</h2>
            <p>{item.desc[site.lang]}</p>
            <p className="font-semibold">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
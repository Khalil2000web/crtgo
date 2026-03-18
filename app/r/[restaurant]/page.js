import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

import Template1 from "@/components/templates/template1";
import Template2 from "@/components/templates/template2";

export default async function Page({ params }) {
  // Make sure JSON is in /public/restaurants
  const filePath = path.join(process.cwd(), "public/restaurants", `${params.restaurant}.json`);

  let data;
  try {
    const file = await fs.readFile(filePath, "utf-8");
    data = JSON.parse(file);
  } catch (e) {
    return notFound();
  }

  const templates = { template1: Template1, template2: Template2 };
  const Template = templates[data.template] || Template1;

  return <Template data={data} />;
}
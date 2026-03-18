import fs from "fs/promises";
import path from "path";

import Template1 from "@/components/templates/template1";
import Template2 from "@/components/templates/template2";

export default async function Page({ params }) {
  // JSON path
  const filePath = path.join(
    process.cwd(),
    "public/restaurants",
    `${params.restaurant}.json`
  );

  let data;
  try {
    const file = await fs.readFile(filePath, "utf-8");
    data = JSON.parse(file);
  } catch (e) {
    // JSON missing or invalid → show fallback message instead of 404
    return (
      <div className="p-10 text-red-500 text-2xl">
        Restaurant not found
      </div>
    );
  }

  const templates = { template1: Template1, template2: Template2 };
  const Template = templates[data.template] || Template1;

  return <Template data={data} />;
}
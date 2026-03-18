import fs from "fs";
import path from "path";
import { notFound } from "next/navigation"; // App Router 404

import Template1 from "@/components/templates/template1";
import Template2 from "@/components/templates/template2";

export default function Page({ params }) {
  const filePath = path.join(
    process.cwd(),
    "data/restaurants",
    `${params.restaurant}.json`
  );

  // If the JSON file doesn’t exist, show Next.js 404
  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const templates = {
    template1: Template1,
    template2: Template2,
  };

  const Template = templates[data.template] || Template1;

  return <Template data={data} />;
}

import Template1 from "@/components/templates/template1";
import Template2 from "@/components/templates/template2";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${params.restaurant}.json`);
  if (!res.ok) return notFound(); // triggers Next.js 404 if JSON missing

  const data = await res.json();

  const templates = { template1: Template1, template2: Template2 };
  const Template = templates[data.template] || Template1;

  return <Template data={data} />;
}

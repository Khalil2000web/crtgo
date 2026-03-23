"use client";

import Link from "next/link";
import Image from "next/image";

export function TemplatesPreview({ lang, t }) {
  const isRTL = lang === "ar" || lang === "he";

  const projects = [
    {
      title: t.template1,
      category: t.project1Cat,
      link: "/template1",
      image:
        "https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: t.template2,
      category: t.project2Cat,
      link: "/template2",
      image:
        "https://images.unsplash.com/photo-1573840357491-06851c72e0d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: t.template3,
      category: t.project3Cat,
      link: "/template3",
      image:
        "https://images.unsplash.com/photo-1765213310059-d7b273a09b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ];

  return (
    <section
      id="portfolio"
      className={`py-16 px-4 sm:px-6 lg:px-8 bg-white ${
        isRTL ? "rtl" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div
          className={`text-center mb-12 ${
            isRTL ? "text-right md:text-center" : ""
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.templateTitle}
          </h2>

          <p className="text-lg text-gray-600">{t.templateSubtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
<Link key={index} href={project.link}>
  <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer">

    {/* Image */}
    <div className="relative h-72 w-full overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">

      <h3 className={`text-white text-lg font-bold ${isRTL ? "text-right" : ""}`}>
        {project.title}
      </h3>

      {project.category && (
        <p className="text-white/80 text-sm mb-3">
          {project.category}
        </p>
      )}

      {/* See Template Button */}
      <div className="mt-2">
        <span className="inline-block px-4 py-2 text-sm font-medium text-black bg-white rounded-md group-hover:bg-gray-200 transition">
          See Template
        </span>
      </div>

    </div>

  </div>
</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
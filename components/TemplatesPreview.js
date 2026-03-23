"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

export default function TemplatesPreview({ templates }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl cursor-pointer transition"
          >

            {/* Image */}
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition">
              <span className="opacity-0 group-hover:opacity-100 text-white font-semibold text-lg">
                Preview
              </span>
            </div>

            {/* Bottom Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {template.name}
              </h3>

              {template.description && (
                <p className="text-sm text-neutral-500">
                  {template.description}
                </p>
              )}
            </div>

          </div>
        ))}

      </div>


      {/* Preview Modal */}
      <Dialog
        open={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        className="relative z-50"
      >

        {/* Background */}
        <div className="fixed inset-0 bg-black/70" />

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">

          <DialogPanel className="bg-white rounded-xl overflow-hidden max-w-5xl w-full shadow-xl">

            {selectedTemplate && (
              <>
                {/* Large Preview */}
                <div className="w-full h-[420px] overflow-hidden">
                  <img
                    src={selectedTemplate.image}
                    alt={selectedTemplate.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info + Button */}
                <div className="p-6 flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {selectedTemplate.name}
                    </h2>

                    {selectedTemplate.description && (
                      <p className="text-neutral-500">
                        {selectedTemplate.description}
                      </p>
                    )}
                  </div>

                  <button
                    className="px-6 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
                  >
                    Use Template
                  </button>

                </div>
              </>
            )}

          </DialogPanel>

        </div>

      </Dialog>
    </>
  );
}
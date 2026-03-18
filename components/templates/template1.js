"use client";

import { useState, useRef, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Template1({ data }) {

  // Scroll function
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const sections = data.sections || []

  return (
    <div className="font-sans bg-[#fefefe] text-[#877259] scroll-smooth" dir="rtl">

      {/* Header */}
      <header className="relative w-full h-[350px] flex items-end justify-center text-center overflow-hidden">
        <Image src={data.biglogo} alt="header image" fill className="object-cover z-1" />
        <h2 className="relative z-10 text-white uppercase text-[clamp(2rem,5vw,4rem)] pb-5">{data.name}</h2>
      </header>

  {/* Working Hours Dropdown */}

<Disclosure>
  {({ open }) => (
    <>
      <Disclosure.Button className="flex justify-between w-full bg-white px-4 py-2 text-left text-gray-900 font-medium md:shadow md:rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
        <span>ساعات العمل</span>
        {open ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </Disclosure.Button>
<Disclosure.Panel className="bg-white md:shadow md:rounded-lg p-4 mt-2">
  <ul className="space-y-1 text-gray-700">
    {Object.entries(data.hours).map(([day, time]) => (
      <li key={day} className="flex justify-between">
        <span>{day}</span>
        <span>{time}</span>
      </li>
    ))}
  </ul>
</Disclosure.Panel>
    </>
  )}
</Disclosure>

      {/* Section Buttons */}
      <div className="sticky top-0 z-[100000] flex flex-wrap justify-center gap-4 bg-[rgba(254,254,254,0.9)] border-b border-[#1111111c] py-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="border border-black rounded font-bold px-4 py-2 transition-transform hover:scale-105 text-[#6c5e4f]"
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section, i) => {
        if (section.type === "menu") {
          return (
            <div key={i} id={section.id} className="scroll-mt-32 w-full py-8">
              <h2 className="text-center text-[#1e394b] text-xl mb-5">{section.title}</h2>
              <div className="flex overflow-x-auto px-5 scrollbar-none">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[260px] border-l border-[#1111111c] last:border-l-0 text-center"
                  >
                    <div className="relative w-[200px] h-[200px] mx-auto mb-2">
                      <Image src={item.img} alt={item.name} fill className="object-cover rounded-full" />
                    </div>
                    <div className="p-4 flex flex-col">
                      <div className="font-semibold text-base mb-1">{item.name}</div>
                      <div className="text-[#1e394b] mb-2">₪{item.price}</div>
                      <div className="text-[#6c5e4f] text-sm overflow-auto">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return null
      })}

      {/* Footer */}
      <footer className="mt-12 border-t border-[#1111111c] text-center flex flex-col gap-4 items-center justify-center py-8">
        <div className="flex flex-wrap justify-center gap-8 w-[90%] pb-8">
          {data.instagram && (
            <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="text-black p-1 rounded hover:bg-black/10 transition">
              Instagram
            </a>
          )}
        </div>

        <p>
          <a href="/terms">شروط الاستخدام</a>
        </p>
        
        <p dir="ltr">&copy; {new Date().getFullYear()} CRTGO & {data.name} — جميع الحقوق محفوظة</p>
        <p>CREATED BY <a href="/">CRTGO, WEB SERVICES ❤️</a></p>
      </footer>

    </div>
  )
}

"use client";

import { useState, useRef, Fragment, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Disclosure, Menu } from "@headlessui/react";
import Script from "next/script";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";

import { IoSearch } from "react-icons/io5";

import { Noto_Sans_Arabic } from "next/font/google";

const notoArabic = Noto_Sans_Arabic({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["arabic"],
  display: "swap",
});

const translations = {
  ar: {
    workingHours: "ساعات العمل",
    days: {
      sunday: "الأحد",
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
      saturday: "السبت",
    },
    terms: "شروط الاستخدام",
    createdBy: "CREATED BY CRTGO, WEB SERVICES ❤️",
    allrights: "جميع الحقوق محفوظة",
  },
  he: {
    workingHours: "שעות פתיחה",
    days: {
      sunday: "יום ראשון",
      monday: "יום שני",
      tuesday: "יום שלישי",
      wednesday: "יום רביעי",
      thursday: "יום חמישי",
      friday: "יום שישי",
      saturday: "שבת",
    },
    terms: "תנאי שימוש",
    createdBy: "CREATED BY CRTGO, WEB SERVICES ❤️",
    allrights: "כל הזכויות שמורות",
  },
};


export default function Template1({ data }) {
const [mounted, setMounted] = useState(false);
const [lang, setLang] = useState("ar"); // default Arabic

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;

  // Scroll function
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const sections = data.sections || []

return (
<>
<div className=" font-sans bg-[#090909] text-[#fdb600] scroll-smooth"
  dir={lang === "ar" ? "rtl" : "rtl"} >

{/* Header */}
<header dir="ltr" className="fixed top-[20px] left-0 w-full flex items-center justify-between px-2 text-center overflow-hidden">
  <h2 className="text-[#ffb34b] uppercase font-[arial] font-bold">{data.name[lang]}</h2>


<div className="flex justify-center items-center">
  <Menu as="div" className="relative">
    <Menu.Button className="py-2 px-3 rounded-lg border bg-white">
      {lang === "ar" ? "عربي" : "עברית"}
    </Menu.Button>

    <Menu.Items className="absolute mt-2 w-32 border rounded bg-white shadow focus:outline-none">
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() => setLang("ar")}
            className={`w-full text-center px-3 py-2 ${
              lang === "ar" ? "bg-black text-white" : active ? "bg-gray-100" : ""
            }`}
          >
            عربي
          </button>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() => setLang("he")}
            className={`w-full text-center px-3 py-2 ${
              lang === "he" ? "bg-black text-white" : active ? "bg-gray-100" : ""
            }`}
          >
            עברית
          </button>
        )}
      </Menu.Item>
    </Menu.Items>
  </Menu>
</div>
</header>




<div className="flex flex-wrap items-center justify-center gap-3 mt-5">

  {data.instagram && (
    <Link
      href={data.instagram}
      target="_blank"
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 transition"
    >
      <FaInstagram className="text-lg" />
    </Link>
  )}

  {data.facebook && (
    <Link
      href={data.facebook}
      target="_blank"
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 transition"
    >
      <FaFacebook className="text-lg" />
    </Link>
  )}

  {data.tiktok && (
    <Link
      href={data.tiktok}
      target="_blank"
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 transition"
    >
      <FaTiktok className="text-lg" />
    </Link>
  )}

  {data.phone && (
    <Link
      href={`tel:${data.phone}`}
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 transition"
    >
      <FaPhoneAlt className="text-lg" />
    </Link>
  )}

</div>

{/* <div className="flex flex-row justify-center pt-[20px]">
<div className="flex flex-wrap justify-center gap-8 w-[90%] mt-8 h-[90px] min-h-[90px]">

{data.instagram && (
<a
  href={data.instagram}
  target="_blank"
  rel="noopener noreferrer"
  className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded hover:bg-black/10 transition"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="50" viewBox="0 0 24 24"><path fill="#000000" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/></svg>
</a>
)}

{data.tiktok && (
  <a 
    href={data.tiktok} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label="TikTok"
    className="max-w-5 h-5 flex items-center justify-center cursor-pointer rounded hover:bg-black/10 transition"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="50" viewBox="0 0 24 24"><path fill="#000000" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/></svg>
  </a>
)}

{data.facebook && (
  <a 
    href={data.facebook} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label="Facebook"
    className="max-w-5 h-5 flex items-center justify-center cursor-pointer rounded hover:bg-black/10 transition"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="50" viewBox="0 0 224 432"><path fill="#000000" d="M145 429H66V235H0v-76h66v-56q0-48 27-74t72-26q36 0 59 3v67l-41 1q-22 0-30 9t-8 27v49h76l-10 76h-66v194z"/></svg>
  </a>
)}

{data.phone && (
  <a 
    href={data.phone} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label="Phone"
    className="max-w-5 h-5 flex items-center justify-center cursor-pointer rounded hover:bg-black/10 transition"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="50" viewBox="0 0 16 16"><path fill="#000000" fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42a18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>
  </a>
)}
</div>
</div>
/*}


  {/* Working Hours Dropdown */}
<div className="w-full max-w-md mx-auto p-2">
<Disclosure>
  {({ open }) => (
    <>
      <Disclosure.Button className="flex w-full justify-between bg-white px-4 py-2 text-left text-gray-900 font-medium md:shadow md:rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
        <span>{translations[lang].workingHours}</span>
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
    <span>{translations[lang].days[day]}</span>
    <span>{time}</span>
  </li>
))}
  </ul>
</Disclosure.Panel>
    </>
  )}
</Disclosure>
</div>

      {/* Section Buttons */}
      <div className="sticky top-0 z-[100000] flex flex-wrap justify-center gap-4 bg-[rgba(254,254,254,0.9)] border-b border-[#1111111c] py-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="border border-black rounded font-bold px-4 py-2 transition-transform hover:scale-105 text-[#6c5e4f]"
          >
            {section.title[lang]}
          </button>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section, i) => {
        if (section.type === "menu") {
          return (
            <div key={i} id={section.id} className="scroll-mt-32 w-full py-8">
              <h2 className="text-center text-[#1e394b] text-xl mb-5">{section.title[lang]}</h2>
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
<div className="w-full text-center font-semibold text-base mb-1 flex items-start justify-center">
  {/* Wrap the name in a span */}
  <p className="ml-1 text-black text-center">{item.name[lang]}</p>

  {item.spicy && (
    <span className="w-5 h-5 flex-shrink-0 ">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512" 
        fill="#e22400" 
        className="w-full h-full"
      >
        <path d="M207.375 13.78v.064c83.385 68.488-50.732 105.97-37.22 175.22c-20.55-13.762-28.066-46.66-8.78-74.97c-51.085 21.935-73.42 51.99-72.156 97.562c.945 34.13 14.638 61.58 35.843 82.188c-9.787-27.448-12.016-55.74-5.188-79.813c35.742 49.332 137.785-19.994 147.094-79.28c-.044 63.674 63.996 118.35 112.717 52.375c8.932 36.97 6.638 75.307-3.218 105.688c19.407-20.337 31.706-47.33 32.374-81.157c.93-47.127-21.048-90.8-62.72-112.75c18.15 38.878-.498 65.598-43.655 83.75c40.28-67.494 16.386-154.454-95.095-168.875zm42.938 226.314c-5.97-.086-12.564 2.295-20.657 8.375c-38.238 28.725-88.54 77.01-99.156 108.718c-18.667-4.37-43.156 2.323-43.156 20.53c0 2.01.32 3.89.875 5.626c-9.91-.4-20.22 3.9-20.22 13.03c0 16.998 35.74 17.686 38.063 1.657c10.356 2.978 22.947 2.34 32.218-2.03c-.75 1.842-1.155 3.867-1.155 6.094c0 22.752 42.915 25.947 54.25 9.094c9.533 6.947 29.795 4.92 32.844-6.25c15.97 1.403 32.385 1.755 48.436.968c8.543 5.77 24.793 4.8 30.625-3c12.788-1.938 25.004-4.72 36.158-8.406c1.9 16.216 38.093 15.92 38.093-1.344c0-.75-.047-1.47-.186-2.156c11.238 3.032 26.594-1 26.594-12.25c0-11.025-15.614-15.103-26.875-12.03c.36-28.628-58.605-80.767-105.063-116.595c-7.39-5.698-14.014-9.92-21.688-10.03zM440 352.5c-9.547-.042-19.094 4.28-19.094 13.063c0 17.567 38.188 17.727 38.188 0c0-8.617-9.547-13.02-19.094-13.063zm-403.344 10c-9.547-.042-19.093 4.28-19.093 13.063c0 17.567 38.187 17.727 38.187 0c0-8.616-9.547-13.02-19.094-13.063zm430.563 20.406c-9.548-.042-19.095 4.28-19.095 13.063c0 17.566 38.188 17.725 38.188 0c0-8.618-9.547-13.022-19.094-13.064zm-49.69 25.438c-10.747-.047-21.5 4.8-21.5 14.687c0 19.776 43 19.955 43 0c0-9.7-10.75-14.64-21.5-14.686zm-79.967 2.97c-9.548-.02-19.094 4.385-19.094 13.248c0 12.037 18.638 15.825 29.874 11.032c9.403 8.896 34.72 6.462 34.72-7.844c-.002-12.274-18.61-16.01-29.845-11.125c-3.628-3.506-9.637-5.3-15.658-5.313zm-87.22 1.623c-9.546-.04-19.093 4.248-19.093 13.032c0 17.566 38.188 17.725 38.188 0c0-8.618-9.547-12.99-19.094-13.033zm-129.124 14.72c-11.25-.024-22.5 5.12-22.5 15.562c0 12.422 16.83 17.38 29.905 14.624c8.686 9.834 35.5 7.69 35.5-7.03c0-9.57-11.34-13.963-21.656-13.127c-3.226-6.658-12.237-10.012-21.25-10.03zM294.75 439c-8.405-.037-16.8 2.873-20.25 8.78c-14.795-4.1-35.25 1.04-35.25 15.783c0 21.294 42.68 23.124 49.313 5c12.56 2.32 28.093-2.493 28.093-14.594c0-9.88-10.958-14.922-21.906-14.97zm-97 22.656c-10.748-.047-21.47 4.8-21.47 14.688c0 19.776 42.97 19.955 42.97 0c0-9.7-10.752-14.64-21.5-14.688zm228.125 1.406c-9.547-.04-19.094 4.28-19.094 13.063c0 17.567 38.19 17.726 38.19 0c0-8.616-9.548-13.02-19.095-13.063z"/>
      </svg>
    </span>
  )}
</div>
                      <div className="text-[#1e394b] mb-2">₪{item.price}</div>
                      <div className="text-[#6c5e4f] text-sm overflow-auto">{item.desc[lang]}</div>
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
<footer className="mt-12 border-t border-[#1111111c] text-center flex flex-col gap-4 items-center justify-center py-8 mb-3">
<div className="w-[70%] md:w-[45%] lg:w-[40%] mx-auto flex flex-wrap justify-between mt-2 text-black">
  {data.instagram && (
    <Link
      href={data.instagram}
      target="_blank"
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-50 transition"
    >
      <FaInstagram className="text-lg" />
    </Link>
  )}

  {data.facebook && (
    <Link
      href={data.facebook}
      target="_blank"
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-50 transition"
    >
      <FaFacebook className="text-lg" />
    </Link>
  )}

  {data.tiktok && (
    <Link
      href={data.tiktok}
      target="_blank"
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-50 transition"
    >
      <FaTiktok className="text-lg" />
    </Link>
  )}

  {data.phone && (
    <Link
      href={`tel:${data.phone}`}
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-50 transition"
    >
      <FaPhoneAlt className="text-lg" />
    </Link>
  )}

</div>

  <Link className="p-3 underline text-black underline-offset-2 hover:text-gray-700" href="/terms">{translations[lang].terms}</Link>
        
        <p dir="ltr">&copy; {new Date().getFullYear()} CRTGO & {data.name[lang]}</p>
        <p> {translations[lang].allrights}</p>
        <p dir="ltr">CREATED BY <a href="/">CRTGO, WEB SERVICES ❤️</a></p>
      </footer>

    </div>
    <Script
        src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
        strategy="afterInteractive" />
        </>
  )
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import Script from "next/script";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";

import { Menu } from "@headlessui/react";
import { Globe } from 'lucide-react';

import { Noto_Sans_Arabic } from "next/font/google";

const notoArabic = Noto_Sans_Arabic({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["arabic"],
  display: "swap",
});

const translations = {
  ar: {
    workingHours: "ساعات العمل",
    workingHoursModalClose: "إغلاق",
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
    workingHoursModalClose: "סגור",
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


export default function Template3({ data }) {
useEffect(() => {
    document.body.style.backgroundColor = "#101820";
  }, []);

const [mounted, setMounted] = useState(false);
const [lang, setLang] = useState("ar"); // default Arabic
const [isOpen, setIsOpen] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)
const [openIndex, setOpenIndex] = useState(null);
const [langMenuOpen, setLangMenuOpen] = useState(false);

 const isRTL = lang === 'ar' || lang === 'he';


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
<div
  className={`${notoArabic.className} text-[#f2aa4c] scroll-smooth`}
  dir="rtl"
>

  
<div className="fixed top-0 right-0 w-full flex z-1000 items-center justify-start  gap-3 p-5">
<button
  onClick={() => setIsOpen(true)}
  className="flex items-center justify-center rounded-full text-sm cursor-pointer bg-[#f2aa4c] text-black hover:bg-white p-2 hover:border-[#f2aa4c] transition border-2 font-bold border-white gap-2"
>
<RiTimeLine className="text-lg" /> 
</button>


<div className="relative inline-block">
  <button
    onClick={() => setLangMenuOpen(!langMenuOpen)}
    className="cursor-pointer flex items-center gap-2 text-gray-400 hover:text-[#f2aa4c] transition-colors"
  >
    <Globe size={20} />
    <span className="text-sm text-white">{lang === 'ar' ? 'ع' : 'עב'}</span>
  </button>

  {langMenuOpen && (
    <div className="absolute top-full mt-2 bg-white border border-gray-200  p-2 min-w-[120px] flex flex-col gap-2">
      <button
        onClick={() => {
          setLang('ar');
          setLangMenuOpen(false);
        }}
        className={`px-3 py-1 font-bold border-2 rounded w-full ${
          lang === 'ar'
            ? 'text-black cursor-pointer'
            : 'bg-[#f2aa4c] border-white text-black hover:bg-white hover:border-[#f2aa4c]'
        }`}
      >
        عربي
      </button>

      <button
        onClick={() => {
          setLang('he');
          setLangMenuOpen(false);
        }}
        className={`px-3 py-1 font-bold border-2 rounded w-full ${
          lang === 'he'
           ? 'text-black cursor-pointer'
            : 'bg-[#f2aa4c] border-white text-black hover:bg-white hover:border-[#f2aa4c]'
        }`}
      >
        עברית
      </button>
    </div>
  )}
</div>


</div>


<div className="overflow-hidden w-full h-[320px] relative mb-6">
  <div className="flex w-max animate-header-scroll absolute">
    {[...data.headerImages].map((src, i) => (
      <div key={i} className="flex-none w-[350px] h-[320px] relative">
        <Image src={src} alt="" fill className="pointer-events-none block object-cover" />
      </div>
    ))}
  </div>

  {/* Optional center logo */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
  {/* Circular Logo */}
  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white relative">
    <Image src={data.logo} alt="Logo" fill className="object-cover" />
  </div>

  {/* Name below the logo */}
  <h1 className="text-xl text-[#f2aa4c] font-bold mt-4">{data.name[lang]}</h1>
</div>
</div>



<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50000">
  <div className="fixed inset-0 bg-black/40" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="bg-[#101820] text-white border border-[#f2aa4c] p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col ">
      <DialogTitle className="text-[1.25rem] pb-3 text-right font-bold">{translations[lang].workingHours}</DialogTitle>

        <ul className="space-y-1 text-gray-700">
{Object.entries(data.hours).map(([day, time]) => (
  <li key={day} className="flex justify-between text-gray-300">
    <span className="font-bold">{time}</span>
    <span className="font-bold">{translations[lang].days[day]}</span>
  </li> 
))}
  </ul>

<div className="mt-auto flex justify-center">
  <button
    onClick={() => setIsOpen(false)}
    className="bg-[#f2aa4c] hover:bg-[#fff] hover:text-black border-2 text-black hover:border-[#f2aa4c] px-3 py-1 rounded cursor-pointer transition font-bold"
  >
    {translations[lang].workingHoursModalClose}
  </button>
</div>
    </DialogPanel>
  </div>
</Dialog>


<Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)} className="relative z-50000">
  <div className="fixed inset-0 bg-black/70" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="bg-white rounded-lg w-[90vw] max-w-md overflow-hidden shadow-xl">

      {selectedItem && (
        <>
          <div className="relative w-full h-[250px]">
            <Image
              src={selectedItem.img}
              alt={selectedItem.name[lang]}
              fill
              className="object-cover block pointer-events-none"
            />
          </div>

          <div className="p-4 text-black">
            <DialogTitle className="text-lg text-right font-bold">
              {selectedItem.name[lang]}
            </DialogTitle>

            {selectedItem.desc && (
              <p className="text-sm text-right text-gray-600 mt-2">
                {selectedItem.desc[lang]}
              </p>
            )}

            <div className="flex justify-between items-center mt-4 font-bold">
              <button
                onClick={() => setSelectedItem(null)}
                className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                {translations[lang].workingHoursModalClose}
              </button>
              <span>₪{selectedItem.price}</span>
            </div>
          </div>
        </>
      )}

    </DialogPanel>
  </div>
</Dialog>



<div className="flex flex-col fixed right-[20px] bottom-[20px] z-100 flex-wrap items-center justify-center gap-1">

  {data.instagram && (
    <Link
      href={data.instagram}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"
    >
      <FaInstagram className="text-lg" />
    </Link>
  )}

  {data.facebook && (
    <Link
      href={data.facebook}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"
    >
      <FaFacebook className="text-lg" />
    </Link>
  )}

  {data.tiktok && (
    <Link
      href={data.tiktok}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"
    >
      <FaTiktok className="text-lg" />
    </Link>
  )}

  {data.phone && (
    <Link
      href={`tel:${data.phone}`}
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"
    >
      <FaPhoneAlt className="text-md" />
    </Link>
  )}

</div>


{sections.map((section, i) => {
  const isOpen = openIndex === i;

  return (
    <div key={i} className="flex flex-col gap-2 p-3 md:w-[65%] mx-auto overflow-hidden">

      {/* Block */}
      <button
        onClick={() => setOpenIndex(isOpen ? null : i)}
        className="relative flex items-center w-full h-[190px] px-4 overflow-hidden cursor-pointer transition"
      >

        <div className="absolute left-0 top-0 h-full w-[45%]">
          <Image
            src={section.image}
            alt="Section Image"
            fill
            className="object-cover pointer-events-none"
            style={{
              maskImage: "linear-gradient(to right, black 60%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, black 10%, transparent)",
            }}
          />
        </div>

        <span className="relative z-10 text-right font-semibold">
          {section.title[lang]}
        </span>

      </button>

      {/* Items row */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-4 last:mb-15 last:pb-15  last:border-b-2 last:border-gray-700">

          {section.items.map((item, idx) => (
            <div key={idx} className="flex items-start justify-between">

              {/* Text */}
              <div className="flex flex-col gap-1">
  <p className="text-right text-md flex flex-row items-center justify center gap-2">
    {item.name[lang]}
                    
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
  </p>
                <p className="text-md font-bold">₪{item.price}</p>
                <p className="text-sm text-gray-400">{item.desc[lang]}</p>
              </div>

              {/* Square image */}
              <div className="relative w-[120px] h-[120px] flex-shrink-0">
                <Image
                  src={item.img}
                  alt={item.name[lang]}
                  fill
                  className="object-cover rounded-md pointer-events-none"
                />
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
})}







{/* Footer */}
<footer className="mt-12 mb-20 border border-gray-600/40 rounded w-[95%] md:w-[70%] lg:w-[60%] mx-auto border-t border-[#1111111c] text-center flex flex-col gap-4 items-center justify-center py-8 mb-3">


  <Link className="underline underline-offset-4 hover:bg-white hover:border-[#f2aa4c] border-2 border-transparent hover:text-black p-3 rounded font-bold transition" href="/terms">{translations[lang].terms}</Link>
        
        <p className="text-white" dir="ltr">&copy; {new Date().getFullYear()} CRTGO & {data.name[lang]}</p>
        <p className="text-white">{translations[lang].allrights}</p>
        <p className="text-white" dir="ltr">CREATED BY <a className="text-[#f2aa4c] hover:underline underline-offset-4" href="/">CRTGO, WEB SERVICES ❤️</a></p>
      </footer>

    </div>
    <Script
        src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
        strategy="afterInteractive" />
        </>
  )
}

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
const [openIndex, setOpenIndex] = useState([]);
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
        className={`px-3 py-1 border-gray-400 font-bold text-black border-2 cursor-pointer rounded w-full ${
          lang === 'ar'
            ? 'bg-[#f2aa4c]'
            : 'border-black'
        }`}
      >
        عربي
      </button>

      <button
        onClick={() => {
          setLang('he');
          setLangMenuOpen(false);
        }}
        className={`px-3 py-1 border-gray-400 font-bold text-black border-2 cursor-pointer rounded w-full ${
          lang === 'he'
           ? 'bg-[#f2aa4c]'
            : 'border-black'
        }`}
      >
        עברית
      </button>
    </div>
  )}
</div>

</div>


<div dir="ltr" className="overflow-hidden w-full h-[320px] relative mb-6">
  <div className="flex w-max animate-header-scroll absolute">
    {[...data.headerImages, ...data.headerImages].map((src, i) => (
      <div key={i} className="flex-none w-[350px] h-[320px] relative">
        <Image src={src} alt="" fill className="pointer-events-none block object-cover" />
      </div>
    ))}
  </div>

  {/* Optional center logo */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white relative">
      <Image src={data.logo} alt="Logo" fill className="pointer-events-none object-cover" />
    </div>

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
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md text-white hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"
    >
      <FaInstagram className="text-lg" />
    </Link>
  )}

  {data.facebook && (
    <Link
      href={data.facebook}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md text-white hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"

    >
      <FaFacebook className="text-lg" />
    </Link>
  )}

  {data.tiktok && (
    <Link
      href={data.tiktok}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md text-white hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"

    >
      <FaTiktok className="text-lg" />
    </Link>
  )}

  {data.phone && (
    <Link
      href={`tel:${data.phone}`}
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md text-white hover:bg-white hover:border-[#f2aa4c] hover:text-black transition"

    >
      <FaPhoneAlt className="text-md" />
    </Link>
  )}

</div>


{sections.map((section, i) => {
  const isOpen = openIndex.includes(i);

  return (
    <div key={i} className={`
        flex flex-col gap-5 p-3 w-[90%] md:w-[65%] mx-auto overflow-hidden rounded-md transition
        ${isOpen ? "border mb-12 border-gray-400" : ""}
      `}>

      {/* Block */}
<button
  onClick={() =>
    setOpenIndex(prev =>
      prev.includes(i)
        ? prev.filter(index => index !== i)
        : [...prev, i]
    )
  }

        className="relative flex items-center w-full h-[190px] px-4 overflow-hidden cursor-pointer rounded-[4px] transition"
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
        className={`transition-all duration-300 gap-6 overflow-hidden ${
          isOpen ? "max-h-[1600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 p-4 last:border-b-0 ">

          {section.items.map((item, idx) => (
            <div key={idx} className="flex items-start justify-between">

              {/* Text */}
              <div className="flex flex-col gap-1">
  <p className="text-right text-md flex flex-row items-center justify center gap-2">
    {item.name[lang]}

                    {item.spicy && (
                      <span className="w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24"><path fill="#de5323" d="M120.74 54.44c.04 1.58-.01 5.59-4.04 14.85c-5.21 11.95-11.17 19.9-14.98 23.7c-3.96 4.78-16.12 18.16-36.47 22.14c-4.69.92-27.32 5.42-43.5-8.33C19.6 104.95 10.87 97.32 10 86c-.36-4.69.56-10.8 2.91-11.33c2.77-.63 4.21 7.23 11.98 12.85c.97.7 9.59 6.75 20.32 4.69c9.76-1.87 15.27-9.3 17.45-12.24c4.93-6.65 6.59-13.82 8.33-21.36c2.01-8.66 2.18-15.46 7.81-21.36c1.06-1.11 2.06-2.14 3.73-3.04c5.69-3.06 12.01-.76 20.84 2.6c8.46 3.23 13.66 5.29 16.06 10.59c1.19 2.62 1.26 5.03 1.31 7.04"/><path fill="#a0b632" d="M82.84 33.8c1.98-1.03 5.01-2.25 9.44-2.21c.93.01 2.05.05 3.33.19c1.1.12 5.3-2.33 6.2-3.77c.82-1.31 1.52-2.7 2.32-4.17c.98-1.79 2.52-4.87 2.7-6.62c.37-3.66-.41-7.81-7.02-6.88c-.82.11-2.73 1.18-3.28-.28c-1.12-2.93 4.86-5.09 8.87-3.21c4.47 2.1 6.19 7.7 6.43 8.92c.61 2.97-.07 5.44-1.39 10.24c-.53 1.94-.91 3.39-1.31 4.94c-.58 2.28.46 5.22 1.23 5.67c4.82 2.77 7.09 6.03 8.15 7.93c1.59 2.85 2.94 7.17 1.95 7.81c-.6.39-2-.62-2.44-.94c-1.43-1.04-1.45-1.88-2.44-2.83c-1.57-1.51-4.11-1.85-5.93-1.5c-2.64.51-2.98 2.48-4.49 2.21c-1.78-.31-1.44-3.11-4.56-5.53c-1.6-1.25-3.15-1.64-3.58-1.74a9.2 9.2 0 0 0-3.97-.02c-2.19.47-2.4 1.37-4.1 1.43c-1.43.05-3.18-.52-3.39-1.43c-.19-.84 1.07-1.25 1.24-2.8c.02-.18.14-1.47-.65-2.28c-.69-.7-1.73-.71-3.54-.72c-1.66-.01-2.35.23-2.47-.04c-.19-.45 1.45-1.72 2.7-2.37"/><path fill="#fff" d="M76.37 75.84c-.44-.03-.89-.16-1.28-.43a2.61 2.61 0 0 1-.74-3.61c1.96-2.97 2.55-7.71 3.03-11.51c.28-2.2.52-4.1.97-5.63c1.5-5.06 5.05-6.67 5.45-6.83a2.603 2.603 0 0 1 2.04 4.79c-.14.07-1.73.91-2.5 3.52c-.33 1.13-.56 2.92-.8 4.81c-.55 4.34-1.23 9.75-3.85 13.73c-.53.79-1.42 1.21-2.32 1.16M67.4 89.69a2.59 2.59 0 0 1-2.25-1.47c-.63-1.3-.08-2.85 1.21-3.48c1.52-.74 3.04-3.29 3.64-4.73a2.6 2.6 0 0 1 3.4-1.4a2.6 2.6 0 0 1 1.41 3.4c-.23.57-2.4 5.59-6.19 7.42c-.39.19-.81.27-1.22.26"/></svg>
                      </span>
                    )}
  </p>
                <p className="text-md font-bold">₪{item.price}</p>
                <p className="text-sm text-gray-400">{item.desc[lang]}</p>
              </div>

              {/* Square image */}
              <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] flex-shrink-0">
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
<Link className="underline underline-offset-4 hover:bg-white hover:border-[#f2aa4c] border-2 border-transparent hover:text-black p-2 rounded transition" href="/terms">{translations[lang].terms}</Link>
        
<p className="text-white" dir="ltr">&copy; {new Date().getFullYear()} CRTGO & {data.name[lang]}</p>
<p className="text-white">{translations[lang].allrights}</p>
<p className="text-white" dir="ltr">CREATED BY <Link className="text-[#f2aa4c] hover:underline underline-offset-4" href="/">CRTGO, WEB SERVICES ❤️</Link></p>
</footer>
</div>

<Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" strategy="afterInteractive" />
  </>
  )
}

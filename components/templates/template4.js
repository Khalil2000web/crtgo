"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import Script from "next/script";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";
import { Globe } from 'lucide-react';
import { X } from "lucide-react";
import Head from "next/head";
import { El_Messiri, Open_Sans } from 'next/font/google';

const elMessiri = El_Messiri({
  subsets: ['arabic'],
  weight: ['400','500','700'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['hebrew', 'latin'],
  weight: ['300','400','600','700','800'],
  display: 'swap',
})

const translations = {
  ar: {
    workingHours: "ساعات العمل",
    back: "العودة",
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
    back: "חזרה",
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


export default function Template4({ data }) {
useEffect(() => {
    document.body.style.backgroundColor = "#e2e2e2";
  }, []);

const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % data.headerImages.length);
  }, 3000);

  return () => clearInterval(interval);
}, [data.headerImages.length]);

const [mounted, setMounted] = useState(false);
const [lang, setLang] = useState("ar"); // default Arabic
const [isOpen, setIsOpen] = useState(false)
const [activeSection, setActiveSection] = useState(null);
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
  className={`${lang === 'ar' ? elMessiri.className : openSans.className} text-black mx-auto scroll-smooth`}
  dir={isRTL ? 'rtl' : 'ltr'}
>


{/* Images */}
<div className="h-[340px] w-full md:w-[60%] lg: mx-auto relative">
  {data.headerImages.map((src, i) => (
    <div
      key={i}
      className={`fade-image rounded-b-[20px] max-h-[220px] h-full w-full overflow-hidden ${
        i === index ? "active" : ""
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
      />
    </div>
  ))}
</div>

{/* Card */}
<div className={`${lang === 'ar' ? elMessiri.className : openSans.className} absolute z-10 h-[230px] top-[160px] left-1/2 -translate-x-1/2 flex flex-col pt-7 w-[85vw] md:w-[55%] bg-gray-100 border border-gray-300 rounded-[20px] items-center shadow-lg`}>
  <h1 className="text-xl text-[#000] font-bold pt-7">{data.name[lang]}</h1>
  <p className="text-sm text-gray-600 mt-1">{data.mainDesc[lang]}</p>
  <p className="text-sm text-gray-600 mt-1">{data.location[lang]}</p>

  <div className="flex items-center justify-between flex-row w-full px-[22px] mt-8">

<div className="flex items-center justify-center gap-2">
<button
  onClick={() => setIsOpen(true)}
  className="flex items-center text-black justify-center rounded-full text-sm cursor-pointer bg-[#bf3013]/30 hover:bg-white p-2 hover:border-[#f2aa4c] transition border-1 font-bold border-black hover:text-black gap-2"
>
<RiTimeLine className="text-lg" /> 
</button>

  <button
    onClick={() => setLangMenuOpen(!langMenuOpen)}
    className="cursor-pointer flex items-center gap-2 text-gray-400 hover:text-[#f2aa4c] transition-colors"
  >
    <Globe size={20} />
    <span className={`text-sm text-gray-600 ${lang === 'ar' ? elMessiri.className : openSans.className}`}>
  {lang === 'ar' ? 'ع' : 'עב'}
</span>
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
            ? 'bg-[#000] text-white'
            : ''
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
            ? 'bg-[#000] text-white'
            : ''
        }`}
      >
        עברית
      </button>
    </div>
  )}
</div>


<div className="flex items-center justify-center flex-wrap text-black gap-2">
  {data.instagram && (
    <Link
      href={data.instagram}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-gray-200/20 hover:border-[#000] hover:text-black transition"
    >
      <FaInstagram className="text-lg" />
    </Link>
  )}

  {data.facebook && (
    <Link
      href={data.facebook}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-gray-200/20 hover:border-[#000] hover:text-black transition"

    >
      <FaFacebook className="text-lg" />
    </Link>
  )}

  {data.tiktok && (
    <Link
      href={data.tiktok}
      target="_blank"
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-gray-200/20 hover:border-[#000] hover:text-black transition"

    >
      <FaTiktok className="text-lg" />
    </Link>
  )}

  {data.phone && (
    <Link
      href={`tel:${data.phone}`}
      className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md hover:bg-gray-200/20 hover:border-[#000] hover:text-black transition"

    >
      <FaPhoneAlt className="text-md" />
    </Link>
  )}
</div>
</div>
</div>
</div>

{/* Logo (top layer) */}
<div className="absolute z-20 top-[110px] left-1/2 -translate-x-1/2 w-25 h-25 rounded-full overflow-hidden border-4 border-gray-100">
  <Image src={data.logo} alt="Logo" fill className="pointer-events-none object-cover block" />
</div>



<div className={`${lang === 'ar' ? elMessiri.className : openSans.className} grid grid-cols-2 md:grid-cols-3 gap-6 w-[100%] md:w-[60%] mx-auto bg-gray-300 border border-gray-500/10 rounded-[20px] py-22`}>
  {sections.map((section, i) => (
    <button
      key={i}
      onClick={() => setActiveSection(section)}
      className="flex flex-col items-center cursor-pointer gap-3"
    >
      {/* Circle Image */}
      <div className="relative w-[150px] h-[150px] md:w-[165px] md:h-[165px]">
        <Image
          src={section.image}
          alt={section.title[lang]}
          fill
          className="object-cover rounded-full shadow-md pointer-events-none"
        />
      </div>

      {/* Title */}
      <span className="text-center font-semibold text-[18px] md:text-base">
        {section.title[lang]}
      </span>
    </button>
  ))}
</div>




<Dialog
  open={!!activeSection}
  onClose={() => setActiveSection(null)}
  className={`${lang === 'ar' ? elMessiri.className : openSans.className}`} relative z-50000`}
>
  {/* Overlay */}
  <div className="fixed inset-0 bg-gray-200" />

  {/* Fullscreen panel */}
  <div className="fixed inset-0 flex flex-col text-white">

    {activeSection && (
      <>
      
        {/* 🔸 Header */}
        <div className="text-center py-4 mt-2 border-b border-gray-700/30">
          <DialogTitle className="text-lg font-bold text-[#000]">
            {activeSection.title[lang]}
          </DialogTitle>
        </div>

        {/* 🔸 Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 pb-18 flex flex-col gap-6">

          {activeSection.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4">
              {/* Image */}
              <div className="relative w-[110px] h-[110px] flex-shrink-0">
                <Image
                  src={item.img}
                  alt={item.name[lang]}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              {/* Text */}
              <div className="flex flex-col gap-1 text-black text-right">
                <p className="font-semibold flex items-center justify-end gap-2">
                  {item.spicy && (
                    <span className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#de5323" d="M120.74 54.44c.04 1.58-.01 5.59-4.04 14.85c-5.21 11.95-11.17 19.9-14.98 23.7c-3.96 4.78-16.12 18.16-36.47 22.14c-4.69.92-27.32 5.42-43.5-8.33C19.6 104.95 10.87 97.32 10 86c-.36-4.69.56-10.8 2.91-11.33c2.77-.63 4.21 7.23 11.98 12.85c.97.7 9.59 6.75 20.32 4.69c9.76-1.87 15.27-9.3 17.45-12.24c4.93-6.65 6.59-13.82 8.33-21.36c2.01-8.66 2.18-15.46 7.81-21.36c1.06-1.11 2.06-2.14 3.73-3.04c5.69-3.06 12.01-.76 20.84 2.6c8.46 3.23 13.66 5.29 16.06 10.59c1.19 2.62 1.26 5.03 1.31 7.04"/><path fill="#a0b632" d="M82.84 33.8c1.98-1.03 5.01-2.25 9.44-2.21c.93.01 2.05.05 3.33.19c1.1.12 5.3-2.33 6.2-3.77c.82-1.31 1.52-2.7 2.32-4.17c.98-1.79 2.52-4.87 2.7-6.62c.37-3.66-.41-7.81-7.02-6.88c-.82.11-2.73 1.18-3.28-.28c-1.12-2.93 4.86-5.09 8.87-3.21c4.47 2.1 6.19 7.7 6.43 8.92c.61 2.97-.07 5.44-1.39 10.24c-.53 1.94-.91 3.39-1.31 4.94c-.58 2.28.46 5.22 1.23 5.67c4.82 2.77 7.09 6.03 8.15 7.93c1.59 2.85 2.94 7.17 1.95 7.81c-.6.39-2-.62-2.44-.94c-1.43-1.04-1.45-1.88-2.44-2.83c-1.57-1.51-4.11-1.85-5.93-1.5c-2.64.51-2.98 2.48-4.49 2.21c-1.78-.31-1.44-3.11-4.56-5.53c-1.6-1.25-3.15-1.64-3.58-1.74a9.2 9.2 0 0 0-3.97-.02c-2.19.47-2.4 1.37-4.1 1.43c-1.43.05-3.18-.52-3.39-1.43c-.19-.84 1.07-1.25 1.24-2.8c.02-.18.14-1.47-.65-2.28c-.69-.7-1.73-.71-3.54-.72c-1.66-.01-2.35.23-2.47-.04c-.19-.45 1.45-1.72 2.7-2.37"/><path fill="#fff" d="M76.37 75.84c-.44-.03-.89-.16-1.28-.43a2.61 2.61 0 0 1-.74-3.61c1.96-2.97 2.55-7.71 3.03-11.51c.28-2.2.52-4.1.97-5.63c1.5-5.06 5.05-6.67 5.45-6.83a2.603 2.603 0 0 1 2.04 4.79c-.14.07-1.73.91-2.5 3.52c-.33 1.13-.56 2.92-.8 4.81c-.55 4.34-1.23 9.75-3.85 13.73c-.53.79-1.42 1.21-2.32 1.16M67.4 89.69a2.59 2.59 0 0 1-2.25-1.47c-.63-1.3-.08-2.85 1.21-3.48c1.52-.74 3.04-3.29 3.64-4.73a2.6 2.6 0 0 1 3.4-1.4a2.6 2.6 0 0 1 1.41 3.4c-.23.57-2.4 5.59-6.19 7.42c-.39.19-.81.27-1.22.26"/></svg></span>
                  )}
            {item.name[lang]}
                </p>

                <p className="font-bold">₪{item.price}</p>
                <p className="text-sm text-gray-900">
                  {item.desc[lang]}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* 🔸 Bottom fixed bar */}
        <div className="sticky bottom-0 w-full bg-gra-200 border-t border-gray-700 p-4 flex justify-center">
          <button
            onClick={() => setActiveSection(null)}
            className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-white cursor-pointer border border-white hover:border-black hover:text-black transition"
          >
            {translations[lang].back}
          </button>
        </div>
      </>
    )}

  </div>
</Dialog>

<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  className={`${lang === 'ar' ? elMessiri.className : openSans.className} relative z-50000`}
>
  <div className="fixed inset-0 bg-black/60" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    
    <DialogPanel className="bg-gray-300 text-white border-2 border-[#000] p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col ">
      <DialogTitle className="text-[1.25rem] pb-3 text-right text-black font-bold">{translations[lang].workingHours}</DialogTitle>

        <ul className="space-y-1 text-gray-700">
{Object.entries(data.hours).map(([day, time]) => (
  <li key={day} className="flex justify-between text-gray-900">
    <span className="font-bold">{time}</span>
    <span className="font-bold">{translations[lang].days[day]}</span>
  </li> 
))}
  </ul>

<div className="mt-auto flex justify-center">
  <button
    onClick={() => setIsOpen(false)}
    className="bg-[#000] hover:bg-[#fff] hover:text-black border border-white text-white hover:border-[#000] p-2 rounded-full cursor-pointer transition font-bold"
  >
    <X />
  </button>
</div>
    </DialogPanel>
  </div>
</Dialog>



<footer className="ext-black mt-12 mb-20 rounded-[20px] bg-gray-300 w-[100%] md:w-[60%] mx-auto text-center flex flex-col gap-4 items-center justify-center py-8 mb-3">
<Link className="underline-offset-4 hover:underline p-2 rounded transition" href="/terms">{translations[lang].terms}</Link>
        
<p className="text-sm" dir="ltr">&copy; {new Date().getFullYear()} CRTGO & {data.name[lang]}</p>
<p className="text-sm">{translations[lang].allrights}</p>
<p className="text-sm" dir="ltr">CREATED BY <Link className="text-[#000] font-bold hover:underline underline-offset-4" href="/">CRTGO, WEB SERVICES ❤️</Link></p>
</footer>

<Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" strategy="afterInteractive" />
  </>
  )
}

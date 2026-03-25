"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import Script from "next/script";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";
import { Globe } from 'lucide-react';
import { X, ChevronLeft, MapPin } from "lucide-react";
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


export default function Template5({ data }) {
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
const [lang, setLang] = useState("ar");
const [isOpen, setIsOpen] = useState(false)
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

{/* BG Images */}
<div className="fixed opacity-30 top-0 bottom-0 left-0 right-1 z-0 h-screen w-screen mx-auto">
  {data.headerImages.map((src, i) => (
    <div
      key={i}
      className={`fade-image rounded-b-[20px] max-h-screen h-full w-full overflow-hidden ${
        i === index ? "active" : ""
      }`}
    >
      <Image
        src={src}
        alt="Image"
        fill
        className="object-cover block pointer-events-none"
      />
    </div>
  ))}
</div>


<div className="bg-white/90 w-full h-[300px] flex flex-col items-center justify-center p-3 rounded-b-[50px] border-b border-gray-300 shadow-lg relative z-10">
    <div className="flex flex-row w-full h-full items-center justify-center gap-7">
        <div className="w-[130px] h-[130px] relative rounded-full overflow-hidden border-3 border-gray-900">
            <Image src={data.logo} alt="Logo" fill className="pointer-events-none object-cover block" />
        </div>
        <div className="flex flex-col text-right gap-2 mr-6">
            <h1 className="text-3xl font-bold text-right">{data.name[lang]}</h1>
            <p className="text-sm text-gray-700 text-right">{data.mainDesc[lang]}</p>
            <p className="text-gray-700 text-sm text-right flex items-start gap-2 "><MapPin size={16} />{data.location[lang]}</p>
        </div>
    </div>
    <div className="flex flex-row items-center justify-center gap-4 w-[70%] md:w-[50%] flex-wrap text-black">
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



{sections.map((section, i) => (
<Link key={i} href={`/restaurants/${data.slug}/${section.id}`} className="flex flex-col">
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
  </Link>
))}



<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  className={`${lang === 'ar' ? elMessiri.className : openSans.className} relative z-50000`}
>
  <div className="fixed inset-0 bg-black/80" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    
    <DialogPanel className="bg-black text-white border-2 border-[#fff] p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col ">
      <DialogTitle className="text-[1.25rem] pb-3 text-right text-white font-bold">{translations[lang].workingHours}</DialogTitle>

        <ul className="space-y-1 text-white">
{Object.entries(data.hours).map(([day, time]) => (
  <li key={day} className="flex justify-between text-white">
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





<div className="fixed bottom-0 left-0 w-screen h-[50px] flex items-center justify-center bg-white/90 z-[100]">
  <div className="w-full md:w-[60%] h-full flex items-center justify-around bg-gray-300/80 border-t border-gray-400 gap-2 px-2 relative">
    
    {/* Timeline Button */}
    <button 
      onClick={() => setIsOpen(true)} 
      className="flex items-center justify-center gap-2 p-2 text-sm font-bold text-black rounded-full cursor-pointer hover:bg-black hover:text-white transition"
    >
      <RiTimeLine className="text-lg" />
    </button>

    {/* Language Button with relative for dropdown */}
    <div className="relative">
      <button 
        onClick={() => setLangMenuOpen(!langMenuOpen)}
        className="flex items-center gap-2 text-gray-400 cursor-pointer text-sm hover:text-black transition-colors"
      >
        <span className={`${lang === 'ar' ? elMessiri.className : openSans.className} text-black font-bold`}>
          {lang === 'ar' ? 'ع' : 'עב'}
        </span>
        <Globe size={20} />
      </button>

      {/* Dropdown menu aligned to this button */}
      {langMenuOpen && (
        <div className="absolute left-0 bottom-full mt-1 bg-white border border-gray-200 p-2 min-w-[120px] flex flex-col gap-2 z-[800] shadow-md">
          <button
            onClick={() => { setLang('ar'); setLangMenuOpen(false); }}
            className={`w-full px-3 py-1 font-bold text-black border-2 border-gray-400 rounded cursor-pointer ${lang === 'ar' ? 'bg-black text-white' : ''} ${elMessiri.className}`}
          >
            عربي
          </button>
          <button
            onClick={() => { setLang('he'); setLangMenuOpen(false); }}
            className={`w-full px-3 py-1 font-bold text-black border-2 border-gray-400 rounded cursor-pointer ${lang === 'he' ? 'bg-black text-white' : ''} ${openSans.className}`}
          >
            עברית
          </button>
        </div>
      )}
    </div>

  </div>
</div>




<footer className={`${lang === 'ar' ? elMessiri.className : openSans.className} text-black mt-12 mb-20 rounded-[20px] w-[100%] md:w-[60%] mx-auto text-center flex flex-col gap-4 items-center justify-center py-8 realative z-[1000]`}>
<Link className="underline-offset-4 hover:underline p-2 rounded transition" href="/terms">{translations[lang].terms}</Link>
        
<p className="text-sm" dir="ltr">&copy; {new Date().getFullYear()} CRTGO & {data.name[lang]}</p>
<p className="text-sm">{translations[lang].allrights}</p>
<p className="text-sm" dir="ltr">CREATED BY <Link className="text-[#000] font-bold hover:underline underline-offset-4" href="/">CRTGO, WEB SERVICES ❤️</Link></p>
</footer>

<Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" strategy="afterInteractive" />
    </div>
  </>
  );
}

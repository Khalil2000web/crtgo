"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import Script from "next/script";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";

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


export default function Template2({ data }) {
useEffect(() => {
    document.body.style.backgroundColor = "#091413";
  }, []);

const [mounted, setMounted] = useState(false);
const [lang, setLang] = useState("ar"); // default Arabic
const [isOpen, setIsOpen] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)

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
  className={`${lang === "ar" ? notoArabic.className : ""} bg-[#091413] text-[#B0E4CC] scroll-smooth`}
  dir={lang === "ar" ? "rtl" : "rtl"}
>

<header
  dir="ltr"
  className="relative border-b border-white/20 w-full h-[420px] flex flex-col items-center justify-center text-center"
>
  {/* Background image with 30% opacity */}
  <div
    className="absolute inset-0 bg-center bg-cover opacity-30"
    style={{ backgroundImage: `url(${data.headerimg})` }}
  ></div>

  {/* Content on top */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full">
<div className="w-[190px] h-[190px] rounded-full overflow-hidden border border-white">
  <Image
    src={data.logo}
    alt="logo"
    width={190}
    height={190}
    className="object-cover pointer-events-none"
  />
</div>
    <h2 className="text-lg text-white font-bold p-3">{data.name[lang]}</h2>
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center justify-center rounded-full text-sm cursor-pointer p-2 hover:bg-white hover:text-black transition border font-bold border-gray"
    >
      <RiTimeLine className="text-lg" /> 
      <p className="pl-2 text-sm">{translations[lang].workingHours}</p>
    </button>






<div className="flex flex-wrap items-center justify-center gap-3 pt-3">

  {data.instagram && (
    <Link
      href={data.instagram}
      target="_blank"
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 hover:text-black transition"
    >
      <FaInstagram className="text-lg" />
    </Link>
  )}

  {data.facebook && (
    <Link
      href={data.facebook}
      target="_blank"
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 hover:text-black transition"
    >
      <FaFacebook className="text-lg" />
    </Link>
  )}

  {data.tiktok && (
    <Link
      href={data.tiktok}
      target="_blank"
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 hover:text-black transition"
    >
      <FaTiktok className="text-lg" />
    </Link>
  )}

  {data.phone && (
    <Link
      href={`tel:${data.phone}`}
      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50 hover:text-black transition"
    >
      <FaPhoneAlt className="text-lg" />
    </Link>
  )}

</div>



<div className="flex justify-center gap-2 mt-4">

<button
  onClick={() => setLang("ar")}
  className={`px-3 py-1 cursor-pointer rounded border ${lang === "ar" ? "bg-white text-black cursor-default" : ""}`}
>
  عربي
</button>

<button
  onClick={() => setLang("he")}
  className={`px-3 py-1 cursor-pointer rounded border ${lang === "he" ? "bg-white text-black cursor-default" : ""}`}
>
  עברית
</button>

</div>
</div>
</header>


<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50000">
  <div className="fixed inset-0 bg-black/40" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="bg-white p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col">
      <DialogTitle className="text-[1.25rem] pb-3 text-right font-bold">{translations[lang].workingHours}</DialogTitle>

        <ul className="space-y-1 text-gray-700">
{Object.entries(data.hours).map(([day, time]) => (
  <li key={day} className="flex justify-between">
    <span className="font-bold">{time}</span>
    <span className="font-bold">{translations[lang].days[day]}</span>
  </li> 
))}
  </ul>

<div className="mt-auto flex justify-center">
  <button
    onClick={() => setIsOpen(false)}
    className="px-3 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition font-bold border border-gray-400"
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





<div className="flex flex-wrap justify-center gap-5 py-6 mt-3">
  {sections.map((section) => (
    <button
      key={section.id}
      onClick={() => scrollToSection(section.id)}
      className="relative border border-white rounded-full cursor-pointer w-[110px] h-[110px] flex items-center justify-center font-bold px-4 py-2 transition-transform hover:scale-105 text-white overflow-hidden"
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${section.image})` }}
      ></div>

      {/* Text on top */}
      <span className="relative z-10">{section.title[lang]}</span>
    </button>
  ))}
</div>


{sections.map((section, i) => {
  if (section.type === "menu") {
    return (
      <div key={i} id={section.id} className="scroll-mt-20 w-full py-8">
        <h2 className="text-center text-[#fff] font-bold text-xl mb-5 md:text-3xl">
          {section.title[lang]}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-5">
          {section.items.map((item, idx) => (
            <button key={idx} onClick={() => setSelectedItem(item)} className="w-full text-left cursor-pointer" >
              <div className="relative w-full aspect-square overflow-hidden rounded-lg">

                <Image
                  src={item.img}
                  alt={item.name[lang]}
                  fill
                  className="object-cover"
                />

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm flex justify-between items-center px-3 py-2 h-[40px]">
                  <div className="flex items-center gap-1 font-semibold text-right">
                  <span className="font-bold">{item.name[lang]}</span>

                    {item.spicy && (
                      <span className="w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24"><path fill="#de5323" d="M120.74 54.44c.04 1.58-.01 5.59-4.04 14.85c-5.21 11.95-11.17 19.9-14.98 23.7c-3.96 4.78-16.12 18.16-36.47 22.14c-4.69.92-27.32 5.42-43.5-8.33C19.6 104.95 10.87 97.32 10 86c-.36-4.69.56-10.8 2.91-11.33c2.77-.63 4.21 7.23 11.98 12.85c.97.7 9.59 6.75 20.32 4.69c9.76-1.87 15.27-9.3 17.45-12.24c4.93-6.65 6.59-13.82 8.33-21.36c2.01-8.66 2.18-15.46 7.81-21.36c1.06-1.11 2.06-2.14 3.73-3.04c5.69-3.06 12.01-.76 20.84 2.6c8.46 3.23 13.66 5.29 16.06 10.59c1.19 2.62 1.26 5.03 1.31 7.04"/><path fill="#a0b632" d="M82.84 33.8c1.98-1.03 5.01-2.25 9.44-2.21c.93.01 2.05.05 3.33.19c1.1.12 5.3-2.33 6.2-3.77c.82-1.31 1.52-2.7 2.32-4.17c.98-1.79 2.52-4.87 2.7-6.62c.37-3.66-.41-7.81-7.02-6.88c-.82.11-2.73 1.18-3.28-.28c-1.12-2.93 4.86-5.09 8.87-3.21c4.47 2.1 6.19 7.7 6.43 8.92c.61 2.97-.07 5.44-1.39 10.24c-.53 1.94-.91 3.39-1.31 4.94c-.58 2.28.46 5.22 1.23 5.67c4.82 2.77 7.09 6.03 8.15 7.93c1.59 2.85 2.94 7.17 1.95 7.81c-.6.39-2-.62-2.44-.94c-1.43-1.04-1.45-1.88-2.44-2.83c-1.57-1.51-4.11-1.85-5.93-1.5c-2.64.51-2.98 2.48-4.49 2.21c-1.78-.31-1.44-3.11-4.56-5.53c-1.6-1.25-3.15-1.64-3.58-1.74a9.2 9.2 0 0 0-3.97-.02c-2.19.47-2.4 1.37-4.1 1.43c-1.43.05-3.18-.52-3.39-1.43c-.19-.84 1.07-1.25 1.24-2.8c.02-.18.14-1.47-.65-2.28c-.69-.7-1.73-.71-3.54-.72c-1.66-.01-2.35.23-2.47-.04c-.19-.45 1.45-1.72 2.7-2.37"/><path fill="#fff" d="M76.37 75.84c-.44-.03-.89-.16-1.28-.43a2.61 2.61 0 0 1-.74-3.61c1.96-2.97 2.55-7.71 3.03-11.51c.28-2.2.52-4.1.97-5.63c1.5-5.06 5.05-6.67 5.45-6.83a2.603 2.603 0 0 1 2.04 4.79c-.14.07-1.73.91-2.5 3.52c-.33 1.13-.56 2.92-.8 4.81c-.55 4.34-1.23 9.75-3.85 13.73c-.53.79-1.42 1.21-2.32 1.16M67.4 89.69a2.59 2.59 0 0 1-2.25-1.47c-.63-1.3-.08-2.85 1.21-3.48c1.52-.74 3.04-3.29 3.64-4.73a2.6 2.6 0 0 1 3.4-1.4a2.6 2.6 0 0 1 1.41 3.4c-.23.57-2.4 5.59-6.19 7.42c-.39.19-.81.27-1.22.26"/></svg>
                      </span>
                    )}

                  </div>
                  <span className="font-bold">₪{item.price}</span>
                </div>

              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }
  return null
})}

      {/* Footer */}
<footer className="mt-12 mb-20 border border-gray-600/40 rounded w-[95%] md:w-[70%] lg:w-[60%] mx-auto border-t border-[#1111111c] text-center flex flex-col gap-4 items-center justify-center py-8 mb-3">
<div className="w-[70%] md:w-[45%] lg:w-[40%] mx-auto flex flex-wrap justify-between mt-2">
  {data.instagram && (
    <Link
      href={data.instagram}
      target="_blank"
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-white hover:text-black transition"
    >
      <FaInstagram className="text-lg" />
    </Link>
  )}

  {data.facebook && (
    <Link
      href={data.facebook}
      target="_blank"
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-white hover:text-black transition"
    >
      <FaFacebook className="text-lg" />
    </Link>
  )}

  {data.tiktok && (
    <Link
      href={data.tiktok}
      target="_blank"
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-white hover:text-black transition"
    >
      <FaTiktok className="text-lg" />
    </Link>
  )}

  {data.phone && (
    <Link
      href={`tel:${data.phone}`}
      className="p-2 flex items-center justify-center w-10 h-10 rounded-md hover:bg-white hover:text-black transition"
    >
      <FaPhoneAlt className="text-lg" />
    </Link>
  )}

</div>

  <Link className="p-3 underline underline-offset-2 hover:bg-white hover:text-black p-3 rounded font-bold transition" href="/terms">{translations[lang].terms}</Link>
        
        <p className="text-white" dir="ltr">&copy; {new Date().getFullYear()} CRTGO & {data.name[lang]}</p>
        <p className="text-white">{translations[lang].allrights}</p>
        <p className="text-white" dir="ltr">CREATED BY <a href="/">CRTGO, WEB SERVICES ❤️</a></p>
      </footer>

    </div>
    <Script
        src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
        strategy="afterInteractive" />
        </>
  )
}

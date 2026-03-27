"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";

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

export default function Template1Edit({ data, token }) {
  const [siteData, setSiteData] = useState({ ...data, sections: data.sections || [] });
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("ar");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // ===== BASIC CHANGE =====
  const handleChange = (key, value) => setSiteData(prev => ({ ...prev, [key]: value }));

  const handleSectionChange = (sectionIdx, key, value) => {
    const newSections = [...siteData.sections];
    newSections[sectionIdx][key] = value;
    setSiteData({ ...siteData, sections: newSections });
  };

  const handleItemChange = (sectionIdx, itemIdx, key, value) => {
    const newSections = [...siteData.sections];
    newSections[sectionIdx].items[itemIdx][key] = value;
    setSiteData({ ...siteData, sections: newSections });
  };

  // ===== UPLOAD =====
const handleUpload = async (e, key, sectionIdx = null, itemIdx = null) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const d = await res.json();

  if (sectionIdx !== null && itemIdx !== null) {
    handleItemChange(sectionIdx, itemIdx, key, d.url);
  } else {
    handleChange(key, d.url);
  }
};

  // ===== ADD ITEM =====
  const addItem = (sectionIdx) => {
    const newSections = [...siteData.sections];
    newSections[sectionIdx].items.push({ name: { ar: "", he: "" }, desc: { ar: "", he: "" }, price: "", img: "" });
    setSiteData({ ...siteData, sections: newSections });
  };

  // ===== ADD SECTION =====
  const addSection = () => {
    const newSections = [...siteData.sections];
    newSections.push({
      id: `section-${Date.now()}`,
      type: "menu",
      title: { ar: "عنوان جديد", he: "כותרת חדשה" },
      items: [],
    });
    setSiteData({ ...siteData, sections: newSections });
  };

  const deleteItem = (sectionIdx, itemIdx) => {
  const newSections = [...siteData.sections];
  newSections[sectionIdx].items.splice(itemIdx, 1);
  setSiteData({ ...siteData, sections: newSections });
};

  // ===== SAVE =====
  const handleSave = async () => {
    const res = await fetch("/api/admin/save", {
      method: "POST",
      body: JSON.stringify({ token, site_data: siteData }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) alert("Saved!");
    else alert("Error saving!");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`${notoArabic.className} font-sans bg-[#fefefe] text-[#877259] scroll-smooth`} dir={lang==="ar"?"rtl":"ltr"}>
      
      {/* Header */}
      <header className="relative w-full h-[350px] flex items-end justify-center text-center overflow-hidden">
        {siteData.biglogo && (
          <Image src={siteData.biglogo} alt="header" fill className="object-cover z-1" />
        )}
        <div className="absolute bottom-5 w-full px-4">
          <input
            value={siteData.name[lang]}
            onChange={e => handleChange("name", { ...siteData.name, [lang]: e.target.value })}
            className="text-center text-[clamp(2rem,5vw,4rem)] font-bold text-black bg-white/80 px-2 py-1 rounded"
          />
        </div>
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleUpload(e,"biglogo")} />
      </header>

      {/* Language Switch */}
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={() => setLang("ar")} className={`px-3 py-1 rounded border ${lang==="ar"?"bg-black text-white":""}`}>عربي</button>
        <button onClick={() => setLang("he")} className={`px-3 py-1 rounded border ${lang==="he"?"bg-black text-white":""}`}>עברית</button>
      </div>

      {/* Socials */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
        {["instagram","facebook","tiktok","phone"].map(key => siteData[key] && (
          <div key={key}>
            <input type="text" value={siteData[key]} onChange={e=>handleChange(key,e.target.value)} placeholder={key} className="border px-2 py-1 rounded w-32"/>
          </div>
        ))}
      </div>

      {/* Section Buttons */}
      <div className="sticky top-0 z-[100000] flex flex-wrap justify-center gap-4 bg-[rgba(254,254,254,0.9)] border-b border-[#1111111c] py-6">
        {siteData.sections.map(sec => (
          <button key={sec.id} onClick={() => scrollToSection(sec.id)} className="cursor-pointer border rounded font-bold px-4 py-2 transition hover:scale-105 text-[#6c5e4f]">
            {sec.title[lang]}
          </button>
        ))}
        <button onClick={addSection} className="cursor-pointer border border-green-600 text-green-600 rounded font-bold px-4 py-2 hover:bg-green-600 hover:text-white transition">+ Add Section</button>
      </div>

      {/* Sections */}
      {siteData.sections.map((section,i) => (
        <div key={section.id} id={section.id} className="scroll-mt-32 w-full py-8 border-b border-gray-200">
          <input value={section.title[lang]} onChange={e => handleSectionChange(i,"title",{ ...section.title,[lang]:e.target.value })} className="text-xl font-bold mb-4 text-center border px-2 py-1 rounded w-full max-w-md mx-auto"/>
          
          <div className="flex overflow-x-auto px-5 gap-4">
            {section.items.map((item,idx)=>(
              <div key={idx} className="flex-shrink-0 w-[260px] border p-2 rounded">
                <div className="relative w-[200px] h-[200px] mx-auto mb-2">
                  {item.img && <Image src={item.img} alt={item.name[lang]} fill className="object-cover rounded-full" />}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e=>handleUpload(e,"img",i,idx)} />
                </div>
                <input value={item.name[lang]} onChange={e=>handleItemChange(i,idx,"name",{ ...item.name,[lang]:e.target.value })} className="text-center font-semibold text-base mb-1 border px-1 py-1 rounded w-full"/>
                <textarea value={item.desc[lang]} onChange={e=>handleItemChange(i,idx,"desc",{ ...item.desc,[lang]:e.target.value })} className="text-sm text-center mb-1 border px-1 py-1 rounded w-full"/>
                <input value={item.price} onChange={e=>handleItemChange(i,idx,"price",e.target.value)} className="text-center mb-1 border px-1 py-1 rounded w-full"/>
                <button
  onClick={() => deleteItem(i, idx)}
  className="text-red-500 mt-2"
>
  Delete Item
</button>
              </div>
            ))}
            <button onClick={()=>addItem(i)} className="border border-green-600 text-green-600 px-4 py-2 rounded h-[200px] flex items-center justify-center hover:bg-green-600 hover:text-white transition">+ Add Item</button>
          </div>
        </div>
      ))}

      {/* Working Hours */}
      <div className="w-full max-w-md mx-auto p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="cursor-pointer flex w-full justify-between bg-white px-4 py-2 text-left text-gray-900 font-medium md:shadow md:rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{translations[lang].workingHours}</span>
                {open?<ChevronUpIcon className="w-5 h-5 text-gray-500"/>:<ChevronDownIcon className="w-5 h-5 text-gray-500"/>}
              </Disclosure.Button>
              <Disclosure.Panel className="bg-white md:shadow md:rounded-lg p-4 mt-2">
                <ul className="space-y-1 text-gray-700">
                  {Object.entries(siteData.hours).map(([day,time])=>(
                    <li key={day} className="flex justify-between">
                      <span>{translations[lang].days[day]}</span>
                      <input value={time} onChange={e=>handleChange("hours",{ ...siteData.hours,[day]:e.target.value })} className="border px-1 py-1 rounded w-20 text-right"/>
                    </li>
                  ))}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <div className="text-center mt-6">
        <button onClick={handleSave} className="bg-black text-white px-6 py-3 rounded text-lg">Save All Changes</button>
      </div>
    </div>
  );
}
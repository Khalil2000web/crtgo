"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
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

export default function Template2Edit({ data, token }) {
  const [siteData, setSiteData] = useState({ ...data, sections: data.sections || [] });
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("ar");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
    } else if (sectionIdx !== null) {
      handleSectionChange(sectionIdx, key, d.url);
    } else {
      handleChange(key, d.url);
    }
  };

  // ===== ADD ITEM / SECTION =====
const addItem = (sectionIdx) => {
  const newSections = [...siteData.sections];
  newSections[sectionIdx].items.push({ 
    name: { ar: "", he: "" }, 
    desc: { ar: "", he: "" }, 
    price: "", 
    img: "", 
    spicy: false,
    available: true, // default available
  });
  setSiteData({ ...siteData, sections: newSections });
};

  const addSection = () => {
    const newSections = [...siteData.sections];
    newSections.push({
      id: `section-${Date.now()}`,
      type: "menu",
      title: { ar: "عنوان جديد", he: "כותרת חדשה" },
      image: "",
      items: [],
    });
    setSiteData({ ...siteData, sections: newSections });
  };

  // ===== DELETE =====
  const deleteItem = (sectionIdx, itemIdx) => {
    const newSections = [...siteData.sections];
    newSections[sectionIdx].items.splice(itemIdx, 1);
    setSiteData({ ...siteData, sections: newSections });
  };
  const deleteSection = (sectionIdx) => {
    const newSections = [...siteData.sections];
    newSections.splice(sectionIdx, 1);
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
    <div className={`${notoArabic.className} scroll-smooth`} dir={lang==="ar"?"rtl":"rtl"}>

{/* Header */}
<header className="relative z-10 border-b border-white/20 w-full h-[420px] flex flex-col items-center justify-center text-center">

  {/* Header Image */}
  {siteData.headerimg && (
    <div className="absolute inset-0 opacity-30">
      <Image src={siteData.headerimg} alt="header" fill className="object-cover" />
    </div>
  )}

  {/* Header Upload Button */}
  <div className="absolute bottom-3 right-3 z-[500]">
    <label className="cursor-pointer bg-black/60 text-white px-3 py-1 rounded text-sm">
      Change Header
      <input
        type="file"
        className="hidden"
        onChange={e => handleUpload(e, "headerimg")}
      />
    </label>
  </div>

  <div className="relative z-50 flex flex-col items-center justify-center text-center w-full h-full">

    {/* Logo */}
    <div className="relative flex flex-col items-center">

      <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-white mb-2">
        {siteData.logo && (
          <Image
            src={siteData.logo}
            alt="logo"
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Logo Upload Button */}
      <label className="cursor-pointer bg-black/60 text-white px-3 py-1 rounded text-sm">
        Change Logo
        <input
          type="file"
          className="hidden"
          onChange={e => handleUpload(e, "logo")}
        />
      </label>

      {/* Shape Selector 
      <select
        value={siteData.logoShape || "circle"}
        onChange={e => handleChange("logoShape", e.target.value)}
        className="mt-2 px-2 py-1 rounded text-black text-sm"
      >
        <option value="circle">Circle</option>
        <option value="square">Square</option>
      </select> */}

    </div>

    {/* Name */}
    <input
      value={siteData.name[lang]}
      onChange={e => handleChange("name", { ...siteData.name, [lang]: e.target.value })}
      className="text-center border-2 border-blacktext-xl md:text-3xl font-bold px-2 py-1 rounded bg-white/80 text-black mb-2 mt-2"
    />


  </div>
</header>

    {/* Timeline Button */}
    <div className="flex items-center justify-center w-full py-10">
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center justify-center rounded-full text-sm cursor-pointer p-2 hover:bg-white hover:text-black transition border font-bold border-gray mb-2"
    >
      <RiTimeLine className="text-lg" /> 
      <p className="pl-2 text-sm">{translations[lang].workingHours}</p>
    </button>
    </div>

    {/* Socials */}
    <div className="my-2 flex flex-wrap items-center justify-center gap-3 mt-3">
      {["instagram","facebook","tiktok","phone"].map(key => (
        <div key={key} className="flex items-center gap-2">
          <label className="flex items-center gap-1 border border-white rounded px-2 py-1">
            {key === "instagram" && <FaInstagram />}
            {key === "facebook" && <FaFacebook />}
            {key === "tiktok" && <FaTiktok />}
            {key === "phone" && <FaPhoneAlt />}
          </label>

          <input
            type="text"
            value={siteData[key] ?? ""}
            onChange={e => handleChange(key, e.target.value || null)}
            placeholder={key}
            className="border px-2 py-1 rounded w-32 text-left"
            dir="ltr"
          />
        </div>
      ))}
    </div>

          {/* Language Switch */}
          <div className="relative z-50 flex justify-center gap-2 mt-12">
            <button onClick={() => setLang("ar")} className={`px-3 py-1 cursor-pointer rounded border ${lang==="ar"?"bg-black text-white":""}`}>عربي</button>
            <button onClick={() => setLang("he")} className={`px-3 py-1 cursor-pointer rounded border ${lang==="he"?"bg-black text-white":""}`}>עברית</button>
          </div>



      {/* Section Buttons */}
      <div className="flex flex-wrap justify-center gap-6 py-6 mt-10">
        {siteData.sections.map((sec,i) => (
          <div key={sec.id} className="relative">
            <button
              onClick={() => scrollToSection(sec.id)}
              className="relative border border-black bg-green-700 rounded-full cursor-pointer w-[110px] h-[110px] flex items-center justify-center font-bold px-4 py-2 transition-transform hover:scale-105 text-white overflow-hidden"
            >
              {sec.image && (
                <div className="absolute inset-0 opacity-50 rounded-full overflow-hidden">
                  <Image src={sec.image} alt="section" fill className="object-cover" />
                </div>
              )}
              <span className="relative z-10">{sec.title[lang]}</span>
            </button>

            {/* Section image upload */}
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e=>handleUpload(e,"image",i)} />

            <button onClick={()=>deleteSection(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
          </div>
        ))}
        <button onClick={addSection} className="cursor-pointer border border-green-600 text-green-600 rounded px-4 py-2 hover:bg-green-600 hover:text-white transition">+ Add Section</button>
      </div>

      {/* Sections */}
      {siteData.sections.map((section,i) => (
        <div key={section.id} id={section.id} className="flex flex-col items-center justify-center scroll-mt-20 w-full py-8">
          <input value={section.title[lang]} onChange={e => handleSectionChange(i,"title",{...section.title,[lang]:e.target.value})} className="text-center text-xl font-bold mb-5 border px-2 py-4 rounded w-full max-w-md self-center"/>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-5">
            {section.items.map((item,idx) => (
              <div key={idx} className="relative">
                <button onClick={()=>setSelectedItem(item)} className="w-full text-left cursor-pointer">
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg border-3 border-black bg-gray-200">
                    {item.img && <Image src={item.img} alt={item.name[lang]} fill className="object-cover" />}
                    
            {!item.available && (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg font-bold z-20 pointer-events-none">
      Not Available
    </div>
  )}
                    
                    
                    <input type="file" className="absolute inset-0 opacity-10 text-black cursor-pointer" onChange={e=>handleUpload(e,"img",i,idx)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm flex justify-between items-center px-3 py-2 h-[40px]">
                      <span className="font-bold flex flex-row items-center justify-center gap-2">{item.name[lang]}
                        {item.spicy && (
                      <span className="w-4 h-4 flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24"><path fill="#de5323" d="M120.74 54.44c.04 1.58-.01 5.59-4.04 14.85c-5.21 11.95-11.17 19.9-14.98 23.7c-3.96 4.78-16.12 18.16-36.47 22.14c-4.69.92-27.32 5.42-43.5-8.33C19.6 104.95 10.87 97.32 10 86c-.36-4.69.56-10.8 2.91-11.33c2.77-.63 4.21 7.23 11.98 12.85c.97.7 9.59 6.75 20.32 4.69c9.76-1.87 15.27-9.3 17.45-12.24c4.93-6.65 6.59-13.82 8.33-21.36c2.01-8.66 2.18-15.46 7.81-21.36c1.06-1.11 2.06-2.14 3.73-3.04c5.69-3.06 12.01-.76 20.84 2.6c8.46 3.23 13.66 5.29 16.06 10.59c1.19 2.62 1.26 5.03 1.31 7.04"/><path fill="#a0b632" d="M82.84 33.8c1.98-1.03 5.01-2.25 9.44-2.21c.93.01 2.05.05 3.33.19c1.1.12 5.3-2.33 6.2-3.77c.82-1.31 1.52-2.7 2.32-4.17c.98-1.79 2.52-4.87 2.7-6.62c.37-3.66-.41-7.81-7.02-6.88c-.82.11-2.73 1.18-3.28-.28c-1.12-2.93 4.86-5.09 8.87-3.21c4.47 2.1 6.19 7.7 6.43 8.92c.61 2.97-.07 5.44-1.39 10.24c-.53 1.94-.91 3.39-1.31 4.94c-.58 2.28.46 5.22 1.23 5.67c4.82 2.77 7.09 6.03 8.15 7.93c1.59 2.85 2.94 7.17 1.95 7.81c-.6.39-2-.62-2.44-.94c-1.43-1.04-1.45-1.88-2.44-2.83c-1.57-1.51-4.11-1.85-5.93-1.5c-2.64.51-2.98 2.48-4.49 2.21c-1.78-.31-1.44-3.11-4.56-5.53c-1.6-1.25-3.15-1.64-3.58-1.74a9.2 9.2 0 0 0-3.97-.02c-2.19.47-2.4 1.37-4.1 1.43c-1.43.05-3.18-.52-3.39-1.43c-.19-.84 1.07-1.25 1.24-2.8c.02-.18.14-1.47-.65-2.28c-.69-.7-1.73-.71-3.54-.72c-1.66-.01-2.35.23-2.47-.04c-.19-.45 1.45-1.72 2.7-2.37"/><path fill="#fff" d="M76.37 75.84c-.44-.03-.89-.16-1.28-.43a2.61 2.61 0 0 1-.74-3.61c1.96-2.97 2.55-7.71 3.03-11.51c.28-2.2.52-4.1.97-5.63c1.5-5.06 5.05-6.67 5.45-6.83a2.603 2.603 0 0 1 2.04 4.79c-.14.07-1.73.91-2.5 3.52c-.33 1.13-.56 2.92-.8 4.81c-.55 4.34-1.23 9.75-3.85 13.73c-.53.79-1.42 1.21-2.32 1.16M67.4 89.69a2.59 2.59 0 0 1-2.25-1.47c-.63-1.3-.08-2.85 1.21-3.48c1.52-.74 3.04-3.29 3.64-4.73a2.6 2.6 0 0 1 3.4-1.4a2.6 2.6 0 0 1 1.41 3.4c-.23.57-2.4 5.59-6.19 7.42c-.39.19-.81.27-1.22.26"/></svg>
                      </span>
                    )}
                    </span>
                      <span>₪{item.price}</span>
                    </div>
                  </div>
                </button>

                <input value={item.name[lang]} onChange={e=>handleItemChange(i,idx,"name",{ ...item.name,[lang]:e.target.value })} className="text-center font-semibold text-base mb-1 border px-1 py-1 rounded w-full"/>

                <textarea value={item.desc[lang]} onChange={e=>handleItemChange(i,idx,"desc",{ ...item.desc,[lang]:e.target.value })} className="text-sm text-center mb-1 border px-1 py-1 rounded w-full"/>
                <input value={item.price} onChange={e=>handleItemChange(i,idx,"price",e.target.value)} className="text-center mb-1 border px-1 py-1 rounded w-full"/>
                <button onClick={()=>deleteItem(i,idx)} className="cursor-pointer text-red-500 text-center hover:bg-red-500 hover:text-white transition py-2 px-4 rounded w-full border border-red-500">Delete Item</button>
              <div className="flex items-center justify-between mb-1">
  <label className="flex items-center gap-2">
    <input 
      type="checkbox" 
      checked={item.spicy || false} 
      onChange={e => handleItemChange(i, idx, "spicy", e.target.checked)} 
    />
    <span>Spicy</span>
  </label>
    <label className="flex items-center gap-2">
    <input 
      type="checkbox" 
      checked={item.available ?? true} 
      onChange={e => handleItemChange(i, idx, "available", e.target.checked)} 
    />
    <span>Available</span>
  </label>
</div>
              </div>
            ))}
            <button onClick={()=>addItem(i)} className="cursor-pointer border border-green-600 text-green-600 px-4 py-4 rounded h-[200px] min-w-[200px] w-full flex items-center justify-center hover:bg-green-600 hover:text-white transition">+ Add Item</button>
          </div>
        </div>
      ))}

      {/* Working hours dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col">
            <DialogTitle className="text-[1.25rem] pb-3 text-right font-bold">{translations[lang].workingHours}</DialogTitle>
<ul className="space-y-2 text-gray-700">
  {Object.entries(siteData.hours || {}).map(([day, time]) => (
    <li key={day} className="flex justify-between items-center gap-2">

      {/* Time input */}
      <input
        type="text"
        value={time}
        onChange={(e) => {
          setSiteData(prev => ({
            ...prev,
            hours: {
              ...prev.hours,
              [day]: e.target.value
            }
          }))
        }}
        className="border px-2 py-1 rounded text-left w-32"
        dir="ltr"
      />

      {/* Translated day */}
      <span className="font-bold">
        {translations[lang].days[day] || day}
      </span>

    </li>
  ))}
</ul>
            <div className="mt-auto flex justify-center">
              <button onClick={()=>setIsOpen(false)} className="px-3 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 font-bold border border-gray-400">{translations[lang].workingHoursModalClose}</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="text-center my-15">
        <button onClick={handleSave} className="cursor-pointer bg-black text-white hover:bg-gray-800 px-6 py-3 rounded text-lg">Save All Changes</button>
      </div>
    </div>
  );
}
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
    terms: "شروط الاستخدام",
    allrights: "جميع الحقوق محفوظة",
  },
  he: {
    workingHours: "שעות פתיחה",
    workingHoursModalClose: "סגור",
    terms: "תנאי שימוש",
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
    newSections[sectionIdx].items.push({ name: { ar: "", he: "" }, desc: { ar: "", he: "" }, price: "", img: "" });
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
    <div className={`${notoArabic.className} scroll-smooth`} dir={lang==="ar"?"rtl":"ltr"}>

      {/* Header */}
      <header className="relative border-b border-white/20 w-full h-[420px] flex flex-col items-center justify-center text-center">
        {siteData.headerimg && (
          <div className="absolute inset-0 opacity-30">
            <Image src={siteData.headerimg} alt="header" fill className="object-cover" />
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full">
          <div className="w-[190px] h-[190px] rounded-full overflow-hidden border border-white mb-2">
            {siteData.logo && <Image src={siteData.logo} alt="logo" width={190} height={190} className="object-cover" />}
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleUpload(e,"logo")} />
          </div>

          <input
            value={siteData.name[lang]}
            onChange={e => handleChange("name", { ...siteData.name, [lang]: e.target.value })}
            className="text-center text-xl md:text-3xl font-bold px-2 py-1 rounded bg-white/80 text-black mb-2"
          />

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center rounded-full text-sm cursor-pointer p-2 hover:bg-white hover:text-black transition border font-bold border-gray mb-2"
          >
            <RiTimeLine className="text-lg" /> 
            <p className="pl-2 text-sm">{translations[lang].workingHours}</p>
          </button>

          {/* Socials */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            {["instagram","facebook","tiktok","phone"].map(key => siteData[key] && (
              <input
                key={key}
                type="text"
                value={siteData[key]}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={key}
                className="border px-2 py-1 rounded w-32"
              />
            ))}
          </div>

          {/* Language Switch */}
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setLang("ar")} className={`px-3 py-1 rounded border ${lang==="ar"?"bg-black text-white":""}`}>عربي</button>
            <button onClick={() => setLang("he")} className={`px-3 py-1 rounded border ${lang==="he"?"bg-black text-white":""}`}>עברית</button>
          </div>
        </div>

        {/* Header image upload */}
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleUpload(e,"headerimg")} />
      </header>

      {/* Section Buttons */}
      <div className="flex flex-wrap justify-center gap-3 py-6">
        {siteData.sections.map((sec,i) => (
          <div key={sec.id} className="relative">
            <button
              onClick={() => scrollToSection(sec.id)}
              className="relative border border-white rounded-full cursor-pointer w-[110px] h-[110px] flex items-center justify-center font-bold px-4 py-2 transition-transform hover:scale-105 text-white overflow-hidden"
            >
              {sec.image && (
                <div className="absolute inset-0 opacity-50">
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
        <button onClick={addSection} className="border border-green-600 text-green-600 rounded px-4 py-2 hover:bg-green-600 hover:text-white transition">+ Add Section</button>
      </div>

      {/* Sections */}
      {siteData.sections.map((section,i) => (
        <div key={section.id} id={section.id} className="scroll-mt-20 w-full py-8">
          <input value={section.title[lang]} onChange={e => handleSectionChange(i,"title",{...section.title,[lang]:e.target.value})} className="text-center text-xl font-bold mb-5 border px-2 py-1 rounded w-full max-w-md mx-auto"/>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-5">
            {section.items.map((item,idx) => (
              <div key={idx} className="relative">
                <button onClick={()=>setSelectedItem(item)} className="w-full text-left cursor-pointer">
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                    {item.img && <Image src={item.img} alt={item.name[lang]} fill className="object-cover" />}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e=>handleUpload(e,"img",i,idx)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm flex justify-between items-center px-3 py-2 h-[40px]">
                      <span className="font-bold">{item.name[lang]}</span>
                      <span>₪{item.price}</span>
                    </div>
                  </div>
                </button>

                <input value={item.name[lang]} onChange={e=>handleItemChange(i,idx,"name",{ ...item.name,[lang]:e.target.value })} className="text-center font-semibold text-base mb-1 border px-1 py-1 rounded w-full"/>
                <textarea value={item.desc[lang]} onChange={e=>handleItemChange(i,idx,"desc",{ ...item.desc,[lang]:e.target.value })} className="text-sm text-center mb-1 border px-1 py-1 rounded w-full"/>
                <input value={item.price} onChange={e=>handleItemChange(i,idx,"price",e.target.value)} className="text-center mb-1 border px-1 py-1 rounded w-full"/>
                <button onClick={()=>deleteItem(i,idx)} className="text-red-500 mt-2">Delete Item</button>
              </div>
            ))}
            <button onClick={()=>addItem(i)} className="border border-green-600 text-green-600 px-4 py-2 rounded h-[200px] flex items-center justify-center hover:bg-green-600 hover:text-white transition">+ Add Item</button>
          </div>
        </div>
      ))}

      {/* Working hours dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col">
            <DialogTitle className="text-[1.25rem] pb-3 text-right font-bold">{translations[lang].workingHours}</DialogTitle>
            <ul className="space-y-1 text-gray-700">
              {Object.entries(siteData.hours).map(([day, time]) => (
                <li key={day} className="flex justify-between">
                  <span className="font-bold">{time}</span>
                  <span className="font-bold">{day}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex justify-center">
              <button onClick={()=>setIsOpen(false)} className="px-3 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 font-bold border border-gray-400">{translations[lang].workingHoursModalClose}</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="text-center mt-6">
        <button onClick={handleSave} className="bg-black text-white px-6 py-3 rounded text-lg">Save All Changes</button>
      </div>
    </div>
  );
}
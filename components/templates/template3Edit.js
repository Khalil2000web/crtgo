"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";
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
    notAvailable: "غير متوفر",
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
    notAvailable: "לא זמין",
  },
};

export default function Template3Edit({ data, token }) {

  const [siteData, setSiteData] = useState({
    ...data,
    sections: data.sections || [],
    templateConfig: data.templateConfig || {
  template3: {
    headerImages: []
  }
}
  });

  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("ar");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openIndex, setOpenIndex] = useState([]);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.backgroundColor = "#101820";
  }, []);

  if (!mounted) return null;

  const isRTL = lang === 'ar' || lang === 'he';

  const headerImages = siteData.templateConfig?.template3?.headerImages || [];

  // ===== HEADER IMAGE HANDLERS (NEW BLOCK) =====

const handleAddHeaderImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const currentImages =
    siteData.templateConfig?.template3?.headerImages || [];

  if (currentImages.length >= 5) {
    alert("Max 5 images allowed");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

const res = await fetch("/api/admin/upload", {
  method: "POST",
  headers: {
    Authorization: token
  },
  body: formData
});

  const d = await res.json();

  setSiteData(prev => {
    const prevImages =
      prev.templateConfig?.template3?.headerImages || [];

    return {
      ...prev,
      templateConfig: {
        ...prev.templateConfig,
        template3: {
          ...prev.templateConfig?.template3,
          headerImages: [...prevImages, d.url] // ✅ always latest
        }
      }
    };
  });
};


const removeHeaderImage = (index) => {
  setSiteData(prev => {
    const prevImages =
      prev.templateConfig?.template3?.headerImages || [];

    const updated = [...prevImages];
    updated.splice(index, 1);

    return {
      ...prev,
      templateConfig: {
        ...prev.templateConfig,
        template3: {
          ...prev.templateConfig?.template3,
          headerImages: updated
        }
      }
    };
  });
};

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

    if (sectionIdx !== null && itemIdx !== null) handleItemChange(sectionIdx, itemIdx, key, d.url);
    else if (sectionIdx !== null) handleSectionChange(sectionIdx, key, d.url);
    else handleChange(key, d.url);
  };

  // ===== ADD / DELETE =====
  const addItem = (sectionIdx) => {
    const newSections = [...siteData.sections];
    newSections[sectionIdx].items.push({ 
      name: { ar: "", he: "" }, 
      desc: { ar: "", he: "" }, 
      price: "", 
      img: "", 
      spicy: false,
      available: true,
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
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ site_data: siteData })
  });

  if (res.ok) {
    alert("Saved!");
  } else {
    alert("Error saving!");
  }
};

  // ===== SCROLL =====
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`${notoArabic.className} text-white scroll-smooth`} dir={isRTL ? "rtl" : "ltr"}>

      {/* Header Scroll (UNCHANGED) */}
      <div dir="ltr" className="overflow-hidden w-full h-[320px] relative mb-6">
        <div className="flex w-max animate-header-scroll absolute">
          {[...headerImages, ...headerImages].map((src,i)=>(
            <div key={i} className="flex-none w-[350px] h-[320px] relative">
              <Image src={src} alt="" fill className="pointer-events-none block object-cover" />
            </div>
          ))}
        </div>
      </div>



      <div className="absolute top-[20px] left-1/2 -translate-x-1/2  flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white relative">
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
                  <label className="cursor-pointer bg-black/60 text-white px-3 py-1 mt-2 rounded text-sm">
                    تغيير الشعار
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => handleUpload(e, "logo")}
                    />
                  </label>
              <input
            value={siteData.name[lang]}
            onChange={e => handleChange("name", {...siteData.name,[lang]:e.target.value})}
            className="text-xl text-center font-bold mt-4 rounded px-2 py-1 bg-black/20 text-white border-2 border-white"
          />
          </div>

      {/* ✅ NEW BLOCK UNDER HEADER */}
  {/* ===== HEADER IMAGES EDITOR (LIVE) ===== */}
<div className="p-4 mb-6 border-t border-white/20">

  <h2 className="mb-3 font-bold text-lg">
    Header Images Editor (max 5)
  </h2>

  <div className="flex gap-4 overflow-x-auto items-center">

    {/* Existing Images */}
    {headerImages.map((img, i) => (
      <div key={i} className="relative w-[120px] h-[80px] flex-shrink-0">
        <Image src={img} alt="" fill className="object-cover rounded" />

        <button
          onClick={() => {
  if (window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
    removeHeaderImage(i);
  }
}}
          className="absolute top-1 right-1 bg-red-500 text-xs px-2 py-0.5 rounded cursor-pointer"
        >
          ✕
        </button>
      </div>
    ))}

    {/* Add Image Button */}
    {headerImages.length < 5 && (
      <label className="w-[120px] h-[80px] flex items-center justify-center border border-dashed cursor-pointer rounded bg-white/5 hover:bg-white/10 transition">
        <span className="text-sm">+ Add</span>
        <input
          type="file"
          hidden
          onChange={handleAddHeaderImage}
        />
      </label>
    )}

</div>
</div>


    {/* Socials */}
    <div className="my-2 flex flex-wrap items-center justify-center gap-3 mt-3">
      {["instagram","facebook","tiktok","phone"].map(key => (
        <div key={key} className="flex items-center gap-2">
          <label className="flex items-center gap-1 rounded px-2 py-1">
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

        {/* Timeline Button */}
        <div className="flex items-center justify-center w-full py-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center rounded-full text-sm cursor-pointer p-2 hover:bg-white hover:text-black transition border font-bold border-gray mb-2"
        >
          <RiTimeLine className="text-lg" /> 
          <p className="pl-2 text-sm">{translations[lang].workingHours}</p>
        </button>
        </div>

          {/* Language Switch */}
          <div className="relative z-50 flex justify-center gap-2 mt-5 mb-18">
            <button onClick={() => setLang("ar")} className={`px-3 py-1 cursor-pointer rounded border ${lang==="ar"?"bg-black text-white":""}`}>عربي</button>
            <button onClick={() => setLang("he")} className={`px-3 py-1 cursor-pointer rounded border ${lang==="he"?"bg-black text-white":""}`}>עברית</button>
          </div>


      {/* Hours Modal */}
      <Dialog open={isOpen} onClose={()=>setIsOpen(false)} className="relative z-50000">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-[#101820] text-white border border-[#f2aa4c] p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col ">
            <DialogTitle className="text-[1.25rem] pb-3 text-right font-bold">{translations[lang].workingHours}</DialogTitle>
            <ul className="space-y-1 text-gray-700">
              {Object.entries(siteData.hours || {}).map(([day,time])=>(
                <li key={day} className="flex justify-between text-gray-300">
                  <input value={time} onChange={e=>handleChange('hours',{...siteData.hours,[day]:e.target.value})} className="text-left border px-2 py-1 rounded w-32 "/>
                  <span className="font-bold">{translations[lang].days[day]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex justify-center">
              <button onClick={()=>setIsOpen(false)} className="bg-[#f2aa4c] hover:bg-[#fff] hover:text-black border-2 text-black hover:border-[#f2aa4c] px-3 py-1 rounded cursor-pointer transition font-bold">{translations[lang].workingHoursModalClose}</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Selected Item Modal */}
      <Dialog open={!!selectedItem} onClose={()=>setSelectedItem(null)} className="relative z-50000">
        <div className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg w-[90vw] max-w-md overflow-hidden shadow-xl">
            {selectedItem && (
              <>
                <div className="relative w-full h-[250px]">
                  <Image src={selectedItem.img} alt={selectedItem.name[lang]} fill className="object-cover pointer-events-none"/>
                </div>
                <div className="p-4 text-black">
                  <DialogTitle className="text-lg text-right font-bold">{selectedItem.name[lang]}</DialogTitle>
                  <p className="text-sm text-right text-gray-600 mt-2">{selectedItem.desc?.[lang]}</p>
                  <div className="flex justify-between items-center mt-4 font-bold">
                    <button onClick={()=>setSelectedItem(null)} className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">{translations[lang].workingHoursModalClose}</button>
                    <span>₪{selectedItem.price}</span>
                  </div>
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>

      {/* Socials */}
      <div className="flex flex-col fixed right-[20px] bottom-[20px] z-100 flex-wrap items-center justify-center gap-1">
        {["instagram","facebook","tiktok","phone"].map(key => siteData[key] && (
          <Link key={key} href={key==="phone"?`tel:${siteData[key]}`:siteData[key]} target="_blank" className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md text-white hover:bg-white hover:border-[#f2aa4c] hover:text-black transition">
            {key==="instagram"?<FaInstagram/>:key==="facebook"?<FaFacebook/>:key==="tiktok"?<FaTiktok/>:<FaPhoneAlt/>}
          </Link>
        ))}
      </div>











      {/* Sections */}
      {siteData.sections.map((section,i)=> {
        const isSectionOpen = true;
        return (
          <div key={i} className={`flex flex-col gap-5 p-3 w-[90%] md:w-[65%] mx-auto overflow-hidden rounded-md h-auto transition ${isSectionOpen?"border mb-12 border-gray-400":""}`}>
            <button className="relative flex items-center w-full h-[190px] px-4 overflow-hidden rounded-[4px] transition">
              <div className="absolute left-0 top-0 h-full w-[45%]">
                <Image src={section.image} alt="" fill className="object-cover pointer-events-none" style={{maskImage:"linear-gradient(to right, black 60%, transparent)", WebkitMaskImage:"linear-gradient(to right, black 10%, transparent)"}}/>
              </div>
              <span className="relative z-10 text-right font-semibold hidden">{section.title[lang]}</span>
              <input value={section.title[lang]} onChange={e => handleSectionChange(i,"title",{...section.title,[lang]:e.target.value})} className="relative z-10 text-right font-semibold bg-gray-600 rounded px-2 py-1 max-w-[170px]" />            
      <label className="cursor-pointer absolute bottom-0 left-0 bg-black m-2 text-white px-3 py-1 rounded text-sm">
                تغيير صورة القسم
        <input
          type="file"
          className="hidden"
          onChange={e=>handleUpload(e,"image",i)}
        />
      </label>

            </button>

            <div className={`transition-all duration-300 gap-6 overflow-hidden ${isSectionOpen?"max-h-[10000px] opacity-100":"max-h-0 opacity-0"}`}>
              <div className="flex flex-col gap-6 p-4 last:border-b-0">
                {section.items.map((item,idx)=>(
                  <div key={idx} className="flex items-start justify-between border-b border-gray-100 pb-4">
                    <div className="flex flex-col gap-1 text-right max-w-[55%]">
                      <input placeholder="name" value={item.name[lang]} onChange={e=>handleItemChange(i,idx,"name",{...item.name,[lang]:e.target.value})} className="border px-2 py-1 rounded text-right"/>

                      <input placeholder="price" value={item.price}  onChange={e=>handleItemChange(i,idx,"price",e.target.value)} className="border px-2 py-1 w-full rounded"/>
                      <textarea placeholder="description" value={item.desc[lang]} onChange={e=>handleItemChange(i,idx,"desc",{...item.desc,[lang]:e.target.value})} className="border w-full px-2 py-1 rounded"/>
                      
      <label className="cursor-pointer text-center w-full bg-black my-2 text-white px-3 py-1 rounded text-sm">
     تغيير صورة العنصر
        <input
          type="file"
          className="hidden"
          onChange={e=>handleUpload(e,"img",i,idx)}
        />
      </label>
                      
                    
                  <div className="flex items-center justify-between mb-1">
  <label className="flex items-center gap-2">
    <input 
      type="checkbox" 
      checked={item.spicy || false} 
      onChange={e => handleItemChange(i, idx, "spicy", e.target.checked)} 
    />
    <span>حار</span>
  </label>
    <label className="flex items-center gap-2">
    <input 
      type="checkbox" 
      checked={item.available ?? true} 
      onChange={e => handleItemChange(i, idx, "available", e.target.checked)} 
    />
    <span>متوفر</span>
  </label>
</div>
                <button onClick={()=>{
  if (window.confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
    deleteItem(i,idx);
  }
}}
 className="cursor-pointer text-white text-sm text-center hover:bg-red-500 hover:text-white transition py-2 px-4 rounded w-full border border-red-500">حذف العنصر</button>

                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] flex-shrink-0 border-2 rounded border-white">
                      {item.img && <Image src={item.img} alt={item.name[lang]} fill className="object-cover rounded-md pointer-events-none"/>}
                      {!item.available && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg font-bold z-20 pointer-events-none">{translations[lang].notAvailable}</div>}
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-1">
        <div className="flex items-center justify-between w-full mt-2">
          {item.name[lang]  && (<p>{item.name[lang]}</p>)}
      
        {item.spicy && (
        <span className="w-5 h-5 flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24"><path fill="#de5323" d="M120.74 54.44c.04 1.58-.01 5.59-4.04 14.85c-5.21 11.95-11.17 19.9-14.98 23.7c-3.96 4.78-16.12 18.16-36.47 22.14c-4.69.92-27.32 5.42-43.5-8.33C19.6 104.95 10.87 97.32 10 86c-.36-4.69.56-10.8 2.91-11.33c2.77-.63 4.21 7.23 11.98 12.85c.97.7 9.59 6.75 20.32 4.69c9.76-1.87 15.27-9.3 17.45-12.24c4.93-6.65 6.59-13.82 8.33-21.36c2.01-8.66 2.18-15.46 7.81-21.36c1.06-1.11 2.06-2.14 3.73-3.04c5.69-3.06 12.01-.76 20.84 2.6c8.46 3.23 13.66 5.29 16.06 10.59c1.19 2.62 1.26 5.03 1.31 7.04"/><path fill="#a0b632" d="M82.84 33.8c1.98-1.03 5.01-2.25 9.44-2.21c.93.01 2.05.05 3.33.19c1.1.12 5.3-2.33 6.2-3.77c.82-1.31 1.52-2.7 2.32-4.17c.98-1.79 2.52-4.87 2.7-6.62c.37-3.66-.41-7.81-7.02-6.88c-.82.11-2.73 1.18-3.28-.28c-1.12-2.93 4.86-5.09 8.87-3.21c4.47 2.1 6.19 7.7 6.43 8.92c.61 2.97-.07 5.44-1.39 10.24c-.53 1.94-.91 3.39-1.31 4.94c-.58 2.28.46 5.22 1.23 5.67c4.82 2.77 7.09 6.03 8.15 7.93c1.59 2.85 2.94 7.17 1.95 7.81c-.6.39-2-.62-2.44-.94c-1.43-1.04-1.45-1.88-2.44-2.83c-1.57-1.51-4.11-1.85-5.93-1.5c-2.64.51-2.98 2.48-4.49 2.21c-1.78-.31-1.44-3.11-4.56-5.53c-1.6-1.25-3.15-1.64-3.58-1.74a9.2 9.2 0 0 0-3.97-.02c-2.19.47-2.4 1.37-4.1 1.43c-1.43.05-3.18-.52-3.39-1.43c-.19-.84 1.07-1.25 1.24-2.8c.02-.18.14-1.47-.65-2.28c-.69-.7-1.73-.71-3.54-.72c-1.66-.01-2.35.23-2.47-.04c-.19-.45 1.45-1.72 2.7-2.37"/><path fill="#fff" d="M76.37 75.84c-.44-.03-.89-.16-1.28-.43a2.61 2.61 0 0 1-.74-3.61c1.96-2.97 2.55-7.71 3.03-11.51c.28-2.2.52-4.1.97-5.63c1.5-5.06 5.05-6.67 5.45-6.83a2.603 2.603 0 0 1 2.04 4.79c-.14.07-1.73.91-2.5 3.52c-.33 1.13-.56 2.92-.8 4.81c-.55 4.34-1.23 9.75-3.85 13.73c-.53.79-1.42 1.21-2.32 1.16M67.4 89.69a2.59 2.59 0 0 1-2.25-1.47c-.63-1.3-.08-2.85 1.21-3.48c1.52-.74 3.04-3.29 3.64-4.73a2.6 2.6 0 0 1 3.4-1.4a2.6 2.6 0 0 1 1.41 3.4c-.23.57-2.4 5.59-6.19 7.42c-.39.19-.81.27-1.22.26"/></svg>
                      </span>
                    )}
                    </div>
                    <div className="flex flex-col items-start justify-bettween w-full gap-1">
                    {item.price && (<p>₪{item.price}</p>)}
                    </div>
                    </div>
                    </div>
                  </div>
                ))}
                <button onClick={()=>addItem(i)} className="px-3 py-1 bg-green-600 text-white cursor-pointer rounded hover:bg-green-700">+ إضافة عنصر</button>
              </div>
            </div>
            <button onClick={()=>{
  if (window.confirm("هل أنت متأكد من حذف هذا القسم؟")) {
    deleteSection(i);
  }
}}
 className="px-3 py-1 bg-red-600 text-white cursor-pointer rounded mt-2 hover:bg-red-700">حذف القسم</button>
          </div>
        )
      })}



<div className="flex flex-col items-center gap-4 my-16">

  {/* Template Selector */}
  <div className="flex flex-col items-center gap-2">
    <label className="font-semibold">اختر القالب</label>

    <select
      value={siteData.template}
      onChange={(e) => handleChange("template", e.target.value)}
      className="border px-4 py-2 rounded bg-white cursor-pointer text-black text-center"
    >
      <option value="template1">Template 1</option>
      <option value="template2">Template 2</option>
      <option value="template3">Template 3</option>
      <option value="template4">Template 4</option>
      <option value="template5">Template 5</option>
      <option value="template6">Template 6</option>
    </select>
  </div>

  {/* Save Button */}
  <button
    onClick={handleSave}
    className="bg-black text-white px-6 py-3 rounded text-lg cursor-pointer hover:bg-gray-800 transition"
  >
    حفظ جميع التغييرات
  </button>

</div>
</div>
);
}
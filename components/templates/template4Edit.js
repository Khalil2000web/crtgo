"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaInstagram, FaFacebook, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";
import { Globe, X, MapPin } from "lucide-react";
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

export default function Template4Edit({ data, token }) {

  const [siteData, setSiteData] = useState(data);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("ar");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const isRTL = lang === "ar" || lang === "he";

  useEffect(() => {
    setMounted(true);
    document.body.style.backgroundColor = "#e2e2e2";
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % siteData.headerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [siteData.headerImages.length]);

  if (!mounted) return null;

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

  const sections = siteData.sections || [];

  return (
    <div className={`${notoArabic.className}`} dir={isRTL ? "rtl" : "ltr"}>

      {/* HEADER IMAGES */}
      <div className="h-[340px] w-full md:w-[60%] mx-auto relative">
        {siteData.headerImages.map((src, i) => (
          <div key={i} className={`absolute inset-0 ${i === index ? "opacity-100" : "opacity-0"} transition`}>
            <Image src={src} alt="" fill className="object-cover rounded-b-[20px]" />
          </div>
        ))}
      </div>


      {/* CARD */}
      <div className="absolute z-10 top-[190px] left-1/2 -translate-x-1/2 w-[85vw] md:w-[55%] bg-gray-100 rounded-[20px] p-6 text-center">


<div className="flex flex-col mx-auto items-center justify-center gap-2 w-[70%]">
        <input
          value={siteData.name[lang]}
          onChange={(e)=>handleChange("name",{...siteData.name,[lang]:e.target.value})}
          className="text-xl font-bold text-center bg-transparent border-b w-full"
        />

        <input
          value={siteData.mainDesc[lang]}
          onChange={(e)=>handleChange("mainDesc",{...siteData.mainDesc,[lang]:e.target.value})}
          className="block w-full text-center mt-2 bg-transparent border-b"
        />
      
      <div className="flex items-center justify-center gap-2 mt-2 w-full">
        <input
          value={siteData.location[lang]}
          onChange={(e)=>handleChange("location",{...siteData.location,[lang]:e.target.value})}
          className="block w-full text-center mt-2 bg-transparent border-b"
        />
        <MapPin size={18} />
      </div>


      <div className="mt-6 flex flex-row text-black flex-wrap items-center justify-center gap-1">
        {["instagram","facebook","tiktok","phone"].map(key => siteData[key] && (
          <Link key={key} href={key==="phone"?`tel:${siteData[key]}`:siteData[key]} target="_blank" className="flex items-center justify-center border-2 border-transparent w-9 h-9 rounded-md text-black hover:bg-white hover:border-[#000] hover:text-black transition">
            {key==="instagram"?<FaInstagram/>:key==="facebook"?<FaFacebook/>:key==="tiktok"?<FaTiktok/>:<FaPhoneAlt/>}
          </Link>
        ))}
      </div>
      </div>
      </div>



      {/* LOGO */}
<div className="flex flex-row items-center justify-around w-full mt-32 mb-15">
              <label className="bg-black text-white text-xs px-5 py-4 rounded cursor-pointer hover:bg-white hover:text-black transition border">
                تغيير صورة اللوغو
                <input type="file" hidden onChange={(e)=>handleUpload(e,"logo")} />
              </label>
      <div className="w-26 h-26 rounded-full overflow-hidden border-2 border-black relative">
        <Image src={siteData.logo} alt="" fill className="object-cover" />

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
          className="flex items-center justify-center rounded-full text-sm cursor-pointer p-2 hover:bg-white hover:text-black transition border font-bold border-gray mb-2 gap-2"
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
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-gray-300 text-black border border-[#000] p-6 rounded-md w-[70vh] md:w-[50vh] min-h-[350px] shadow-lg flex flex-col ">
            <DialogTitle className="text-[1.25rem] pb-3 text-right font-bold">{translations[lang].workingHours}</DialogTitle>
            <ul className="space-y-1 text-black">
              {Object.entries(siteData.hours || {}).map(([day,time])=>(
                <li key={day} className="flex justify-between text-black">
                  <input value={time} onChange={e=>handleChange('hours',{...siteData.hours,[day]:e.target.value})} className="text-right border px-2 py-1 rounded w-28"/>
                  <span className="font-bold">{translations[lang].days[day]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex justify-center">
              <button onClick={()=>setIsOpen(false)} className="bg-[#000] hover:bg-[#fff] hover:text-black border-2 border-black text-white hover:border-[#000] px-3 py-1 rounded cursor-pointer transition font-bold">{translations[lang].workingHoursModalClose}</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>




      {/* SECTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-[60%] mx-auto mt-20">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col items-center gap-3">

            <div className="relative w-[120px] h-[120px]">
              <Image src={section.image} alt="" fill className="border border-black object-cover rounded-full" />
              <label className="absolute bottom-1 right-1 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer">
                تغيير الصورة
                <input type="file" hidden onChange={(e)=>handleUpload(e,"image",i)} />
              </label>
            </div>

            <input
              value={section.title[lang]}
              onChange={(e)=>handleSectionChange(i,"title",{...section.title,[lang]:e.target.value})}
              className="text-center font-semibold border rounded bg-transparent"
            />

            <button onClick={()=>setActiveSection({section, index:i})} className="cursor-pointer text-sm text-blue-500 hover:text-blue-700 hover:bg-blue-400/50 p-2 rounded">
              تعديل العناصر
            </button>
            <button 
            onClick={()=>{
  if (window.confirm("هل أنت متأكد من حذف هذا القسم؟")) {
    deleteSection(i);
  }
}} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm cursor-pointer rounded mt-6">حذف القسم</button>
          </div>
        ))}
      </div>

      {/* ITEMS MODAL */}
<Dialog open={!!activeSection} onClose={() => setActiveSection(null)} className="relative z-50">
  <div className="fixed inset-0 bg-black/60" />

  <div className="fixed inset-0 flex items-center justify-center">
    <DialogPanel className="bg-white w-full h-screen overflow-y-auto max-w-full py-18 px-4 rounded">

      {/* SECTION TITLE */}
      {activeSection && (
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">
            {siteData.sections[activeSection.index].title[lang]}
          </h2>
        </div>
      )}

      {/* ITEMS */}
      {activeSection &&
        siteData.sections[activeSection.index].items.map((item, idx) => (
          <div
            key={idx}
            className="relative flex items-start justify-between gap-3 mb-10 border-b pb-8 last:border-0"
          >

            {/* IMAGE */}
            <div className="relative w-30 h-30">
            {/* ✅ UNAVAILABLE OVERLAY */}
            {!item.available && (
              <div className="absolute inset-0 break-normal bg-black/60 flex items-center justify-center text-white text-lg text-center font-bold z-20 pointer-events-none rounded">
                {translations[lang].notAvailable}
              </div>
            )}
              <Image
                src={item.img}
                alt="Item Image"
                fill
                className="object-cover rounded border border-black"
              />

              {/* ✅ SPICY ICON */}
              {item.spicy && (
                <span className="absolute top-1 left-1 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="20" height="20">
                    <path fill="#de5323" d="M120.74 54.44c.04 1.58-.01 5.59-4.04 14.85c-5.21 11.95-11.17 19.9-14.98 23.7c-3.96 4.78-16.12 18.16-36.47 22.14c-4.69.92-27.32 5.42-43.5-8.33C19.6 104.95 10.87 97.32 10 86c-.36-4.69.56-10.8 2.91-11.33c2.77-.63 4.21 7.23 11.98 12.85c.97.7 9.59 6.75 20.32 4.69c9.76-1.87 15.27-9.3 17.45-12.24c4.93-6.65 6.59-13.82 8.33-21.36c2.01-8.66 2.18-15.46 7.81-21.36c1.06-1.11 2.06-2.14 3.73-3.04c5.69-3.06 12.01-.76 20.84 2.6c8.46 3.23 13.66 5.29 16.06 10.59c1.19 2.62 1.26 5.03 1.31 7.04"/>
                  </svg>
                </span>
              )}

              <label className="absolute bottom-1 right-1 bg-black text-white text-xs p-2 rounded cursor-pointer">
                + تغيير الصورة
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleUpload(e, "img", activeSection.index, idx)
                  }
                />
              </label>
            </div>

            {/* INPUTS */}
            <div className="flex flex-col gap-2 flex-1 max-w-[70%] text-right">

              <input
                value={item.name[lang]}
                placeholder="Name"
                onChange={(e) =>
                  handleItemChange(activeSection.index, idx, "name", {
                    ...item.name,
                    [lang]: e.target.value,
                  })
                }
                className="border px-2 py-1 w-full text-right"
              />

              <input
                value={item.price}
                placeholder="Price"
                onChange={(e) =>
                  handleItemChange(activeSection.index, idx, "price", e.target.value)
                }
                className="border px-2 py-1 w-full text-right"
              />

              <textarea
                value={item.desc[lang]}
                placeholder="Description"
                onChange={(e) =>
                  handleItemChange(activeSection.index, idx, "desc", {
                    ...item.desc,
                    [lang]: e.target.value,
                  })
                }
                className="border px-2 py-1 w-full text-right"
              />

              {/* FLAGS */}
              <div className="flex items-center justify-between mt-2">

                {/* SPICY */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.spicy || false}
                    onChange={(e) =>
                      handleItemChange(activeSection.index, idx, "spicy", e.target.checked)
                    }
                  />
                  <span>حار</span>
                </label>

                {/* AVAILABLE */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.available ?? true}
                    onChange={(e) =>
                      handleItemChange(activeSection.index, idx, "available", e.target.checked)
                    }
                  />
                  <span>متوفر</span>
                </label>

              </div>

              {/* DELETE */}
              <button

onClick={()=>{
  if (window.confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
    deleteItem(activeSection.index, idx);
  }
}}  
className="cursor-pointer text-black font-bold text-sm hover:bg-red-500 hover:text-white transition py-2 px-4 rounded w-full border border-red-500 mt-2"
              >
                حذف العنصر
              </button>

            </div>
          </div>
        ))}

      {/* ADD ITEM */}
      <div className="flex justify-end mb-10">
        <button
          onClick={() => addItem(activeSection.index)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + إضافة عنصر
        </button>
      </div>

      {/* CLOSE */}
      <button
        onClick={() => setActiveSection(null)}
        className="fixed cursor-pointer font-bold bottom-0 left-0 w-full bg-black text-white px-4 py-5 hover:bg-white hover:text-black border-t-2 border-black"
      >
        اغلاق
      </button>

    </DialogPanel>
  </div>
</Dialog>


<div className="flex flex-col items-center gap-4 mt-25 mb-10">
    <button onClick={addSection} className="cursor-pointer border border-green-600 text-green-600 rounded px-4 py-2 hover:bg-green-600 hover:text-white transition mb-12">+ إضافة قسم</button>

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
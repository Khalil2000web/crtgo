// app/menu/page.js
"use client";

import { useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MenuPage() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayData, setOverlayData] = useState({
    name: "",
    price: "",
    desc: "",
    img: "",
  });
  const scrollPosRef = useRef(0);

  const menuSections = [
    {
      id: "جديد",
      title: "وجبات جديدة!",
      items: Array(5).fill({
        name: "برجر نباتي",
        price: "50₪",
        desc: "كرات بطاطا البيريه مغطاه بالجبنة الذائبة",
        img: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      }),
    },
    {
      id: "برجر",
      title: "برجر",
      items: Array(5).fill({
        name: "برجر نباتي",
        price: "50₪",
        desc: "كرات بطاطا البيريه مغطاه بالجبنة الذائبة",
        img: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      }),
    },
    {
      id: "مشروبات",
      title: "مشروبات",
      items: Array(5).fill({
        name: "برجر نباتي",
        price: "50₪",
        desc: "كرات بطاطا البيريه مغطاه بالجبنة الذائبة",
        img: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      }),
    },
  ];

  const openOverlay = (item) => {
    scrollPosRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosRef.current}px`;
    setOverlayData(item);
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosRef.current);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans bg-[#fefefe] text-[#877259] scroll-smooth" dir="rtl">
      {/* Header */}
      <header className="relative w-full h-[350px] flex items-end justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349"
          alt="Logo"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <h2 className="relative z-10 text-white text-[clamp(2rem,5vw,4rem)] pb-5">
          [RESTU NAME]
        </h2>
      </header>

      {/* Section Buttons */}
      <div className="sticky top-0 z-[100000] flex flex-wrap justify-center gap-4 bg-[#fefefeb6] border-b border-[#1111111c] py-6">
        {menuSections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="border border-black rounded font-bold px-4 py-2 transition-transform hover:scale-105 text-[#6c5e4f]"
          >
            {section.id}
          </button>
        ))}
      </div>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.id} id={section.id} className="py-8">
          <h2 className="text-center text-[#1e394b] text-xl mb-5">{section.title}</h2>
          <div className="flex overflow-x-auto gap-6 px-5 scrollbar-none">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[260px] border-l border-[#1111111c] text-center"
                onClick={() => openOverlay(item)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[200px] h-[200px] object-cover rounded-full mx-auto"
                />
                <div className="p-4 flex flex-col">
                  <div className="font-semibold text-base mb-1">{item.name}</div>
                  <div className="text-[#1e394b] mb-2">{item.price}</div>
                  <div className="text-[#6c5e4f] text-sm overflow-auto">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <footer className="mt-12 border-t border-[#1111111c] text-center flex flex-col items-center justify-center py-8">
        <div className="flex flex-wrap justify-center gap-8 w-[90%] pb-8">
          {/* Social Links */}
          <a href="#" className="text-black p-1 rounded hover:bg-black/10 transition">
            {/* Instagram SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-5 h-5"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          </a>
          {/* Add other social links similarly */}
        </div>
        <p>&copy; 2025 [RESTU NAME] — جميع الحقوق محفوظة</p>
        <p>
          <a href="#">شروط الاستخدام</a>
        </p>
        <p>
          CREATED BY <a href="https://khaliil.com/">KHALIIL</a>.
        </p>
      </footer>

      {/* Overlay */}
      <Transition show={overlayOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/95"
          onClose={closeOverlay}
        >
          <Transition.Child
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-12"
          >
            <Dialog.Panel className="bg-[#fefefe] rounded w-[90%] max-w-lg p-6 text-center relative">
              <img
                src={overlayData.img}
                alt={overlayData.name}
                className="w-full max-h-[280px] object-cover rounded mb-4"
              />
              <Dialog.Title className="text-lg font-semibold mb-1">
                {overlayData.name}
              </Dialog.Title>
              <p className="text-[#1e394b] mb-1">{overlayData.price}</p>
              <p className="text-[#6c5e4f]">{overlayData.desc}</p>
              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white border border-white/50 rounded px-3 py-1 text-2xl cursor-pointer bg-transparent"
                onClick={closeOverlay}
              >
                &#x2715;
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
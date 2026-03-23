"use client"

import { useState } from 'react';
import { translations } from './translations';
import {Header} from '@/components/Header';
import {Hero} from '@/components/Hero';
import {Services} from '@/components/Services';
import {About} from '@/components/About';
import {Portfolio} from '@/components/Portfolio';
import {Prices} from '@/components/Prices';
import {Contact} from '@/components/Contact';
import {Footer} from '@/components/Footer';
import {TemplatesPreview} from '@/components/TemplatesPreview';
import { Noto_Sans_Arabic, Zain } from "next/font/google";

const notoArabic = Noto_Sans_Arabic({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["arabic"],
  display: "swap",
});

const zain = Zain({
  weight: ["200","300","400","700","800","900"],
  style: ["normal", "italic"],
  subsets: ["arabic"],
  display: "swap",
});


export default function Page() {
  const [lang, setLang] = useState('ar');
  const t = translations[lang];

  return (
    <div className="min-h-screen" dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}>
      <Header lang={lang} setLang={setLang} t={t} />
      <Hero lang={lang} t={t} />
      <Services lang={lang} t={t} />
      <About lang={lang} t={t} />
      <Portfolio lang={lang} t={t} />
      <TemplatesPreview lang={lang} t={t} />
      <Prices lang={lang} t={t} />
      <Contact lang={lang} t={t} />
      <Footer lang={lang} t={t} />
    </div>
  );
}





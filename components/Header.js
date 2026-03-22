import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export function Header({ lang, setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const isRTL = lang === 'ar' || lang === 'he';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">crtgo</span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="#services" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.services}
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.about}
            </a>
            <a href="#portfolio" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.portfolio}
            </a>
            <a href="#prices" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.prices}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.contact}
            </a>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Globe size={20} />
                <span className="text-sm text-black">{lang === 'ar' ? 'ع' : 'עב'}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px]">
                  <button
                    onClick={() => {
                      setLang('ar');
                      setLangMenuOpen(false);
                    }}
                    className="cursor-pointer block w-full px-4 py-2 text-right hover:bg-orange-50 text-sm"
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => {
                      setLang('he');
                      setLangMenuOpen(false);
                    }}
                    className="cursor-pointer w-full px-4 py-2 text-right hover:bg-orange-50 text-sm"
                  >
                    עברית
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="cursor-pointer md:hidden flex items-center gap-4">
            {/* Language Selector Mobile */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="cursor-pointer flex items-center gap-1 text-gray-700"
              >
                <Globe size={20} />
              </button>
              
              {langMenuOpen && (
                <div className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] ${isRTL ? 'left-0' : 'right-0'}`}>
                  <button
                    onClick={() => {
                      setLang('ar');
                      setLangMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-right hover:bg-orange-50 text-sm"
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => {
                      setLang('he');
                      setLangMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-right hover:bg-orange-50 text-sm"
                  >
                    עברית
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 space-y-3 ${isRTL ? 'text-right' : ''}`}>
            <a
              href="#services"
              className="block text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.services}
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.about}
            </a>
            <a
              href="#portfolio"
              className="block text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.portfolio}
            </a>
            <a
              href="#prices"
              className="block text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.prices}
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.contact}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

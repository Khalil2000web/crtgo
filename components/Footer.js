import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer({ lang, t }) {
  const isRTL = lang === 'ar' || lang === 'he';

  return (
    <footer className={`bg-gray-900 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className={`space-y-3 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-2xl font-bold text-orange-500">crtgo</div>
            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className="font-bold text-white mb-3">{t.company}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-orange-500 transition-colors">{t.about}</a></li>
              <li><a href="#portfolio" className="hover:text-orange-500 transition-colors">{t.portfolio}</a></li>
              <li><a href="#prices" className="hover:text-orange-500 transition-colors">{t.prices}</a></li>
              <li><a href="#contact" className="hover:text-orange-500 transition-colors">{t.contact}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className="font-bold text-white mb-3">{t.contact}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@crtgo.com" className="hover:text-orange-500 transition-colors">
                  hello@crtgo.com
                </a>
              </li>
            
            </ul>
          </div>
        </div>

        <div className={`border-t border-gray-800 pt-6 text-center text-sm ${isRTL ? 'text-center' : ''}`}>
          <p>&copy; 2026 crtgo. {t.allRights}</p>
        </div>
      </div>
    </footer>
  );
}
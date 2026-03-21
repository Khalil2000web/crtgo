import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export function Contact({ lang, t }) {
  const isRTL = lang === 'ar' || lang === 'he';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className={`py-16 px-4 sm:px-6 lg:px-8 bg-white ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 ${isRTL ? 'text-right md:text-center' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.contactTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t.emailMe}</h3>
                <a href="mailto:hello@crtgo.com" className="text-orange-600 hover:underline">
                  help@crtgo.com
                </a>
              </div>
            </div>


          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={t.yourName}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${isRTL ? 'text-right' : ''}`}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={t.yourEmail}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${isRTL ? 'text-right' : ''}`}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder={t.yourPhone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${isRTL ? 'text-right' : ''}`}
                required
              />
            </div>
            <div>
              <textarea
                placeholder={t.yourMessage}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${isRTL ? 'text-right' : ''}`}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              {t.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export function Hero({ lang, t }) {
  const isRTL = lang === 'ar' || lang === 'he';

  return (
    <section className={`pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {t.heroTitle}{' '}
              <span className="text-orange-600">{t.heroTitleHighlight}</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.heroDescription}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a href="#contact" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors text-center">
                {t.startProject}
              </a>
              <a href="#portfolio" className="border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors text-center">
                {t.viewWork}
              </a>
            </div>

            {/* Stats */}
            <div className={`hidden grid grid-cols-3 gap-6 pt-6 ${isRTL ? 'text-right' : ''}`}>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-gray-600">{t.projects}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-orange-600">40+</div>
                <div className="text-sm text-gray-600">{t.clients}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">{t.satisfaction}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl opacity-20 blur-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1609951734391-b79a50460c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbWVudSUyMHRhYmxldCUyMG9yZGVyaW5nfGVufDF8fHx8MTc3NDExMDIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Digital menu tablet"
              className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

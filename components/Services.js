import { Smartphone, Monitor, Code, Zap } from 'lucide-react';

export function Services({ lang, t }) {
  const isRTL = lang === 'ar' || lang === 'he';

  const services = [
    {
      icon: Smartphone,
      title: t.digitalMenus,
      description: t.digitalMenusDesc,
    },
    {
      icon: Monitor,
      title: t.websites,
      description: t.websitesDesc,
    },
    {
      icon: Code,
      title: t.customDev,
      description: t.customDevDesc,
    },
    {
      icon: Zap,
      title: t.fastPerf,
      description: t.fastPerfDesc,
    },
  ];

  return (
    <section id="services" className={`py-16 px-4 sm:px-6 lg:px-8 bg-white ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${isRTL ? 'text-right md:text-center' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.servicesTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all ${isRTL ? 'text-right' : ''}`}
              >
                <div className={`w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 ${isRTL ? 'mr-auto' : ''}`}>
                  <Icon className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
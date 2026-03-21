import { User, Heart, Headphones } from 'lucide-react';

export function About({ lang, t }) {
  const isRTL = lang === 'ar' || lang === 'he';

  const reasons = [
    {
      icon: User,
      title: t.directComm,
      description: t.directCommDesc,
    },
    {
      icon: Heart,
      title: t.customSolutions,
      description: t.customSolutionsDesc,
    },
    {
      icon: Headphones,
      title: t.support,
      description: t.supportDesc,
    },
  ];

  return (
    <section id="about" className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${isRTL ? 'text-right md:text-center' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.aboutTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {t.aboutSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
            <p className="text-gray-700 leading-relaxed">
              {t.aboutText1}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t.aboutText2}
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1750056393300-102f7c4b8bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBsYXB0b3AlMjBtb2NrdXB8ZW58MXx8fHwxNzc0MDgzODI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Web design"
              className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
            />
          </div>
        </div>

        <div className={`mt-12 ${isRTL ? 'text-right md:text-center' : 'text-center'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.whyMe}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className={`p-6 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <div className={`w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4 ${isRTL ? 'mr-auto md:mx-auto' : 'mx-auto'}`}>
                    <Icon className="text-orange-600" size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{reason.title}</h4>
                  <p className="text-gray-600 text-sm">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
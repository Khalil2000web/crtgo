import { Check } from 'lucide-react';

export function Prices({ lang, t }) {
  const isRTL = lang === 'ar' || lang === 'he';

  const packages = [
    {
      name: t.basic,
      price: t.basicPrice,
      features: [
        t.basicFeature1,
        t.basicFeature2,
        t.basicFeature3,
        t.basicFeature4,
      ],
      popular: false,
    },
    {
      name: t.standard,
      price: t.standardPrice,
      features: [
        t.standardFeature1,
        t.standardFeature2,
        t.standardFeature3,
        t.standardFeature4,
        t.standardFeature5,
      ],
      popular: true,
    },
    {
      name: t.premium,
      price: t.premiumPrice,
      features: [
        t.premiumFeature1,
        t.premiumFeature2,
        t.premiumFeature3,
        t.premiumFeature4,
        t.premiumFeature5,
        t.premiumFeature6,
      ],
      popular: false,
    },
  ];

  return (
    <section id="prices" className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${isRTL ? 'text-right md:text-center' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.pricesTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {t.pricesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl border-2 ${
                pkg.popular ? 'border-orange-500 shadow-xl' : 'border-gray-200'
              } bg-white ${isRTL ? 'text-right' : ''}`}
            >
              {pkg.popular && (
                <div className={`absolute -top-3 ${isRTL ? 'right-6' : 'left-6'} bg-orange-600 text-white px-4 py-1 rounded-full text-sm`}>
                  {t.popular}
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-orange-600 mb-6">{pkg.price}</div>
              
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Check className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`hidden w-full py-3 rounded-lg font-medium transition-colors ${
                pkg.popular
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              }`}>
                {t.selectPackage}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Portfolio({ lang, t }) {
  const isRTL = lang === 'ar' || lang === 'he';

  const projects = [
    {
      title: t.project1,
      category: t.project1Cat,
      image: 'https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc0MDIxMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: t.project2,
      category: t.project2Cat,
      image: 'https://images.unsplash.com/photo-1573840357491-06851c72e0d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwbW9kZXJufGVufDF8fHx8MTc3Mzk4NDg5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: t.project3,
      category: t.project3Cat,
      image: 'https://images.unsplash.com/photo-1765213310059-d7b273a09b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWVudSUyMHFyJTIwY29kZXxlbnwxfHx8fDE3NzQxMTAyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section id="portfolio" className={`py-16 px-4 sm:px-6 lg:px-8 bg-white ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${isRTL ? 'text-right md:text-center' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.portfolioTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {t.portfolioSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <div className={`text-orange-400 text-sm mb-1 ${isRTL ? 'text-right' : ''}`}>
                  {project.category}
                </div>
                <h3 className={`text-white text-lg font-bold ${isRTL ? 'text-right' : ''}`}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function Template2({ data }) {
  return (
    <div className="bg-black text-white p-10">

      <h1 className="text-5xl mb-8">
        {data.name}
      </h1>

      {data.sections.map((section, i) => {

        if (section.type === "menu") {
          return (
            <div key={i} className="bg-red-900 mb-10">

              <h2 className="text-3xl mb-6">
                {section.title}
              </h2>

              {section.items.map((item) => (
                <div key={item.name} className="flex justify-between border-b border-gray-700 py-2">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}

            </div>
          )
        }

        return null
      })}

    </div>
  )
}

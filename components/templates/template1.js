export default function Template1({ data }) {
  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        {data.name}
      </h1>

      {data.sections.map((section, i) => {

        if (section.type === "menu") {
          return (
            <div key={i} className="mb-8">

              <h2 className="text-2xl mb-4">
                {section.title}
              </h2>

              {section.items.map((item) => (
                <div key={item.name} className="flex justify-between">
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

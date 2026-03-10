export default function CafeModern({ data }) {
  return (
    <div className="min-h-screen bg-neutral-50">

      <section className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold mb-4">
          {data.name}
        </h1>

        <p className="text-neutral-600 mb-8">
          {data.description}
        </p>

        <img
          src={data.heroImage}
          alt={data.name}
          className="w-full h-[300px] object-cover rounded-xl mb-10"
        />

        <h2 className="text-2xl font-semibold mb-4">
          Menu
        </h2>

        <div className="space-y-3">

          {data.products.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-2"
            >
              <span>{item.name}</span>
              <span className="text-neutral-500">{item.price}</span>
            </div>
          ))}

        </div>

        <div className="mt-10 text-sm text-neutral-600">
          <p>📍 {data.location}</p>
          <p>⏰ {data.hours}</p>
        </div>

      </section>

    </div>
  )
}
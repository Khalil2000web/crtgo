export default function TemplateOne({ data }) {

  return (

    <div className="max-w-3xl mx-auto mt-20 text-center">

      <img
        src={data.logo}
        className="w-32 mx-auto mb-6"
      />

      <h1 className="text-4xl font-bold">
        {data.title}
      </h1>

      <p className="mt-4 text-gray-400">
        {data.description}
      </p>

    </div>

  )
}

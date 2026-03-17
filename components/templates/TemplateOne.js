export default function TemplateOne({ data }) {
  return (
    <div className="bg-white text-black p-6 rounded-lg max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="mt-4">{data.description}</p>
      {data.image && <img src={data.image} alt="" className="mt-4 rounded" />}
    </div>
  );
}
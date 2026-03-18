export default function Template2({ data }) {
  return (
    <div className="bg-black text-white p-10">
      <h1 className="text-5xl">{data.name}</h1>

      {data.menu.map((item) => (
        <div key={item.name} className="flex justify-between">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
      ))}
    </div>
  )
}

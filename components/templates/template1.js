export default function Template1({ data }) {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">{data.name}</h1>

      {data.menu.map((item) => (
        <p key={item.name}>
          {item.name} - ${item.price}
        </p>
      ))}
    </div>
  )
}

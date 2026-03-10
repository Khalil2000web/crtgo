import Image from "next/image"

export default function CafeModern({ data }) {
  return (
<>
<header className="bg-white max-w-[90vw] md:max-w-[60vw] mx-auto h-[300px] relative shadow">
        <Image
          src={data.heroImage}
          alt="Hero Image"
          width="1000"
          height="400"
          className="w-full h-[100%] object-cover pointer-events-none block"
        />

<h1 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-5xl text-center w-full font-bold text-white drop-shadow-lg">
   {data.name}
</h1>
</header>


<div className="">


<div className="max-w-[90vw] md:max-w-[60vw] mx-auto bg-white w-screen flex flex-col items-center justify-center">
<div className="mt-10 text-sm text-neutral-600 pb-4">
    <p className="text-center text-black text-md">📍 {data.location}</p>
    <p className="text-center text-black text-md">⏰ {data.hours["hours-sunday"]}</p>
    <p className="text-center text-black text-md">⏰ {data.hours["hours-monday"]}</p>
    <p className="text-center text-black text-md">⏰ {data.hours["hours-tuesday"]}</p>
    <p className="text-center text-black text-md">⏰ {data.hours["hours-wednesday"]}</p>
    <p className="text-center text-black text-md">⏰ {data.hours["hours-thursday"]}</p>
    <p className="text-center text-black text-md">⏰ {data.hours["hours-friday"]}</p>
    <p className="text-center text-black text-md">⏰ {data.hours["hours-saturday"]}</p>

</div>

<p className="text-gray-600 text-center my-4">{data.description}</p>
</div>

<div className="max-w-[90vw] md:max-w-[60vw] flex flex-wrap items-center justify-between mx-auto px-6 py-4 gap-4 sticky top-0 bg-white/90 z-100 border-b border-gray-400">

<a href="#" className="text-sm py-2 px-5 text-[#6c5e4f] text-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-[#6c5e4f] hover:text-white rounded border-1 border-black">
  burger
</a>

<a href="#" className="text-sm py-2 px-5 text-[#6c5e4f] text-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-[#6c5e4f] hover:text-white rounded border-1 border-black">
  drinks
</a>

<a href="#" className="text-sm py-2 px-5 text-[#6c5e4f] text-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-[#6c5e4f] hover:text-white rounded border-1 border-black">
  Home
</a>

<a href="#" className="text-sm py-2 px-5 text-[#6c5e4f] text-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-[#6c5e4f] hover:text-white rounded border-1 border-black">
  Home
</a>


</div>

<div className="max-w-[90vw] md:max-w-[60vw] mx-auto min-h-screen bg-neutral-50">


<div className="flex flex-col space-y-6 px-6 py-4">
  {data?.sections?.map((section, sIndex) => (
    <div key={sIndex}>
      <h2 className="text-xl font-bold mb-2">{section.name}</h2>
      <div className="flex space-x-4 overflow-x-auto side-scroll">
        {section.products.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-48 border p-4 rounded">
            <h3 className="text-[#877259] font-semibold">{item.name}</h3>
            <p className="text-[#877259] text-neutral-500">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    </div>

<footer className="max-w-[90vw] md:max-w-[60vw] mb-2 mx-auto bg-[#6c5e4f] rounded-md w-full h-24 flex items-center justify-center border-t border-gray-400">
  <p className="text-sm text-[#000]">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
</footer>

</div>
</>
)
}
function ItemsCarousel({ items, lang }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const center =
        container.scrollLeft + container.offsetWidth / 2;

      let closest = 0;
      let minDist = Infinity;

      Array.from(container.children).forEach((child, i) => {
        const childCenter =
          child.offsetLeft + child.offsetWidth / 2;

        const dist = Math.abs(center - childCenter);

        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      container.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 py-6 gap-4 md:max-w-[500px]"
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={idx}
              className="snap-center flex-shrink-0 transition-all duration-300"
              style={{
                width: 220,
                height: 260,
                transform:
                  typeof window !== "undefined" &&
                  window.innerWidth < 768
                    ? isActive
                      ? "scale(1.08)"
                      : "scale(0.85)"
                    : "scale(1)",
                opacity:
                  typeof window !== "undefined" &&
                  window.innerWidth < 768
                    ? isActive
                      ? 1
                      : 0.6
                    : 1,
              }}
            >
              <div className="w-full h-full bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
                
                <div className="relative w-full h-[55%]">
                  <Image
                    src={item.img}
                    alt={item.name[lang]}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3 flex flex-col gap-1 text-right">
                  <p className="font-semibold flex items-center gap-2 justify-end">
                    {item.name[lang]}
                    {item.spicy && "🌶️"}
                  </p>

                  <p className="font-bold">₪{item.price}</p>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {item.desc[lang]}
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
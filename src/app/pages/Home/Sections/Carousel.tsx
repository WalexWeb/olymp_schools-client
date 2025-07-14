import cn from "clsx";
import { useThemeStore } from "../../../stores/themeStore";
import { m } from "framer-motion";

function Carousel() {
  const { isDarkMode } = useThemeStore();

  const carouselImages = [
    "/carousel1.jpeg",
    "/carousel2.jpeg",
    "/carousel3.jpeg",
    "/carousel4.jpeg",
    "/carousel5.jpeg",
    "/carousel6.jpeg",
    "/carousel7.jpeg",
    "/carousel8.jpeg",
  ];

  return (
    <section
      className={cn("p-8 text-center", {
        "bg-[#0d1117]": isDarkMode,
        "bg-white": !isDarkMode,
      })}
    >
      <h2 className="mb-6 text-2xl font-bold">Галерея</h2>

      {/* Карусель */}
      <div className="scrollbar-hide relative overflow-x-auto">
        <div className="flex space-x-4 p-2">
          {carouselImages.map((src, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "shrink-0 rounded-lg max-h-60 shadow-lg transition-transform",
                {
                  "bg-gray-800": isDarkMode,
                  "bg-white": !isDarkMode,
                },
              )}
            >
              <img
                src={src}
                alt={`Галерея ${index + 1}`}
                className="rounded-lg object-contain"
              />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;

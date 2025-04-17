import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";
import { useThemeStore } from "../../../stores/themeStore";
import cn from "clsx";

function Partners() {
  const { isDarkMode } = useThemeStore();

  const partners = ["Сбер", "Positive Technologies", "Kaspersky", "Яндекс"];

  return (
    <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
      {partners.map((name, i) => (
        <m.div
          key={i}
          variants={fadeUp}
          custom={i}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          className={cn(
            "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
            {
              "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20": isDarkMode,
              "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                !isDarkMode,
            },
          )}
        >
          {name}
        </m.div>
      ))}
    </div>
  );
}

export default Partners;

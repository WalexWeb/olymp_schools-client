import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";
import { useThemeStore } from "../../../stores/themeStore";
import cn from "clsx";

function News() {
  const { isDarkMode } = useThemeStore();
  const newsItems = [
    {
      text: "🎉 У нас Финал!",
      date: "1 апреля 2025",
    },
    {
      text: "📣 Дорогие финалисты!",
      date: "29 марта 2025",
    },
    {
      text: "📊 Результаты Отборочного этапа",
      date: "23 марта 2025",
    },
    {
      text: "📊 Результаты Отборочного этапа",
      date: "23 марта 2025",
    },
    {
      text: "📊 Результаты Отборочного этапа",
      date: "23 марта 2025",
    },
    {
      text: "📊 Результаты Отборочного этапа",
      date: "23 марта 2025",
    },
  ];

  return (
    <div>
      <m.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn("mb-8 text-3xl font-semibold", {
          "text-white": isDarkMode,
          "text-gray-900": !isDarkMode,
        })}
      >
        Новости
      </m.h3>
      <m.ul
        className={cn(
          "space-y-6",
          {
            "text-gray-300": isDarkMode,
            "text-gray-600": !isDarkMode,
          },
          newsItems.length > 3 ? "max-h-72 overflow-y-auto pr-2" : "",
        )}
      >
        {newsItems.map((title, index) => (
          <m.li
            key={index}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={cn(
              "cursor-pointer rounded-xl p-4 shadow-md transition",
              {
                "bg-[#111827] hover:shadow-blue-500/20": isDarkMode,
                "bg-white hover:shadow-blue-200": !isDarkMode,
                "border border-gray-200": !isDarkMode,
              },
            )}
          >
            <p
              className={cn("font-medium", {
                "text-white": isDarkMode,
                "text-gray-800": !isDarkMode,
              })}
            >
              {title.text}
            </p>
            <p
              className={cn("text-sm", {
                "text-gray-400": isDarkMode,
                "text-gray-500": !isDarkMode,
              })}
            >
              {title.date}
            </p>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

export default News;

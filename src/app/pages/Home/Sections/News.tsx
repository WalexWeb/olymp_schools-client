import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";

function News() {
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
        className="mb-8 text-3xl font-semibold text-white"
      >
        Новости
      </m.h3>
      <m.ul
        className={`space-y-6 text-gray-300 ${newsItems.length > 3 ? "max-h-72 overflow-y-auto pr-2" : ""}`}
      >
        {newsItems.map((title, index) => (
          <m.li
            key={index}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="cursor-pointer rounded-xl bg-[#111827] p-4 shadow-md transition hover:shadow-blue-500/20"
          >
            <p className="font-medium text-white">{title.text}</p>
            <p className="text-sm text-gray-400">{title.date}</p>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

export default News;

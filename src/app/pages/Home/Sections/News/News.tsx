import { m } from "framer-motion";
import { fadeUp } from "../../../../components/animations/fadeUp";
import { useThemeStore } from "../../../../stores/themeStore";
import cn from "clsx";
import NewsModal from "./NewsModal";
import { useState } from "react";
import { INewsItems } from "../../../../types/INews.type";

function News() {
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number | null>(
    null,
  );
  const { isDarkMode } = useThemeStore();

  const newsItems: INewsItems[] = [
    {
      text: "В Университете завершилась Олимпиада школьников «Университет цифровой полиции» по информационной безопасности",
      date: "2 марта 2025",
      desc: `По итогам Олимпиады победителями и призерами стали:
1 место - Черноглазов Илья («Применение 3D технологий для изъятия следов подошвы обуви»);
2 место - Журавкин Даниил («СТРАЖБОТ на службе охраны правопорядка»);
2 место - Александрова Евгения («Разработка телеграмм чат бота, реализующего различные методы шифрования»);
3 место - Щукин Алексей («Методы обеспечения безопасности облачных вычислений»);
3 место - Пахневский Гордей («Дополненная реальность и робототехника в деятельности правоохранительных органов, обеспечивающие безопасность общества»).`,
    },
    {
      text: "У нас Финал!",
      date: "1 апреля 2025",
      desc: "Состоялся долгожданный финал! Участники показали блестящие результаты, а жюри определило победителей. Благодарим всех за участие!",
    },
    {
      text: "Дорогие финалисты!",
      date: "29 марта 2025",
      desc: "Опубликована важная информация для финалистов: расписание, место проведения и рекомендации. Убедитесь, что ознакомились со всеми деталями!",
    },
    {
      text: "Результаты Отборочного этапа",
      date: "23 марта 2025",
      desc: "Стали известны результаты отборочного этапа. Поздравляем прошедших в финал и благодарим всех участников за старания!",
    },
    {
      text: "Результаты Отборочного этапа",
      date: "23 марта 2025",
      desc: "Жюри завершило проверку работ. Списки прошедших в следующий этап доступны в личных кабинетах.",
    },
    {
      text: "Результаты Отборочного этапа",
      date: "23 марта 2025",
      desc: "Опубликованы итоги отборочного тура. Если у вас есть вопросы по оценкам, свяжитесь с организаторами до 25 марта.",
    },
    {
      text: "Результаты Отборочного этапа",
      date: "23 марта 2025",
      desc: "Завершён первый этап соревнований. Участники, набравшие проходной балл, получат приглашение на финал в ближайшие дни.",
    },
    {
      text: "Результаты Отборочного этапа",
      date: "23 марта 2025",
      desc: "Завершён первый этап соревнований. Участники, набравшие проходной балл, получат приглашение на финал в ближайшие дни.",
    },
    {
      text: "Результаты Отборочного этапа",
      date: "23 марта 2025",
      desc: "Завершён первый этап соревнований. Участники, набравшие проходной балл, получат приглашение на финал в ближайшие дни.",
    },
    {
      text: "Результаты Отборочного этапа",
      date: "23 марта 2025",
      desc: "Завершён первый этап соревнований. Участники, набравшие проходной балл, получат приглашение на финал в ближайшие дни.",
    },
  ];

  return (
    <div className="h-full max-h-[32rem] overflow-y-auto">
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
          newsItems.length > 3 ? "h-2/3 overflow-y-auto pr-2" : "",
        )}
      >
        {newsItems.map((item, index) => (
          <m.li
            key={index}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            onClick={() => setSelectedNewsIndex(index)}
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
              {item.text}
            </p>
            <p
              className={cn("text-sm", {
                "text-gray-400": isDarkMode,
                "text-gray-500": !isDarkMode,
              })}
            >
              {item.date}
            </p>
          </m.li>
        ))}
      </m.ul>
      {selectedNewsIndex !== null && (
        <NewsModal
          text={newsItems[selectedNewsIndex].text}
          desc={newsItems[selectedNewsIndex].desc}
          date={newsItems[selectedNewsIndex].date}
          isOpen={selectedNewsIndex !== null}
          onClose={() => setSelectedNewsIndex(null)}
        />
      )}
    </div>
  );
}

export default News;

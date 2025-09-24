import { useState } from "react";
import cn from "clsx";
import { m } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import { useDebounce } from "../../hooks/useDebounce";
import {
  qualifResults2023,
  qualifResults2024,
  rankings2023,
  rankings2024,
} from "../../data/mockData";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import Navbar from "../components/layout/Navbar/Navbar";
import { fadeUp } from "../components/animations/fadeUp";
import { columnVariants } from "../components/animations/columnVariants";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer/Footer";

// Типы для текстовых конфигураций
type ViewMode = "results" | "rankings";
type AcademicYear = "2023-2024" | "2024-2025";

interface BaseTexts {
  results: {
    title: string;
    description: string;
    finalistsText: string;
  };
  rankings: {
    title: string;
    description: string;
  };
}

interface YearTexts {
  "2023-2024": {
    results: {
      finalistsLink: string;
      pdfLink: string;
    };
    rankings: {
      pdfLink: string;
    };
  };
  "2024-2025": {
    results: {
      finalistsLink: string;
      pdfLink: string;
    };
    rankings: {
      pdfLink: string;
    };
  };
}

interface TextConfig {
  title: string;
  description: string;
  finalistsText?: string;
  finalistsLink?: string;
  pdfLink?: string;
  year: string;
}

function Archive() {
  const { isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<AcademicYear>("2024-2025");
  const [viewMode, setViewMode] = useState<ViewMode>("results"); // 'results' или 'rankings'

  const debouncedSearch = useDebounce(searchTerm, 400);

  // Выбор данных в зависимости от выбранного года и режима просмотра
  const getCurrentData = () => {
    switch (selectedYear) {
      case "2023-2024":
        return viewMode === "results" ? qualifResults2023 : rankings2023;
      case "2024-2025":
        return viewMode === "results" ? qualifResults2024 : rankings2024;
      default:
        return viewMode === "results" ? qualifResults2024 : rankings2024;
    }
  };

  // Фильтрация и сортировка с использованием поискового значения
  const sortedParticipants = [...getCurrentData()].sort(
    (a, b) => b.score - a.score,
  );

  // Фильтр с сохранением места в рейтинге
  const filteredParticipants = sortedParticipants.filter((participant) => {
    const fullName =
      `${participant.lastName} ${participant.firstName} ${participant.middleName}`.toLowerCase();
    return fullName.includes(debouncedSearch.toLowerCase().trim());
  });

  // Фильтр победителей для режима итогов
  const winners =
    viewMode === "rankings"
      ? sortedParticipants.filter(
          (participant) => participant.status !== "Участник",
        )
      : [];

  // Тексты в зависимости от выбранного года и режима
  const getYearSpecificTexts = (): TextConfig => {
    const baseTexts: BaseTexts = {
      results: {
        title: "Результаты Отборочного этапа",
        description:
          "Рейтинговая таблица итогов проведения Отборочного этапа Олимпиады школьников «Университет цифровой полиции» по информационной безопасности.",
        finalistsText:
          "Участники, прошедшие в финал Олимпиады школьников «Университет цифровой полиции» по информационной безопасности",
      },
      rankings: {
        title: "Итоги Олимпиады",
        description:
          "Рейтинговая таблица заключительного этапа олимпиады школьников.",
      },
    };

    const yearTexts: YearTexts = {
      "2023-2024": {
        results: {
          finalistsLink:
            "https://mvd.ru/upload/site116/folder_page/045/106/727/final_20_3_2023.pdf",
          pdfLink:
            "https://mvd.ru/upload/site116/folder_page/045/106/727/Ranzhirovannye_spiski_2023_compressed.pdf",
        },
        rankings: {
          pdfLink:
            "https://mvd.ru/upload/site116/folder_page/045/106/727/final_results_2023.pdf",
        },
      },
      "2024-2025": {
        results: {
          finalistsLink:
            "https://mvd.ru/upload/site116/folder_page/045/106/727/final_20_3.pdf",
          pdfLink:
            "https://mvd.ru/upload/site116/folder_page/045/106/727/Ranzhirovannye_spiski_2_compressed.pdf",
        },
        rankings: {
          pdfLink:
            "https://mvd.ru/upload/site116/folder_page/045/106/727/final_results_2024.pdf",
        },
      },
    };

    // Используем тип приведения для безопасного доступа
    const base = baseTexts[viewMode];
    const yearSpecific = yearTexts[selectedYear][viewMode];

    return {
      ...base,
      ...yearSpecific,
      year: selectedYear,
    };
  };

  const texts = getYearSpecificTexts();

  // Заголовки таблицы в зависимости от режима
  const tableHeaders =
    viewMode === "results"
      ? ["№ п/п", "Фамилия", "Имя", "Отчество", "Балл"]
      : [
          "№ п/п",
          "Фамилия",
          "Имя",
          "Отчество",
          "Класс/Курс",
          "Регион",
          "Балл",
          "Статус",
        ];

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50/20 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-10xl mx-auto max-w-6xl">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2
              className={cn("text-center text-4xl font-bold md:text-5xl", {
                "text-white": isDarkMode,
                "text-gray-900": !isDarkMode,
              })}
            >
              {texts.title} {texts.year}
            </h2>

            <div
              className={cn("rounded-2xl p-8 text-lg", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
              })}
            >
              <p className="mb-6">
                {texts.description} {texts.year} учебного года.
              </p>

              {/* Переключение между режимами просмотра */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label
                    htmlFor="view-mode"
                    className="text-md mb-2 block font-medium"
                  >
                    Режим просмотра:
                  </label>
                  <select
                    id="view-mode"
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
                    className={cn(
                      "w-full rounded-lg border px-4 py-2 text-base focus:ring-2 focus:outline-none",
                      {
                        "border-blue-700 bg-gray-800 text-white focus:ring-blue-500":
                          isDarkMode,
                        "border-blue-300 bg-white text-gray-900 focus:ring-blue-400":
                          !isDarkMode,
                      },
                    )}
                  >
                    <option value="results">
                      Результаты отборочного этапа
                    </option>
                    <option value="rankings">Итоги олимпиады</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="year-select"
                    className="text-md mb-2 block font-medium"
                  >
                    Учебный год:
                  </label>
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) =>
                      setSelectedYear(e.target.value as AcademicYear)
                    }
                    className={cn(
                      "w-full rounded-lg border px-4 py-2 text-base focus:ring-2 focus:outline-none",
                      {
                        "border-blue-700 bg-gray-800 text-white focus:ring-blue-500":
                          isDarkMode,
                        "border-blue-300 bg-white text-gray-900 focus:ring-blue-400":
                          !isDarkMode,
                      },
                    )}
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                  </select>
                </div>
              </div>

              {/* Блок с информацией о сертификатах (только для результатов) */}
              {viewMode === "results" && (
                <div className="mb-6 rounded-lg border border-blue-900/20 bg-blue-900/10 p-4">
                  <p className="font-semibold">
                    Участники, набравшие больше 20 баллов, получают электронный
                    сертификат участника Олимпиады.
                  </p>
                </div>
              )}

              {/* Ссылка на финалистов (только для результатов) */}
              {viewMode === "results" && texts.finalistsLink && (
                <a
                  href={texts.finalistsLink}
                  className="mb-4 block text-xl font-semibold text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {texts.finalistsText} {texts.year} учебного года.
                </a>
              )}

              {/* Блок с работами победителей (только для итогов) */}
              {viewMode === "rankings" && winners.length > 0 && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={cn("mb-6 rounded-2xl border border-blue-600 p-6", {
                    "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
                      isDarkMode,
                    "bg-gradient-to-br from-blue-50 to-blue-100": !isDarkMode,
                  })}
                >
                  <div className="mb-4 flex flex-col items-center">
                    <h3 className="text-2xl font-bold">Проекты победителей</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {winners.map((winner, index) => (
                      <m.div
                        key={`winner-${winner.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "rounded-lg p-4 transition-all hover:shadow-lg",
                          {
                            "bg-blue-900/20 hover:bg-blue-900/30": isDarkMode,
                            "bg-blue-200/40": !isDarkMode,
                          },
                        )}
                      >
                        <h4 className="text-lg font-bold text-blue-400">
                          {winner.status}
                        </h4>
                        <h5 className="text-lg font-semibold">
                          {winner.lastName} {winner.firstName}{" "}
                          {winner.middleName}
                        </h5>
                        <p className="text-md opacity-80">{winner.region}</p>
                        <p className="my-2 font-bold">{winner.score} баллов</p>
                        {winner.details ? (
                          <a
                            href={winner.details}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              className={cn("mt-2 w-full text-sm", {
                                "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400":
                                  isDarkMode,
                                "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300":
                                  !isDarkMode,
                              })}
                            >
                              Посмотреть работу
                            </Button>
                          </a>
                        ) : (
                          <p className="mt-2 text-sm opacity-70">
                            Работа не загружена
                          </p>
                        )}
                      </m.div>
                    ))}
                  </div>
                </m.div>
              )}

              {/* Поле поиска */}
              <div className="mt-6">
                <label
                  htmlFor="search"
                  className="text-md mb-2 block font-medium"
                >
                  Поиск по ФИО
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Введите фамилию, имя или отчество..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-2 text-base focus:ring-2 focus:outline-none",
                    {
                      "border-blue-700 bg-gray-800 text-white focus:ring-blue-500":
                        isDarkMode,
                      "border-blue-300 bg-white text-gray-900 focus:ring-blue-400":
                        !isDarkMode,
                    },
                  )}
                />
              </div>

              {/* Таблица участников */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={cn({
                        "bg-blue-800/30": isDarkMode,
                        "bg-blue-200": !isDarkMode,
                      })}
                    >
                      {tableHeaders.map((header, i) => (
                        <m.th
                          key={i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className={cn("px-4 py-3 text-center align-middle", {
                            "text-blue-300": isDarkMode,
                            "text-blue-800": !isDarkMode,
                          })}
                        >
                          {header}
                        </m.th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.length > 0 ? (
                      filteredParticipants.map((participant) => {
                        const rank =
                          sortedParticipants.findIndex(
                            (p) => p.id === participant.id,
                          ) + 1;
                        return (
                          <tr
                            key={participant.id}
                            className={cn("border-b", {
                              "border-blue-700/30 hover:bg-blue-900/10":
                                isDarkMode,
                              "border-blue-200 hover:bg-blue-100": !isDarkMode,
                            })}
                          >
                            <m.td
                              custom={0}
                              initial="hidden"
                              animate="visible"
                              variants={columnVariants}
                              className="px-4 py-3 text-center"
                            >
                              {rank}
                            </m.td>
                            <m.td
                              custom={1}
                              initial="hidden"
                              animate="visible"
                              variants={columnVariants}
                              className="px-4 py-3 text-center"
                            >
                              {participant.lastName}
                            </m.td>
                            <m.td
                              custom={2}
                              initial="hidden"
                              animate="visible"
                              variants={columnVariants}
                              className="px-4 py-3 text-center"
                            >
                              {participant.firstName}
                            </m.td>
                            <m.td
                              custom={3}
                              initial="hidden"
                              animate="visible"
                              variants={columnVariants}
                              className="px-4 py-3 text-center"
                            >
                              {participant.middleName}
                            </m.td>

                            {/* Дополнительные поля для итогов */}
                            {viewMode === "rankings" && (
                              <>
                                <m.td
                                  custom={4}
                                  initial="hidden"
                                  animate="visible"
                                  variants={columnVariants}
                                  className="px-4 py-3 text-center"
                                >
                                  {participant.grade}
                                </m.td>
                                <m.td
                                  custom={5}
                                  initial="hidden"
                                  animate="visible"
                                  variants={columnVariants}
                                  className="px-4 py-3 text-center"
                                >
                                  {participant.region}
                                </m.td>
                              </>
                            )}

                            <m.td
                              custom={viewMode === "results" ? 4 : 6}
                              initial="hidden"
                              animate="visible"
                              variants={columnVariants}
                              className={cn(
                                "px-4 py-3 text-center font-medium",
                                {
                                  "text-blue-400": isDarkMode,
                                  "text-blue-600": !isDarkMode,
                                },
                              )}
                            >
                              {participant.score}
                            </m.td>

                            {/* Статус для итогов */}
                            {viewMode === "rankings" && (
                              <m.td
                                custom={7}
                                initial="hidden"
                                animate="visible"
                                variants={columnVariants}
                                className="px-4 py-3 text-center"
                              >
                                <Button
                                  className={cn("text-md w-2xs px-2 py-2", {
                                    "bg-gray-600/50 hover:bg-gray-600/70":
                                      isDarkMode,
                                    "bg-gray-300 hover:bg-gray-400":
                                      !isDarkMode,
                                  })}
                                  disabled
                                >
                                  {participant.status}
                                </Button>
                              </m.td>
                            )}
                          </tr>
                        );
                      })
                    ) : (
                      <m.tr
                        initial="hidden"
                        animate="visible"
                        variants={columnVariants}
                      >
                        <td
                          colSpan={tableHeaders.length}
                          className="px-4 py-8 text-center text-lg"
                        >
                          <p
                            className={cn({
                              "text-blue-300": isDarkMode,
                              "text-blue-700": !isDarkMode,
                            })}
                          >
                            Участник не найден
                          </p>
                        </td>
                      </m.tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Кнопка PDF */}
              {texts.pdfLink && (
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href={texts.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>Открыть полную рейтинговую таблицу (PDF)</Button>
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <Link to="/">
                <Button className="px-7 py-3">Вернуться на главную</Button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Archive;

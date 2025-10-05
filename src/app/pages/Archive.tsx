import { useState } from "react";
import cn from "clsx";
import { m } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import Navbar from "../components/layout/Navbar/Navbar";
import { fadeUp } from "../components/animations/fadeUp";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer/Footer";
import zadachi from "/public/zadachi.pdf";
import { rankings2023 } from "../../data/mockData";

type AcademicYear = "2023-2024" | "2024-2025";

interface TaskItem {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
}

interface YearData {
  tasks: TaskItem[];
  winners: typeof rankings2023;
}

function Archive() {
  const { isDarkMode } = useThemeStore();
  const [selectedYear, setSelectedYear] = useState<AcademicYear>("2024-2025");

  // Данные с заданиями и победителями
  const archiveData: Record<AcademicYear, YearData> = {
    "2023-2024": {
      tasks: [
        {
          id: 1,
          title: "Задания по информационной безопасности",
          description: "Отборочный этап 2023-2024 учебного года",
          fileUrl: zadachi,
          fileSize: "2.4 MB",
        },
      ],
      winners: rankings2023,
    },
    "2024-2025": {
      tasks: [
        {
          id: 1,
          title: "Задания по информационной безопасности",
          description: "Отборочный этап 2024-2025 учебного года",
          fileUrl: zadachi,
          fileSize: "2.7 MB",
        },
      ],
      winners: rankings2023,
    },
  };

  const currentData = archiveData[selectedYear];
  const currentTasks = currentData.tasks;
  const currentWinners = currentData.winners;

  // Фильтр победителей (исключаем участников без статуса победителя/призера)
  const winners = currentWinners.filter(
    (participant) => participant.status !== "Участник",
  );

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
              Архив заданий
            </h2>

            <div
              className={cn("rounded-2xl p-8 text-lg", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
              })}
            >
              <p className="mb-6 text-center">
                На этой странице вы можете ознакомиться с заданиями отборочного
                этапа Олимпиады школьников «Университет цифровой полиции» за
                предыдущие годы.
              </p>

              {/* Выбор учебного года */}
              <div className="mb-8">
                <label
                  htmlFor="year-select"
                  className="text-md mb-3 block text-center font-medium"
                >
                  Выберите учебный год:
                </label>
                <div className="flex justify-center">
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) =>
                      setSelectedYear(e.target.value as AcademicYear)
                    }
                    className={cn(
                      "w-full max-w-xs rounded-lg border px-4 py-3 text-base focus:ring-2 focus:outline-none",
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

              {/* Задания отборочного этапа */}
              <div className="mb-12">
                <h3
                  className={cn("mb-6 text-center text-2xl font-semibold", {
                    "text-white": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Задания отборочного этапа {selectedYear} учебного года
                </h3>

                <div className="grid gap-6">
                  {currentTasks.map((task, index) => (
                    <m.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "rounded-xl border-2 p-6 transition-all hover:shadow-lg",
                        {
                          "border-blue-600 bg-blue-900/20 hover:bg-blue-900/30":
                            isDarkMode,
                          "border-blue-400 bg-blue-50 hover:bg-blue-100":
                            !isDarkMode,
                        },
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={cn("mb-2 text-xl font-bold", {
                              "text-blue-300": isDarkMode,
                              "text-blue-700": !isDarkMode,
                            })}
                          >
                            {task.title}
                          </h4>
                          <p
                            className={cn("mb-3", {
                              "text-gray-300": isDarkMode,
                              "text-gray-600": !isDarkMode,
                            })}
                          >
                            {task.description}
                          </p>
                          <p
                            className={cn("text-sm", {
                              "text-gray-400": isDarkMode,
                              "text-gray-500": !isDarkMode,
                            })}
                          >
                            Размер файла: {task.fileSize}
                          </p>
                        </div>
                        <a
                          href={task.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4"
                        >
                          <Button
                            className={cn("whitespace-nowrap", {
                              "bg-blue-600 hover:bg-blue-700": isDarkMode,
                              "bg-blue-500 hover:bg-blue-600": !isDarkMode,
                            })}
                          >
                            Просмотреть
                          </Button>
                        </a>
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>

              {/* Победители и призеры */}
              <div className="mb-8">
                <h3
                  className={cn("mb-6 text-center text-2xl font-semibold", {
                    "text-white": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Победители и призеры {selectedYear} учебного года
                </h3>

                {/* Блок с работами победителей */}
                {winners.length > 0 && (
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "mb-6 rounded-2xl border border-blue-600 p-6",
                      {
                        "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
                          isDarkMode,
                        "bg-gradient-to-br from-blue-50 to-blue-100":
                          !isDarkMode,
                      },
                    )}
                  >
                    <div className="mb-4 flex flex-col items-center">
                      <h3 className="text-2xl font-bold">
                        Проекты победителей
                      </h3>
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
                          <p className="my-2 font-bold">
                            {winner.score} баллов
                          </p>
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
              </div>

              {/* Информационное сообщение */}
              <div
                className={cn("rounded-lg p-4 text-center", {
                  "bg-blue-900/20": isDarkMode,
                  "bg-blue-100": !isDarkMode,
                })}
              >
                <p
                  className={cn("font-medium", {
                    "text-blue-300": isDarkMode,
                    "text-blue-700": !isDarkMode,
                  })}
                >
                  Все задания представлены в формате PDF
                </p>
              </div>
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

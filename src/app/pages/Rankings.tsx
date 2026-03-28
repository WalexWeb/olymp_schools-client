import cn from "clsx";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import { fadeUp } from "../components/animations/fadeUp";
import { useThemeStore } from "../stores/themeStore";
import Background from "../components/ui/Background";
import { rankings2026 } from "../../data/mockData";

const profiles = [
  {
    title: "Профиль «Информационная безопасность»",
    discipline: "infoSec",
  },
  {
    title: "Профиль «Обществознание»",
    discipline: "society",
  },
];

const getWinnersByDiscipline = (discipline: string) =>
  rankings2026
    .filter((item) => item.discipline === discipline)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

function Rankings() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50/20 text-gray-900": !isDarkMode,
      })}
    >
      <Background />
      <BackgroundBlobs />
      <Navbar />

      <section className="relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl space-y-10">
          {/* Заголовок */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center"
          >
            <h1
              className={cn("text-4xl font-bold md:text-5xl", {
                "text-white": isDarkMode,
                "text-gray-900": !isDarkMode,
              })}
            >
              Итоги Олимпиады
            </h1>

            <div
              className={cn(
                "mx-auto mt-4 max-w-3xl rounded-2xl border px-6 py-4 text-lg font-medium",
                {
                  "border-blue-800/50 bg-blue-900/20 text-blue-100": isDarkMode,
                  "border-blue-200 bg-blue-50 text-blue-800": !isDarkMode,
                },
              )}
            >
              Информация представлена отдельно по каждому профилю
            </div>
          </m.div>

          {/* Профили — теперь вертикальный список */}
          <div className="flex flex-col gap-8">
            {profiles.map((profile, index) => {
              const winners = getWinnersByDiscipline(profile.discipline);

              return (
                <m.div
                  key={profile.title}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className={cn(
                    "rounded-2xl border p-6 shadow-lg backdrop-blur",
                    {
                      "border-blue-900/40 bg-[#0b0f1a]/70 text-white":
                        isDarkMode,
                      "border-blue-100 bg-white text-gray-900": !isDarkMode,
                    },
                  )}
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="text-center text-2xl font-semibold">
                      {profile.title}
                    </h3>
                  </div>

                  {/* Победители */}
                  {winners.length > 0 && (
                    <m.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "mt-6 mb-6 rounded-2xl border border-blue-600 p-6",
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

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {winners.map((winner, index) => (
                          <m.div
                            key={`winner-${winner.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                              "rounded-lg p-4 transition-all hover:shadow-lg",
                              {
                                "bg-blue-900/20 hover:bg-blue-900/30":
                                  isDarkMode,
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

                            <p className="text-md opacity-80">
                              {winner.region}
                            </p>

                            {/* <p className="my-2 font-bold">
                              {winner.score} баллов
                            </p> */}

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
                </m.div>
              );
            })}
          </div>

          {/* Назад */}
          <div className="flex justify-center">
            <Link to="/">
              <Button size="lg" className="px-8 py-3">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Rankings;

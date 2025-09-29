import Navbar from "../../components/layout/Navbar/Navbar";
import News from "./Sections/News/News";
import About from "./Sections/Info";
import Footer from "../../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import { fadeUp } from "../../components/animations/fadeUp";
import { m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useThemeStore } from "../../stores/themeStore";
import cn from "clsx";
import Carousel from "./Sections/Carousel";
import Background from "../../components/ui/Background";

const olympiads = [
  {
    name: "Информационная безопасность",
    description: "Дисциплины: Информатика и ИКТ, Математика и Физика",
    fullDescription:
      "Олимпиада школьников «Университет цифровой полиции» по профилю «Информационная безопасность» провидится с 2024 года. Ее ключевой целью является выявление у учащихся 9-11 классов технического мышления и интереса к научно-исследовательской деятельности.\n\nОлимпиада способствует выявлению творческих, мыслящих молодых людей, способных решать комплексные задачи по обеспечению конфиденциальности, целостности и доступности информации.\n\nЗадания данного профиля Олимпиады формируются методической комиссией на основании обязательного минимума содержания основных образовательных программ предмета «Математика», «Физика» и «Информатика» уровня общеобразовательной программы, с учетом специфики выполняемых задач по обеспечению безопасности информации в сфере внутренних дел.",
    dates: {
      qualifying: "14 октября - 14 декабря 2025",
      final: "1 февраля - 21 марта 2026",
      finalEnd: "21 марта 2026",
    },
    organizer: "Учебно-научный комплекс информационных технологий",
    address: "г. Москва, ул. Коптевская, д. 63",
  },
  {
    name: "Обществознание",
    description: "Дисциплины: обществознание",
    fullDescription:
      "Олимпиада школьников «Университет цифровой полиции» по профилю «Обществознание» проводится с 2025 года среди учащихся 10-11х классов, обладающих выдающимися способностями и проявляющих глубокий интерес к социально-гуманитарному знанию.\n\nОлимпиада способствует выявлению наиболее одаренных, творческих, самостоятельно мыслящих молодых людей, в том числе способных решать комплексные задачи, стоящие перед современной правоохранительной системой.\n\nЗадания олимпиады формируются методической комиссией на основе обязательного минимума содержания основных образовательных программ по предмету «Обществознание» (с учетом интегрированности в них нескольких направлений социально-гуманитарного знания) с углубленным вниманием к правоохранительной тематике. В связи с этим в задания включаются как вопросы по основным отраслям российского права, так и выявляющие знания участников о государстве (в том числе правоохранительной системе как ключевом элементе механизма государства), экономическом и политическом устройстве общества, социальных отношениях",
    dates: {
      qualifying: "24 ноября - 14 декабря 2025",
      final: "12 января - 7 марта 2026",
      finalEnd: "21 марта 2026",
    },
    organizer: "Кафедра теории государства и права",
    address: "г. Москва, ул. Академика Волгина, д. 12",
  },
];

export default function Home() {
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "relative min-h-screen w-screen overflow-hidden font-sans",
        {
          "bg-[#0b0f1a] text-white": isDarkMode,
          "bg-gray-50 text-gray-900": !isDarkMode,
        },
      )}
    >
      <Background />

      <BackgroundBlobs />

      <Navbar />

      {/* Основной блок с тремя колонками */}
      <section className={"relative z-10 px-6 py-12"}>
        <div className="w-10xl mx-auto grid grid-cols-1 justify-center gap-8 md:grid-cols-3">
          {/* Левая колонка - название, логотип и профили олимпиад */}
          <div className="ml-8 flex flex-col">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-xl"
            >
              <h1 className="mb-6 text-4xl leading-tight font-bold md:block md:text-5xl">
                Университет{" "}
                <span className="text-blue-600">Цифровой Полиции</span>
              </h1>

              <p className={"mb-8 text-xl"}>Право. Технологии. Безопасность.</p>

              {/* Блок профилей олимпиад */}
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className={cn(
                  "mt-8 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300",
                  {
                    "bg-[#161b22]/50": isDarkMode,
                    "border border-gray-200 bg-white/95 shadow-md hover:shadow-lg": !isDarkMode,
                  },
                )}
              >
                <h3
                  className={cn("mb-6 text-2xl font-bold", {
                    "text-blue-300": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Профили олимпиады
                </h3>

                <div className="space-y-4">
                  {olympiads.map((olympiad, index) => (
                    <m.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "group cursor-pointer rounded-xl p-5 backdrop-blur-sm transition-all duration-300",
                        {
                          "bg-[#1e293b]/80 hover:border-blue-400/40 hover:bg-[#2d3748]/90":
                            isDarkMode,
                          "border border-gray-200 bg-white/90 shadow-sm hover:border-blue-300 hover:bg-blue-50/95 hover:shadow-md":
                            !isDarkMode,
                        },
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigate("/olympiad", {
                          state: { olympiad },
                        })
                      }
                    >
                      <div className="flex items-start gap-4">
                        {/* Иконка олимпиады */}
                        <div
                          className={cn(
                            "mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                            {
                              "bg-blue-500/20 text-blue-400": isDarkMode,
                              "bg-blue-100 text-blue-600": !isDarkMode,
                            },
                          )}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>

                        <div className="flex-1">
                          <h4
                            className={cn(
                              "mb-2 text-lg font-bold transition-colors duration-300 group-hover:text-blue-400",
                              {
                                "text-white": isDarkMode,
                                "text-gray-900": !isDarkMode,
                              },
                            )}
                          >
                            {olympiad.name}
                          </h4>

                          <p
                            className={cn("text-sm leading-relaxed", {
                              "text-gray-300": isDarkMode,
                              "text-gray-600": !isDarkMode,
                            })}
                          >
                            {olympiad.description}
                          </p>

                          {/* Индикатор кликабельности */}
                          <div className="mt-3 flex items-center gap-2">
                            <span
                              className={cn(
                                "text-sm font-medium transition-colors duration-300",
                                {
                                  "text-blue-400 group-hover:text-blue-300":
                                    isDarkMode,
                                  "text-blue-600 group-hover:text-blue-500":
                                    !isDarkMode,
                                },
                              )}
                            >
                              Нажмите для просмотра
                            </span>
                            <svg
                              className={cn(
                                "h-3 w-3 transition-transform duration-300 group-hover:translate-x-1",
                                {
                                  "text-blue-400": isDarkMode,
                                  "text-blue-600": !isDarkMode,
                                },
                              )}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>

                {/* Кнопка для перехода к регистрации */}
                <div className="mt-6 border-t border-gray-700/30 pt-6">
                  <Link to="/passing">
                    <m.button
                      className={cn(
                        "group relative w-full rounded-xl px-6 py-3 font-semibold transition-all duration-300",
                        {
                          "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg":
                            isDarkMode,
                          "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-lg":
                            !isDarkMode,
                        },
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                        Зарегистрироваться на олимпиаду
                      </span>
                    </m.button>
                  </Link>
                </div>
              </m.div>
            </m.div>
          </div>

          {/* Центральная колонка - кнопки */}
          <div className="justify-center">
            <About />
          </div>

          {/* Правая колонка - новости */}
          <News />
        </div>
      </section>

      {/* Карусель */}
      <Carousel />

      <Footer />
    </div>
  );
}

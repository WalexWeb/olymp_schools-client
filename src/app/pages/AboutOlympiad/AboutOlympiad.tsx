import cn from "clsx";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { useThemeStore } from "../../stores/themeStore";
import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import Navbar from "../../components/layout/Navbar/Navbar";
import { fadeUp } from "../../components/animations/fadeUp";
import Docs from "./Sections/Docs";
import { Button } from "../../components/ui/Button";
import Footer from "../../components/layout/Footer/Footer";
import Background from "../../components/ui/Background";

function AboutOlympiad() {
  const { isDarkMode } = useThemeStore();

  const timelineData = [
    {
      number: "1",
      title: "Регистрация участников",
      period: "октябрь - декабрь 2025 года",
      description: "Онлайн-регистрация на официальном сайте Олимпиады",
    },
    {
      number: "2",
      title: "Отборочный этап",
      period: "ноябрь - декабрь 2025 года",
      description: "Дистанционное тестирование по выбранным профилям",
    },
    {
      number: "3",
      title: "Заключительный этап",
      period: "февраль - март 2026 года",
      description:
        "Очный этап на базе Московского ордена Почета университета МВД России имени В.Я. Кикотя",
    },
  ];

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

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-10xl mx-auto max-w-4xl">
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
              Об олимпиаде
            </h2>

            <div
              className={cn("rounded-2xl p-8 text-lg", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
              })}
            >
              {/* Общая информация */}
              <div className="mb-8">
                <h3
                  className={cn("mb-4 text-center text-2xl font-semibold", {
                    "text-white": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Общая информация
                </h3>
                <p className="mb-4">
                  Олимпиада "Университет цифровой полиции" направлена на
                  популяризацию государственной службы и профессии
                  "Полицейский", стимулирование интереса обучающихся к
                  деятельности Министерства внутренних дел Российской Федерации,
                  выявление творческих способностей и интереса к научной и
                  научно-исследовательской деятельности, создание условий для
                  интеллектуального развития и поддержки одаренных школьников, а
                  также содействие им в выборе направления профессиональной
                  деятельности и продолжении образования.
                </p>
                <p className="mb-4">
                  Олимпиада проводится среди школьников 10х, 11х классов, 1-2
                  курсов колледжа/техникума по профилям «Информационная
                  безопасность» и «Обществознание». В олимпиаде могут принять
                  участие все желающие, обучающиеся в образовательных
                  учреждениях, независимо от места проживания, места учебы,
                  участия в других олимпиадах и конкурсах различных уровней.
                </p>
                <p className="mb-6">
                  Участие в Олимпиаде школьников «Университет цифровой полиции»
                  позволит получить дополнительные индивидуальные баллы при
                  поступлении в Московский университет МВД России имени В.Я.
                  Кикотя.
                </p>
              </div>

              <div className="mb-8">
                <h3
                  className={cn("mb-4 text-center text-2xl font-semibold", {
                    "text-white": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Документы
                </h3>
                <Docs />
              </div>

              {/* График проведения */}
              <div>
                <h3
                  className={cn("mb-8 text-center text-2xl font-semibold", {
                    "text-white": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  График проведения олимпиады в 2025-2026 году
                </h3>

                {/* Визуальная временная шкала */}
                <div className="relative mb-8">
                  {/* Вертикальная линия */}
                  <div
                    className={cn(
                      "absolute top-0 left-8 h-full w-0.5 transform md:left-1/2 md:-translate-x-1/2",
                      {
                        "bg-blue-600": isDarkMode,
                        "bg-blue-400": !isDarkMode,
                      },
                    )}
                  />

                  {timelineData.map((item, index) => (
                    <m.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={cn(
                        "relative mb-8 flex items-start md:mb-10",
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                      )}
                    >
                      {/* Иконка с номером */}
                      <div
                        className={cn(
                          "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 text-2xl font-bold shadow-lg",
                          {
                            "border-blue-600 bg-blue-700 text-white":
                              isDarkMode,
                            "border-blue-500 bg-blue-600 text-white":
                              !isDarkMode,
                          },
                        )}
                      >
                        {item.number}
                      </div>

                      {/* Контент */}
                      <div
                        className={cn(
                          "ml-6 flex-1 rounded-2xl p-6 shadow-lg md:ml-8 md:w-1/2",
                          {
                            "bg-gray-900": isDarkMode,
                            "bg-blue-50": !isDarkMode,
                          },
                        )}
                      >
                        <h4
                          className={cn("mb-2 text-2xl font-semibold", {
                            "text-white": isDarkMode,
                            "text-blue-800": !isDarkMode,
                          })}
                        >
                          {item.title}
                        </h4>
                        <p
                          className={cn("text-md mb-3 font-medium", {
                            "text-blue-300": isDarkMode,
                            "text-blue-600": !isDarkMode,
                          })}
                        >
                          {item.period}
                        </p>
                        <p
                          className={cn("text-md", {
                            "text-gray-300": isDarkMode,
                            "text-gray-700": !isDarkMode,
                          })}
                        >
                          {item.description}
                        </p>
                      </div>
                    </m.div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-lg font-medium">
                    Для прохождения Олимпиады необходимо пройти процедуру
                    регистрации в личном кабинете на сайте.
                  </p>
                </div>
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

export default AboutOlympiad;

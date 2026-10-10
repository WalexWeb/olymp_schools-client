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
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Как узнать, зарегистрирован ли я на Олимпиаду?",
    answer:
      "В течение 3 рабочих дней после получения и обработки анкеты на вашу электронную почту будет направлено письмо, подтверждающее регистрацию и содержащее индивидуальные логин и пароль для прохождения тестирования Отборочного этапа.",
  },
  {
    question: "Что делать, если допустил ошибку в анкете?",
    answer:
      "Заполнить анкету ещё раз, указав верные сведения, отметить поле «повторно» и направить анкету на электронную почту организационного комитета.",
  },
  {
    question: "Где будет проходить Отборочный этап?",
    answer:
      "Отборочный этап Олимпиады будет проходить на отдельной платформе, данные для доступа на которую будут направлены в ответном письме после обработки анкеты.",
  },
  {
    question:
      "Почему я не могу войти в систему для прохождения тестирования Отборочного этапа?",
    answer: [
      "Повторите попытку из другого браузера.",
      "Проверьте, правильно ли вы ввели логин и пароль.",
      <>
        Убедитесь, что срок прохождения тестирования уже наступил согласно{" "}
        <Link
          to="/about"
          className="text-blue-600 underline underline-offset-4 hover:opacity-80 dark:text-blue-300"
        >
          графику
        </Link>
        .
      </>,
    ],
  },
  {
    question:
      "Что делать, если тестирование Отборочного этапа не удалось завершить из-за технических проблем?",
    answer:
      "В случае технических проблем, не зависящих от участника, незамедлительно направьте на электронный адрес организационного комитета письмо с подробным описанием причины сбоя и приложите снимок экрана компьютера, подтверждающий наличие технической ошибки.",
  },
  {
    question: "Когда будут известны результаты? Прошёл ли я в следующий этап?",
    answer:
      "Результаты Отборочного этапа будут опубликованы в соответствующем разделе не позднее 10 рабочих дней после его завершения. Вся актуальная информация публикуется в разделе «Новости» и в соответствующих разделах сайта.",
  },
];

const olympiads = [
  {
    name: "Информационная безопасность",
    description: "Дисциплины: Информатика и ИКТ, Математика и Физика",
    fullDescription:
      "Олимпиада школьников «Университет цифровой полиции» по профилю «Информационная безопасность» провидится с 2024 года. Ее ключевой целью является выявление у учащихся 10-11 классов технического мышления и интереса к научно-исследовательской деятельности.\n\nОлимпиада способствует выявлению творческих, мыслящих молодых людей, способных решать комплексные задачи по обеспечению конфиденциальности, целостности и доступности информации.\n\nЗадания данного профиля Олимпиады формируются методической комиссией на основании обязательного минимума содержания основных образовательных программ предмета «Математика», «Физика» и «Информатика» уровня общеобразовательной программы, с учетом специфики выполняемых задач по обеспечению безопасности информации в сфере внутренних дел.",
    dates: {
      qualifying: "23 ноября - 13 декабря 2026 г.",
      final: "1 февраля - 28 февраля 2027 г.",
      finalEnd: "13 марта 2027 г.",
    },
    organizer: "Учебно-научный комплекс информационных технологий",
    address: "г. Москва, ул. Коптевская, д. 63",
  },
  {
    name: "Основы российской государственности",
    description: "Дисциплины: обществознание, история",
    fullDescription:
      "В 2025 году в Олимпиаде школьников «Университет цифровой полиции» впервые открывается профиль «Обществознание». В 2026 году профиль «Обществознание» существенно расширяется, в него добавлен блок «История». В связи с этим профиль получил новое название «Основы российской государственности».\n\nОлимпиада проводится среди учащихся 10–11-х классов, обладающих выдающимися способностями и проявляющих глубокий интерес к социально-гуманитарному знанию. Олимпиада способствует выявлению наиболее одаренных, творческих, самостоятельно мыслящих молодых людей, в том числе способных решать комплексные задачи, стоящие перед современной правоохранительной системой.\n\nЗадания олимпиады формируются методической комиссией на основе обязательного минимума содержания основных образовательных программ по предметам «Обществознание» и «История» с углубленным вниманием к правоохранительной тематике. В связи с этим задания Олимпиады разнообразны, в них включаются как вопросы по основным отраслям российского права, так и вопросы, выявляющие знания участников в области истории формирования и развития российского государства (в том числе правоохранительной системы как ключевого элемента механизма государства). Ряд вопросов затрагивает особенности экономического и политического устройства российского общества, а также социальные отношения и культурное наследие России.",
    dates: {
      qualifying: "23 ноября - 13 декабря 2026 г.",
      final: "1 февраля - 28 февраля 2027 г.",
      finalEnd: "20 марта 2027 г.",
    },
    organizer:
      "Кафедра теории государства и права Кафедра истории государства и права",
    address: "г. Москва, ул. Академика Волгина, д. 12",
  },
];

export default function Home() {
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
                    "border border-gray-200 bg-white/95 shadow-md hover:shadow-lg":
                      !isDarkMode,
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
                      <span className="relative z-10 flex cursor-pointer items-center justify-center gap-2">
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

      <m.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl px-6"
      >
        <div className="mb-8 text-center">
          <h2
            className={cn("text-center text-3xl font-bold", {
              "text-white": isDarkMode,
              "text-gray-900": !isDarkMode,
            })}
          >
            Часто задаваемые вопросы
          </h2>
        </div>

        <div
          className={cn(
            "rounded-2xl border px-2 py-2 shadow-xl backdrop-blur-md",
            {
              "border-white/10 bg-slate-950/35 shadow-black/10": isDarkMode,
              "border-white/70 bg-white/55 shadow-slate-900/5": !isDarkMode,
            },
          )}
        >
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <m.div
                key={item.question}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={cn(
                  "border-b last:border-b-0",
                  isDarkMode ? "border-white/10" : "border-slate-300/50",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className={cn(
                    "group flex w-full items-center justify-between gap-4 rounded-xl px-3 py-5 text-left text-base font-semibold transition-all duration-200 sm:text-xl",
                    {
                      "text-white hover:bg-white/5 hover:text-blue-200":
                        isDarkMode,
                      "text-slate-900 hover:bg-white/55 hover:text-blue-700":
                        !isDarkMode,
                    },
                  )}
                >
                  <span className="flex min-w-0 items-start gap-3">
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 flex-shrink-0 rounded-full transition-transform duration-300 group-hover:scale-110",
                      isOpen && "rotate-180",
                      isDarkMode ? "text-blue-300" : "text-blue-600",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={answerId}
                      key={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden text-lg"
                    >
                      {Array.isArray(item.answer) ? (
                        <ul
                          className={cn(
                            "list-disc space-y-2 leading-relaxed",
                            isDarkMode ? "text-gray-300" : "text-gray-600",
                          )}
                        >
                          {item.answer.map((answer, answerIndex) => (
                            <li key={answerIndex}>{answer}</li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          className={cn(
                            "py-2 pb-5 pl-3 leading-relaxed",
                            isDarkMode ? "text-gray-300" : "text-gray-600",
                          )}
                        >
                          {item.answer}
                        </p>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </div>

        <p
          className={cn("z-10 mt-6 leading-relaxed", {
            "text-gray-300": isDarkMode,
            "text-gray-600": !isDarkMode,
          })}
        >
          Если у вас остался нестандартный вопрос, ответа на который нет в этом
          списке и{" "}
          <Link
            to="/about"
            className={cn("underline underline-offset-4 hover:opacity-80", {
              "text-blue-300": isDarkMode,
              "text-blue-600": !isDarkMode,
            })}
          >
            регламентирующих документах
          </Link>
          , задайте его в письме на электронный адрес организационного комитета.
        </p>
      </m.section>

      {/* Карусель */}
      <Carousel />

      <Footer />
    </div>
  );
}

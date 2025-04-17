import Navbar from "../../components/layout/Navbar/Navbar";
import News from "./Sections/News";
import About from "./Sections/About";
import Partners from "./Sections/Partners";
import Footer from "../../components/layout/Footer/Footer";
import Results from "./Sections/Results";
import { Button } from "../../components/ui/Button";
import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import { fadeUp } from "../../components/animations/fadeUp";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { useThemeStore } from "../../stores/themeStore";
import cn from "clsx";

export default function Home() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={cn("min-h-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section
        className={cn(
          "relative flex flex-col items-center justify-between px-4 py-20 sm:px-6 md:flex-row",
          {
            "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
              isDarkMode,
            "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200":
              !isDarkMode,
          },
        )}
      >
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <h2
            className={cn("mb-6 text-4xl leading-tight font-bold md:text-5xl", {
              "text-white": isDarkMode,
              "text-gray-900": !isDarkMode,
            })}
          >
            Всероссийская олимпиада школьников
          </h2>
          <p
            className={cn("mb-8 text-xl", {
              "text-blue-100": isDarkMode,
              "text-blue-600": !isDarkMode,
            })}
          >
            Побеждай в соревнованиях и получай дополнительные баллы при
            поступлении
          </p>
        </m.div>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={cn("h-72 w-full rounded-2xl sm:w-md", {
            "bg-gradient-to-br from-blue-700 to-blue-400": isDarkMode,
            "bg-gradient-to-br from-blue-400 to-blue-300": !isDarkMode,
          })}
        />
      </section>

      {/* Новости */}
      <section
        id="news"
        className={cn("relative px-4 py-16 sm:px-6", {
          "bg-[#0d1117]": isDarkMode,
          "bg-gray-100": !isDarkMode,
        })}
      >
        <News />
      </section>

      {/* Об олимпиаде */}
      <section
        id="about"
        className={cn("px-4 py-20 sm:px-6", {
          "bg-[#0b0f1a]": isDarkMode,
          "bg-white": !isDarkMode,
        })}
      >
        <m.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={cn("mb-12 text-center text-3xl font-semibold", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Подробнее об Олимпиаде
        </m.h3>
        <About />
      </section>

      {/* Результаты */}
      <section
        id="results"
        className={cn("px-4 py-20 sm:px-6", {
          "bg-[#0e121a]": isDarkMode,
          "bg-gray-50": !isDarkMode,
        })}
      >
        <m.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn("mb-8 text-center text-3xl font-semibold", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Результаты Олимпиады
        </m.h3>
        <Results />
      </section>

      {/* Партнёры */}
      <section
        id="partners"
        className={cn("relative px-4 py-20 sm:px-6", {
          "bg-[#0d1117]": isDarkMode,
          "bg-gray-100": !isDarkMode,
        })}
      >
        <m.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={cn("mb-8 text-center text-3xl font-semibold", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Партнёры
        </m.h3>
        <Partners />
      </section>

      {/* Разработчики */}
      <section
        id="developers"
        className={cn("px-4 py-14 text-center sm:px-6", {
          "bg-[#0b0f1a]": isDarkMode,
          "bg-white": !isDarkMode,
        })}
      >
        <m.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn("mb-6 text-3xl font-semibold", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Разработчики
        </m.h3>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn("mx-auto mb-8 max-w-4xl text-lg", {
            "text-gray-400": isDarkMode,
            "text-gray-600": !isDarkMode,
          })}
        >
          Проект разработан курсантами факультета подготовки специалистов в
          области информационной безопасности Московского университета МВД
          России имени В.Я. Кикотя.
        </m.p>
        <Link to={"/developers"}>
          <Button className="px-7 py-3">Подробнее</Button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

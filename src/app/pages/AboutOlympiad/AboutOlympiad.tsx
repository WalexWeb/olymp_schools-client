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

function AboutOlympiad() {
  const { isDarkMode } = useThemeStore();

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
                  безопасность» и Обществознание». В олимпиаде могут принять
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
                  className={cn("mb-4 text-center text-2xl font-semibold", {
                    "text-white": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  График проведения олимпиады в 2025-2026 году
                </h3>
                <p className="mb-4">Олимпиада проводится в два этапа.</p>
                <ol className="mb-4 list-decimal space-y-2 pl-6">
                  <li>
                    Первый (отборочный) этап Олимпиады проводится в период с 24
                    ноября 2024 года по 14 декабря 2025 года в виде
                    дистанционного тестирования через
                    информационно-телекоммуникационную сеть «Интернет».
                  </li>
                  <li>
                    Второй (заключительный) этап Олимпиады на базе Московского
                    университета МВД России имени В.Я. Кикотя проводится с 12
                    января по 14 марта 2026 года.
                  </li>
                </ol>
                <p>
                  Для прохождения Олимпиады необходимо пройти процедуру
                  регистрацию в личном кабинете на сайте.
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

export default AboutOlympiad;

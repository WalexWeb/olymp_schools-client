import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";
import Footer from "../components/layout/Footer/Footer";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Background from "../components/ui/Background";

function Passing() {
  const { isDarkMode } = useThemeStore();
  const { isAuthenticated } = useAuthStore();

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
              Прохождение олимпиады
            </h2>

            <div
              className={cn("rounded-2xl p-8 text-lg", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
              })}
            >
              <h3 className="mb-6 text-center text-2xl font-semibold">
                Регистрация участников
              </h3>

              <p className="mb-4">
                Для прохождения олимпиады Вам необходимо заполнить
                регистрационную форму.
              </p>

              <div className="mb-4 flex justify-center">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <Button className="px-7 py-3">
                      Перейти в личный кабинет
                    </Button>
                  </Link>
                ) : (
                  <Link to="/registration">
                    <Button className="px-7 py-3">Регистрация</Button>
                  </Link>
                )}
              </div>

              <p className="mb-4">
                После заполнения необходимо распечатать анкету, подписать и
                направить на электронную почту:{" "}
                <a
                  href="mailto:olimpiada.mosu@mail.ru"
                  className={cn("font-medium", {
                    "text-blue-400": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  olimpiada_mosu_mvd_ru@mvd.ru
                </a>
                <p>
                  В ответном письме в течении <b>трех рабочих дней</b> вам будет
                  направлена информация для доступа к заданиям Отборочного
                  этапа.
                </p>
              </p>
              <p
                className={cn("mb-4 font-bold", {
                  "text-blue-400": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                Для отправки анкеты необходимо использовать российские почтовые
                сервисы (Yandex, Mail, Rambler). <br />
              </p>
              <p className="mb-4">
                Доступ к тестовым заданиям откроется в 00:00 23 ноября 2026 года
                по московскому времени. <br />
              </p>

              {isAuthenticated && (
                <p className="mb-4">
                  Для прохождения Отборочного этапа олимпиады{" "}
                  <a
                    className="font-bold text-blue-500 underline"
                    href="https://moodle.mosu-mvd.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    перейдите по ссылке
                  </a>
                </p>
              )}
            </div>

            <div className="flex justify-center">
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

export default Passing;

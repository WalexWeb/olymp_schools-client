import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";
import Footer from "../components/layout/Footer/Footer";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import Background from "../components/ui/Background";

function RegistrationClosed() {
  const { isDarkMode } = useThemeStore();

  const CalendarCloseIcon = () => (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn({
        "text-blue-400": isDarkMode,
        "text-blue-600": !isDarkMode,
      })}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9" y1="14" x2="15" y2="20" />
      <line x1="15" y1="14" x2="9" y2="20" />
    </svg>
  );

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

      <section className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-3xl">
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
              Регистрация
            </h2>

            <div
              className={cn("rounded-2xl p-8 text-center", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
              })}
            >
              <div className="space-y-6">
                <m.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex justify-center"
                >
                  <div
                    className={cn(
                      "mb-6 flex h-24 w-24 items-center justify-center rounded-full",
                      {
                        "bg-blue-900/20": isDarkMode,
                        "bg-blue-100": !isDarkMode,
                      },
                    )}
                  >
                    <CalendarCloseIcon />
                  </div>
                </m.div>

                <h3
                  className={cn("text-2xl font-semibold md:text-3xl", {
                    "text-white": isDarkMode,
                    "text-gray-800": !isDarkMode,
                  })}
                >
                  Регистрация участников на Олимпиаду «Университет цифровой
                  полиции» 2025-2026 закрыта
                </h3>

                <m.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="space-y-4"
                >
                  <p
                    className={cn("text-xl md:text-2xl", {
                      "text-blue-400": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Ждём Вас в следующем году!
                  </p>
                </m.div>
              </div>
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

export default RegistrationClosed;

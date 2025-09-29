import cn from "clsx";
import { m } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import Navbar from "../components/layout/Navbar/Navbar";
import { fadeUp } from "../components/animations/fadeUp";
import { Button } from "../components/ui/Button";
import Footer from "../components/layout/Footer/Footer";

interface OlympiadProfileData {
  name: string;
  description: string;
  fullDescription: string;
  organizer: string;
  dates: {
    qualifying: string;
    final: string;
    finalEnd: string;
  };
  address: string;
}

function OlympiadProfile() {
  const { isDarkMode } = useThemeStore();
  const location = useLocation();
  const profile = location.state?.olympiad as OlympiadProfileData | undefined;

  // Если данные не переданы (прямой заход), редирект на главную
  if (!profile) {
    return (
      <div
        className={cn(
          "flex min-h-screen w-screen items-center justify-center font-sans",
          {
            "bg-[#0b0f1a] text-white": isDarkMode,
            "bg-gray-50 text-gray-900": !isDarkMode,
          },
        )}
      >
        <div className="text-center">
          <h1 className="mb-4 text-2xl">Профиль не найден</h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
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
            {/* Заголовок профиля */}
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <h1
                  className={cn("text-4xl font-bold md:text-5xl", {
                    "text-white": isDarkMode,
                    "text-gray-900": !isDarkMode,
                  })}
                >
                  {profile.name}
                </h1>
              </div>
              <p
                className={cn("mx-auto max-w-3xl text-xl", {
                  "text-blue-300": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                {profile.description}
              </p>
            </div>

            {/* Основной контент */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Левая колонка - детальная информация */}
              <div className="space-y-6 lg:col-span-2">
                {/* Подробное описание */}
                <div
                  className={cn("rounded-2xl p-8", {
                    "border border-blue-800/30 bg-[#0b0f1a]": isDarkMode,
                    "border border-gray-200 bg-white shadow-md": !isDarkMode,
                  })}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
                        {
                          "bg-blue-500/20 text-blue-400": isDarkMode,
                          "bg-blue-100 text-blue-600": !isDarkMode,
                        },
                      )}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2
                      className={cn("text-2xl font-bold", {
                        "text-blue-300": isDarkMode,
                        "text-blue-600": !isDarkMode,
                      })}
                    >
                      О профиле
                    </h2>
                  </div>
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {profile.fullDescription}
                  </p>
                </div>
              </div>

              {/* Правая колонка - ключевая информация */}
              <div className="space-y-6">
                {/* Даты проведения */}
                <div
                  className={cn("rounded-2xl p-6", {
                    "border border-blue-800/30 bg-[#0b0f1a]": isDarkMode,
                    "border border-gray-200 bg-white shadow-md": !isDarkMode,
                  })}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3
                      className={cn("text-xl font-bold", {
                        "text-blue-300": isDarkMode,
                        "text-blue-600": !isDarkMode,
                      })}
                    >
                      Даты проведения
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p
                        className={cn("text-sm font-medium", {
                          "text-gray-400": isDarkMode,
                          "text-gray-500": !isDarkMode,
                        })}
                      >
                        Отборочный этап:
                      </p>
                      <p className="font-semibold">
                        {profile.dates.qualifying}
                      </p>
                    </div>
                    <div>
                      <p
                        className={cn("text-sm font-medium", {
                          "text-gray-400": isDarkMode,
                          "text-gray-500": !isDarkMode,
                        })}
                      >
                        Заключительный этап:
                      </p>
                      <p className="font-semibold">{profile.dates.final}</p>
                    </div>
                    <div>
                      <p
                        className={cn("text-sm font-medium", {
                          "text-gray-400": isDarkMode,
                          "text-gray-500": !isDarkMode,
                        })}
                      >
                        Финальный этап:
                      </p>
                      <p className="font-semibold">{profile.dates.finalEnd}</p>
                    </div>
                  </div>
                </div>

                {/* Организатор */}
                <div
                  className={cn("rounded-2xl p-6", {
                    "border border-blue-800/30 bg-[#0b0f1a]": isDarkMode,
                    "border border-gray-200 bg-white shadow-md": !isDarkMode,
                  })}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
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
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14v6m0 0l-3-3m3 3l3-3"
                        />
                      </svg>
                    </div>
                    <h3
                      className={cn("text-xl font-bold", {
                        "text-blue-300": isDarkMode,
                        "text-blue-600": !isDarkMode,
                      })}
                    >
                      Организаторы профиля
                    </h3>
                  </div>
                  <p>{profile.organizer}</p>
                </div>

                {/* Место проведения */}
                <div
                  className={cn("rounded-2xl p-6", {
                    "border border-blue-800/30 bg-[#0b0f1a]": isDarkMode,
                    "border border-gray-200 bg-white shadow-md": !isDarkMode,
                  })}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3
                      className={cn("text-xl font-bold", {
                        "text-blue-300": isDarkMode,
                        "text-blue-600": !isDarkMode,
                      })}
                    >
                      Место проведения
                    </h3>
                  </div>
                  <p>{profile.address}</p>
                </div>

                {/* Кнопки действий */}
                <div className="space-y-3">
                  <Link to="/" className="block">
                    <Button
                      className={cn("w-full py-3", {
                        "border-gray-600 text-white": isDarkMode,
                        "border-gray-300 text-gray-700": !isDarkMode,
                      })}
                    >
                      <div className="flex items-center justify-center gap-2">
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
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        На главную
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OlympiadProfile;

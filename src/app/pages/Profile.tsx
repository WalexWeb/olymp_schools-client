import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { fadeUp } from "../components/animations/fadeUp";
import { m } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import { getCustomToastStyle } from "../components/ui/toastStyles";
import { toast, ToastContainer } from "react-toastify";

interface SelectedOlympiad {
  name: string;
  date: string;
  description: string | null;
}

interface UserData {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  residenceRegion: string;
  residenceSettlement: string;
  educationalInstitution: string;
  institutionAddress: string;
  postalAddress: string;
  snils: string;
  gender: string;
  classCourse: string;
  selectedOlympiads?: SelectedOlympiad[];
}

export default function Profile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useThemeStore();
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
    residenceRegion: "",
    residenceSettlement: "",
    educationalInstitution: "",
    institutionAddress: "",
    postalAddress: "",
    snils: "",
    gender: "",
    classCourse: "",
  });

  // Загрузка данных профиля
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserData>(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            "Ошибка загрузки профиля",
            getCustomToastStyle(isDarkMode),
          );
        }
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, isDarkMode]);

  if (isLoading) {
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
        <div className="text-xl">Загрузка профиля...</div>
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
      <ToastContainer />
      {/* Плашка с предупреждением */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn("w-full border-b px-4 py-3", {
          "border-yellow-600/30 bg-yellow-500/20 text-yellow-200": isDarkMode,
          "border-yellow-300 bg-yellow-100 text-yellow-800": !isDarkMode,
        })}
      >
        <div className="mx-auto">
          <div className="flex items-center justify-center gap-3">
            <svg
              className={cn("flex-shrink-0", {
                "text-yellow-400": isDarkMode,
                "text-yellow-600": !isDarkMode,
              })}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
            <span className="text-center text-sm font-medium sm:text-base">
              В случае если вы допустили ошибку в учетных данных, просьба
              направить письмо с описанием проблемы на электронную почту{" "}
              <a
                href="mailto:olimpiada.mosu@mail.ru"
                className={cn("font-medium", {
                  "text-blue-400": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                olimpiada.mosu@mail.ru
              </a>,{" "}
               указав в теме письма: «Личный кабинет»
            </span>
          </div>
        </div>
      </m.div>
      {/* Основной блок с профилем */}
      <section
        className={cn("relative min-h-[80vh] px-6 py-12", {
          "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200":
            !isDarkMode,
        })}
      >
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
          {/* ФИО и почта */}
          <div className="flex h-full flex-col">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={cn(
                "flex h-full flex-1 flex-col rounded-2xl p-6 shadow-lg",
                {
                  "border border-blue-800/30 bg-[#161b22]/50": isDarkMode,
                  "border border-gray-200 bg-white shadow-md": !isDarkMode,
                },
              )}
            >
              <h2
                className={cn("mb-6 text-2xl font-bold", {
                  "text-blue-300": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                Личные данные
              </h2>

              <div className="space-y-6">
                <div>
                  <h3
                    className={cn("text-lg font-semibold", {
                      "text-gray-400": isDarkMode,
                      "text-gray-500": !isDarkMode,
                    })}
                  >
                    ФИО
                  </h3>
                  <p className="mt-1 text-xl">
                    {userData.lastName} {userData.firstName}{" "}
                    {userData.middleName}
                  </p>
                </div>

                <div>
                  <h3
                    className={cn("text-lg font-semibold", {
                      "text-gray-400": isDarkMode,
                      "text-gray-500": !isDarkMode,
                    })}
                  >
                    Электронная почта
                  </h3>
                  <p className="mt-1 text-xl">{userData.email}</p>
                </div>
              </div>
            </m.div>
          </div>

          {/* Остальные данные */}
          <div className="flex h-full w-full flex-col">
            <div
              className={cn(
                "relative h-full flex-1 rounded-2xl p-6 shadow-lg",
                {
                  "border border-blue-800/30 bg-[#161b22]/50": isDarkMode,
                  "border border-gray-200 bg-white shadow-md": !isDarkMode,
                },
              )}
            >
              <div className="mb-6">
                <h2
                  className={cn("text-2xl font-bold", {
                    "text-blue-300": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Общая информация
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Первая колонка */}
                <div className="space-y-6">
                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Дата рождения
                    </h3>
                    <p className="mt-1 text-xl">{userData.birthDate}</p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Пол
                    </h3>
                    <p className="mt-1 text-xl">
                      {userData.gender === "MALE" ? "Мужской" : "Женский"}
                    </p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Класс/Курс
                    </h3>
                    <p className="mt-1 text-xl">{userData.classCourse}</p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Телефон
                    </h3>
                    <p className="mt-1 text-xl">{userData.phoneNumber}</p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Почтовый адрес
                    </h3>
                    <p className="mt-1 text-xl">{userData.postalAddress}</p>
                  </div>
                </div>

                {/* Вторая колонка */}
                <div className="space-y-6">
                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Учебное заведение
                    </h3>
                    <p className="mt-1 text-xl">
                      {userData.educationalInstitution}
                    </p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Регион организации
                    </h3>
                    <p className="mt-1 text-xl">
                      {userData.institutionAddress}
                    </p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Регион проживания
                    </h3>
                    <p className="mt-1 text-xl">{userData.residenceRegion}</p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Населенный пункт
                    </h3>
                    <p className="mt-1 text-xl">
                      {userData.residenceSettlement}
                    </p>
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      СНИЛС
                    </h3>
                    <p className="mt-1 text-xl">{userData.snils}</p>
                  </div>
                </div>
              </div>

              {/* Блок выбранных олимпиад */}
              {userData.selectedOlympiads &&
                userData.selectedOlympiads.length > 0 && (
                  <div className="mt-8">
                    <h3
                      className={cn("mb-4 text-xl font-bold", {
                        "text-blue-300": isDarkMode,
                        "text-blue-600": !isDarkMode,
                      })}
                    >
                      Выбранные профили олимпиад
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {userData.selectedOlympiads.map((olympiad, index) => (
                        <div
                          key={index}
                          className={cn("rounded-lg border-2 p-4", {
                            "border-blue-500 bg-blue-500/10": isDarkMode,
                            "border-blue-400 bg-blue-50": !isDarkMode,
                          })}
                        >
                          <div className="flex items-start">
                            <div
                              className={cn(
                                "mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2",
                                {
                                  "border-blue-500 bg-blue-500 text-white":
                                    isDarkMode,
                                  "border-blue-400 bg-blue-400 text-white":
                                    !isDarkMode,
                                },
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-3 w-3"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold">
                                {olympiad.name}
                              </h3>
                              {olympiad.description && (
                                <p
                                  className={cn("mt-2 text-sm", {
                                    "text-gray-600": !isDarkMode,
                                    "text-gray-300": isDarkMode,
                                  })}
                                >
                                  {olympiad.description}
                                </p>
                              )}
                              <div className="mt-2 text-sm font-medium text-blue-500">
                                Выбрано
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

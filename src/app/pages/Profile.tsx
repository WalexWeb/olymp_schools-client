import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { fadeUp } from "../components/animations/fadeUp";
import { m } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import { getCustomToastStyle } from "../components/ui/toastStyles";
import { toast, ToastContainer } from "react-toastify";
import { IOlympiad } from "../types/IOlympiads.type";

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
  const [isEditing, setIsEditing] = useState(false);
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
  const [olympiads, setOlympiads] = useState<IOlympiad[]>([]);
  const [selectedOlympiadNames, setSelectedOlympiadNames] = useState<
    Set<string>
  >(new Set());
  const [olympiadsLoading, setOlympiadsLoading] = useState(true);
  const [isSubmittingOlympiads, setIsSubmittingOlympiads] = useState(false);
  const [initialSelectedOlympiadNames, setInitialSelectedOlympiadNames] =
    useState<Set<string>>(new Set());

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

        // Извлекаем названия выбранных олимпиад и создаём Set
        const selectedNames = new Set(
          response.data.selectedOlympiads?.map((item) => item.name) ?? [],
        );
        setSelectedOlympiadNames(selectedNames);
        setInitialSelectedOlympiadNames(new Set(selectedNames));
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

  // Загрузка списка олимпиад
  useEffect(() => {
    const fetchOlympiads = async () => {
      if (!token) return;
      try {
        setOlympiadsLoading(true);
        const response = await axios.get<IOlympiad[]>(`${API_URL}/olympiads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOlympiads(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            "Не удалось загрузить список олимпиад",
            getCustomToastStyle(isDarkMode),
          );
        }
        console.error("Failed to fetch olympiads:", error);
      } finally {
        setOlympiadsLoading(false);
      }
    };

    fetchOlympiads();
  }, [token, isDarkMode]);

  // Обработчики изменений полей
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOlympiadChange = (name: string) => {
    setSelectedOlympiadNames((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  // Сохранение изменений профиля
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `${API_URL}/profile`,
        {
          email: userData.email,
          firstName: userData.firstName,
          middleName: userData.middleName,
          lastName: userData.lastName,
          birthDate: userData.birthDate,
          phoneNumber: userData.phoneNumber,
          residenceRegion: userData.residenceRegion,
          residenceSettlement: userData.residenceSettlement,
          educationalInstitution: userData.educationalInstitution,
          institutionAddress: userData.institutionAddress,
          postalAddress: userData.postalAddress,
          snils: userData.snils,
          gender: userData.gender,
          classCourse: userData.classCourse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(
        "Профиль успешно обновлен!",
        getCustomToastStyle(isDarkMode),
      );
      setIsEditing(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Ошибка обновления профиля",
          getCustomToastStyle(isDarkMode),
        );
      }
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Отправка выбранных олимпиад
  const submitSelectedOlympiads = async () => {
    if (!token) return;

    const currentSelected = Array.from(selectedOlympiadNames);
    const initialSelected = Array.from(initialSelectedOlympiadNames);

    // Олимпиады, которые нужно УДАЛИТЬ (были, но теперь нет)
    const toDelete = initialSelected.filter(
      (name) => !selectedOlympiadNames.has(name),
    );

    // Олимпиады, которые нужно ДОБАВИТЬ (новые)
    const toAdd = currentSelected.filter(
      (name) => !initialSelectedOlympiadNames.has(name),
    );

    setIsSubmittingOlympiads(true);

    try {
      // Сначала удаляем снятые
      const deletePromises = toDelete.map((name) =>
        axios.delete(
          `${API_URL}/profile/olympiads/${encodeURIComponent(name)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      );

      await Promise.all(deletePromises);

      // Затем добавляем новые
      if (toAdd.length > 0) {
        await axios.post(`${API_URL}/profile/olympiads/select`, toAdd, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      toast.success(
        "Выбор олимпиад успешно обновлён!",
        getCustomToastStyle(isDarkMode),
      );

      // Обновляем изначальное состояние после успешного сохранения
      setInitialSelectedOlympiadNames(new Set(selectedOlympiadNames));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Ошибка при обновлении выбора олимпиад",
          getCustomToastStyle(isDarkMode),
        );
      }
      console.error("Failed to submit olympiads:", error);
    } finally {
      setIsSubmittingOlympiads(false);
    }
  };

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
                  {isEditing ? (
                    <div className="mt-2 grid grid-cols-1 gap-4">
                      <Input
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        placeholder="Фамилия"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                      <Input
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        placeholder="Имя"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                      <Input
                        name="middleName"
                        value={userData.middleName}
                        onChange={handleInputChange}
                        placeholder="Отчество"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-xl">
                      {userData.lastName} {userData.firstName}{" "}
                      {userData.middleName}
                    </p>
                  )}
                </div>

                <div>
                  <h3
                    className={cn("text-lg font-semibold", {
                      "text-gray-400": isDarkMode,
                      "text-gray-500": !isDarkMode,
                    })}
                  >
                    Почта
                  </h3>
                  {isEditing ? (
                    <Input
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className={cn("mt-2", {
                        "border-blue-700 bg-[#1e293b]": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      disabled
                    />
                  ) : (
                    <p className="mt-1 text-xl">{userData.email}</p>
                  )}
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
              <div className="mb-6 flex items-center justify-between">
                <h2
                  className={cn("text-2xl font-bold", {
                    "text-blue-300": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Общая информация
                </h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className={cn("px-4 py-2", {
                      "bg-blue-600 hover:bg-blue-500": isDarkMode,
                      "bg-blue-500 hover:bg-blue-400": !isDarkMode,
                    })}
                    disabled={isLoading}
                  >
                    Редактировать профиль
                  </Button>
                )}
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
                    {isEditing ? (
                      <Input
                        type="date"
                        name="birthDate"
                        value={userData.birthDate}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.birthDate}</p>
                    )}
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
                    {isEditing ? (
                      <Select
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className={cn("input-size w-full", {
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      >
                        <option value="MALE">Мужской</option>
                        <option value="FEMALE">Женский</option>
                      </Select>
                    ) : (
                      <p className="mt-1 text-xl">
                        {userData.gender === "MALE" ? "Мужской" : "Женский"}
                      </p>
                    )}
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
                    {isEditing ? (
                      <Select
                        name="classCourse"
                        value={userData.classCourse}
                        onChange={handleInputChange}
                        className={cn("input-size w-full", {
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      >
                        <option value="10 класс">10 класс</option>
                        <option value="11 класс">11 класс</option>
                        <option value="1 курс">1 курс</option>
                        <option value="2 курс">2 курс</option>
                      </Select>
                    ) : (
                      <p className="mt-1 text-xl">{userData.classCourse}</p>
                    )}
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
                    {isEditing ? (
                      <Input
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.phoneNumber}</p>
                    )}
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
                    {isEditing ? (
                      <Input
                        name="postalAddress"
                        value={userData.postalAddress}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.postalAddress}</p>
                    )}
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
                    {isEditing ? (
                      <Input
                        name="educationalInstitution"
                        value={userData.educationalInstitution}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">
                        {userData.educationalInstitution}
                      </p>
                    )}
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
                    {isEditing ? (
                      <Input
                        name="institutionAddress"
                        value={userData.institutionAddress}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">
                        {userData.institutionAddress}
                      </p>
                    )}
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
                    {isEditing ? (
                      <Select
                        name="residenceRegion"
                        value={userData.residenceRegion}
                        onChange={handleInputChange}
                        className={cn("input-size w-full", {
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      >
                        <option value="Москва">Москва</option>
                        <option value="СПб">Санкт-Петербург</option>
                      </Select>
                    ) : (
                      <p className="mt-1 text-xl">{userData.residenceRegion}</p>
                    )}
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
                    {isEditing ? (
                      <Input
                        name="residenceSettlement"
                        value={userData.residenceSettlement}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">
                        {userData.residenceSettlement}
                      </p>
                    )}
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
                    {isEditing ? (
                      <Input
                        name="snils"
                        value={userData.snils}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.snils}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Блок выбора олимпиад */}
              {/* Блок выбора олимпиад */}
              <div className="mt-8">
                <h3
                  className={cn("mb-4 text-xl font-bold", {
                    "text-blue-300": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Выберите профиль олимпиады
                </h3>

                {olympiadsLoading ? (
                  <p className="text-center text-gray-500">
                    Загрузка олимпиад...
                  </p>
                ) : olympiads.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Нет доступных олимпиад
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {olympiads.map((olympiad, index) => {
                      const isSelected = selectedOlympiadNames.has(
                        olympiad.name,
                      );
                      return (
                        <div
                          key={index}
                          className={cn(
                            "group cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md",
                            {
                              "border-blue-500 bg-blue-500/10": isSelected,
                              "border-gray-300 hover:border-blue-300":
                                !isSelected && !isDarkMode,
                              "border-gray-700 hover:border-blue-500":
                                !isSelected && isDarkMode,
                            },
                          )}
                          onClick={() => handleOlympiadChange(olympiad.name)}
                        >
                          <div className="flex items-start">
                            <div
                              className={cn(
                                "mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all",
                                {
                                  "border-blue-500 bg-blue-500 text-white":
                                    isSelected,
                                  "border-gray-400 group-hover:border-blue-400":
                                    !isSelected && !isDarkMode,
                                  "border-gray-500 group-hover:border-blue-500":
                                    !isSelected && isDarkMode,
                                },
                              )}
                            >
                              {isSelected && (
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
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold">
                                {olympiad.name}
                              </h3>
                              <p
                                className={cn("mt-2 text-sm", {
                                  "text-gray-600": !isDarkMode,
                                  "text-gray-300": isDarkMode,
                                })}
                              >
                                {olympiad.description}
                              </p>
                              {isSelected && (
                                <div className="mt-2 text-sm font-medium text-blue-500">
                                  Выбрано
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Кнопка подтверждения */}
                {selectedOlympiadNames.size > 0 && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={submitSelectedOlympiads}
                      disabled={isSubmittingOlympiads}
                      className={cn("px-6 py-2", {
                        "bg-green-600 hover:bg-green-500": isDarkMode,
                        "bg-green-500 hover:bg-green-400": !isDarkMode,
                      })}
                    >
                      {isSubmittingOlympiads
                        ? "Отправка..."
                        : "Подтвердить выбор"}
                    </Button>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end space-x-4">
                  <Button
                    onClick={() => setIsEditing(false)}
                    className={cn("px-6 py-2", {
                      "bg-gray-600 hover:bg-gray-500": isDarkMode,
                      "bg-gray-200 text-gray-800 hover:bg-gray-300":
                        !isDarkMode,
                    })}
                    disabled={isLoading}
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleSave}
                    className={cn("px-6 py-2", {
                      "bg-blue-600 hover:bg-blue-500": isDarkMode,
                      "bg-blue-500 hover:bg-blue-400": !isDarkMode,
                    })}
                    disabled={isLoading}
                  >
                    {isLoading ? "Сохранение..." : "Сохранить изменения"}
                  </Button>
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

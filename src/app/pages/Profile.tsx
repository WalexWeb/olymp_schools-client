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

interface UserData {
  lastname: string;
  firstname: string;
  patronymic: string;
  email: string;
  dateofbirth: string;
  gender: "М" | "Ж";
  class_name: string;
  institute: string;
  instituteRegion: string;
  phone: string;
  region: string;
  city: string;
  snils: string;
  mailAddress: string;
}

export default function Profile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useThemeStore();
  const { token } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    lastname: "",
    firstname: "",
    patronymic: "",
    email: "",
    dateofbirth: "",
    gender: "М",
    class_name: "",
    institute: "",
    instituteRegion: "",
    phone: "",
    region: "",
    city: "",
    snils: "",
    mailAddress: "",
  });

  // Загрузка данных профиля
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/users-service/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `${API_URL}/users-service/updateProfile`,
        {
          firstName: userData.firstname,
          patronymic: userData.patronymic,
          lastName: userData.lastname,
          dateOfBirth: userData.dateofbirth,
          phone: userData.phone,
          region: userData.region,
          city: userData.city,
          institute: userData.institute,
          gender: userData.gender,
          class_name: userData.class_name,
          // snils: userData.snils,
          // mailAddress: userData.mailAddress,
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
                        name="lastname"
                        value={userData.lastname}
                        onChange={handleInputChange}
                        placeholder="Фамилия"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                      <Input
                        name="firstname"
                        value={userData.firstname}
                        onChange={handleInputChange}
                        placeholder="Имя"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                      <Input
                        name="patronymic"
                        value={userData.patronymic}
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
                      {userData.lastname} {userData.firstname}{" "}
                      {userData.patronymic}
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
                      disabled // Email обычно нельзя менять
                    />
                  ) : (
                    <p className="mt-1 text-xl">{userData.email}</p>
                  )}
                </div>
              </div>
            </m.div>
          </div>

          {/* Остальные данные */}
          <div className="flex h-full flex-col">
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
                  <InfoBlock
                    title="Дата рождения"
                    value={userData.dateofbirth}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="dateOfBirth"
                    onChange={handleInputChange}
                    type="date"
                  />
                  <InfoBlock
                    title="Пол"
                    value={userData.gender}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="gender"
                    onChange={handleInputChange}
                    type="select"
                    options={[
                      { value: "М", label: "Мужской" },
                      { value: "Ж", label: "Женский" },
                    ]}
                  />
                  <InfoBlock
                    title="Класс/Курс"
                    value={userData.class_name}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="class"
                    onChange={handleInputChange}
                    type="select"
                    options={[
                      { value: "10 класс", label: "10 класс" },
                      { value: "11 класс", label: "11 класс" },
                      { value: "1 курс", label: "1 курс" },
                      { value: "2 курс", label: "2 курс" },
                    ]}
                  />
                  <InfoBlock
                    title="Телефон"
                    value={userData.phone}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="phone"
                    onChange={handleInputChange}
                  />
                  <InfoBlock
                    title="Почтовый адрес"
                    value={userData.mailAddress}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="mailAddress"
                    onChange={handleInputChange}
                  />
                </div>

                {/* Вторая колонка */}
                <div className="space-y-6">
                  <InfoBlock
                    title="Учебное заведение"
                    value={userData.institute}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="institute"
                    onChange={handleInputChange}
                  />
                  <InfoBlock
                    title="Регион организации"
                    value={userData.instituteRegion}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="instituteRegion"
                    onChange={handleInputChange}
                    type="select"
                    options={[
                      { value: "Москва", label: "Москва" },
                      { value: "СПб", label: "Санкт-Петербург" },
                    ]}
                  />
                  <InfoBlock
                    title="Регион проживания"
                    value={userData.region}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="region"
                    onChange={handleInputChange}
                    type="select"
                    options={[
                      { value: "Москва", label: "Москва" },
                      { value: "СПб", label: "Санкт-Петербург" },
                    ]}
                  />
                  <InfoBlock
                    title="Населенный пункт"
                    value={userData.city}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="city"
                    onChange={handleInputChange}
                  />
                  <InfoBlock
                    title="СНИЛС"
                    value={userData.snils}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    name="snils"
                    onChange={handleInputChange}
                  />
                </div>
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

function InfoBlock({
  title,
  value,
  isDarkMode,
  isEditing = false,
  name = "",
  onChange = () => {},
  type = "text",
  options = [],
}: {
  title: string;
  value: string;
  isDarkMode: boolean;
  isEditing?: boolean;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  type?: "text" | "date" | "select";
  options?: { value: string; label: string }[];
}) {
  return (
    <div>
      <h3
        className={cn("mb-2 text-lg font-semibold", {
          "text-gray-400": isDarkMode,
          "text-gray-500": !isDarkMode,
        })}
      >
        {title}
      </h3>
      {isEditing ? (
        type === "select" ? (
          <Select name={name} value={value} onChange={onChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : (
          <Input type={type} name={name} value={value} onChange={onChange} />
        )
      ) : (
        <p
          className={cn("mt-1 rounded-lg p-2 text-xl", {
            "bg-[#1e293b]": isDarkMode && isEditing,
            "bg-gray-100": !isDarkMode && isEditing,
          })}
        >
          {value}
        </p>
      )}
    </div>
  );
}

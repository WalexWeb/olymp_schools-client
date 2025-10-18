import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { fadeUp } from "../components/animations/fadeUp";
import { SubmitHandler, useForm } from "react-hook-form";
import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../stores/themeStore";
import { ToastContainer, toast } from "react-toastify";
import { getCustomToastStyle } from "../components/ui/toastStyles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { regions } from "../../data/mockData";
import { IOlympiad } from "../types/IOlympiads.type";

interface RegistrationForm {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  residenceRegion: string;
  residenceSettlement: string;
  settlementType: string;
  educationalInstitution: string;
  institutionAddress: string;
  postalAddress: string;
  snils: string;
  gender: string;
  classCourse: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToRegulations: boolean;
}

interface Olympiad {
  name: string;
  description: string | null;
}

function Registration() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [olympiads, setOlympiads] = useState<Olympiad[]>([]);
  const [selectedOlympiadNames, setSelectedOlympiadNames] = useState<
    Set<string>
  >(new Set());
  const [olympiadsLoading, setOlympiadsLoading] = useState(false);
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  // Состояния для пошагового процесса
  const [currentStep, setCurrentStep] = useState(1); // 1 - форма, 2 - подтверждение, 3 - выбор олимпиад
  const [formData, setFormData] = useState<RegistrationForm | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmittingOlympiads, setIsSubmittingOlympiads] = useState(false);
  const [registrationToken, setRegistrationToken] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationForm>();

  const password = watch("password");

  // Загрузка списка олимпиад только когда переходим на шаг 3 и есть токен
  useEffect(() => {
    const fetchOlympiads = async () => {
      if (currentStep !== 3 || !registrationToken) return;

      setOlympiadsLoading(true);
      try {
        const response = await axios.get<IOlympiad[]>(`${API_URL}/olympiads`, {
          headers: {
            Authorization: `Bearer ${registrationToken}`,
          },
        });

        setOlympiads(response.data);
      } catch (error) {
        console.error("Failed to fetch olympiads:", error);
        toast.error(
          "Не удалось загрузить список олимпиад",
          getCustomToastStyle(isDarkMode),
        );
      } finally {
        setOlympiadsLoading(false);
      }
    };

    fetchOlympiads();
  }, [currentStep, registrationToken, API_URL, isDarkMode]);

  // Валидация пароля
  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return "Пароль должен содержать минимум 6 символов";
    }
    if (!/[A-Z]/.test(value)) {
      return "Пароль должен содержать хотя бы одну заглавную букву";
    }
    if (!/[0-9]/.test(value)) {
      return "Пароль должен содержать хотя бы одну цифру";
    }
    return true;
  };

  // Валидация подтверждения пароля
  const validateConfirmPassword = (value: string) => {
    return value === password || "Пароли не совпадают";
  };

  // Валидация даты рождения
  const validateBirthDate = (value: string) => {
    if (!value) return "Обязательное поле";

    const birthDate = new Date(value);
    const now = new Date();
    const minDate = new Date("2000-01-01");

    if (now < birthDate) {
      return "Дата рождения не может быть в будущем";
    }

    if (birthDate < minDate) {
      return "Минимальный год рождения - 2000";
    }

    return true;
  };

  // Получение максимальной даты для input (сегодня)
  const getMaxDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Получение минимальной даты для input (2000-01-01)
  const getMinDate = () => {
    return "2000-01-01";
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

  // Шаг 1: Подтверждение данных
  const handleFormSubmit: SubmitHandler<RegistrationForm> = (data) => {
    setFormData(data);
    setShowConfirmationModal(true);
  };

  // Шаг 2: Отправка данных регистрации
  const handleConfirmSubmit = async () => {
    if (!formData) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        phoneNumber: formData.phoneNumber,
        residenceRegion: formData.residenceRegion,
        residenceSettlement: formData.residenceSettlement,
        settlementType: formData.settlementType,
        educationalInstitution: formData.educationalInstitution,
        institutionAddress: formData.institutionAddress,
        postalAddress: formData.postalAddress,
        snils: formData.snils,
        gender: formData.gender,
        classCourse: formData.classCourse,
      });

      // Сохраняем токен в обоих местах
      const newToken = response.data.token;
      setToken(newToken);
      setRegistrationToken(newToken);

      toast.success(
        "Основные данные успешно сохранены!",
        getCustomToastStyle(isDarkMode),
      );

      // Закрываем модальное окно и переходим к выбору олимпиад
      setShowConfirmationModal(false);
      setCurrentStep(3);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Ошибка регистрации";
        toast.error(errorMessage, getCustomToastStyle(isDarkMode));
      } else {
        toast.error("Неизвестная ошибка", getCustomToastStyle(isDarkMode));
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Шаг 3: Отправка выбранных олимпиад (логика из профиля)
  const submitSelectedOlympiads = async () => {
    if (selectedOlympiadNames.size === 0) {
      toast.warn(
        "Пожалуйста, выберите хотя бы одну олимпиаду",
        getCustomToastStyle(isDarkMode),
      );
      return;
    }

    setIsSubmittingOlympiads(true);

    try {
      // Отправляем выбранные олимпиады - используем логику из профиля
      await axios.post(
        `${API_URL}/profile/olympiads/select`,
        Array.from(selectedOlympiadNames),
        {
          headers: {
            Authorization: `Bearer ${registrationToken}`,
          },
        },
      );

      toast.success(
        "Регистрация завершена успешно!",
        getCustomToastStyle(isDarkMode),
      );

      // Перенаправляем в профиль
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Ошибка при выборе олимпиад";
        toast.error(errorMessage, getCustomToastStyle(isDarkMode));
      } else {
        toast.error("Неизвестная ошибка", getCustomToastStyle(isDarkMode));
      }
      console.error(error);
    } finally {
      setIsSubmittingOlympiads(false);
    }
  };

  const onError = () => {
    toast.warn(
      "Пожалуйста, заполните все поля корректно",
      getCustomToastStyle(isDarkMode),
    );
  };

  // Рендер шага 1 - форма регистрации
  const renderFormStep = () => (
    <form
      className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3"
      onSubmit={handleSubmit(handleFormSubmit, onError)}
    >
      {/* Левая колонка */}
      <section className="space-y-4 sm:space-y-6 lg:space-y-4">
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Фамилия"
            {...register("lastName", { required: "Обязательное поле" })}
          />
          {errors.lastName && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.lastName.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Имя"
            {...register("firstName", { required: "Обязательное поле" })}
          />
          {errors.firstName && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.firstName.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Отчество"
            {...register("middleName", { required: "Обязательное поле" })}
          />
          {errors.middleName && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.middleName.message}
            </m.p>
          )}
        </div>

        <div className="relative flex flex-col gap-1">
          <m.label
            className={cn("text-md mb-1 font-medium", {
              "text-white": isDarkMode,
              "text-gray-700": !isDarkMode,
            })}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Дата рождения *
          </m.label>
          <Input
            type="date"
            className="peer"
            max={getMaxDate()}
            min={getMinDate()}
            {...register("birthDate", {
              required: "Обязательное поле",
              validate: validateBirthDate,
            })}
          />
          {errors.birthDate && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.birthDate.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="email"
            placeholder="Электронная почта"
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Некорректный email",
              },
            })}
          />
          {errors.email && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.email.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="tel"
            placeholder="Контактный телефон"
            {...register("phoneNumber", {
              required: "Обязательное поле",
              pattern: {
                value: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
                message: "Некорректный номер телефона",
              },
            })}
          />
          {errors.phoneNumber && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.phoneNumber.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="СНИЛС (XXX-XXX-XXX XX)"
            {...register("snils", {
              required: "Обязательное поле",
              pattern: {
                value: /^\d{3}-\d{3}-\d{3} \d{2}$/,
                message: "Формат: XXX-XXX-XXX XX",
              },
            })}
          />
          {errors.snils && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.snils.message}
            </m.p>
          )}
        </div>
      </section>

      {/* Средняя колонка */}
      <section className="space-y-4 sm:space-y-6 lg:space-y-4">
        <div className="flex flex-col gap-1">
          <Select
            {...register("residenceRegion", {
              required: "Обязательное поле",
            })}
          >
            <option value="">Выберите регион проживания</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </Select>
          {errors.residenceRegion && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.residenceRegion.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Населенный пункт"
            {...register("residenceSettlement", {
              required: "Обязательное поле",
            })}
          />
          {errors.residenceSettlement && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.residenceSettlement.message}
            </m.p>
          )}
        </div>

        {/* Radio button для выбора типа населенного пункта */}
        <div className="flex flex-col gap-3">
          <m.label
            className={cn("text-md font-medium", {
              "text-white": isDarkMode,
              "text-gray-700": !isDarkMode,
            })}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Тип населенного пункта: *
          </m.label>
          <div className="flex gap-6">
            <m.label
              className={cn("flex cursor-pointer items-center gap-2", {
                "text-white": isDarkMode,
                "text-gray-700": !isDarkMode,
              })}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <input
                type="radio"
                value="Город(ПГТ)"
                {...register("settlementType", {
                  required: "Выберите тип населенного пункта",
                })}
                className={cn(
                  "h-4 w-4 border-2 focus:ring-2 focus:ring-offset-2",
                  {
                    "border-blue-500 text-blue-600 focus:ring-blue-500":
                      !isDarkMode,
                    "border-blue-400 text-blue-400 focus:ring-blue-400":
                      isDarkMode,
                  },
                )}
              />
              <span>Город(ПГТ)</span>
            </m.label>
            <m.label
              className={cn("flex cursor-pointer items-center gap-2", {
                "text-white": isDarkMode,
                "text-gray-700": !isDarkMode,
              })}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <input
                type="radio"
                value="Иное"
                {...register("settlementType", {
                  required: "Выберите тип населенного пункта",
                })}
                className={cn(
                  "h-4 w-4 border-2 focus:ring-2 focus:ring-offset-2",
                  {
                    "border-blue-500 text-blue-600 focus:ring-blue-500":
                      !isDarkMode,
                    "border-blue-400 text-blue-400 focus:ring-blue-400":
                      isDarkMode,
                  },
                )}
              />
              <span>Иное</span>
            </m.label>
          </div>
          {errors.settlementType && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.settlementType.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Образовательное учреждение"
            {...register("educationalInstitution", {
              required: "Обязательное поле",
            })}
          />
          {errors.educationalInstitution && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.educationalInstitution.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Регион образовательного учреждения"
            {...register("institutionAddress", {
              required: "Обязательное поле",
            })}
          />
          {errors.institutionAddress && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.institutionAddress.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Почтовый адрес"
            {...register("postalAddress", {
              required: "Обязательное поле",
            })}
          />
          {errors.postalAddress && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.postalAddress.message}
            </m.p>
          )}
        </div>
      </section>

      {/* Правая колонка */}
      <section className="space-y-4 sm:space-y-6 lg:space-y-4">
        <div className="flex flex-col gap-1">
          <Select {...register("gender", { required: "Обязательное поле" })}>
            <option value="">Пол</option>
            <option value="MALE">Мужской</option>
            <option value="FEMALE">Женский</option>
          </Select>
          {errors.gender && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.gender.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Select
            {...register("classCourse", {
              required: "Обязательное поле",
            })}
          >
            <option value="">Класс / Курс</option>
            <option value="10 класс">10 класс</option>
            <option value="11 класс">11 класс</option>
            <option value="1 курс">1 курс</option>
            <option value="2 курс">2 курс</option>
          </Select>
          {errors.classCourse && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.classCourse.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            placeholder="Придумайте пароль"
            {...register("password", {
              required: "Обязательное поле",
              validate: validatePassword,
            })}
          />
          {errors.password && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.password.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            placeholder="Повторите пароль"
            {...register("confirmPassword", {
              required: "Обязательное поле",
              validate: validateConfirmPassword,
            })}
          />
          {errors.confirmPassword && (
            <m.p
              className="text-sm text-red-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {errors.confirmPassword.message}
            </m.p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:gap-4">
          <div className="flex flex-col gap-1">
            <m.label
              className="flex items-start gap-2 text-xs sm:text-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Input
                type="checkbox"
                className="mt-1 flex-shrink-0"
                {...register("agreeToTerms", {
                  required: "Необходимо согласие",
                })}
              />
              <span className="leading-tight">
                Согласен на
                <a
                  href="/consent"
                  className="ml-1 text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  обработку персональных данных
                </a>
              </span>
            </m.label>
            {errors.agreeToTerms && (
              <m.p
                className="text-sm text-red-500"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                {errors.agreeToTerms.message}
              </m.p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <m.label
              className="flex items-start gap-2 text-xs sm:text-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Input
                type="checkbox"
                className="mt-1 flex-shrink-0"
                {...register("agreeToRegulations", {
                  required: "Необходимо ознакомление",
                })}
              />
              <span className="leading-tight">
                Ознакомлен с
                <a
                  href="https://mvd.ru/upload/site116/folder_page/041/907/599/Polozhenie_Olimpiada_MosU.pdf "
                  className="mx-1 text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Положением
                </a>
                и
                <a
                  href="https://mvd.ru/upload/site116/folder_page/041/907/599/Reglament_2024-2025.pdf "
                  className="mx-1 text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Регламентом
                </a>
                Олимпиады
              </span>
            </m.label>
            {errors.agreeToRegulations && (
              <m.p
                className="text-sm text-red-500"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                {errors.agreeToRegulations.message}
              </m.p>
            )}
          </div>
        </div>

        <div className="pt-2 sm:pt-4">
          <Button type="submit" className="w-full py-3 text-base sm:text-lg">
            Продолжить
          </Button>
        </div>
      </section>
    </form>
  );

  // Рендер шага 3 - выбор олимпиад (логика из профиля)
  const renderOlympiadsStep = () => (
    <div className="mx-auto max-w-4xl">
      <m.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className={cn("rounded-2xl p-8", {
          "border border-blue-900 bg-[#0b0f1a]": isDarkMode,
          "border border-gray-200 bg-white shadow-lg": !isDarkMode,
        })}
      >
        <h2
          className={cn("mb-6 text-center text-2xl font-bold", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Выберите профиль олимпиады
        </h2>

        <p
          className={cn("mb-8 text-center", {
            "text-gray-300": isDarkMode,
            "text-gray-600": !isDarkMode,
          })}
        >
          Пожалуйста, выберите хотя бы один профиль для участия
        </p>

        {olympiadsLoading ? (
          <p
            className={cn("text-center", {
              "text-gray-400": isDarkMode,
              "text-gray-500": !isDarkMode,
            })}
          >
            Загрузка олимпиад...
          </p>
        ) : olympiads.length === 0 ? (
          <p
            className={cn("text-center", {
              "text-gray-400": isDarkMode,
              "text-gray-500": !isDarkMode,
            })}
          >
            Нет доступных олимпиад
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {olympiads.map((olympiad, index) => {
              const isSelected = selectedOlympiadNames.has(olympiad.name);
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
                          "border-blue-500 bg-blue-500 text-white": isSelected,
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
                      <h3 className="text-lg font-semibold">{olympiad.name}</h3>
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

        {/* Кнопка подтверждения (логика из профиля) */}
        {selectedOlympiadNames.size > 0 && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={submitSelectedOlympiads}
              disabled={isSubmittingOlympiads}
              className={cn("px-8 py-3 text-lg", {
                "bg-green-600 hover:bg-green-500": isDarkMode,
                "bg-green-500 hover:bg-green-400": !isDarkMode,
              })}
            >
              {isSubmittingOlympiads ? "Отправка..." : "Завершить регистрацию"}
            </Button>
          </div>
        )}

        {selectedOlympiadNames.size === 0 && (
          <m.p
            className="mt-4 text-center text-sm text-red-500"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Выберите хотя бы одну олимпиаду
          </m.p>
        )}
      </m.div>
    </div>
  );

  // Модальное окно подтверждения
  const renderConfirmationModal = () => (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowConfirmationModal(false)}
      />

      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[80vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-6",
          {
            "border border-blue-900 bg-[#0b0f1a]": isDarkMode,
            "border border-gray-200 bg-white shadow-xl": !isDarkMode,
          },
        )}
      >
        <div className="mb-6">
          <h2
            className={cn("text-center text-2xl font-bold", {
              "text-white": isDarkMode,
              "text-gray-900": !isDarkMode,
            })}
          >
            Подтверждение данных
          </h2>
          <p
            className={cn("mt-2 text-center", {
              "text-gray-300": isDarkMode,
              "text-gray-600": !isDarkMode,
            })}
          >
            Пожалуйста, проверьте введенные данные перед продолжением
          </p>
        </div>

        {formData && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Личные данные */}
            <div className="space-y-4">
              <h3
                className={cn("border-b pb-2 text-lg font-semibold", {
                  "border-blue-700 text-blue-300": isDarkMode,
                  "border-blue-300 text-blue-600": !isDarkMode,
                })}
              >
                Личные данные
              </h3>

              <div className="space-y-3">
                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    ФИО:
                  </strong>
                  <p>
                    {formData.lastName} {formData.firstName}{" "}
                    {formData.middleName}
                  </p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Дата рождения:
                  </strong>
                  <p>{formData.birthDate}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Пол:
                  </strong>
                  <p>{formData.gender === "MALE" ? "Мужской" : "Женский"}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    СНИЛС:
                  </strong>
                  <p>{formData.snils}</p>
                </div>
              </div>
            </div>

            {/* Контактная информация */}
            <div className="space-y-4">
              <h3
                className={cn("border-b pb-2 text-lg font-semibold", {
                  "border-blue-700 text-blue-300": isDarkMode,
                  "border-blue-300 text-blue-600": !isDarkMode,
                })}
              >
                Контактная информация
              </h3>

              <div className="space-y-3">
                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Email:
                  </strong>
                  <p>{formData.email}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Телефон:
                  </strong>
                  <p>{formData.phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Адрес проживания */}
            <div className="space-y-4">
              <h3
                className={cn("border-b pb-2 text-lg font-semibold", {
                  "border-blue-700 text-blue-300": isDarkMode,
                  "border-blue-300 text-blue-600": !isDarkMode,
                })}
              >
                Адрес проживания
              </h3>

              <div className="space-y-3">
                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Регион:
                  </strong>
                  <p>{formData.residenceRegion}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Населенный пункт:
                  </strong>
                  <p>{formData.residenceSettlement}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Тип населенного пункта:
                  </strong>
                  <p>{formData.settlementType}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Почтовый адрес:
                  </strong>
                  <p>{formData.postalAddress}</p>
                </div>
              </div>
            </div>

            {/* Образовательная информация */}
            <div className="space-y-4">
              <h3
                className={cn("border-b pb-2 text-lg font-semibold", {
                  "border-blue-700 text-blue-300": isDarkMode,
                  "border-blue-300 text-blue-600": !isDarkMode,
                })}
              >
                Образовательная информация
              </h3>

              <div className="space-y-3">
                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Образовательное учреждение:
                  </strong>
                  <p>{formData.educationalInstitution}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Адрес учреждения:
                  </strong>
                  <p>{formData.institutionAddress}</p>
                </div>

                <div>
                  <strong
                    className={cn("block text-sm", {
                      "text-blue-300": isDarkMode,
                      "text-blue-600": !isDarkMode,
                    })}
                  >
                    Класс/Курс:
                  </strong>
                  <p>{formData.classCourse}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <Button
            onClick={() => setShowConfirmationModal(false)}
            disabled={isLoading}
            className={cn("px-6 py-2", {
              "bg-gray-600 hover:bg-gray-500": isDarkMode,
              "bg-gray-200 text-gray-800 hover:bg-gray-300": !isDarkMode,
            })}
          >
            Вернуться к редактированию
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            disabled={isLoading}
            className={cn("px-6 py-2", {
              "bg-green-600 hover:bg-green-500": isDarkMode,
              "bg-green-500 hover:bg-green-400": !isDarkMode,
            })}
          >
            {isLoading ? "Отправка..." : "Подтвердить и продолжить"}
          </Button>
        </div>
      </m.div>
    </>
  );

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <div
        className={cn(
          "relative flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:py-20",
          {
            "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
              isDarkMode,
            "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200":
              !isDarkMode,
          },
        )}
      >
        <div className="mx-auto w-full max-w-6xl">
          <h1
            className={cn(
              "mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl lg:mb-12 lg:text-4xl",
              {
                "text-white": isDarkMode,
                "text-gray-900": !isDarkMode,
              },
            )}
          >
            Регистрация
          </h1>

          {currentStep === 1 && renderFormStep()}
          {currentStep === 3 && renderOlympiadsStep()}
        </div>
      </div>

      {showConfirmationModal && renderConfirmationModal()}

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default Registration;

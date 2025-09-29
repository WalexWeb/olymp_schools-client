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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

// Локальный интерфейс (можно заменить на импорт из types)
interface RegistrationForm {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string; // Date не сериализуется — лучше string в формате YYYY-MM-DD
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
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToRegulations: boolean;
}

function Registration() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationForm>();

  const password = watch("password");

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
    const birthDate = new Date(value);
    const now = new Date();
    return now > birthDate || "Дата рождения не может быть в будущем";
  };

  const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phoneNumber: data.phoneNumber,
        residenceRegion: data.residenceRegion,
        residenceSettlement: data.residenceSettlement,
        educationalInstitution: data.educationalInstitution,
        institutionAddress: data.institutionAddress,
        postalAddress: data.postalAddress,
        snils: data.snils,
        gender: data.gender,
        classCourse: data.classCourse,
      });

      setToken(response.data.token);
      toast.success("Регистрация успешна!", getCustomToastStyle(isDarkMode));

      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
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

  const onError = () => {
    toast.warn(
      "Пожалуйста, заполните все поля корректно",
      getCustomToastStyle(isDarkMode),
    );
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

      <div
        className={cn(
          "relative flex flex-col justify-center gap-16 px-4 py-20 sm:px-6 md:flex-row",
          {
            "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
              isDarkMode,
            "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200":
              !isDarkMode,
          },
        )}
      >
        <form
          className="grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-3"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          {/* Левая колонка */}
          <section className="grid grid-rows-7 gap-8">
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

            <Input
              type="date"
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
          </section>

          {/* Средняя колонка */}
          <section className="grid grid-rows-6 gap-8">
            <Input
              type="text"
              placeholder="Регион проживания"
              {...register("residenceRegion", {
                required: "Обязательное поле",
              })}
            />
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

            <Input
              type="text"
              placeholder="Почтовый адрес"
              {...register("postalAddress", { required: "Обязательное поле" })}
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

            <div className="flex flex-col gap-4">
              <m.label
                className="flex items-start gap-2 text-sm"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Input
                  type="checkbox"
                  {...register("agreeToTerms", {
                    required: "Необходимо согласие",
                  })}
                />
                Согласен на
                <a
                  href="/consent"
                  className="ml-1 text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  обработку персональных данных
                </a>
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

              <m.label
                className="flex items-start gap-2 text-sm"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Input
                  type="checkbox"
                  {...register("agreeToRegulations", {
                    required: "Необходимо ознакомление",
                  })}
                />
                Ознакомлен с
                <a
                  href="https://mvd.ru/upload/site116/folder_page/041/907/599/Polozhenie_Olimpiada_MosU.pdf"
                  className="mx-1 text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Положением
                </a>
                и
                <a
                  href="https://mvd.ru/upload/site116/folder_page/041/907/599/Reglament_2024-2025.pdf"
                  className="mx-1 text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Регламентом
                </a>
                Олимпиады
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
          </section>

          {/* Правая колонка */}
          <section className="grid grid-rows-6 gap-8">
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

            <Select
              {...register("classCourse", { required: "Обязательное поле" })}
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

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 py-2.5 text-lg"
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </section>
        </form>
      </div>

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

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getCustomToastStyle } from "../components/ui/toastStyles";
import { useThemeStore } from "../stores/themeStore";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import cn from "clsx";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";

interface ResetForm {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>();

  const password = watch("newPassword");

  // Проверка токена при загрузке
  useEffect(() => {
    if (!token) {
      toast.error("Токен не указан", getCustomToastStyle(isDarkMode));
      navigate("/");
      return;
    }

    const validate = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/auth/validate-reset-token/${token}`,
        );
        if (res.data.success) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          toast.error(
            "Неверный или просроченный токен",
            getCustomToastStyle(isDarkMode),
          );
          navigate("/");
        }
      } catch (err) {
        setIsValidToken(false);
        toast.error(
          "Неверный или просроченный токен",
          getCustomToastStyle(isDarkMode),
        );
        navigate("/");
      }
    };

    validate();
  }, [token, API_URL, isDarkMode, navigate]);

  const onSubmit = async (data: ResetForm) => {
    if (!token) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        newPassword: data.newPassword,
      });
      toast.success("Пароль успешно изменён!", getCustomToastStyle(isDarkMode));
      navigate("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Ошибка при сбросе пароля";
      toast.error(msg, getCustomToastStyle(isDarkMode));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidToken === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Загрузка...
      </div>
    );
  }

  if (!isValidToken) {
    return null; // Редирект уже произошёл
  }

  return (
    <div
      className={cn("h-screen w-screen", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section className="flex items-center justify-center px-6 py-12">
        <div className="mx-auto w-3xl">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Заголовок */}
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <div
                  className={cn(
                    "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl",
                    {
                      "bg-blue-500/20 text-blue-400": isDarkMode,
                      "bg-blue-100 text-blue-600": !isDarkMode,
                    },
                  )}
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h1
                  className={cn("text-4xl font-bold md:text-5xl", {
                    "text-white": isDarkMode,
                    "text-gray-900": !isDarkMode,
                  })}
                >
                  Сброс пароля
                </h1>
              </div>
              <p
                className={cn("mx-auto max-w-2xl text-xl", {
                  "text-blue-300": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                Введите новый пароль для вашего аккаунта
              </p>
            </div>

            {/* Основной контент */}
            <div className="flex justify-center">
              <div className="w-xs">
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
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <h2
                      className={cn("text-2xl font-bold", {
                        "text-blue-300": isDarkMode,
                        "text-blue-600": !isDarkMode,
                      })}
                    >
                      Новый пароль
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Input
                        type="password"
                        placeholder="Новый пароль"
                        {...register("newPassword", {
                          required: "Обязательное поле",
                          minLength: {
                            value: 6,
                            message: "Минимум 6 символов",
                          },
                        })}
                      />
                      {errors.newPassword && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="password"
                        placeholder="Подтвердите пароль"
                        {...register("confirmPassword", {
                          required: "Обязательное поле",
                          validate: (value) =>
                            value === password || "Пароли не совпадают",
                        })}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Сохранение...
                        </span>
                      ) : (
                        "Сохранить новый пароль"
                      )}
                    </Button>
                  </form>
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

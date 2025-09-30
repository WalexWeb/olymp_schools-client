import Input from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useThemeStore } from "../../stores/themeStore";
import { m } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "clsx";
import { useRef, useState } from "react";
import axios from "axios";

interface IForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IPasswordResetForm {
  email: string;
}

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
}: IForgotPasswordModalProps) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { register, handleSubmit, reset } = useForm<IPasswordResetForm>();
  const { isDarkMode } = useThemeStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<IPasswordResetForm> = async (data) => {
    setIsLoading(true);
    setServerMessage("");
    setIsSuccess(false);

    try {
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: data.email,
      });

      setIsSuccess(true);
      setServerMessage(
        "Ссылка для восстановления пароля отправлена на вашу почту",
      );

      setTimeout(() => {
        onClose();
        reset();
        setServerMessage("");
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Ошибка восстановления пароля:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage =
            error.response.data?.message ||
            error.response.data?.error ||
            "Не удалось отправить запрос. Проверьте email и попробуйте снова.";
          setServerMessage(errorMessage);
        } else if (error.request) {
          setServerMessage(
            "Ошибка подключения к серверу. Проверьте интернет-соединение.",
          );
        }
      } else {
        setServerMessage("Произошла неизвестная ошибка. Попробуйте позже.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Затемнение фона */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/35 backdrop-blur-xs"
      />

      {/* Контейнер модального окна */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <m.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          className={cn(
            "relative w-full max-w-md rounded-2xl border border-blue-600 bg-gradient-to-br p-8 shadow-md transition-all",
            {
              "from-[#142441] to-[#15213e] text-white": isDarkMode,
              "from-white via-blue-100 to-blue-300 text-gray-800": !isDarkMode,
            },
          )}
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors",
              {
                "hover:bg-blue-700/30": isDarkMode,
                "hover:bg-blue-200": !isDarkMode,
              },
            )}
            aria-label="Закрыть окно"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn({
                "text-blue-300": isDarkMode,
                "text-blue-600": !isDarkMode,
              })}
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <h3
            className={cn("mb-6 text-center text-3xl font-semibold", {
              "text-white": isDarkMode,
              "text-gray-900": !isDarkMode,
            })}
          >
            Восстановление пароля
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              type="email"
              placeholder="Ваш email"
              {...register("email", { required: true })}
            />

            {serverMessage && (
              <div
                className={cn(
                  "rounded-lg p-3 text-center text-sm font-medium",
                  isSuccess
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700",
                )}
              >
                {serverMessage}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="submit"
                className="h-14 w-full text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Отправка..." : "Отправить"}
              </Button>
            </div>
          </form>
        </m.div>
      </div>
    </>
  );
};

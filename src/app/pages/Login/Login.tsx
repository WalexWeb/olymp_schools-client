import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../../components/ui/Button";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Input from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../../stores/themeStore";
import { useState } from "react";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

interface IForm {
  firstName: string;
  patronymic: string;
  lastName: string;
  email: string;
  password: string;
}

function Login() {
  const { isDarkMode } = useThemeStore();

  const { register, handleSubmit } = useForm<IForm>({
    mode: "onChange",
  });

  const [showForgotPasswordModal, setShowForgotPasswordModal] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
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

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />

      <m.section
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
          className="mt-1 ml-20 grid w-lg grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Электронная почта"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            type="password"
            placeholder="Пароль"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="py-2.5 text-lg">
            Войти
          </Button>
          <a
            onClick={() => setShowForgotPasswordModal(true)}
            className="inline-block cursor-pointer text-lg text-blue-400 transition hover:text-blue-300"
          >
            Забыли пароль?
          </a>
        </form>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "flex h-80 w-full items-center justify-center rounded-2xl md:w-xl",
            {
              "bg-gradient-to-br from-blue-700 to-blue-400": isDarkMode,
              "bg-gradient-to-br from-blue-400 to-blue-300": !isDarkMode,
            },
          )}
        />
      </m.section>
      <Footer />
    </div>
  );
}

export default Login;

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
  import { IForm } from "../types/IForm.type";

  function Registration() {
    const { isDarkMode } = useThemeStore();

    const { register, handleSubmit, watch } = useForm<IForm>({
      mode: "onSubmit",
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit: SubmitHandler<IForm> = (data) => {
      if (password !== confirmPassword) {
        toast.error("Пароли не совпадают", getCustomToastStyle(isDarkMode));
        return;
      }
      toast.success("Регистрация успешна!", getCustomToastStyle(isDarkMode));
      console.log(data);
    };

    const onError = () => {
      toast.warn(
        "Пожалуйста, заполните все поля",
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
          <section className="grid grid-rows-5 gap-8">
            <Input
              type="text"
              placeholder="Фамилия"
              {...register("lastName", { required: true })}
            />

            <Input
              type="text"
              placeholder="Имя"
              {...register("firstName", { required: true })}
            />

            <Input
              type="text"
              placeholder="Отчество"
              {...register("patronymic", { required: true })}
            />

            <Input
              type="date"
              {...register("dateOfBirth", { required: true })}
            />

            <Select required {...register("gender", { required: true })}>
              <option disabled selected>
                Пол
              </option>
              <option value={"male"}>Мужской</option>
              <option value={"female"}>Женский</option>
            </Select>
            <Select required {...register("class", { required: true })}>
              <option disabled selected>
                Класс / Курс
              </option>
              <option value={"10 класс"}>10 класс</option>
              <option value={"11 класс"}>11 класс</option>
              <option value={"1 курс"}>1 курс</option>
              <option value={"2 курс"}>2 курс</option>
            </Select>
          </section>

          <section className="grid grid-rows-5 gap-8">
            <Input
              type="text"
              placeholder="Контактный телефон"
              {...register("phone", { required: true })}
            />

            <Select required {...register("region", { required: true })}>
              <option disabled selected>
                Регион
              </option>
              <option value="Москва">Москва</option>
              <option value="СПб">Санкт-Петербург</option>
            </Select>

            <Input
              type="text"
              placeholder="Населенный пункт"
              {...register("city", { required: true })}
            />

            <Input
              type="text"
              placeholder="Образовательное учреждение"
              {...register("institute", { required: true })}
            />

            <Select
              required
              {...register("instituteRegion", { required: true })}
            >
              <option disabled selected>
                Регион организации
              </option>
              <option value="Москва">Москва</option>
              <option value="СПб">Санкт-Петербург</option>
            </Select>

            <div className="flex flex-col gap-2">
              <m.label
                className="flex items-center gap-2 text-sm"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Input type="checkbox" required />
                Согласен на
                <a href="" className="text-blue-500" target="_blank">
                  обработку персональных данных
                </a>
              </m.label>

              <m.label
                className="flex items-center gap-2 text-sm"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Input type="checkbox" required />
                Ознакомлен с
                <a
                  href="https://mvd.ru/upload/site116/folder_page/041/907/599/Polozhenie_Olimpiada_MosU.pdf"
                  className="text-blue-500"
                  target="_blank"
                >
                  Положением
                </a>
                и
                <a
                  href="https://mvd.ru/upload/site116/folder_page/041/907/599/Reglament_2024-2025.pdf"
                  className="text-blue-500"
                  target="_blank"
                >
                  Регламентом
                </a>
                Олимпиады
              </m.label>
            </div>
          </section>

          <section className="grid grid-rows-4 gap-8">
            <Input
              type="text"
              placeholder="СНИЛС"
              {...register("snils", { required: true })}
            />

            <Input
              type="text"
              placeholder="Почтовый адрес"
              {...register("mailAddress", { required: true })}
            />

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
              placeholder="Придумайте пароль"
              {...register("password", { required: true })}
            />

            <Input
              type="password"
              placeholder="Повторите пароль"
              {...register("confirmPassword", { required: true })}
            />

            <Button type="submit" className="py-2.5 text-lg">
              Зарегистрироваться
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

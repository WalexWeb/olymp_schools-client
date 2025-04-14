import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

interface IForm {
  firstName: string;
  patronymic: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: number;
  region: string;
  city: string;
  institute: string;
  gender: string;
  class: number;
  password: string;
  confirmPassword: string;
}

function Registration() {
  const { register, handleSubmit } = useForm<IForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-screen bg-[#0b0f1a] font-sans text-white">
      <BackgroundBlobs />
      <Navbar />

      <div className="relative flex flex-col justify-center gap-16 bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d] px-4 py-20 sm:px-6 md:flex-row">
        <form
          className="grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <m.section
            className="grid grid-rows-5 gap-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <input
              type="text"
              placeholder="Фамилия"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("lastName", { required: true })}
            />
            <input
              type="text"
              placeholder="Имя"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("firstName", { required: true })}
            />
            <input
              type="text"
              placeholder="Отчество"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("patronymic", { required: true })}
            />
            <input
              type="date"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("dateOfBirth", { required: true })}
            />
            <input
              type="text"
              placeholder="Электронная почта"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </m.section>

          <m.section
            className="grid grid-rows-5 gap-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <input
              type="text"
              placeholder="Контактный телефон"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("phone", { required: true })}
            />
            <select
              required
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("region", { required: true })}
            >
              <option disabled selected>
                Регион
              </option>
            </select>
            <input
              type="text"
              placeholder="Населенный пункт"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("city", { required: true })}
            />
            <input
              type="text"
              placeholder="Образовательное учреждение"
              className="w-full rounded-lg border-blue-500 px-12 py-2 outline-2 outline-offset-2 outline-blue-500"
              {...register("institute", { required: true })}
            />
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  required
                  className="rounded border-blue-500 text-blue-500 focus:ring-blue-500"
                />
                Согласен на
                <a href="" className="text-blue-500">
                  обработку персональных данных
                </a>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  required
                  className="rounded border-blue-500 text-blue-500 focus:ring-blue-500"
                />
                Ознакомлен с
                <a href="" className="text-blue-500">
                  Положением
                </a>
                и
                <a href="" className="text-blue-500">
                  Регламентом
                </a>
                Олимпиады
              </label>
            </div>
          </m.section>

          <m.section
            className="grid grid-rows-4 gap-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <select
              required
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("gender", { required: true })}
            >
              <option disabled selected>
                Пол
              </option>
              <option value={"male"}>Мужской</option>
              <option value={"female"}>Женский</option>
            </select>
            <select
              required
              className="rounded-lg border-solid border-blue-500 px-6 py-2 text-base outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("class", { required: true })}
            >
              <option disabled selected>
                Класс / Курс
              </option>
              <option value={"10 класс"}>10 класс</option>
              <option value={"11 класс"}>11 класс</option>
              <option value={"1 курс"}>1 курс</option>
              <option value={"2 курс"}>2 курс</option>
            </select>
            <input
              type="password"
              placeholder="Придумайте пароль"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
              {...register("password", { required: true })}
            />
            <input
              type="password"
              className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
            />
            <Button type="submit" className="py-4 text-lg">
              Регистрация
            </Button>
          </m.section>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Registration;

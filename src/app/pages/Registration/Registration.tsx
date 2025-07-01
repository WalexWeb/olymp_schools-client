import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../../components/ui/Button";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "clsx";
import { useThemeStore } from "../../stores/themeStore";
import { ToastContainer, toast } from "react-toastify";
import { getCustomToastStyle } from "../../components/ui/toastStyles";
import { IForm } from "../../types/IForm.type";
import Stepper, { Step } from "../../components/ui/Stepper/Stepper";
import { useRef } from "react";
import { useStepStore } from "../../stores/StepsStore";

function Registration() {
  const { currentStep, setStep, nextStep, prevStep, resetStep } =
    useStepStore();
  const stepperRef = useRef<any>(null);

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
    resetStep();
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
      <Stepper
        ref={stepperRef}
        initialStep={currentStep}
        onStepChange={setStep}
        onFinalStepCompleted={() => console.log("Регистрация окончена")}
      >
        {/* Первый шаг - контактная информация */}
        <Step>
          <div className="mx-auto flex w-full max-w-md flex-col gap-8">
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
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl justify-between px-4">
            <div className="flex-1" />
            <Button
              type="button"
              onClick={() => {
                if (currentStep === 3) {
                  // Третий шаг — отправка формы
                  handleSubmit(onSubmit, onError)();
                } else {
                  nextStep();
                  stepperRef.current?.handleNext?.();
                }
              }}
            >
              Далее
            </Button>
          </div>
        </Step>

        {/* Второй шаг - личные данные */}
        <Step>
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
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

            <section className="grid grid-rows-4 gap-8">
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
            </section>
          </div>
          <div className="mx-w-2xl mx-auto mt-8 flex justify-between px-4">
            <Button
              type="button"
              onClick={() => {
                prevStep();
                stepperRef.current?.handleBack?.();
              }}
            >
              Назад
            </Button>
            <div className="flex-1" />
            <Button
              type="button"
              onClick={() => {
                if (currentStep === 3) {
                  // Третий шаг — отправка формы
                  handleSubmit(onSubmit, onError)();
                } else {
                  nextStep();
                  stepperRef.current?.handleNext?.();
                }
              }}
            >
              Далее
            </Button>
          </div>
        </Step>

        {/* Третий шаг - дополнительная информация */}
        <Step>
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
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
              placeholder="СНИЛС"
              {...register("snils", { required: true })}
            />

            <Input
              type="text"
              placeholder="Почтовый адрес"
              {...register("mailAddress", { required: true })}
            />
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <Input type="checkbox" required />
                Согласен на
                <a href="" className="text-blue-500" target="_blank">
                  обработку персональных данных
                </a>
              </label>

              <label className="flex items-center gap-2 text-sm">
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
              </label>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl justify-between px-4">
            <Button
              type="button"
              onClick={() => {
                prevStep();
                stepperRef.current?.handleBack?.();
              }}
            >
              Назад
            </Button>
            <div className="flex-1" />
            <Button
              type="button"
              onClick={() => handleSubmit(onSubmit, onError)()}
            >
              Зарегистрироваться
            </Button>
          </div>
        </Step>
      </Stepper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Footer />
    </div>
  );
}

export default Registration;

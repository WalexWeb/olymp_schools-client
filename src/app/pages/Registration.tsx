import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { m } from "framer-motion";
import cn from "clsx";
import { toast, ToastContainer } from "react-toastify";

import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { fadeUp } from "../components/animations/fadeUp";
import { useThemeStore } from "../stores/themeStore";
import { getCustomToastStyle } from "../components/ui/toastStyles";
import { api } from "../services/api";

interface RegistrationForm {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: "M" | "F" | "";

  passportSeries: string;
  passportNumber: string;
  passportIssueDate: string;
  passportIssuer: string;
  passportDeptCode: string;
  address: string;

  phone: string;
  email: string;

  orgRegion: string;
  orgSettlement: string;
  orgType: "school" | "college" | "";
  orgGrade: string;
  orgName: string;

  consentType: "parent" | "adult" | "";

  olympiadInfosec: boolean;
  olympiadSocialStudies: boolean;
  isRepeat: boolean;
}

const initialValues: RegistrationForm = {
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: "",
  gender: "",
  passportSeries: "",
  passportNumber: "",
  passportIssueDate: "",
  passportIssuer: "",
  passportDeptCode: "",
  address: "",
  phone: "",
  email: "",
  orgRegion: "",
  orgSettlement: "",
  orgType: "",
  orgGrade: "",
  orgName: "",
  consentType: "",

  olympiadInfosec: false,
  olympiadSocialStudies: false,
  isRepeat: false,
};

function Registration() {
  const { isDarkMode } = useThemeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationForm>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const orgType = watch("orgType");
  const olympiadInfosec = watch("olympiadInfosec");
  const olympiadSocialStudies = watch("olympiadSocialStudies");

  const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
    // Хотя бы одна олимпиада должна быть выбрана
    if (!data.olympiadInfosec && !data.olympiadSocialStudies) {
      toast.warn(
        "Выберите хотя бы одну олимпиаду",
        getCustomToastStyle(isDarkMode),
      );
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    const payload = {
      lastName: data.lastName.trim(),
      firstName: data.firstName.trim(),
      middleName: data.middleName.trim() || null,
      birthDate: data.birthDate,
      gender: data.gender,
      passportSeries: data.passportSeries,
      passportNumber: data.passportNumber,
      passportIssueDate: data.passportIssueDate,
      passportIssuer: data.passportIssuer.trim(),
      passportDeptCode: data.passportDeptCode,
      address: data.address.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      orgRegion: data.orgRegion.trim(),
      orgSettlement: data.orgSettlement.trim(),
      orgType: data.orgType,
      orgGrade: data.orgGrade,
      orgName: data.orgName.trim(),
      consentType: data.consentType,
      parentFullName: null,

      olympiads: [
        data.olympiadInfosec ? "infosec" : null,
        data.olympiadSocialStudies ? "social_studies" : null,
      ].filter(Boolean) as string[],
      isRepeat: data.isRepeat,
    };

    try {
      const response = await api.post("/registration/anketa.docx", payload, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "anketa.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setIsSuccess(true);
      toast.success(
        "Анкета скачана! Распечатайте и приложите к пакету документов.",
        getCustomToastStyle(isDarkMode),
      );
    } catch (error: any) {
      let msg = "Не удалось сформировать анкету. Проверьте заполнение полей.";
      if (error?.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const parsed = JSON.parse(text);
          msg = parsed?.message || parsed?.detail || msg;
        } catch {
          /* ignore */
        }
      } else if (error?.response?.data?.message) {
        msg = error.response.data.message;
      }
      toast.error(msg, getCustomToastStyle(isDarkMode));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    toast.warn(
      "Пожалуйста, заполните все обязательные поля",
      getCustomToastStyle(isDarkMode),
    );
  };

  const fieldErr = (msg?: string) =>
    msg ? (
      <m.p
        className="text-md mt-1 text-red-500"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        {msg}
      </m.p>
    ) : null;

  const sectionTitle = (text: string) => (
    <h2
      className={cn("mb-5 border-b pb-3 text-xl font-semibold", {
        "text-blue-300": isDarkMode,
        "text-blue-700": !isDarkMode,
        "border-blue-800/50": isDarkMode,
        "border-blue-200": !isDarkMode,
      })}
    >
      {text}
    </h2>
  );

  return (
    <div
      className={cn("min-h-screen w-full font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />
      <ToastContainer />

      <section className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 text-center"
        >
          <h1
            className={cn("text-3xl font-bold md:text-4xl", {
              "text-white": isDarkMode,
              "text-gray-900": !isDarkMode,
            })}
          >
            Регистрация на олимпиаду
          </h1>
          <p
            className={cn("mt-3 text-base", {
              "text-blue-300": isDarkMode,
              "text-blue-700": !isDarkMode,
            })}
          >
            Заполните анкету — готовый файл с вашими данными скачается
            автоматически
          </p>
        </m.div>

        {isSuccess && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-8 max-w-3xl rounded-xl border-2 border-green-500 bg-green-50 p-5 text-center text-lg text-green-800 shadow-lg"
          >
            <strong className="block text-xl">✓ Анкета скачана</strong>
            <span className="mt-1 block">
              Распечатайте файл <code className="font-mono">anketa.docx</code>,
              подпишите и приложите к пакету документов.
            </span>
          </m.div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {/* ---------- Колонка 1: Личные данные ---------- */}
            <section className="min-w-0 space-y-5">
              {sectionTitle("Личные данные")}

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Фамилия *
                </label>
                <Input
                  placeholder="Иванов"
                  {...register("lastName", { required: "Обязательное поле" })}
                />
                {fieldErr(errors.lastName?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">Имя *</label>
                <Input
                  placeholder="Иван"
                  {...register("firstName", { required: "Обязательное поле" })}
                />
                {fieldErr(errors.firstName?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Отчество
                </label>
                <Input placeholder="Иванович" {...register("middleName")} />
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Дата рождения *
                </label>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("birthDate", { required: "Обязательное поле" })}
                />
                {fieldErr(errors.birthDate?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">Пол *</label>
                <Select
                  {...register("gender", { required: "Обязательное поле" })}
                >
                  <option value="">— выберите —</option>
                  <option value="M">Мужской</option>
                  <option value="F">Женский</option>
                </Select>
                {fieldErr(errors.gender?.message)}
              </div>
              <div>
                <label className="text-md mb-1 block opacity-80">
                  Телефон *
                </label>
                <Input
                  type="tel"
                  placeholder="+7 999 123-45-67"
                  {...register("phone", { required: "Обязательное поле" })}
                />
                {fieldErr(errors.phone?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  E-mail *
                </label>
                <Input
                  type="email"
                  placeholder="ivanov@example.com"
                  {...register("email", {
                    required: "Обязательное поле",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Некорректный email",
                    },
                  })}
                />
                {fieldErr(errors.email?.message)}
              </div>
            </section>

            {/* ---------- Колонка 2: Образование + контакты ---------- */}
            <section className="min-w-0 space-y-5">
              {sectionTitle("Образовательная организация")}

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Регион *
                </label>
                <Input
                  placeholder="г. Москва"
                  {...register("orgRegion", { required: "Обязательное поле" })}
                />
                {fieldErr(errors.orgRegion?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Населённый пункт *
                </label>
                <Input
                  placeholder="Москва"
                  {...register("orgSettlement", {
                    required: "Обязательное поле",
                  })}
                />
                {fieldErr(errors.orgSettlement?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Тип организации *
                </label>
                <Select
                  {...register("orgType", { required: "Обязательное поле" })}
                >
                  <option value="">— выберите —</option>
                  <option value="school">Школа</option>
                  <option value="college">Колледж / техникум</option>
                </Select>
                {fieldErr(errors.orgType?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Класс / Курс *
                </label>
                <Select
                  {...register("orgGrade", { required: "Обязательное поле" })}
                >
                  <option value="">— выберите —</option>
                  {orgType === "college" ? (
                    <>
                      <option value="1">1 курс</option>
                      <option value="2">2 курс</option>
                    </>
                  ) : (
                    <>
                      <option value="10">10 класс</option>
                      <option value="11">11 класс</option>
                    </>
                  )}
                </Select>
                {fieldErr(errors.orgGrade?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Наименование организации *
                </label>
                <Input
                  placeholder="ГБОУ Школа №123"
                  {...register("orgName", { required: "Обязательное поле" })}
                />
                {fieldErr(errors.orgName?.message)}
              </div>
            </section>

            {/* ---------- Колонка 3: Паспортные данные ---------- */}
            <section className="min-w-0 space-y-5">
              {sectionTitle("Паспортные данные")}

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Серия (4 цифры) *
                </label>
                <Input
                  placeholder="1234"
                  inputMode="numeric"
                  maxLength={4}
                  {...register("passportSeries", {
                    required: "Обязательное поле",
                    pattern: { value: /^\d{4}$/, message: "4 цифры" },
                  })}
                />
                {fieldErr(errors.passportSeries?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Номер (6 цифр) *
                </label>
                <Input
                  placeholder="123456"
                  inputMode="numeric"
                  maxLength={6}
                  {...register("passportNumber", {
                    required: "Обязательное поле",
                    pattern: { value: /^\d{6}$/, message: "6 цифр" },
                  })}
                />
                {fieldErr(errors.passportNumber?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Дата выдачи *
                </label>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("passportIssueDate", {
                    required: "Обязательное поле",
                  })}
                />
                {fieldErr(errors.passportIssueDate?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Кем выдан *
                </label>
                <Input
                  placeholder="ОУФМС России по г. Москве"
                  {...register("passportIssuer", {
                    required: "Обязательное поле",
                  })}
                />
                {fieldErr(errors.passportIssuer?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Код подразделения (XXX-XXX) *
                </label>
                <Input
                  placeholder="770-001"
                  inputMode="numeric"
                  maxLength={7}
                  {...register("passportDeptCode", {
                    required: "Обязательное поле",
                    pattern: {
                      value: /^\d{3}-?\d{3}$/,
                      message: "Формат XXX-XXX",
                    },
                  })}
                />
                {fieldErr(errors.passportDeptCode?.message)}
              </div>

              <div>
                <label className="text-md mb-1 block opacity-80">
                  Место жительства *
                </label>
                <Input
                  placeholder="г. Москва, ул. Ленина, д. 1, кв. 1"
                  {...register("address", { required: "Обязательное поле" })}
                />
                {fieldErr(errors.address?.message)}
              </div>
            </section>
          </div>

          <section className="mx-auto w-full max-w-4xl space-y-5">
            {sectionTitle("Выбор олимпиады")}

            <div className="space-y-3">
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition",
                  isDarkMode
                    ? "border-blue-800/40 hover:border-blue-600/60"
                    : "border-gray-200 hover:border-blue-400",
                  olympiadInfosec &&
                    (isDarkMode
                      ? "border-blue-500 bg-blue-950/40"
                      : "border-blue-400 bg-blue-50"),
                )}
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  {...register("olympiadInfosec")}
                />
                <span className="text-md leading-tight">
                  <strong className="block text-lg">
                    Информационная безопасность
                  </strong>
                  <span className="opacity-70">
                    Дисциплины: Информатика и ИКТ, Математика, Физика
                  </span>
                </span>
              </label>

              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition",
                  isDarkMode
                    ? "border-blue-800/40 hover:border-blue-600/60"
                    : "border-gray-200 hover:border-blue-400",
                  olympiadSocialStudies &&
                    (isDarkMode
                      ? "border-blue-500 bg-blue-950/40"
                      : "border-blue-400 bg-blue-50"),
                )}
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  {...register("olympiadSocialStudies")}
                />
                <span className="text-md leading-tight">
                  <strong className="block text-lg">
                    Основы российской государственности
                  </strong>
                  <span className="opacity-70">
                    Дисциплины: Обществознание, история
                  </span>
                </span>
              </label>
            </div>

            <div className="pt-4">
              {sectionTitle("Согласие на обработку персональных данных")}
            </div>

            <div>
              <label className="text-md mb-1 block opacity-80">
                Кто даёт согласие *
              </label>
              <Select
                {...register("consentType", {
                  required: "Обязательное поле",
                })}
              >
                <option value="">— выберите —</option>
                <option value="adult">Мне есть 18 лет</option>
                <option value="parent">
                  Родитель (законный представитель)
                </option>
              </Select>
              {fieldErr(errors.consentType?.message)}
            </div>
          </section>

          <section className="mx-auto w-full max-w-4xl space-y-5">
            <div
              className={cn(
                "rounded-xl border p-5 text-base leading-relaxed",
                isDarkMode
                  ? "border-blue-800/40 bg-blue-950/20 text-blue-100"
                  : "border-blue-200 bg-blue-50 text-blue-900",
              )}
            >
              <p className="mb-3">
                Заполните форму — файл{" "}
                <code className="font-mono font-semibold">anketa.docx</code>{" "}
                сформируется автоматически и скачается на ваш компьютер.
              </p>
              <p className="mb-3">
                Распечатайте анкету, впишите от руки ФИО родителя (если выбрано
                согласие от родителя) и поставьте подпись, затем приложите к
                пакету документов.
              </p>
              <p
                className={cn("text-md", {
                  "text-blue-300/80": isDarkMode,
                  "text-blue-700": !isDarkMode,
                })}
              >
                Нажимая «Скачать анкету», вы подтверждаете ознакомление с
                нормативными документами Олимпиады.
              </p>
              <div
                className={cn(
                  "rounded-lg py-3 text-sm leading-relaxed font-bold",
                )}
              >
                Личная подпись на распечатанной анкете необходима в целях
                соблюдения требований Федерального закона от 27 июля 2006 года №
                152-ФЗ «О персональных данных».
              </div>
            </div>

            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                isDarkMode
                  ? "border-red-500/60 bg-red-950/30 hover:bg-red-950/50"
                  : "border-red-300 bg-red-50 hover:bg-red-100",
              )}
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-red-600"
                {...register("isRepeat")}
              />
              <span className="text-sm leading-tight">
                <strong className="block text-red-700 dark:text-red-500">
                  Повторная анкета
                </strong>
                <span className="opacity-70">
                  Отметьте только в том случае, если в ранее поданной анкете
                  были ошибки и вы хотите исправить данные
                </span>
              </span>
            </label>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="!w-full !max-w-none py-4 text-lg"
            >
              {isSubmitting ? "Формирование..." : "Скачать анкету"}
            </Button>
          </section>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Registration;

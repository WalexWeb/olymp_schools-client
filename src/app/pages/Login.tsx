import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import Input from "../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

interface IForm {
  firstName: string;
  patronymic: string;
  lastName: string;
  email: string;
  password: string;
}

function Login() {
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

      <m.section className="relative grid grid-cols-2 gap-25 bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d] px-4 py-20 sm:px-6 md:flex-row">
        <form
          className="ml-20 mt-1 grid w-lg grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1"
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
        <Link
        to="/"
        className="inline-block text-lg text-blue-400 transition hover:text-blue-300"
      >
        Забыли пароль?
      </Link>
        </form>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex h-80 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-400 md:w-xl"
        />
      </m.section>

      <Footer />
    </div>
  );
}

export default Login;

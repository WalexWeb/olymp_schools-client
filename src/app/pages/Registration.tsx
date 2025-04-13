import { Button } from "../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";

interface IForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Registration() {
  const { register, handleSubmit } = useForm<IForm>({
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        className="grid-col-5 grid gap-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Введите имя"
          {...register("name", { required: true })}
        />
        <input
          type="text"
          placeholder="Введите почту"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <input
          type="password"
          placeholder="Введите пароль"
          {...register("password", { required: true })}
        />
        <input type="password" placeholder="Повторите пароль" />

        <Button type="submit">Регистрация</Button>
      </form>
    </div>
  );
}

export default Registration;

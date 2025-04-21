import Input from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useThemeStore } from "../../stores/themeStore";
import { m } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "clsx";

interface IForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IPasswordResetForm {
  resetEmail: string;
}

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
}: IForgotPasswordModalProps) => {
  const { register, handleSubmit } = useForm<IPasswordResetForm>();

  const { isDarkMode } = useThemeStore();

  const onSubmit: SubmitHandler<IPasswordResetForm> = (data) => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn("w-full max-w-md rounded-lg p-8", {
            "bg-gray-800": isDarkMode,
            "bg-white": !isDarkMode,
          })}
        >
          <h3
            className={cn("mb-6 text-2xl font-bold", {
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
              {...register("resetEmail", { required: true })}
              className="mb-4"
            />
            <div className="flex gap-3">
              <Button type="button" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit">Отправить</Button>
            </div>
          </form>
        </m.div>
      </div>
    </>
  );
};

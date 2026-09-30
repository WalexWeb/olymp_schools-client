import { ComponentProps } from "react";
import { fadeUp } from "../animations/fadeUp";
import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../../stores/themeStore";

function Input(props: ComponentProps<"input">) {
  const { isDarkMode } = useThemeStore();

  return (
    // @ts-ignore
    <m.input
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      {...props}
      className={cn(
        "h-12 w-full rounded-lg border border-blue-500 px-4 text-base outline-2 outline-offset-2 outline-blue-500 outline-solid transition-shadow focus-visible:shadow-md focus-visible:shadow-blue-500/20",
        {
          "placeholder-gray-400": isDarkMode,
          "bg-blue-200/55 placeholder-gray-500": !isDarkMode,
        },
      )}
    />
  );
}

export default Input;

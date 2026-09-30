import { ComponentProps, ReactNode } from "react";
import { fadeUp } from "../animations/fadeUp";
import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../../stores/themeStore";

type SelectProps = ComponentProps<"select"> & {
  children: ReactNode;
};

function Select({ children, ...props }: SelectProps) {
  const { isDarkMode } = useThemeStore();

  return (
    // @ts-ignore
    <m.select
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      {...props}
      className={cn(
        "h-12 w-full rounded-lg border border-blue-500 px-4 text-base outline-2 outline-offset-2 outline-blue-500 outline-solid transition-shadow focus-visible:shadow-md focus-visible:shadow-blue-500/20",
        { "bg-blue-200/55": !isDarkMode },
      )}
    >
      {children}
    </m.select>
  );
}

export default Select;

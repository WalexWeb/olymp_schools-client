import { forwardRef } from "react";
import { m } from "framer-motion";
import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { clsx } from "clsx";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({ size = "md", className, children, ...rest }, ref) => {
  const base =
    "inline-flex items-center justify-center text-white cursor-pointer rounded-2xl bg-blue-900 hover:bg-blue-800 focus:bg-blue-950 transition";

  const sizeMap: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <m.button
      ref={ref}
      className={clsx(base, sizeMap[size], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      {...rest}
    >
      {children}
    </m.button>
  );
});

Button.displayName = "Button";

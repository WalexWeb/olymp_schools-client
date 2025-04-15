import { ComponentProps, ReactNode } from "react";
import { fadeUp } from "../animations/fadeUp";
import { m } from "framer-motion";

type SelectProps = ComponentProps<"select"> & {
    children: ReactNode;
  };

function Select({ children, ...props }: SelectProps) {
    return (
    <m.select
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      {...props}
      className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
      >
        {children}
      </m.select>
  );
}

export default Select;



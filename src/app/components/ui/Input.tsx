import { ComponentProps } from "react";
import { fadeUp } from "../animations/fadeUp";
import { m } from "framer-motion";

function Input(props: ComponentProps<"input">) {
  return (
    <m.input
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      {...props}
      className="rounded-lg border-solid border-blue-500 px-6 py-2 outline-2 outline-offset-2 outline-blue-500 outline-solid"
    />
  );
}

export default Input;

import { m } from "framer-motion";
import React, { ReactNode } from "react";

interface HomeButtonProps {
  children: ReactNode;
}

const HomeButton: React.FC<HomeButtonProps> = ({ children }) => {
  return (
      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        className="rounded-2xl bg-gray-100 p-6 shadow-md cursor-pointer"
      >
        {children}
      </m.button>
  );
};

export default HomeButton;
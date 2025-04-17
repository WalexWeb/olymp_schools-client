import cn from "clsx";
import { useThemeStore } from "../../../stores/themeStore";

function Footer() {
  const { isDarkMode } = useThemeStore();

  return (
    <footer
      className={cn("border-t py-6 text-center text-sm text-gray-500", {
        "border-[#2c313c] bg-[#0d1117]": isDarkMode,
        "border-gray-200 bg-white text-gray-800": !isDarkMode,
      })}
    >
      © 2025, МВД России
    </footer>
  );
}

export default Footer;

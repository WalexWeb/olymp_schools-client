import { Link } from "react-router-dom";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { Button } from "../components/ui/Button";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";

export default function NotFoundPage() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />

      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          {/* Число 404 */}
          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={cn("mb-4 text-8xl font-bold", {
              "text-blue-300": isDarkMode,
              "text-blue-600": !isDarkMode,
            })}
          >
            404
          </m.h1>

          {/* Заголовок */}
          <m.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className={cn("mb-4 text-2xl font-bold", {
              "text-blue-200": isDarkMode,
              "text-blue-700": !isDarkMode,
            })}
          >
            Страница не найдена
          </m.h2>

          {/* Описание */}
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className={cn("mb-8", {
              "text-gray-300": isDarkMode,
              "text-gray-600": !isDarkMode,
            })}
          >
            Запрашиваемая страница не существует или была перемещена.
          </m.p>

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Link to="/">
              <Button className="text-5xl">На главную</Button>
            </Link>
          </m.div>
        </div>
      </div>
    </div>
  );
}

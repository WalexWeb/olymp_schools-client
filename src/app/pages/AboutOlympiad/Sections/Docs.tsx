import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";
import { useThemeStore } from "../../../stores/themeStore";
import cn from "clsx";
import position from "/public/position.pdf";
import regulationsSociety from "/public/regulationsSociety.pdf";
import methodologySociety from "/public/methodologySociety.pdf";
import chartSociety from "/public/chartSociety.pdf";
import regulationsInfoSec from "/public/regulationsInfoSec.pdf";
import chartInfoSec from "/public/chartInfoSec.pdf";

function Docs() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="gridgap-6 text-center">
      <section className="mb-8">
        <a href={position} target="_blank" rel="noopener noreferrer">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "mb-6 cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            Положение
          </m.div>
        </a>
      </section>
      <m.h3
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className={cn("mb-4 text-center text-xl font-semibold", {
          "text-blue-400": isDarkMode,
          "text-blue-600": !isDarkMode,
        })}
      >
        Информационная безопасность
      </m.h3>
      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <a href={regulationsInfoSec} target="_blank" rel="noopener noreferrer">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            Регламент
          </m.div>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            Методика оценки
          </m.div>
        </a>
        <a href={chartInfoSec} target="_blank" rel="noopener noreferrer">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            График проведения
          </m.div>
        </a>
      </section>
      <m.h3
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className={cn("mb-4 text-center text-xl font-semibold", {
          "text-blue-400": isDarkMode,
          "text-blue-600": !isDarkMode,
        })}
      >
        Обществознание
      </m.h3>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <a href={regulationsSociety} target="_blank" rel="noopener noreferrer">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            Регламент
          </m.div>
        </a>
        <a href={methodologySociety} target="_blank" rel="noopener noreferrer">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            Методика оценки
          </m.div>
        </a>
        <a href={chartSociety} target="_blank" rel="noopener noreferrer">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            График проведения
          </m.div>
        </a>
      </section>
    </div>
  );
}

export default Docs;

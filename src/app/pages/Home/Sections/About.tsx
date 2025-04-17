import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";
import { useThemeStore } from "../../../stores/themeStore";
import cn from "clsx";

function About() {
  const { isDarkMode } = useThemeStore();

  const aboutItems = [
    {
      title: "Об олимпиаде",
      desc: "Описание олимпиады, её цели и как она помогает при поступлении",
    },
    {
      title: "Прохождение олимпиады",
      desc: "Этапы участия и правила прохождения",
    },
    {
      title: "Архив",
      desc: "Архив победителей и проектов прошлых лет",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {aboutItems.map((item, index) => (
        <m.button
          key={index}
          variants={fadeUp}
          custom={index}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          className={cn("cursor-pointer rounded-xl p-6 shadow-xl transition", {
            "bg-[#161b22] hover:shadow-blue-500/20": isDarkMode,
            "border border-gray-200 bg-white hover:shadow-blue-200":
              !isDarkMode,
          })}
        >
          <h4
            className={cn("mb-2 text-xl font-bold", {
              "text-blue-300": isDarkMode,
              "text-blue-600": !isDarkMode,
            })}
          >
            {item.title}
          </h4>
          <p
            className={cn("text-sm", {
              "text-gray-400": isDarkMode,
              "text-gray-600": !isDarkMode,
            })}
          >
            {item.desc}
          </p>
        </m.button>
      ))}
    </div>
  );
}

export default About;

import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";
import { useThemeStore } from "../../../stores/themeStore";
import cn from "clsx";
import { Link } from "react-router-dom";

function About() {
  const { isDarkMode } = useThemeStore();

  interface IAboutItem {
    title: string;
    desc: string;
    link: string;
  }

  const aboutItems: IAboutItem[] = [
    {
      title: "Об олимпиаде",
      desc: "Описание олимпиады, её цели и как она помогает при поступлении",
      link: "/",
    },
    {
      title: "Прохождение олимпиады",
      desc: "Этапы участия и правила прохождения",
      link: "/",
    },
    {
      title: "Архив",
      desc: "Архив победителей и проектов прошлых лет",
      link: "/",
    },
  ];

  return (
    <div
      className={`col-auto grid grid-cols-1 gap-8 md:grid-cols-${aboutItems.length} lg:grid-cols-3 xl:gap-8`}
    >
      {aboutItems.map((item, index) => (
        <Link to={item.link} key={index}>
          <m.button
            key={index}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl p-6 shadow-xl transition",

              {
                "bg-[#161b22] hover:shadow-blue-500/20": isDarkMode,
                "border border-gray-200 bg-white hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
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
              className={cn("text-md", {
                "text-gray-400": isDarkMode,
                "text-gray-600": !isDarkMode,
              })}
            >
              {item.desc}
            </p>
          </m.button>
        </Link>
      ))}
    </div>
  );
}

export default About;

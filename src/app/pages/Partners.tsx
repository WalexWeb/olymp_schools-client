import { motion } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const partners = [
  {
    logo: "/expert_logo.png",
    name: "Экспертно-криминалистический центр МВД России",
  },
  {
    logo: "/ubk_logo.svg",
    name: "Управление по организации борьбы с противоправным использованием информационно-коммуникационных технологий МВД России",
  },
  {
    logo: "/bstm_logo.png",
    name: "Бюро специальных технических мероприятий МВД России",
  },
  {
    logo: "/stis_logo.png",
    name: "НПО «Специальная техника и связь» МВД России",
  },
  { logo: "/consplus_logo.png", name: "Консультант Плюс" },
  { logo: "/garant_logo.png", name: "Гарант" },
  { logo: "/sber_logo.svg", name: "Сбер" },
  { logo: "/standart_logo.svg", name: "СтандартПроект" },
  { logo: "/kaspersky_logo.svg", name: "Лаборатория Касперского" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.5,
    },
  },
};

export default function Partners() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section className="relative px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <div
                  className={cn(
                    "flex h-40 w-full items-center justify-center rounded-2xl p-6",
                    {
                      "bg-[#1e293b]/50": isDarkMode,
                      "bg-white shadow-md": !isDarkMode,
                    },
                  )}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-11/12 min-h-11/12 object-contain"
                  />
                </div>
                <motion.p
                  className={cn("mt-4 text-center text-xl", {
                    "text-gray-300": isDarkMode,
                    "text-gray-600": !isDarkMode,
                  })}
                >
                  {partner.name}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className={cn(
              "mx-auto mt-16 max-w-4xl rounded-2xl p-8 text-center",
              {
                "bg-[#1e293b]/50": isDarkMode,
                "bg-white shadow-md": !isDarkMode,
              },
            )}
          >
            <h2
              className={cn("mb-6 text-2xl font-bold md:text-3xl", {
                "text-blue-300": isDarkMode,
                "text-blue-600": !isDarkMode,
              })}
            >
              Партнерами Олимпиады выступают:
            </h2>
            <p
              className={cn("text-lg leading-relaxed", {
                "text-gray-300": isDarkMode,
                "text-gray-700": !isDarkMode,
              })}
            >
              Экспертно-криминалистический центр МВД России, Управление по
              организации борьбы с противоправным использованием
              информационно-коммуникационных технологий МВД России, Бюро
              специальных технических мероприятий МВД России,
              научно-производственное объединение «Специальная техника и связь»
              МВД России, а также «Консультант Плюс», «Гарант», «Сбер»,
              «СтандартПроект», «Лаборатория Касперского».
            </p>
          </motion.div>
          <div className="mt-10 flex items-center justify-center">
            <Link to="/">
              <Button className="px-7 py-3">Вернуться на главную</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

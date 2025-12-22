import cn from "clsx";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import { fadeUp } from "../components/animations/fadeUp";
import { useThemeStore } from "../stores/themeStore";
import Background from "../components/ui/Background";
import QualifyingSociety from "/public/QualifyingSociety.pdf";
import QualifyingInfoSec from "/public/QualifyingInfoSec.pdf";
import Top20Society from "/public/Top20Society.pdf";
import Top20InfoSec from "/public/Top20InfoSec.pdf";

const profiles = [
  {
    title: "Профиль «Обществознание»",
    pdf: QualifyingSociety,
    certificatesLink: "https://cloud.mail.ru/public/Wn8w/Zr4Dg4Zgi",
    top20: Top20Society,
  },
  {
    title: "Профиль «Информационная безопасность»",
    pdf: QualifyingInfoSec,
    certificatesLink: "https://cloud.mail.ru/public/A5Lg/bGHdcTSHK",
    top20: Top20InfoSec,
  },
];

function QualifyingResults() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50/20 text-gray-900": !isDarkMode,
      })}
    >
      <Background />
      <BackgroundBlobs />
      <Navbar />

      <section className="relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl space-y-10">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center"
          >
            <h1
              className={cn("text-4xl font-bold md:text-5xl", {
                "text-white": isDarkMode,
                "text-gray-900": !isDarkMode,
              })}
            >
              Результаты Отборочного этапа
            </h1>
            <div
              className={cn(
                "mx-auto mt-4 max-w-3xl rounded-2xl border px-6 py-4 text-lg font-medium",
                {
                  "border-blue-800/50 bg-blue-900/20 text-blue-100": isDarkMode,
                  "border-blue-200 bg-blue-50 text-blue-800": !isDarkMode,
                },
              )}
            >
              Информация представлена отдельно по каждому профилю, списки
              сформированы в алфавитном порядке и доступны в формате PDF
            </div>
          </m.div>

          <div className="grid gap-6 md:grid-cols-2">
            {profiles.map((profile, index) => (
              <m.div
                key={profile.title}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className={cn(
                  "rounded-2xl border p-6 shadow-lg backdrop-blur",
                  {
                    "border-blue-900/40 bg-[#0b0f1a]/70 text-white": isDarkMode,
                    "border-blue-100 bg-white text-gray-900": !isDarkMode,
                  },
                )}
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-center text-2xl font-semibold">
                    {profile.title}
                  </h3>
                </div>

                <div className="mt-6 flex w-full flex-col items-center gap-3">
                  <div className="flex w-full flex-row justify-center gap-3">
                    <a
                      href={profile.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-w-[160px]"
                    >
                      <Button size="lg" className="w-full justify-center gap-2">
                        Просмотр результатов
                      </Button>
                    </a>
                    <a
                      href={profile.certificatesLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-w-[160px]"
                    >
                      <Button size="lg" className="w-full justify-center gap-2">
                        Скачать сертификат
                      </Button>
                    </a>
                  </div>
                  <a
                    href={profile.top20}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-w-[160px]"
                  >
                    <Button size="lg" className="w-full justify-center gap-2">
                      <span>Топ-20 участников</span>
                    </Button>
                  </a>
                </div>
              </m.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/">
              <Button size="lg" className="px-8 py-3">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default QualifyingResults;

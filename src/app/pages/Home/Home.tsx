import Navbar from "../../components/layout/Navbar/Navbar";
import News from "./Sections/News";
import About from "./Sections/About";
import Partners from "./Sections/Partners";
import Footer from "../../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import { fadeUp } from "../../components/animations/fadeUp";
import { m } from "framer-motion";
import Results from "./Sections/Results";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] font-sans text-white">
      <BackgroundBlobs />

      <div className="w-full">
        <Navbar />

        <section className="relative flex flex-col items-center justify-between gap-16 bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d] px-4 py-20 sm:px-6 md:flex-row">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
              Всероссийская олимпиада школьников
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Побеждай в соревнованиях и получай дополнительные баллы при
              поступлении
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-[260px] w-full rounded-2xl bg-gradient-to-br from-blue-700 to-blue-400 shadow-2xl md:w-[420px]"
          />
        </section>

        {/* Новости */}
        <section id="news" className="relative bg-[#0d1117] px-4 py-16 sm:px-6">
          <News />
        </section>

        {/* Об олимпиаде */}
        <section id="about" className="bg-[#0b0f1a] px-4 py-20 sm:px-6">
          <m.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-semibold text-white"
          >
            Подробнее об Олимпиаде
          </m.h3>
          <About />
        </section>

        {/* Результаты */}
        <section id="results" className="bg-[#0e121a] px-4 py-20 sm:px-6">
          <m.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-3xl font-semibold text-white"
          >
            Результаты Олимпиады
          </m.h3>
          <Results />
        </section>

        {/* Партнёры */}
        <section
          id="partners"
          className="relative bg-[#0d1117] px-4 py-20 sm:px-6"
        >
          <m.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-3xl font-semibold text-white"
          >
            Партнёры
          </m.h3>
          <Partners />
        </section>

        {/* Разработчики */}
        <section
          id="developers"
          className="bg-[#0b0f1a] px-4 py-16 text-center sm:px-6"
        >
          <m.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-3xl font-semibold text-white"
          >
            Разработчики
          </m.h3>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-gray-400"
          >
            Проект разработан курсантами факультета подготовки специалистов в
            области информационной безопасности Московского университета МВД
            России имени В.Я. Кикотя.
          </m.p>
        </section>
        <Footer />
      </div>
    </div>
  );
}

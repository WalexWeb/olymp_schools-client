import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";

function About() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {[
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
      ].map((title, index) => (
        <m.button
          key={index}
          variants={fadeUp}
          custom={index}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          className="cursor-pointer rounded-xl bg-[#161b22] p-6 shadow-xl transition hover:shadow-blue-500/20"
        >
          <h4 className="mb-2 text-xl font-bold text-blue-400">
            {title.title}
          </h4>
          <p className="text-sm text-gray-400">{title.desc}</p>
        </m.button>
      ))}
    </div>
  );
}

export default About;

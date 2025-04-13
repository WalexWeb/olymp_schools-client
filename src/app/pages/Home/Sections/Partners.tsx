import { m} from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";

function Partners() {
  return (
    <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
      {["Сбер", "Positive Technologies", "Kaspersky", "Яндекс"].map(
        (name, i) => (
          <m.div
            key={i}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className="cursor-pointer rounded-xl bg-[#14181d] p-6 py-6 text-lg font-medium text-blue-300 shadow-xl transition hover:shadow-blue-500/20"
          >
            {name}
          </m.div>
        ),
      )}
    </div>
  );
}

export default Partners;

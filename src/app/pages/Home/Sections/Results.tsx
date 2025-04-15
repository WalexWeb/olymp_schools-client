import { m } from "framer-motion";
import { Button } from "../../../components/ui/Button";

function Results() {
  return (
    <div className="flex flex-col items-center gap-10">
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl text-lg text-gray-400"
      >
        Здесь публикуются финальные баллы участников, список победителей и
        аналитика прохождения этапов. Все данные доступны для скачивания в
        формате PDF и доступны на портале личного кабинета.
      </m.p>
      <Button>Просмотреть результаты</Button>
    </div>
  );
}

export default Results;

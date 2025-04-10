import { Button } from "../components/Button";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";
import Sidebar from "../components/ui/Sidebar/Sidebar";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-gray-50 text-gray-900">
      <section className="grid grid-cols-3 items-center gap-10 px-6 py-16 md:grid-cols-[.2fr_2.5fr_1.2fr]">
        <div>
          <Sidebar />
        </div>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6 text-5xl font-bold">
            Университет цифровой полиции
          </h1>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            Всероссийская олимпиада школьников
          </p>
          <div className="grid grid-rows-2 gap-4 sm:flex-row">
            <Link to="/registration" className="w-full sm:w-[17rem]">
              <Button className="w-full px-6 py-3 text-lg">Регистрация</Button>
            </Link>
            <p className="mt-2 ml-7 text-lg">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="font-bold text-blue-800 underline">
                Войти
              </Link>
            </p>
          </div>
        </m.div>
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mb-6 text-4xl font-bold">Новости</h2>
          <div className="h-52 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              <li className="py-2">
                <p className="text-lg font-medium">🎉 У нас Финал!</p>
                <p className="text-base text-gray-500">1 апреля 2025</p>
              </li>
              <li className="py-2">
                <p className="text-base font-medium">📣 Дорогие финалисты!</p>
                <p className="text-base text-gray-500">29 марта 2025</p>
              </li>
              <li className="py-2">
                <p className="text-lg font-medium">
                  📣 Определился состав финалистов!
                </p>
                <p className="text-base text-gray-500">29 марта 2025</p>
              </li>
              <li className="py-2">
                <p className="text-lg font-medium">
                  🏆 Топ-20 участников Отборочного этапа
                </p>
                <p className="text-base text-gray-500">29 марта 2025</p>
              </li>
              <li className="py-2">
                <p className="text-lg font-medium">
                  📊 Результаты Отборочного этапа
                </p>
                <p className="text-base text-gray-500">15 марта 2025</p>
              </li>
              <li className="py-2">
                <p className="text-lg font-medium">
                  ❗️ До завершения Отборочного этапа осталось 2 дня!
                </p>
                <p className="text-base text-gray-500">15 марта 2025</p>
              </li>
              <li className="py-2">
                <p className="text-lg font-medium">
                  ❗️ Стартовал Отборочный этап
                </p>
                <p className="text-base text-gray-500">15 марта 2025</p>
              </li>
            </ul>
          </div>
        </m.div>
      </section>

      <section className="bg-white px-6 py-8">
        <m.div
          className="mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 text-2xl font-semibold">
            Московский университет МВД России имени В.Я. Кикотя
          </h2>

          <div className="grid grid-rows-2 gap-8 md:grid-cols-3">
            <HomeButton>
              <h3 className="mb-2 text-xl font-medium">Об олимпиаде</h3>
              <p className="text-gray-600">
                Описание олимпиады, её цели и как она помогает при поступлении
              </p>
            </HomeButton>

            <HomeButton>
              <h3 className="mb-2 text-xl font-medium">
                Прохождение олимпиады
              </h3>
              <p className="text-gray-600">
                Этапы участия и правила прохождения
              </p>
            </HomeButton>

            <HomeButton>
              <h3 className="mb-2 text-xl font-medium">
                Результаты отборочного этапа
              </h3>
              <p className="text-gray-600">
                Список участников, прошедших в следующий этап
              </p>
            </HomeButton>

            <HomeButton>
              <h3 className="mb-2 text-xl font-medium">Итоги Олимпиады</h3>
              <p className="text-gray-600">
                Победители, баллы и финальные результаты
              </p>
            </HomeButton>

            <HomeButton>
              <h3 className="mb-2 text-xl font-medium">
                Результаты прошлых лет
              </h3>
              <p className="text-gray-600">
                Архив победителей и лучших проектов прошлых олимпиад
              </p>
            </HomeButton>

            <HomeButton>
              <h3 className="mb-2 text-xl font-medium">Наши партнёры</h3>
              <p className="text-gray-600">
                Компании и организации, поддерживающие проект
              </p>
            </HomeButton>
          </div>
        </m.div>
      </section>
    </main>
  );
}

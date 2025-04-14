import { Link } from "react-router-dom";
import { Button } from "../../ui/Button";

function Navbar() {
  return (
    <header className="sticky top-0 z-100 flex items-center justify-between border-b border-[#2c313c] bg-[#0d1117]/70 px-4 py-6 backdrop-blur sm:px-6">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold md:text-3xl">
          Университет <span className="text-blue-400">Цифровой Полиции</span>
        </h1>
      </Link>
      <nav className="hidden gap-6 text-sm font-medium text-gray-300 md:flex md:gap-10">
        <a href="#about" className="text-base transition hover:text-blue-400">
          Олимпиада
        </a>
        <a href="#news" className="text-base transition hover:text-blue-400">
          Новости
        </a>
        <a href="#results" className="text-base transition hover:text-blue-400">
          Результаты
        </a>
        <a
          href="#partners"
          className="text-base transition hover:text-blue-400"
        >
          Партнёры
        </a>
        <a
          href="#developers"
          className="text-base transition hover:text-blue-400"
        >
          Разработчики
        </a>
      </nav>
      <Link
        to="/login"
        className="inline-block text-lg text-blue-400 transition hover:text-blue-300"
      >
        Войти
      </Link>
      <Link to="/registration">
        <Button>Регистрация</Button>
      </Link>
    </header>
  );
}

export default Navbar;

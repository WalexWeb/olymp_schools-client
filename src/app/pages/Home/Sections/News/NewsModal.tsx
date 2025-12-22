import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../../../../stores/themeStore";
import { useRef } from "react";
import { INewsModalProps } from "../../../../types/INews.type";

/**
 * Парсит ссылки вида [[текст|url]] в HTML <a>
 */
const parseLinks = (text: string) => {
  return text.replace(
    /\[\[(.+?)\|(.+?)\]\]/g,
    `<a href="$2" target="_blank" rel="noopener noreferrer" class="news-link">$1</a>`,
  );
};

function NewsModal({ isOpen, onClose, text, desc, date }: INewsModalProps) {
  const { isDarkMode } = useThemeStore();
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Затемнение фона */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-xs"
      />

      {/* Контейнер модального окна */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <m.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cn(
            "relative w-full max-w-xl rounded-2xl border border-blue-800 bg-gradient-to-br p-8 shadow-md transition-all",
            {
              "from-[#142441] to-[#15213e] text-white": isDarkMode,
              "from-white to-blue-200 text-gray-800": !isDarkMode,
            },
          )}
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              {
                "hover:bg-blue-700/30": isDarkMode,
                "hover:bg-blue-200": !isDarkMode,
              },
            )}
            aria-label="Закрыть окно"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn({
                "text-blue-300": isDarkMode,
                "text-blue-600": !isDarkMode,
              })}
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Заголовок */}
          <h3
            className={cn("mb-6 text-center text-3xl font-semibold", {
              "text-white": isDarkMode,
              "text-gray-900": !isDarkMode,
            })}
          >
            {text}
          </h3>

          {/* Дата */}
          <p
            className={cn("mb-4 text-lg", {
              "text-blue-400": isDarkMode,
              "text-blue-500": !isDarkMode,
            })}
          >
            {date}
          </p>

          {/* Текст новости со встроенными ссылками */}
          <p
            className="text-lg leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: parseLinks(desc),
            }}
          />
        </m.div>
      </div>
    </>
  );
}

export default NewsModal;

import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../../../../stores/themeStore";
import { useRef } from "react";
import { INewsModalProps } from "../../../../types/INews.type";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

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

  return createPortal(
    <>
      {/* Затемнение фона */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
      />

      {/* Контейнер модального окна */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <m.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className={cn(
            "news-scroll relative max-h-[70dvh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-xl border p-6 shadow-2xl sm:p-9",
            {
              "border-slate-700 bg-[#111a2b] text-slate-100": isDarkMode,
              "border-slate-200 bg-white text-slate-800": !isDarkMode,
            },
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <span
              className={cn("rounded-md px-3 py-1 text-sm font-medium", {
                "bg-blue-400/10 text-blue-300": isDarkMode,
                "bg-blue-50 text-blue-700": !isDarkMode,
              })}
            >
              {date}
            </span>
            <button
              onClick={onClose}
              className={cn(
                "-mr-2 -mt-2 flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                {
                  "text-slate-300 hover:bg-white/10 hover:text-white": isDarkMode,
                  "text-slate-500 hover:bg-slate-100 hover:text-slate-900":
                    !isDarkMode,
                },
              )}
              aria-label="Закрыть окно"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <h3
            className={cn("mt-5 text-left text-2xl leading-tight font-semibold sm:text-3xl", {
              "text-white": isDarkMode,
              "text-slate-950": !isDarkMode,
            })}
          >
            {text}
          </h3>

          <div
            className={cn("my-6 h-px", {
              "bg-slate-700": isDarkMode,
              "bg-slate-200": !isDarkMode,
            })}
          />

          <div
            className="text-base leading-8 whitespace-pre-line sm:text-lg"
            dangerouslySetInnerHTML={{
              __html: parseLinks(desc),
            }}
          />
        </m.div>
      </div>
    </>
    ,
    document.body,
  );
}

export default NewsModal;

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";
import Footer from "../components/layout/Footer/Footer";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { INewsItem } from "../types/INews.type";
import { IOlympiad } from "../types/IOlympiads.type";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LocalImage {
  id: string;
  file: File;
  previewUrl: string;
}

const Admin = () => {
  const STATIC_URL = import.meta.env.VITE_STATIC_URL || "";
  const { accessToken, userData, setUserData } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const queryClient = useQueryClient();

  // Состояния для новостей
  const [newsFormData, setNewsFormData] = useState({
    title: "",
    description: "",
    newsDate: "",
  });

  // Состояния для изображений
  const [localImages, setLocalImages] = useState<LocalImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Состояния для олимпиад
  const [olympiadFormData, setOlympiadFormData] = useState({
    name: "",
    date: "",
    description: "",
  });

  // Состояния для пролистывания новостей
  const [newsPage, setNewsPage] = useState(0);

  // Состояние для анимации загрузки выгрузки пользователей
  const [isExportingUsers, setIsExportingUsers] = useState(false);

  const navigate = useNavigate();

  // Проверка роли администратора
  useEffect(() => {
    const checkAdminRole = async () => {
      // Если нет токена — редирект на логин
      if (!accessToken) {
        navigate("/login");
        return;
      }

      // Если данные пользователя уже есть и роль не ADMIN — редирект
      if (
        userData &&
        userData.role !== "ADMIN" &&
        userData.role !== "PDN_ADMIN"
      ) {
        navigate("/");
        return;
      }

      // Если данных нет — загружаем профиль
      if (!userData) {
        try {
          const response = await api.get("/users/me");

          const profileData = {
            role: response.data.role,
          };

          setUserData(profileData);

          // Проверяем роль после загрузки
          if (
            profileData.role !== "ADMIN" &&
            profileData.role !== "PDN_ADMIN"
          ) {
            navigate("/");
          }
        } catch (error) {
          console.error("Ошибка загрузки профиля:", error);
          navigate("/login");
        }
      }
    };

    checkAdminRole();
  }, [accessToken, userData, navigate, setUserData]);

  // Получение списка олимпиад
  const {
    data: olympiads,
    isLoading: isOlympiadsLoading,
    error: olympiadsError,
  } = useQuery<IOlympiad[]>({
    queryKey: ["olympiads"],
    queryFn: async () => {
      const response = await api.get("/olympiads");
      return response.data;
    },
  });

  // Создание олимпиады
  const createOlympiadMutation = useMutation({
    mutationFn: (newOlympiad: Omit<IOlympiad, "id">) =>
      api.post("/admin/olympiads", newOlympiad),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["olympiads"] });
      setOlympiadFormData({ name: "", date: "", description: "" });
    },
  });

  // Удаление олимпиады
  const deleteOlympiadMutation = useMutation({
    mutationFn: (name: string) =>
      api.delete(`/admin/olympiads/${encodeURIComponent(name)}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["olympiads"] });
    },
  });

  // Получение списка новостей
  const {
    data: news,
    isLoading: isNewsLoading,
    error: newsError,
  } = useQuery<INewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await api.get("/news");
      return response.data;
    },
  });

  // Получение списка изображений
  const {
    data: images,
    isLoading: isImagesLoading,
    error: imagesError,
    refetch: refetchImages,
  } = useQuery<string[]>({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await api.get("/carousel/images");
      return response.data;
    },
  });

  // Создание новости
  const createNewsMutation = useMutation({
    mutationFn: (newNews: Omit<INewsItem, "id">) =>
      api.post("/admin/news", newNews),
    onSuccess: async () => {
      // refetch (не invalidate) — гарантирует перезапрос списка сразу,
      // чтобы новая новость появилась без ручного обновления.
      await queryClient.refetchQueries({ queryKey: ["news"] });
      setNewsFormData({ title: "", description: "", newsDate: "" });
    },
  });

  // Удаление новости
  const deleteNewsMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/news/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      // Если после удаления текущая страница стала пустой, переходим на предыдущую
    },
  });

  // Удаление изображения
  const deleteImageMutation = useMutation({
    mutationFn: async (fullImageUrl: string) => {
      // Извлекаем часть после "/uploads/"
      const uploadPath = fullImageUrl.split("/uploads/").pop();

      if (!uploadPath) {
        throw new Error("Неверный формат URL изображения");
      }

      await api.delete(`/admin/carousel/${uploadPath}`);
    },
    onSuccess: () => {
      refetchImages();
    },
  });

  // Функция для выгрузки пользователей в Excel
  const exportUsersToExcel = async () => {
    setIsExportingUsers(true);
    try {
      const response = await api.get("/admin/export-users", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users_export.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Ошибка выгрузки:", error);
      alert("Не удалось выгрузить файл");
    } finally {
      setIsExportingUsers(false);
    }
  };

  // Обработчики для новостей
  const handleNewsInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewsFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewsMutation.mutate(newsFormData);
  };

  // Обработчики для изображений
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      const newImages = files.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setLocalImages((prev) => [...prev, ...newImages]);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (id: string) => {
    const imageToRemove = localImages.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }

    setLocalImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleUploadImages = async () => {
    if (localImages.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // One HTTP request per file: backend stores one Media + one
      // CarouselImage per upload. Send `file` (singular), never `files`.
      for (const image of localImages) {
        const formData = new FormData();
        formData.append("file", image.file);
        await api.post("/admin/carousel/upload", formData);
      }

      await refetchImages();

      localImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      setLocalImages([]);
    } catch (error) {
      console.error("Ошибка загрузки изображений:", error);
      setUploadError("Не удалось загрузить изображения");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (imageUrl: string) => {
    if (confirm("Вы уверены, что хотите удалить это изображение?")) {
      deleteImageMutation.mutate(imageUrl);
    }
  };

  // Очистка превью при размонтировании компонента
  useEffect(() => {
    return () => {
      localImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, [localImages]);

  // Функции для пагинации новостей
  const sortedNews = news
    ? [...news].sort(
        (a, b) =>
          new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime(),
      )
    : [];
  const newsPageCount = Math.max(1, Math.ceil(sortedNews.length / 3));
  const currentNewsPage = Math.min(newsPage, newsPageCount - 1);
  const paginatedNews = sortedNews.slice(
    currentNewsPage * 3,
    currentNewsPage * 3 + 3,
  );

  if (isNewsLoading) return <div>Загрузка...</div>;
  if (newsError)
    return <div>Ошибка загрузки новостей: {newsError.message}</div>;

  // Обработчики для олимпиад
  const handleOlympiadInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setOlympiadFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOlympiadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOlympiadMutation.mutate(olympiadFormData);
  };

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50/20 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section className="flex flex-col items-center justify-center px-6 py-12">
        <h2
          className={cn("mb-12 text-center text-4xl font-bold md:text-5xl", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Панель администратора
        </h2>

        {/* Кнопка выгрузки пользователей */}
        <div className="mb-8 flex justify-center">
          <m.div variants={fadeUp} initial="hidden" animate="visible">
            <Button
              onClick={exportUsersToExcel}
              disabled={isExportingUsers}
              className="relative min-w-[200px] px-6 py-3"
            >
              {isExportingUsers ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  Выгрузка...
                </div>
              ) : (
                "Выгрузить пользователей в таблицу Excel"
              )}
            </Button>
          </m.div>
        </div>

        <div className="flex w-full flex-col gap-8 lg:flex-row">
          {/* Колонка новостей */}
          <div className="flex-1">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <h3
                className={cn("text-center text-3xl font-bold", {
                  "text-white": isDarkMode,
                  "text-gray-900": !isDarkMode,
                })}
              >
                Управление новостями
              </h3>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Создание новости
                </h4>

                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block font-medium">Заголовок</label>
                    <input
                      type="text"
                      name="title"
                      value={newsFormData.title}
                      onChange={handleNewsInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">Описание</label>
                    <textarea
                      name="description"
                      value={newsFormData.description}
                      onChange={handleNewsInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">
                      Дата новости
                    </label>
                    <input
                      type="date"
                      name="newsDate"
                      value={newsFormData.newsDate}
                      onChange={handleNewsInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={createNewsMutation.isPending}
                      className="w-full"
                    >
                      {createNewsMutation.isPending
                        ? "Создание..."
                        : "Создать новость"}
                    </Button>
                  </div>
                </form>
              </div>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Список новостей
                </h4>
                {news?.length === 0 ? (
                  <p className="text-center">Новостей нет</p>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {paginatedNews.map((item) => (
                        <div
                          key={item.id}
                          className={cn("rounded-lg border p-4", {
                            "border-gray-700": isDarkMode,
                            "border-gray-200": !isDarkMode,
                          })}
                        >
                          <h5 className="mb-2 text-lg font-bold">
                            {item.title}
                          </h5>
                          <p className="mb-2 text-sm text-gray-500">
                            Дата:{" "}
                            {new Date(item.newsDate).toLocaleDateString(
                              "ru-RU",
                            )}
                          </p>
                          <p className="mb-3">{item.description}</p>
                          <div>
                            <Button
                              size="sm"
                              onClick={() =>
                                deleteNewsMutation.mutate(String(item.id))
                              }
                              disabled={deleteNewsMutation.isPending}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              {deleteNewsMutation.isPending
                                ? "Удаление..."
                                : "Удалить"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {sortedNews.length > 3 && (
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          size="sm"
                          aria-label="Предыдущие новости"
                          onClick={() =>
                            setNewsPage((page) => Math.max(0, page - 1))
                          }
                          disabled={currentNewsPage === 0}
                        >
                          <ChevronLeft aria-hidden="true" />
                        </Button>
                        <span className="text-sm" aria-live="polite">
                          {currentNewsPage + 1} / {newsPageCount}
                        </span>
                        <Button
                          size="sm"
                          aria-label="Следующие новости"
                          onClick={() =>
                            setNewsPage((page) =>
                              Math.min(newsPageCount - 1, page + 1),
                            )
                          }
                          disabled={currentNewsPage === newsPageCount - 1}
                        >
                          <ChevronRight aria-hidden="true" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </m.div>
          </div>

          {/* Колонка изображений */}
          <div className="flex-1">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <h3
                className={cn("text-center text-3xl font-bold", {
                  "text-white": isDarkMode,
                  "text-gray-900": !isDarkMode,
                })}
              >
                Управление изображениями
              </h3>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Загрузка изображений
                </h4>
                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className={cn("w-full rounded border p-2", {
                      "border-gray-700 bg-gray-800": isDarkMode,
                      "border-gray-300 bg-white": !isDarkMode,
                    })}
                  />
                  {localImages.length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        Выбрано изображений: {localImages.length}
                      </p>
                      <Button
                        onClick={handleUploadImages}
                        disabled={isUploading || localImages.length === 0}
                      >
                        {isUploading ? "Загрузка..." : "Загрузить"}
                      </Button>
                    </div>
                  )}
                  {uploadError && (
                    <p className="text-sm text-red-500">{uploadError}</p>
                  )}
                </div>
              </div>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Предпросмотр перед загрузкой
                </h4>
                {localImages.length === 0 ? (
                  <p className="text-center">Нет выбранных изображений</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {localImages.map((image) => (
                      <div
                        key={image.id}
                        className={cn("relative rounded-lg border", {
                          "border-gray-700": isDarkMode,
                          "border-gray-200": !isDarkMode,
                        })}
                      >
                        <img
                          src={image.previewUrl}
                          alt={`Preview ${image.id}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 bg-black p-2 text-white">
                          <p className="truncate text-xs">{image.file.name}</p>
                          <p className="text-xs">
                            {(image.file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveImage(image.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Загруженные изображения
                </h4>
                {isImagesLoading ? (
                  <div>Загрузка изображений...</div>
                ) : imagesError ? (
                  <div className="text-red-500">
                    Ошибка загрузки: {imagesError.message}
                  </div>
                ) : images?.length === 0 ? (
                  <p className="text-center">Нет загруженных изображений</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images?.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={cn("relative rounded-lg border", {
                          "border-gray-700": isDarkMode,
                          "border-gray-200": !isDarkMode,
                        })}
                      >
                        <img
                          src={`${STATIC_URL}${imageUrl}`}
                          alt={`Uploaded ${index}`}
                          crossOrigin="anonymous"
                          className="h-full w-full object-cover"
                        />
                        <Button
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleDeleteImage(imageUrl)}
                          disabled={deleteImageMutation.isPending}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </m.div>
          </div>

          {/* Колонка олимпиад */}
          <div className="flex-1">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <h3
                className={cn("text-center text-3xl font-bold", {
                  "text-white": isDarkMode,
                  "text-gray-900": !isDarkMode,
                })}
              >
                Управление олимпиадами
              </h3>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Создание олимпиады
                </h4>

                <form onSubmit={handleOlympiadSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block font-medium">Название</label>
                    <input
                      type="text"
                      name="name"
                      value={olympiadFormData.name}
                      onChange={handleOlympiadInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">
                      Дата проведения
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={olympiadFormData.date}
                      onChange={handleOlympiadInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">Описание</label>
                    <textarea
                      name="description"
                      value={olympiadFormData.description}
                      onChange={handleOlympiadInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={createOlympiadMutation.isPending}
                      className="w-full"
                    >
                      {createOlympiadMutation.isPending
                        ? "Создание..."
                        : "Создать олимпиаду"}
                    </Button>
                  </div>
                </form>
              </div>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Список олимпиад
                </h4>
                {isOlympiadsLoading ? (
                  <p className="text-center">Загрузка...</p>
                ) : olympiadsError ? (
                  <p className="text-center text-red-500">
                    Ошибка: {olympiadsError.message}
                  </p>
                ) : olympiads?.length === 0 ? (
                  <p className="text-center">Нет олимпиад</p>
                ) : (
                  <div className="space-y-4">
                    {olympiads?.map((olympiad) => (
                      <div
                        key={olympiad.id}
                        className={cn("rounded-lg border p-4", {
                          "border-gray-700": isDarkMode,
                          "border-gray-200": !isDarkMode,
                        })}
                      >
                        <h5 className="mb-2 text-lg font-bold">
                          {olympiad.name}
                        </h5>
                        <p className="mb-2 text-sm text-gray-500">
                          Дата:{" "}
                          {new Date(olympiad.date).toLocaleDateString("ru-RU")}
                        </p>
                        <p className="mb-3">{olympiad.description}</p>
                        <div>
                          <Button
                            size="sm"
                            onClick={() =>
                              deleteOlympiadMutation.mutate(olympiad.name)
                            }
                            disabled={deleteOlympiadMutation.isPending}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            {deleteOlympiadMutation.isPending
                              ? "Удаление..."
                              : "Удалить"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </m.div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button className="px-7 py-3">Вернуться на главную</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;

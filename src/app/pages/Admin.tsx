import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";
import Footer from "../components/layout/Footer/Footer";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  images: string[];
}

const Admin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: " ",
    images: [] as string[],
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Получение списка новостей
  const {
    data: news,
    isLoading,
    error,
  } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/news-service/news`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  // Создание новости
  const createMutation = useMutation({
    mutationFn: (newNews: Omit<NewsItem, "id">) =>
      axios.post(`${API_URL}/news-service/news`, newNews, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setFormData({ title: "", description: "", content: " ", images: [] });
    },
  });

  // Обновление новости
  const updateMutation = useMutation({
    mutationFn: (updatedNews: NewsItem) =>
      axios.put(
        `${API_URL}/news-service/news/${updatedNews.id}`,
        {
          title: updatedNews.title,
          description: updatedNews.description,
          content: " ",
          images: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setEditingId(null);
      setFormData({ title: "", description: "", content: " ", images: [] });
    },
  });

  // Удаление новости
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${API_URL}/news-service/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newsData = {
      title: formData.title,
      description: formData.description,
      content: " ",
      images: [],
    };

    if (editingId !== null) {
      updateMutation.mutate({ ...newsData, id: editingId });
    } else {
      createMutation.mutate(newsData);
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingId(newsItem.id);
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      content: " ",
      images: [],
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", content: " ", images: [] });
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки новостей: {error.message}</div>;

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50/20 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-10xl mx-auto max-w-4xl">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2
              className={cn("text-center text-4xl font-bold md:text-5xl", {
                "text-white": isDarkMode,
                "text-gray-900": !isDarkMode,
              })}
            >
              Управление новостями
            </h2>

            <div
              className={cn("rounded-2xl p-8", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md": !isDarkMode,
              })}
            >
              <h3 className="mb-6 text-center text-2xl font-semibold">
                {editingId !== null
                  ? "Редактирование новости"
                  : "Создание новости"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block font-medium">Заголовок</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
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
                    value={formData.description}
                    onChange={handleInputChange}
                    className={cn("w-full rounded border p-2", {
                      "border-gray-700 bg-gray-800": isDarkMode,
                      "border-gray-300 bg-white": !isDarkMode,
                    })}
                    rows={3}
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-2">
                  <Button
                    type="submit"
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  >
                    {editingId !== null ? "Обновить" : "Создать"}
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <span className="ml-2">...</span>
                    )}
                  </Button>
                  {editingId !== null && (
                    <Button type="button" onClick={handleCancel}>
                      Отмена
                    </Button>
                  )}
                </div>
                {(createMutation.isError || updateMutation.isError) && (
                  <div className="text-red-500">
                    Ошибка:{" "}
                    {createMutation.error?.message ||
                      updateMutation.error?.message}
                  </div>
                )}
              </form>
            </div>

            <div
              className={cn("rounded-2xl p-8", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md": !isDarkMode,
              })}
            >
              <h3 className="mb-6 text-center text-2xl font-semibold">
                Список новостей
              </h3>

              {news?.length === 0 ? (
                <p className="text-center">Новостей нет</p>
              ) : (
                <div className="space-y-6">
                  {news?.map((item) => (
                    <div
                      key={item.id}
                      className={cn("rounded-lg border p-4", {
                        "border-gray-700": isDarkMode,
                        "border-gray-200": !isDarkMode,
                      })}
                    >
                      <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
                      <p className="mb-4">{item.description}</p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(item)}
                          disabled={updateMutation.isPending}
                        >
                          Редактировать
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => deleteMutation.mutate(item.id)}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? "Удаление..." : "Удалить"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Link to="/">
                <Button className="px-7 py-3">Вернуться на главную</Button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;

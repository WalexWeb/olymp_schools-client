// interface IQualifResults {
//   id: number;
//   lastName: string;
//   firstName: string;
//   middleName: string;
//   region: string;
//   grade: number | string;
//   score: number;
//   status?: string;
//   details?: string;
// }

interface IRankings {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  region: string;
  grade?: number | string | null;
  score: number | null;
  status:
    | "Победитель"
    | "Призер II степени"
    | "Призер III степени"
    | "Участник";
  details: string;
  discipline?: "society" | "infoSec";
}

export const rankings2023: IRankings[] = [
  {
    id: 6,
    lastName: "Черноглазов",
    firstName: "Илья",
    middleName: "Александрович",
    region: "Владимирская область",
    grade: 10,
    score: null,
    status: "Победитель",
    details: "/public/Chernoglazov.pdf",
  },
  {
    id: 7,
    lastName: "Журавкин",
    firstName: "Даниил",
    middleName: "Сергеевич",
    region: "Донецкая Народная Республика",
    grade: 11,
    score: null,
    status: "Призер II степени",
    details: "/public/Zhuravkin.pdf",
  },
  {
    id: 8,
    lastName: "Александрова",
    firstName: "Евгения",
    middleName: "Юрьевна",
    region: "Москва",
    grade: 10,
    score: null,
    status: "Призер II степени",
    details: "/public/Aleksandrova.pdf",
  },
  {
    id: 9,
    lastName: "Щукин",
    firstName: "Алексей",
    middleName: "Александрович",
    region: "Москва",
    grade: null,
    score: null,
    status: "Призер III степени",
    details: "/public/Shchukin.pdf",
  },
  {
    id: 10,
    lastName: "Пахневский",
    firstName: "Гордей",
    middleName: "Михайлович",
    region: "Новосибирская область",
    grade: null,
    score: null,
    status: "Призер III степени",
    details: "/public/Pakhnevskiy.pdf",
  },
];

export const rankings2024: IRankings[] = [
  {
    id: 1,
    lastName: "Мурзин",
    firstName: "Дмитрий",
    middleName: "Константинович",
    region: "Санкт-Петербург",
    grade: 11,
    score: 463,
    status: "Победитель",
    details:
      "https://mvd.ru/upload/site116/folder_page/047/644/342/Murzin_D.K.pdf",
  },
  {
    id: 2,
    lastName: "Пахневский",
    firstName: "Гордей",
    middleName: "Михайлович",
    region: "Новосибирская область",
    grade: 2,
    score: 423,
    status: "Призер II степени",
    details:
      "https://mvd.ru/upload/site116/folder_page/047/644/342/Pakhnevskiy_G.M.pdf",
  },
  {
    id: 3,
    lastName: "Чечеткин",
    firstName: "Алексей",
    middleName: "Викторович",
    grade: "11 класс",
    region: "Санкт-Петербург",
    score: 416,
    status: "Призер II степени",
    details:
      "https://mvd.ru/upload/site116/folder_page/047/644/342/Chechetkin_A.V.pdf",
  },
  {
    id: 4,
    lastName: "Зайцева",
    firstName: "Снежана",
    middleName: "Александровна",
    grade: "11 класс",
    region: "Кемеровская область",
    score: 414,
    status: "Призер III степени",
    details:
      "https://mvd.ru/upload/site116/folder_page/047/644/342/Zaytseva_S.A.pdf",
  },
  {
    id: 5,
    lastName: "Черкасов",
    firstName: "Артём",
    middleName: "Александрович",
    grade: "11 класс",
    region: "Астраханская область",
    score: 411,
    status: "Призер III степени",
    details:
      "https://mvd.ru/upload/site116/folder_page/047/644/342/Cherkasov_A.A.pdf",
  },
];

export const rankings2026: IRankings[] = [
  {
    id: 1,
    lastName: "Андреянов",
    firstName: "Никита",
    middleName: "Сергеевич",
    region: "Новосибирская область",
    score: 463,
    status: "Победитель",
    details: "/public/Andreyanov_N.S.pdf", // уже локальный
    discipline: "infoSec",
  },
  {
    id: 2,
    lastName: "Невская",
    firstName: "София",
    middleName: "Станиславовна",
    region: "Орловская область",
    score: 416,
    status: "Призер II степени",
    details: "/public/Nevskaya_S.S.pdf", // исправлено
    discipline: "infoSec",
  },
  {
    id: 3,
    lastName: "Железнаяков",
    firstName: "Артём",
    middleName: "Евгеньевич",
    region: "Санкт-Петербург",
    score: 409,
    status: "Призер II степени",
    details: "/public/Zheleznyakov_A.E.pdf", // исправлено
    discipline: "infoSec",
  },
  {
    id: 4,
    lastName: "Баширов",
    firstName: "Эрик",
    middleName: "Рустамович",
    region: "Санкт-Петербург",
    score: 408,
    status: "Призер III степени",
    details: "/public/Bashirov_E.R.pdf", // исправлено
    discipline: "infoSec",
  },
  {
    id: 5,
    lastName: "Волынцев",
    firstName: "Антон",
    middleName: "Александрович",
    region: "Москва",
    score: 407,
    status: "Призер III степени",
    details: "/public/Volyntsev_A.A.pdf", // исправлено
    discipline: "infoSec",
  },
  {
    id: 8,
    lastName: "Малина",
    firstName: "Виктория",
    middleName: "Андреевна",
    region: "Воронежская область",
    score: 461,
    status: "Призер II степени",
    details: "/public/Malina_V.A.pdf",
    discipline: "society",
  },
  {
    id: 9,
    lastName: "Ерёмин",
    firstName: "Николай",
    middleName: "Алексеевич",
    region: "Санкт-Петербург",
    score: 448,
    status: "Призер III степени",
    details: "/public/Eremin_N.A.pdf",
    discipline: "society",
  },
  {
    id: 10,
    lastName: "Коробейникова",
    firstName: "Анастасия",
    middleName: "Максимовна",
    region: "Московская область",
    score: 442,
    status: "Победитель",
    details: "/public/Korobeynikova_A.M.pdf",
    discipline: "society",
  },
  {
    id: 11,
    lastName: "Коршунова",
    firstName: "Анастасия",
    middleName: "Сергеевна",
    region: "Ульяновская область",
    score: 438,
    status: "Призер II степени",
    details: "/public/Korshunova_A.S.pdf",
    discipline: "society",
  },
  {
    id: 12,
    lastName: "Травкина",
    firstName: "Ульяна",
    middleName: "Михайловна",
    region: "Владимирская область",
    score: 435,
    status: "Призер III степени",
    details: "/public/Travkina_U.M.pdf",
    discipline: "society",
  },
];

// Список регионов России
export const regions = [
  "Республика Адыгея (Адыгея)",
  "Республика Алтай",
  "Республика Башкортостан",
  "Республика Бурятия",
  "Республика Дагестан",
  "Донецкая Народная Республика",
  "Республика Ингушетия",
  "Кабардино-Балкарская Республика",
  "Республика Калмыкия",
  "Карачаево-Черкесская Республика",
  "Республика Карелия",
  "Республика Коми",
  "Республика Крым",
  "Луганская Народная Республика",
  "Республика Марий Эл",
  "Республика Мордовия",
  "Республика Саха (Якутия)",
  "Республика Северная Осетия - Алания",
  "Республика Татарстан (Татарстан)",
  "Республика Тыва",
  "Удмуртская Республика",
  "Республика Хакасия",
  "Чеченская Республика",
  "Чувашская Республика - Чувашия",
  "Алтайский край",
  "Забайкальский край",
  "Камчатский край",
  "Краснодарский край",
  "Красноярский край",
  "Пермский край",
  "Приморский край",
  "Ставропольский край",
  "Хабаровский край",
  "Амурская область",
  "Архангельская область",
  "Астраханская область",
  "Белгородская область",
  "Брянская область",
  "Владимирская область",
  "Волгоградская область",
  "Вологодская область",
  "Воронежская область",
  "Запорожская область",
  "Ивановская область",
  "Иркутская область",
  "Калининградская область",
  "Калужская область",
  "Кемеровская область - Кузбасс",
  "Кировская область",
  "Костромская область",
  "Курганская область",
  "Курская область",
  "Ленинградская область",
  "Липецкая область",
  "Магаданская область",
  "Московская область",
  "Мурманская область",
  "Нижегородская область",
  "Новгородская область",
  "Новосибирская область",
  "Омская область",
  "Оренбургская область",
  "Орловская область",
  "Пензенская область",
  "Псковская область",
  "Ростовская область",
  "Рязанская область",
  "Самарская область",
  "Саратовская область",
  "Сахалинская область",
  "Свердловская область",
  "Смоленская область",
  "Тамбовская область",
  "Тверская область",
  "Томская область",
  "Тульская область",
  "Тюменская область",
  "Ульяновская область",
  "Херсонская область",
  "Челябинская область",
  "Ярославская область",
  "Москва",
  "Санкт-Петербург",
  "Севастополь",
  "Еврейская автономная область",
  "Ненецкий автономный округ",
  "Ханты-Мансийский автономный округ - Югра",
  "Чукотский автономный округ",
  "Ямало-Ненецкий автономный округ",
];

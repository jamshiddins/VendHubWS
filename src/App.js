// App.js - hub Coffee & Drinks

import React, { useState, useEffect } from "react";
import "./styles.css";

// Иконки - простые эмодзи вместо lucide-react
const Icons = {
  Coffee: () => <span>☕</span>,
  Droplets: () => <span>💧</span>,
  Clock: () => <span>🕐</span>,
  Phone: () => <span>📞</span>,
  Mail: () => <span>✉️</span>,
  MapPin: () => <span>📍</span>,
  Menu: () => <span>☰</span>,
  X: () => <span>✖️</span>,
  Sun: () => <span>☀️</span>,
  Moon: () => <span>🌙</span>,
  Globe: () => <span>🌍</span>,
  TrendingUp: () => <span>📈</span>,
  Users: () => <span>👥</span>,
  Package: () => <span>📦</span>,
  Check: () => <span>✓</span>,
  Star: () => <span>⭐</span>,
  BarChart3: () => <span>📊</span>,
  Settings: () => <span>⚙️</span>,
  FileText: () => <span>📄</span>,
  Map: () => <span>🗺️</span>,
  MessageSquare: () => <span>💬</span>,
  LogOut: () => <span>🚪</span>,
  Camera: () => <span>📷</span>,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // По умолчанию темная тема
  const [language, setLanguage] = useState("ru");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [nearestLocation, setNearestLocation] = useState(null);
  const [selectedMachineType, setSelectedMachineType] = useState("all");

  // Состояния для локаций и геолокации
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState("prompt");

  // Данные сайта
  const [siteData, setSiteData] = useState({
    news: [
      {
        id: 1,
        title: {
          ru: "Новая локация в ТЦ Samarqand Darvoza",
          uz: "Samarqand Darvoza savdo markazida yangi joylashuv",
        },
        text: {
          ru: "Установлен новый кофейный автомат hub с расширенным меню",
          uz: "Kengaytirilgan menyuli yangi hub qahva avtomati o'rnatildi",
        },
        date: "2024-03-15",
        image: "☕",
      },
      {
        id: 2,
        title: {
          ru: "Запуск программы лояльности",
          uz: "Sodiqlik dasturi ishga tushirildi",
        },
        text: {
          ru: "Каждый 10-й кофе в подарок! Сканируйте QR-код на автомате",
          uz: "Har 10-qahva sovg'a! Avtomatdagi QR-kodni skanerlang",
        },
        date: "2024-03-10",
        image: "🎁",
      },
      {
        id: 3,
        title: {
          ru: "Обновление меню напитков",
          uz: "Ichimliklar menyusi yangilandi",
        },
        text: {
          ru: "Добавлены новые виды кофе и холодных напитков",
          uz: "Yangi qahva va sovuq ichimlik turlari qo'shildi",
        },
        date: "2024-03-05",
        image: "🥤",
      },
    ],
    machines: {
      coffee: {
        name: { ru: "hub Coffee Machine", uz: "hub Qahva Mashinasi" },
        description: {
          ru: "Современный кофейный автомат с большим сенсорным экраном. Готовит премиальный кофе из свежеобжаренных зерен за 30 секунд. Оснащен системой безналичной оплаты и камерой видеонаблюдения.",
          uz: "Katta sensorli ekranli zamonaviy qahva avtomati. 30 soniyada yangi qovurilgan donlardan premium qahva tayyorlaydi. Naqdsiz to'lov tizimi va videokuzatuv kamerasi bilan jihozlangan.",
        },
        specs: {
          screen: {
            ru: "Сенсорный экран высокого разрешения",
            uz: "Yuqori aniqlikdagi sensorli ekran",
          },
          size: { ru: "Компактный дизайн", uz: "Ixcham dizayn" },
          capacity: {
            ru: "500+ чашек без обслуживания",
            uz: "500+ piyola xizmatsiz",
          },
          payment: {
            ru: "Наличные, карты, QR, NFC",
            uz: "Naqd, karta, QR, NFC",
          },
        },
        products: [
          {
            id: "am150",
            name: { ru: "Американо", uz: "Amerikano" },
            price: 10000,
            description: {
              ru: "Классический черный кофе с насыщенным вкусом и ароматом",
              uz: "To'yingan ta'm va xushbo'yli klassik qora qahva",
            },
            icon: "☕",
          },
          {
            id: "cap",
            name: { ru: "Капучино", uz: "Kapuchino" },
            price: 15000,
            description: {
              ru: "Эспрессо с нежной молочной пенкой и бархатистым вкусом",
              uz: "Yumshoq sutli ko'pik va baxmal ta'mli espresso",
            },
            icon: "☕",
          },
          {
            id: "lat",
            name: { ru: "Латте", uz: "Latte" },
            price: 18000,
            description: {
              ru: "Мягкий кофейный напиток с большим количеством молока",
              uz: "Ko'p sutli yumshoq qahvali ichimlik",
            },
            icon: "☕",
          },
          {
            id: "esp",
            name: { ru: "Эспрессо", uz: "Espresso" },
            price: 8000,
            description: {
              ru: "Крепкий концентрированный кофе для истинных ценителей",
              uz: "Haqiqiy qadrlaydiganlar uchun kuchli konsentrlangan qahva",
            },
            icon: "☕",
          },
          {
            id: "choc",
            name: { ru: "Горячий шоколад", uz: "Issiq shokolad" },
            price: 20000,
            description: {
              ru: "Насыщенный шоколадный напиток с нежным вкусом",
              uz: "Mayin ta'mli to'yingan shokoladli ichimlik",
            },
            icon: "🍫",
          },
          {
            id: "tea",
            name: { ru: "Чай", uz: "Choy" },
            price: 8000,
            description: {
              ru: "Ароматный чай высшего качества",
              uz: "Oliy sifatli xushbo'y choy",
            },
            icon: "🍵",
          },
        ],
      },
      iceDrink: {
        name: {
          ru: "hub Ice Drink Machine",
          uz: "hub Sovuq Ichimlik Mashinasi",
        },
        description: {
          ru: "Инновационный автомат холодных напитков с 54 видами напитков. Идеально для жаркого климата. Оборудован системой охлаждения и поддержания оптимальной температуры.",
          uz: "54 xil ichimlikli innovatsion sovuq ichimlik avtomati. Issiq iqlim uchun ideal. Sovutish va optimal haroratni saqlash tizimi bilan jihozlangan.",
        },
        specs: {
          screen: {
            ru: '55" интерактивный дисплей',
            uz: '55" interaktiv displey',
          },
          size: { ru: "Увеличенная вместимость", uz: "Kengaytirilgan sig'im" },
          capacity: { ru: "54 вида напитков", uz: "54 xil ichimlik" },
          payment: { ru: "Все виды платежей", uz: "Barcha to'lov turlari" },
        },
        products: [
          {
            id: "smooth",
            name: { ru: "Фруктовые смузи", uz: "Mevali smuzi" },
            price: 25000,
            description: {
              ru: "Натуральные смузи из свежих фруктов и ягод",
              uz: "Yangi meva va rezavorlardan tabiiy smuzi",
            },
            icon: "🥤",
          },
          {
            id: "icecof",
            name: { ru: "Айс кофе", uz: "Ays qahva" },
            price: 18000,
            description: {
              ru: "Освежающий холодный кофе со льдом",
              uz: "Muzli tetiklantiruvchi sovuq qahva",
            },
            icon: "🧊",
          },
          {
            id: "icetea",
            name: { ru: "Холодный чай", uz: "Sovuq choy" },
            price: 12000,
            description: {
              ru: "Охлажденный чай с различными вкусами",
              uz: "Turli ta'mli sovutilgan choy",
            },
            icon: "🧃",
          },
          {
            id: "lemon",
            name: { ru: "Лимонады", uz: "Limonadlar" },
            price: 15000,
            description: {
              ru: "Натуральные лимонады с фруктовыми вкусами",
              uz: "Mevali ta'mli tabiiy limonadlar",
            },
            icon: "🍋",
          },
          {
            id: "energy",
            name: { ru: "Энергетики", uz: "Energetiklar" },
            price: 20000,
            description: {
              ru: "Энергетические напитки для активного образа жизни",
              uz: "Faol hayot tarzi uchun energetik ichimliklar",
            },
            icon: "⚡",
          },
          {
            id: "juice",
            name: { ru: "Соки", uz: "Sharbatlar" },
            price: 15000,
            description: {
              ru: "100% натуральные соки без сахара",
              uz: "Shakarsiz 100% tabiiy sharbatlar",
            },
            icon: "🧃",
          },
        ],
      },
    },
    locations: [
      {
        id: 1,
        name: "ТЦ Samarqand Darvoza",
        address: { ru: "ул. Коратош, 5А", uz: "Koratosh ko'chasi, 5A" },
        type: "coffee",
        distance: null,
        coordinates: { lat: 41.2995, lng: 69.2401 },
        workingHours: "08:00 - 22:00",
        status: "working",
      },
      {
        id: 2,
        name: "Tashkent City Mall",
        address: {
          ru: "ул. Ислама Каримова, 22",
          uz: "Islom Karimov ko'chasi, 22",
        },
        type: "both",
        distance: null,
        coordinates: { lat: 41.3111, lng: 69.2797 },
        workingHours: "10:00 - 23:00",
        status: "working",
      },
      {
        id: 3,
        name: "Magic City Park",
        address: { ru: "ул. Бобур, 174/2", uz: "Bobur ko'chasi, 174/2" },
        type: "iceDrink",
        distance: null,
        coordinates: { lat: 41.3056, lng: 69.2869 },
        workingHours: "09:00 - 22:00",
        status: "working",
      },
      {
        id: 4,
        name: "IT Park",
        address: { ru: "ул. Мурабек, 5", uz: "Murabek ko'chasi, 5" },
        type: "coffee",
        distance: null,
        coordinates: { lat: 41.3736, lng: 69.2881 },
        workingHours: "24/7",
        status: "working",
      },
      {
        id: 5,
        name: "Compass Mall",
        address: { ru: "ул. Катартал, 60", uz: "Katartal ko'chasi, 60" },
        type: "both",
        distance: null,
        coordinates: { lat: 41.2856, lng: 69.2034 },
        workingHours: "09:00 - 21:00",
        status: "working",
      },
    ],
    promotions: [
      {
        id: 1,
        title: { ru: "Happy Hours", uz: "Baxtli soatlar" },
        description: {
          ru: "-20% на весь кофе с 7:00 до 9:00",
          uz: "7:00 dan 9:00 gacha barcha qahvaga -20%",
        },
        active: true,
      },
      {
        id: 2,
        title: { ru: "Программа лояльности", uz: "Sodiqlik dasturi" },
        description: {
          ru: "Каждый 10-й напиток бесплатно",
          uz: "Har 10-ichimlik bepul",
        },
        active: true,
      },
    ],
    contacts: {
      phone: "+998 90 123 45 67",
      email: "info@hubcoffee.uz",
      address: {
        ru: "г. Ташкент, ул. Амир Темур, 100",
        uz: "Toshkent sh., Amir Temur ko'chasi, 100",
      },
      workHours: { ru: "Пн-Пт: 9:00 - 18:00", uz: "Dush-Jum: 9:00 - 18:00" },
    },
    texts: {
      heroTitle: {
        ru: "hub. Кофе и напитки 24/7",
        uz: "hub. Qahva va ichimliklar 24/7",
      },
      heroSubtitle: {
        ru: "Премиальный кофе из автоматов нового поколения",
        uz: "Yangi avlod avtomatlaridan premium qahva",
      },
    },
  });

  const t = (obj) => obj[language] || obj.ru || obj;

  // Навигация
  const navigation = [
    { id: "home", name: { ru: "Главная", uz: "Bosh sahifa" } },
    { id: "machines", name: { ru: "Автоматы", uz: "Avtomatlar" } },
    { id: "locations", name: { ru: "Локации", uz: "Joylashuvlar" } },
    { id: "partnership", name: { ru: "Партнерство", uz: "Hamkorlik" } },
    { id: "contacts", name: { ru: "Контакты", uz: "Kontaktlar" } },
  ];

  // Главная страница
  const HomePage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <section className="hero">
        <div className="hero-content">
          <h1>{t(siteData.texts.heroTitle)}</h1>
          <p>{t(siteData.texts.heroSubtitle)}</p>
          <div className="hero-buttons">
            <button
              onClick={() => {
                const randomLoc =
                  siteData.locations[
                    Math.floor(Math.random() * siteData.locations.length)
                  ];
                const distance = (Math.random() * 2 + 0.5).toFixed(1);
                alert(
                  language === "ru"
                    ? `Ближайший автомат:\n${randomLoc.name}\n${t(
                        randomLoc.address
                      )}\nРасстояние: ${distance} км`
                    : `Eng yaqin avtomat:\n${randomLoc.name}\n${t(
                        randomLoc.address
                      )}\nMasofa: ${distance} km`
                );
              }}
              className="btn-primary"
            >
              <Icons.MapPin />{" "}
              {language === "ru" ? "Найти автомат" : "Avtomat topish"}
            </button>
            <button
              onClick={() => setCurrentPage("machines")}
              className="btn-secondary"
            >
              {language === "ru" ? "Меню напитков" : "Ichimliklar menyusi"}
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="machine-mockup">
            <div className="machine-screen">
              <div className="hub-logo-container">
                <span className="hub-logo">hub</span>
                <span className="hub-divider"></span>
              </div>
              <div className="coffee-drinks">COFFEE \ DRINKS</div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <Icons.Coffee />
          <h3>15+</h3>
          <p>{language === "ru" ? "Автоматов" : "Avtomatlar"}</p>
        </div>
        <div className="stat">
          <Icons.Clock />
          <h3>24/7</h3>
          <p>{language === "ru" ? "Работаем" : "Ishlaymiz"}</p>
        </div>
        <div className="stat">
          <Icons.Package />
          <h3>50+</h3>
          <p>{language === "ru" ? "Видов напитков" : "Ichimlik turlari"}</p>
        </div>
        <div className="stat">
          <Icons.Camera />
          <h3>100%</h3>
          <p>{language === "ru" ? "Безопасность" : "Xavfsizlik"}</p>
        </div>
      </section>

      <section className="promotions">
        <h2>
          {language === "ru" ? "Акции и предложения" : "Aksiya va takliflar"}
        </h2>
        <div className="promo-grid">
          {siteData.promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              <h3>{t(promo.title)}</h3>
              <p>{t(promo.description)}</p>
              <span className="promo-badge">
                {language === "ru" ? "Активно" : "Faol"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="news">
        <h2>{language === "ru" ? "Новости" : "Yangiliklar"}</h2>
        <div className="news-grid">
          {siteData.news.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-image">{item.image}</div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
              <small>{item.date}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // Страница автоматов
  const MachinesPage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <h1>{language === "ru" ? "Наши автоматы" : "Bizning avtomatlar"}</h1>

      <div className="machine-card">
        <div className="machine-header">
          <div className="machine-icon">☕</div>
          <h2>{t(siteData.machines.coffee.name)}</h2>
        </div>
        <p className="machine-description">
          {t(siteData.machines.coffee.description)}
        </p>

        <div className="machine-specs">
          <div className="spec">
            <span className="spec-icon">📺</span>
            <span>{t(siteData.machines.coffee.specs.screen)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">📏</span>
            <span>{t(siteData.machines.coffee.specs.size)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">☕</span>
            <span>{t(siteData.machines.coffee.specs.capacity)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">💳</span>
            <span>{t(siteData.machines.coffee.specs.payment)}</span>
          </div>
        </div>

        <h3>{language === "ru" ? "Меню и цены:" : "Menyu va narxlar:"}</h3>
        <div className="products">
          {siteData.machines.coffee.products.map((product) => (
            <div key={product.id} className="product-with-desc">
              <div className="product-icon">{product.icon}</div>
              <div className="product-content">
                <div className="product-header">
                  <span className="product-name">{t(product.name)}</span>
                  <span className="price">
                    {product.price.toLocaleString()}{" "}
                    {language === "ru" ? "сум" : "so'm"}
                  </span>
                </div>
                <p className="product-desc">{t(product.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="machine-card">
        <div className="machine-header">
          <div className="machine-icon">🥤</div>
          <h2>{t(siteData.machines.iceDrink.name)}</h2>
        </div>
        <p className="machine-description">
          {t(siteData.machines.iceDrink.description)}
        </p>

        <div className="machine-specs">
          <div className="spec">
            <span className="spec-icon">📺</span>
            <span>{t(siteData.machines.iceDrink.specs.screen)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">📏</span>
            <span>{t(siteData.machines.iceDrink.specs.size)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">🥤</span>
            <span>{t(siteData.machines.iceDrink.specs.capacity)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">💳</span>
            <span>{t(siteData.machines.iceDrink.specs.payment)}</span>
          </div>
        </div>

        <h3>
          {language === "ru" ? "Популярные напитки:" : "Mashhur ichimliklar:"}
        </h3>
        <div className="products">
          {siteData.machines.iceDrink.products.map((product) => (
            <div key={product.id} className="product-with-desc">
              <div className="product-icon">{product.icon}</div>
              <div className="product-content">
                <div className="product-header">
                  <span className="product-name">{t(product.name)}</span>
                  <span className="price">
                    {product.price.toLocaleString()}{" "}
                    {language === "ru" ? "сум" : "so'm"}
                  </span>
                </div>
                <p className="product-desc">{t(product.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Страница локаций
  const LocationsPage = () => {
    const [showMenu, setShowMenu] = useState(null);
    const [sortedLocations, setSortedLocations] = useState(siteData.locations);
    const [isSearching, setIsSearching] = useState(false);
    const [filterType, setFilterType] = useState("all");

    // Функция расчета расстояния между координатами
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Радиус Земли в км
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Определение ближайших автоматов с имитацией геолокации
    const findNearestLocations = () => {
      setIsSearching(true);

      // Имитация получения геолокации (центр Ташкента)
      setTimeout(() => {
        const userLat = 41.3111 + (Math.random() - 0.5) * 0.1;
        const userLng = 69.2797 + (Math.random() - 0.5) * 0.1;

        const locationsWithDistance = siteData.locations.map((loc) => ({
          ...loc,
          distance: calculateDistance(
            userLat,
            userLng,
            loc.coordinates.lat,
            loc.coordinates.lng
          ).toFixed(1),
        }));

        const sorted = [...locationsWithDistance].sort(
          (a, b) => a.distance - b.distance
        );
        setSortedLocations(sorted);
        setIsSearching(false);

        // Показать уведомление о ближайшем автомате
        const nearest = sorted[0];
        alert(
          language === "ru"
            ? `Ближайший автомат всего в ${nearest.distance} км от вас!\n${nearest.name}`
            : `Eng yaqin avtomat atigi ${nearest.distance} km uzoqlikda!\n${nearest.name}`
        );
      }, 1500);
    };

    // Фильтрация по типу автомата
    const filteredLocations = sortedLocations.filter((loc) => {
      if (filterType === "all") return true;
      return loc.type === filterType || loc.type === "both";
    });

    // Модальное окно с детальным меню
    const MenuModal = ({ location, onClose }) => {
      if (!location) return null;

      const availableMachines = [];
      if (location.type === "coffee" || location.type === "both") {
        availableMachines.push("coffee");
      }
      if (location.type === "iceDrink" || location.type === "both") {
        availableMachines.push("iceDrink");
      }

      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{location.name}</h2>
                <p className="location-subtitle">
                  <Icons.MapPin /> {t(location.address)}
                  {location.distance && (
                    <span>
                      {" "}
                      • {location.distance} {language === "ru" ? "км" : "km"}
                    </span>
                  )}
                </p>
              </div>
              <button onClick={onClose} className="close-btn">
                ✖️
              </button>
            </div>

            <div className="modal-body">
              <div className="location-details">
                <div className="detail-item">
                  <Icons.Clock />
                  <span>
                    {language === "ru" ? "Время работы:" : "Ish vaqti:"}{" "}
                    {location.workingHours}
                  </span>
                </div>
                <div className="detail-item">
                  <span className={`status ${location.status}`}>
                    {location.status === "working"
                      ? language === "ru"
                        ? "🟢 Работает"
                        : "🟢 Ishlayapti"
                      : language === "ru"
                      ? "🔧 Обслуживание"
                      : "🔧 Xizmat ko'rsatish"}
                  </span>
                </div>
              </div>

              {availableMachines.map((machineType) => (
                <div key={machineType} className="machine-menu">
                  <div className="machine-menu-header">
                    <h3>
                      {machineType === "coffee" ? "☕ " : "🥤 "}
                      {t(siteData.machines[machineType].name)}
                    </h3>
                    <span className="product-count">
                      {siteData.machines[machineType].products.length}{" "}
                      {language === "ru" ? "напитков" : "ichimlik"}
                    </span>
                  </div>
                  <div className="menu-products">
                    {siteData.machines[machineType].products.map((product) => (
                      <div key={product.id} className="menu-item">
                        <div className="menu-item-icon">{product.icon}</div>
                        <div className="menu-item-content">
                          <div className="menu-item-header">
                            <span className="menu-item-name">
                              {t(product.name)}
                            </span>
                            <span className="menu-item-price">
                              {product.price.toLocaleString()}{" "}
                              {language === "ru" ? "сум" : "so'm"}
                            </span>
                          </div>
                          <p className="menu-item-desc">
                            {t(product.description)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="modal-footer">
                <p className="payment-info">
                  💳{" "}
                  {language === "ru"
                    ? "Принимаем: наличные, карты, QR-платежи"
                    : "Qabul qilamiz: naqd, kartalar, QR-to'lovlar"}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className={`page ${isDarkMode ? "dark" : ""}`}>
        <h1>{language === "ru" ? "Наши локации" : "Bizning joylashuvlar"}</h1>

        <div className="location-controls">
          <button
            onClick={findNearestLocations}
            className="btn-primary find-nearest"
            disabled={isSearching}
          >
            <Icons.MapPin />
            {isSearching
              ? language === "ru"
                ? "📍 Определяем местоположение..."
                : "📍 Joylashuvni aniqlamoqda..."
              : language === "ru"
              ? "Найти ближайшие автоматы"
              : "Eng yaqin avtomatlarni topish"}
          </button>

          <div className="filter-buttons">
            <button
              onClick={() => setFilterType("all")}
              className={`filter-btn ${filterType === "all" ? "active" : ""}`}
            >
              {language === "ru" ? "Все" : "Hammasi"}
            </button>
            <button
              onClick={() => setFilterType("coffee")}
              className={`filter-btn ${
                filterType === "coffee" ? "active" : ""
              }`}
            >
              ☕ {language === "ru" ? "Кофе" : "Qahva"}
            </button>
            <button
              onClick={() => setFilterType("iceDrink")}
              className={`filter-btn ${
                filterType === "iceDrink" ? "active" : ""
              }`}
            >
              🥤 Ice Drink
            </button>
          </div>
        </div>

        <div className="locations-grid">
          {filteredLocations.map((location, index) => (
            <div
              key={location.id}
              className={`location-card ${
                location.status === "maintenance" ? "maintenance" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="location-status">
                {location.status === "working" ? "🟢" : "🔧"}
              </div>

              <div className="location-info">
                <h3>{location.name}</h3>
                <p className="address">
                  <Icons.MapPin /> {t(location.address)}
                </p>
                <p className="hours">
                  <Icons.Clock /> {location.workingHours}
                </p>

                {location.distance && (
                  <div className="distance-badge">
                    <span className="distance-number">{location.distance}</span>
                    <span className="distance-unit">
                      {language === "ru" ? "км" : "km"}
                    </span>
                  </div>
                )}

                <div className="location-types">
                  {(location.type === "coffee" || location.type === "both") && (
                    <span className="type-badge coffee">
                      ☕ {language === "ru" ? "Кофе" : "Qahva"}
                    </span>
                  )}
                  {(location.type === "iceDrink" ||
                    location.type === "both") && (
                    <span className="type-badge ice">🥤 Ice Drink</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => showLocationMenu(location)}
                className="view-menu-btn"
                disabled={location.status === "maintenance"}
              >
                {location.status === "maintenance"
                  ? language === "ru"
                    ? "Временно недоступен"
                    : "Vaqtincha mavjud emas"
                  : language === "ru"
                  ? "Посмотреть меню"
                  : "Menyuni ko'rish"}
              </button>
            </div>
          ))}
        </div>

        {showMenu && (
          <MenuModal location={showMenu} onClose={() => setShowMenu(null)} />
        )}
      </div>
    );
  };

  // Страница партнерства
  const PartnershipPage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <h1>{language === "ru" ? "Партнерство" : "Hamkorlik"}</h1>

      <div className="partnership-grid">
        {/* Для инвесторов */}
        <div className="partnership-card">
          <div className="partnership-icon">
            <Icons.TrendingUp />
          </div>
          <h2>{language === "ru" ? "Инвесторам" : "Investorlar uchun"}</h2>
          <p className="partnership-desc">
            {language === "ru"
              ? "Инвестируйте в перспективный бизнес вендинговых автоматов"
              : "Istiqbolli vending avtomatlari biznesiga sarmoya kiriting"}
          </p>

          <div className="partnership-features">
            <div className="feature">
              <h3>
                {language === "ru"
                  ? "Минимальные инвестиции"
                  : "Minimal investitsiya"}
              </h3>
              <p className="feature-value">
                100,000,000 {language === "ru" ? "сум" : "so'm"}
              </p>
            </div>
            <div className="feature">
              <h3>{language === "ru" ? "Доходность" : "Daromadlilik"}</h3>
              <p className="feature-value">
                70% {language === "ru" ? "от прибыли" : "foydadan"}
              </p>
            </div>
            <div className="feature">
              <h3>{language === "ru" ? "Окупаемость" : "Qoplash muddati"}</h3>
              <p className="feature-value">
                12-18 {language === "ru" ? "месяцев" : "oy"}
              </p>
            </div>
          </div>

          <button className="btn-primary">
            {language === "ru" ? "Стать инвестором" : "Investor bo'lish"}
          </button>
        </div>

        {/* Для поставщиков */}
        <div className="partnership-card">
          <div className="partnership-icon">
            <Icons.Package />
          </div>
          <h2>
            {language === "ru" ? "Поставщикам" : "Yetkazib beruvchilar uchun"}
          </h2>
          <p className="partnership-desc">
            {language === "ru"
              ? "Станьте поставщиком качественных продуктов для наших автоматов"
              : "Avtomatlarimiz uchun sifatli mahsulot yetkazib beruvchi bo'ling"}
          </p>

          <div className="partnership-requirements">
            <h3>{language === "ru" ? "Требования:" : "Talablar:"}</h3>
            <ul>
              <li>
                <Icons.Check />
                {language === "ru"
                  ? "Сертифицированная продукция"
                  : "Sertifikatlangan mahsulot"}
              </li>
              <li>
                <Icons.Check />
                {language === "ru"
                  ? "Регулярные поставки"
                  : "Muntazam yetkazib berish"}
              </li>
              <li>
                <Icons.Check />
                {language === "ru"
                  ? "Конкурентные цены"
                  : "Raqobatbardosh narxlar"}
              </li>
              <li>
                <Icons.Check />
                {language === "ru"
                  ? "Гибкие условия оплаты"
                  : "Moslashuvchan to'lov shartlari"}
              </li>
            </ul>
          </div>

          <button className="btn-primary">
            {language === "ru"
              ? "Стать поставщиком"
              : "Yetkazib beruvchi bo'lish"}
          </button>
        </div>
      </div>

      {/* Форма заявки */}
      <div className="partnership-form">
        <h2>{language === "ru" ? "Оставить заявку" : "Ariza qoldirish"}</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder={language === "ru" ? "Ваше имя" : "Ismingiz"}
          />
          <input
            type="tel"
            placeholder={language === "ru" ? "Телефон" : "Telefon"}
          />
          <select>
            <option>
              {language === "ru" ? "Я инвестор" : "Men investorman"}
            </option>
            <option>
              {language === "ru" ? "Я поставщик" : "Men yetkazib beruvchiman"}
            </option>
          </select>
          <input type="email" placeholder="Email" />
        </div>
        <textarea
          placeholder={language === "ru" ? "Сообщение" : "Xabar"}
          rows="4"
        ></textarea>
        <button
          className="btn-primary"
          onClick={() =>
            alert(language === "ru" ? "Заявка отправлена!" : "Ariza yuborildi!")
          }
        >
          {language === "ru" ? "Отправить заявку" : "Ariza yuborish"}
        </button>
      </div>
    </div>
  );

  // Страница контактов
  const ContactsPage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <h1>{language === "ru" ? "Контакты" : "Kontaktlar"}</h1>

      <div className="contacts-content">
        <div className="contact-info">
          <h2>
            {language === "ru" ? "Свяжитесь с нами" : "Biz bilan bog'laning"}
          </h2>

          <div className="contact-item">
            <Icons.Phone />
            <div>
              <p>{language === "ru" ? "Телефон:" : "Telefon:"}</p>
              <a href={`tel:${siteData.contacts.phone}`}>
                {siteData.contacts.phone}
              </a>
            </div>
          </div>

          <div className="contact-item">
            <Icons.Mail />
            <div>
              <p>Email:</p>
              <a href={`mailto:${siteData.contacts.email}`}>
                {siteData.contacts.email}
              </a>
            </div>
          </div>

          <div className="contact-item">
            <Icons.MapPin />
            <div>
              <p>{language === "ru" ? "Адрес офиса:" : "Ofis manzili:"}</p>
              <p>{t(siteData.contacts.address)}</p>
            </div>
          </div>

          <div className="contact-item">
            <Icons.Clock />
            <div>
              <p>{language === "ru" ? "Режим работы:" : "Ish vaqti:"}</p>
              <p>{t(siteData.contacts.workHours)}</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>{language === "ru" ? "Напишите нам" : "Bizga yozing"}</h2>
          <input
            type="text"
            placeholder={language === "ru" ? "Ваше имя" : "Ismingiz"}
          />
          <input type="email" placeholder="Email" />
          <input
            type="tel"
            placeholder={language === "ru" ? "Телефон" : "Telefon"}
          />
          <textarea
            placeholder={language === "ru" ? "Сообщение" : "Xabar"}
            rows="4"
          ></textarea>
          <button
            onClick={() =>
              alert(
                language === "ru" ? "Сообщение отправлено!" : "Xabar yuborildi!"
              )
            }
            className="btn-primary"
          >
            {language === "ru" ? "Отправить" : "Yuborish"}
          </button>
        </div>
      </div>
    </div>
  );

  // Рендер страниц
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "machines":
        return <MachinesPage />;
      case "locations":
        return <LocationsPage />;
      case "partnership":
        return <PartnershipPage />;
      case "contacts":
        return <ContactsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Шапка */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => setCurrentPage("home")}>
            <div className="hub-logo-container">
              <span className="logo-text">hub</span>
              <span className="logo-divider"></span>
            </div>
          </div>

          <nav className="desktop-nav">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={currentPage === item.id ? "active" : ""}
              >
                {t(item.name)}
              </button>
            ))}
          </nav>

          <div className="header-controls">
            <button
              onClick={() => setLanguage(language === "ru" ? "uz" : "ru")}
              className="lang-btn"
            >
              <Icons.Globe /> {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="theme-btn"
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-btn"
            >
              {isMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <nav className="mobile-menu">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={currentPage === item.id ? "active" : ""}
              >
                {t(item.name)}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Основной контент */}
      <main className="main">{renderPage()}</main>

      {/* Подвал */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="hub-logo-container">
                <span className="logo-text">hub</span>
                <span className="logo-divider"></span>
              </div>
              <p>COFFEE \ DRINKS</p>
            </div>
            <p className="footer-desc">
              {language === "ru"
                ? "Премиальный кофе и напитки 24/7"
                : "Premium qahva va ichimliklar 24/7"}
            </p>
          </div>

          <div className="footer-section">
            <h4>{language === "ru" ? "Меню" : "Menyu"}</h4>
            <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <button onClick={() => setCurrentPage(item.id)}>
                    {t(item.name)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>{language === "ru" ? "Контакты" : "Kontaktlar"}</h4>
            <ul>
              <li>{siteData.contacts.phone}</li>
              <li>{siteData.contacts.email}</li>
              <li>{t(siteData.contacts.address)}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2024 hub.{" "}
            {language === "ru"
              ? "Все права защищены"
              : "Barcha huquqlar himoyalangan"}
          </p>
        </div>
      </footer>
    </div>
  );
}

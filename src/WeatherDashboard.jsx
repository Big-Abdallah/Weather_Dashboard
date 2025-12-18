import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Gauge,
  CloudSnow,
  Search,
  MapPin,
  Thermometer,
} from "lucide-react";

const WeatherDashboard = () => {
  const [city, setCity] = useState("Dekernes");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      // Using wttr.in - a free weather API that doesn't require API key
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(cityName)}?format=j1`
      );

      if (!response.ok) throw new Error("المدينة غير موجودة أو حدث خطأ");

      const data = await response.json();

      // Transform the data to match our needs
      const weatherData = {
        name: cityName,
        main: {
          temp: parseInt(data.current_condition[0].temp_C),
          feels_like: parseInt(data.current_condition[0].FeelsLikeC),
          temp_min: parseInt(data.weather[0].mintempC),
          temp_max: parseInt(data.weather[0].maxtempC),
          humidity: parseInt(data.current_condition[0].humidity),
          pressure: parseInt(data.current_condition[0].pressure),
        },
        weather: [
          {
            description:
              data.current_condition[0].lang_ar?.[0]?.value ||
              data.current_condition[0].weatherDesc[0].value,
            icon: getIconCode(data.current_condition[0].weatherCode),
          },
        ],
        wind: {
          speed: parseInt(data.current_condition[0].windspeedKmph) / 3.6, // Convert to m/s
        },
        visibility: parseInt(data.current_condition[0].visibility),
      };

      const forecastData = data.weather.slice(0, 5).map((day) => ({
        dt: new Date(day.date).getTime() / 1000,
        main: {
          temp: parseInt(day.avgtempC),
        },
        weather: [
          {
            description:
              day.hourly[4].lang_ar?.[0]?.value ||
              day.hourly[4].weatherDesc[0].value,
            icon: getIconCode(day.hourly[4].weatherCode),
          },
        ],
      }));

      setWeather(weatherData);
      setForecast(forecastData);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError("حدث خطأ في تحميل بيانات الطقس. جرب مدينة أخرى.");
      setLoading(false);
    }
  };

  const getIconCode = (code) => {
    // Weather codes from wttr.in
    if ([113].includes(parseInt(code))) return "01d"; // Clear
    if ([116, 119, 122].includes(parseInt(code))) return "02d"; // Partly cloudy
    if ([143, 248, 260].includes(parseInt(code))) return "50d"; // Fog
    if (
      [
        176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317,
        320, 323, 326, 329, 332, 335, 338, 350, 353, 356, 359, 362, 365, 368,
        371, 374, 377,
      ].includes(parseInt(code))
    )
      return "10d"; // Rain
    if (
      [
        179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350,
        368, 371, 374, 377, 392, 395,
      ].includes(parseInt(code))
    )
      return "13d"; // Snow
    return "03d"; // Default cloudy
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setCity(searchInput);
      fetchWeather(searchInput);
      setSearchInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getWeatherIcon = (iconCode) => {
    if (iconCode.includes("01"))
      return <Sun className="w-16 h-16 text-yellow-400" />;
    if (
      iconCode.includes("02") ||
      iconCode.includes("03") ||
      iconCode.includes("04")
    )
      return <Cloud className="w-16 h-16 text-gray-300" />;
    if (iconCode.includes("09") || iconCode.includes("10"))
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    if (iconCode.includes("13"))
      return <CloudSnow className="w-16 h-16 text-blue-200" />;
    if (iconCode.includes("50"))
      return <Cloud className="w-16 h-16 text-gray-400" />;
    return <Cloud className="w-16 h-16 text-gray-300" />;
  };

  const getDayName = (timestamp) => {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    return days[new Date(timestamp * 1000).getDay()];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-white text-2xl">جاري تحميل بيانات الطقس...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-white text-center max-w-md">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => {
              setSearchInput("Dekernes");
              fetchWeather("Dekernes");
            }}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
          العودة دكرنس
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 md:p-8"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ابحث عن مدينة... (مثال: London, Paris, Dubai)"
              className="w-full py-3 px-6 pr-12 rounded-full bg-white/30 backdrop-blur-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-6 h-6" />
              <h1 className="text-3xl md:text-4xl font-bold">{weather.name}</h1>
            </div>
            <div className="text-white/80 text-sm md:text-base">
              {new Date().toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                {getWeatherIcon(weather.weather[0].icon)}
                <div className="text-7xl font-bold text-white">
                  {Math.round(weather.main.temp)}°
                </div>
              </div>
              <p className="text-2xl text-white/90 mb-2 capitalize">
                {weather.weather[0].description}
              </p>
              <p className="text-white/70">
                الحد الأقصى: {Math.round(weather.main.temp_max)}° | الحد الأدنى:{" "}
                {Math.round(weather.main.temp_min)}°
              </p>
              <p className="text-white/60 mt-2">
                <Thermometer className="inline w-4 h-4 ml-1" />
                الإحساس بـ: {Math.round(weather.main.feels_like)}°
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">سرعة الرياح</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {weather.wind.speed.toFixed(1)} م/ث
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">الرطوبة</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">الرؤية</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {weather.visibility} كم
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">الضغط</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {weather.main.pressure} مليبار
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            توقعات الأيام القادمة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition cursor-pointer"
              >
                <p className="text-white font-semibold mb-3">
                  {getDayName(day.dt)}
                </p>
                <div className="flex justify-center mb-3">
                  {getWeatherIcon(day.weather[0].icon)}
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {Math.round(day.main.temp)}°
                </p>
                <p className="text-white/70 text-sm capitalize">
                  {day.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;

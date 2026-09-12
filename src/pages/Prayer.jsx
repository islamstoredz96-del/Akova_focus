

```jsx
import { useState, useEffect } from "react";

export default function PrayerPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [selectedCalculation, setSelectedCalculation] = useState("umalqura");
  const [selectedLocation, setSelectedLocation] = useState("Mecca");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState("Dhuhr");

  const prayerTimes = [
    { name: "الفجر", nameEn: "Fajr", time: "04:45", icon: "🌙", isPassed: true },
    { name: "الشروق", nameEn: "Sunrise", time: "06:12", icon: "🌅", isPassed: true },
    { name: "الظهر", nameEn: "Dhuhr", time: "12:30", icon: "☀️", isPassed: false, isCurrent: true },
    { name: "العصر", nameEn: "Asr", time: "15:45", icon: "🌤️", isPassed: false },
    { name: "المغرب", nameEn: "Maghrib", time: "18:30", icon: "🌇", isPassed: false },
    { name: "العشاء", nameEn: "Isha", time: "20:00", icon: "🌃", isPassed: false },
  ];

  const calculationMethods = [
    { id: "umalqura", name: "أم القرى", nameEn: "Umm Al-Qura", country: "السعودية" },
    { id: "mwl", name: "رابطة العالم الإسلامي", nameEn: "Muslim World League", country: "الدولي" },
    { id: "egypt", name: "مصر الجديدة", nameEn: "Egyptian General Authority", country: "مصر" },
    { id: "makkah", name: "جامعة مكة", nameEn: "Makkah Calendar", country: "السعودية" },
    { id: "karachi", name: "جامعة كراتشي", nameEn: "University of Karachi", country: "باكستان" },
    { id: "isna", name: "أمانة هيئة كبار العلماء", nameEn: "ISNA", country: "أمريكا" },
  ];

  const locations = [
    { id: "mecca", name: "مكة المكرمة", nameEn: "Mecca", country: "السعودية", lat: "21.3891", lng: "39.8579" },
    { id: "riyadh", name: "الرياض", nameEn: "Riyadh", country: "السعودية", lat: "24.7136", lng: "46.6753" },
    { id: "jeddah", name: "جدة", nameEn: "Jeddah", country: "السعودية", lat: "21.4858", lng: "39.1925" },
    { id: "medina", name: "المدينة المنورة", nameEn: "Medina", country: "السعودية", lat: "24.5247", lng: "39.5692" },
    { id: "dubai", name: "دبي", nameEn: "Dubai", country: "الإمارات", lat: "25.2048", lng: "55.2708" },
    { id: "cairo", name: "القاهرة", nameEn: "Cairo", country: "مصر", lat: "30.0444", lng: "31.2357" },
  ];

  const hijriDate = "١٥ رمضان ١٤٤٦";
  const gregorianDate = "١٥ مارس ٢٠٢٥";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const nextPrayer = prayerTimes.find((p) => !p.isPassed);
  const timeUntilNext = nextPrayer ? "٢ ساعة و ١٥ دقيقة" : "--";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`} dir="rtl">
      {/* Header */}
      <header className={`${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"} border-b sticky top-0 z-50 backdrop-blur-lg bg-opacity-90`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#00695C" }}>
                <span className="text-white text-xl">🕌</span>
              </div>
              <div>
                <h1 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>مواقيت الصلاة</h1>
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Prayer Times</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-xl transition-all duration-200 ${isDarkMode ? "bg-slate-700 text-amber-400 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button className={`p-2.5 rounded-xl transition-all duration-200 ${isDarkMode ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Date Card */}
        <div className={`${isDarkMode ? "bg-slate-800" : "bg-white"} rounded-2xl p-5 shadow-sm border ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>التاريخ الهجري</p>
              <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`} style={{ fontFamily: "Noto Naskh Arabic, serif" }}>{hijriDate}</p>
            </div>
            <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-left">
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>التاريخ الميلادي</p>
              <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>{gregorianDate}</p>
            </div>
          </div>
        </div>

        {/* Next Prayer Card */}
        <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #00695C 0%, #004D40 100%)" }}>
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-300">●</span>
                <span className="text-amber-300 text-sm font-medium">الصلاة القادمة</span>
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">متبقي</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold mb-1" style={{ fontFamily: "Noto Naskh Arabic, serif" }}>{nextPrayer?.name}</p>
                <p className="text-white/80 text-lg">{nextPrayer?.nameEn}</p>
              </div>
              <div className="text-left">
                <p className="text-5xl font-bold">{nextPrayer?.time}</p>
                <p className="text-white/80 mt-1">بعد {timeUntilNext}</p>
              </div>
            </div>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-600" />
        </div>

        {/* Prayer Times Grid */}
        <div className={`${isDarkMode ? "bg-slate-800" : "bg-white"} rounded-2xl p-5 shadow-sm border ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>مواقيت اليوم</h2>
          <div className="grid grid-cols-2 gap-3">
            {prayerTimes.map((prayer, index) => (
              <div
                key={index}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  prayer.isCurrent
                    ? "ring-2 shadow-md"
                    : ""
                } ${
                  isDarkMode
                    ? prayer.isPassed
                      ? "bg-slate-700/50"
                      : "bg-slate-700"
                    : prayer.isPassed
                    ? "bg-slate-50"
                    : "bg-slate-100"
                } ${prayer.isCurrent ? (isDarkMode ? "ring-teal-400" : "ring-teal-500") : ""}`}
                style={prayer.isCurrent ? { ringColor: "#00695C" } : {}}
              >
                {prayer.isCurrent && (
                  <div className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full">
                    الآن
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{prayer.icon}</span>
                  <div>
                    <p className={`font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`} style={{ fontFamily: "Noto Naskh Arabic, serif" }}>{prayer.name}</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{prayer.nameEn}</p>
                  </div>
                </div>
                <p className={`text-2xl font-bold ${prayer.isPassed ? (isDarkMode ? "text-slate-400" : "text-slate-400") : (isDarkMode ? "text-white" : "text-slate-800")}`}>
                  {prayer.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Settings */}
        <div className={`${isDarkMode ? "bg-slate-800" : "bg-white"} rounded-2xl p-5 shadow-sm border ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>الموقع والإعدادات</h2>
          
          <div className="space-y-4">
            {/* Location */}
            <button
              onClick={() => setShowLocationModal(true)}
              className={`w-full p-4 rounded-xl flex items-center justify-between transition-all duration-200 ${
                isDarkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FFB300" }}>
                  <span className="text-lg">📍</span>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>الموقع</p>
                  <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{selectedLocation}</p>
                </div>
              </div>
              <span className={`text-xl ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>›</span>
            </button>

            {/* Calculation Method */}
            <button
              onClick={() => setShowMethodModal(true)}
              className={`w-full p-4 rounded-xl flex items-center justify-between transition-all duration-200 ${
                isDarkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#00695C" }}>
                  <span className="text-lg">📐</span>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>طريقة الحساب</p>
                  <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {calculationMethods.find((m) => m.id === selectedCalculation)?.name}
                  </p>
                </div>
              </div>
              <span className={`text-xl ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>›</span>
            </button>

            {/* Notifications */}
            <div className={`p-4 rounded-xl flex items-center justify-between ${
              isDarkMode ? "bg-slate-700" : "bg-slate-50"
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500">
                  <span className="text-lg">🔔</span>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>الإشعارات</p>
                  <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>تنبيه قبل كل صلاة</p>
                </div>
              </div>
              <button
                onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  isNotificationEnabled ? "bg-teal-600" : isDarkMode ? "bg-slate-600" : "bg-slate-300"
                }`}
              >
                <div
                  className={`absolute top
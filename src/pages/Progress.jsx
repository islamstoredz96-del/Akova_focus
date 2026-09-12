

```jsx
import { useState, useEffect } from "react";

export default function ProgressDashboard() {
  const [activeTab, setActiveTab] = useState("daily");
  const [darkMode, setDarkMode] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dailyStats = [
    { label: "المهام المكتملة", value: 8, icon: "✓", color: "teal" },
    { label: "ساعات الإنتاجية", value: 6.5, icon: "⏱", color: "amber" },
    { label: "التركيز العميق", value: 3, icon: "🎯", color: "teal" },
    { label: "استراحات نشطة", value: 4, icon: "☕", color: "amber" },
  ];

  const weeklyStats = [
    { label: "أهداف الأسبوع", value: "85%", progress: 85, color: "teal" },
    { label: "إكمال العادات", value: "92%", progress: 92, color: "amber" },
    { label: "تحديات منجزة", value: "78%", progress: 78, color: "teal" },
    { label: "رضا الأداء", value: "88%", progress: 88, color: "amber" },
  ];

  const monthlyStats = [
    { label: "أكتوبر 2024", value: 156, change: "+12%", trend: "up" },
    { label: "سبتمبر 2024", value: 139, change: "+8%", trend: "up" },
    { label: "أغسطس 2024", value: 128, change: "-3%", trend: "down" },
    { label: "يوليو 2024", value: 132, change: "+15%", trend: "up" },
  ];

  const streaks = [
    { name: "القراءة اليومية", current: 24, best: 45, icon: "📚" },
    { name: "التمارين الصباحية", current: 12, best: 30, icon: "🏃" },
    { name: "تأمل يومي", current: 8, best: 21, icon: "🧘" },
    { name: "كتابة اليوميات", current: 5, best: 14, icon: "✍️" },
  ];

  const insights = [
    {
      title: "أفضل وقت للإنتاجية",
      description: "تحقق أفضل أداء بين 9-11 صباحاً. فكّر في جدولة المهام الصعبة لهذا الوقت.",
      icon: "💡",
      type: "positive",
    },
    {
      title: "تحسين سلسلة التمارين",
      description: "أنت أكثر نجاحاً عند ممارسة التمارين في الصباح الباكر. حافظ على هذا الإيقاع!",
      icon: "📈",
      type: "neutral",
    },
    {
      title: "وقت راحة أكثر",
      description: "لاحظنا انخفاضاً في فترات الراحة خلال الأسبوع الماضي. حاول أخذ استراحة كل 90 دقيقة.",
      icon: "⚠️",
      type: "warning",
    },
  ];

  const activityData = [
    { day: "السبت", tasks: 12, hours: 7.5, color: "#00695C" },
    { day: "الأحد", tasks: 8, hours: 5, color: "#00695C" },
    { day: "الاثنين", tasks: 15, hours: 9, color: "#00695C" },
    { day: "الثلاثاء", tasks: 10, hours: 6.5, color: "#00695C" },
    { day: "الأربعاء", tasks: 14, hours: 8, color: "#00695C" },
    { day: "الخميس", tasks: 11, hours: 7, color: "#FFB300" },
    { day: "الجمعة", tasks: 6, hours: 4, color: "#FFB300" },
  ];

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
        isActive
          ? "bg-teal-600 text-white shadow-lg shadow-teal-200"
          : darkMode
          ? "text-gray-400 hover:text-white hover:bg-gray-800"
          : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
      }`}
    >
      {label}
    </button>
  );

  const StatCard = ({ label, value, icon, color, delay }) => (
    <div
      className={`p-6 rounded-2xl transition-all duration-500 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
        animatedStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-3xl ${
            color === "teal" ? "text-teal-600" : "text-amber-500"
          }`}
        >
          {icon}
        </span>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            darkMode
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          اليوم
        </span>
      </div>
      <h3
        className={`text-3xl font-bold mb-1 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {value}
      </h3>
      <p
        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        {label}
      </p>
    </div>
  );

  const ProgressCard = ({ label, value, progress, color, delay }) => (
    <div
      className={`p-6 rounded-2xl transition-all duration-500 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg ${
        animatedStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
        </span>
        <span
          className={`text-lg font-bold ${
            color === "teal" ? "text-teal-600" : "text-amber-500"
          }`}
        >
          {value}
        </span>
      </div>
      <div
        className={`h-3 rounded-full overflow-hidden ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            color === "teal" ? "bg-teal-600" : "bg-amber-500"
          }`}
          style={{
            width: animatedStats ? `${progress}%` : "0%",
          }}
        />
      </div>
    </div>
  );

  const StreakCard = ({ name, current, best, icon, delay }) => (
    <div
      className={`p-5 rounded-2xl transition-all duration-500 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg hover:shadow-xl ${
        animatedStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-2xl shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h4
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {name}
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span
                className={`text-lg font-bold ${
                  darkMode ? "text-amber-400" : "text-amber-500"
                }`}
              >
                🔥
              </span>
              <span
                className={`font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {current}
              </span>
              <span
                className={`text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                يوم
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                الأفضل:
              </span>
              <span
                className={`text-sm font-semibold ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {best} يوم
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div
          className={`h-2 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          } overflow-hidden`}
        >
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000"
            style={{
              width: animatedStats
                ? `${Math.min((current / best) * 100, 100)}%`
                : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-lg ${
          darkMode ? "bg-gray-900/90 border-gray-800" : "bg-white/90 border-gray-200"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                لوحة التقدم
              </h1>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                الجمعة، 11 أكتوبر 2024
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                م
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton
            id="daily"
            label="يومي"
            isActive={activeTab === "daily"}
            onClick={() => setActiveTab("daily")}
          />
          <TabButton
            id="weekly"
            label="أسبوعي"
            isActive={activeTab === "weekly"}
            onClick={() => setActiveTab("weekly")}
          />
          <TabButton
            id="monthly"
            label="شهري"
            isActive={activeTab === "monthly"}
            onClick={() => setActiveTab("monthly")}
          />
        </div>

        {/* Daily View */}
        {activeTab === "daily" && (
          <div className="space-y-8">
            {/* Daily Stats Grid */}
            <section>
              <h2
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                إحصائيات اليوم
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dailyStats.map((stat, index) => (
                  <StatCard key={index} {...stat} delay={index * 100} />
                ))}
              </div>
            </section>

            {/* Weekly Activity Chart */}
            <section
              className={`p-6 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <h2
                className={`text-lg font-semibold mb-6 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                نشاط الأسبوع
              </h2>
              <div className="flex items-end justify-between gap-3 h-48">
                {activityData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full rounded-t-lg transition-all duration-700 ease-out relative group"
                      style={{
                        height: animatedStats
                          ? `${(day.hours / 9) * 100}%`
                          : "0%",
                        backgroundColor: day.color,
                        minHeight: "8px",
                      }}
                    >
                      <div
                        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                          darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {day.hours} ساعات
                      </div>
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Insights */}
            <section>
              <h2
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                💡 رؤى سريعة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border-l-4 ${
                      insight.type === "positive"
                        ? "border-teal-500"
                        : insight.type === "warning"
                        ? "border-amber-500"
                        : "border-blue-500"
                    } ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } shadow-lg transition-all duration-300 hover:shadow-xl`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{insight.icon}</span>
                      <div>
                        <h3
                          className={`font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {insight.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${
                            darkMode ? "text-gray-400" : "text


```jsx
import { useState } from "react";

export default function NotificationsPage() {
  const [masterEnabled, setMasterEnabled] = useState(true);
  const [taskEnabled, setTaskEnabled] = useState(true);
  const [taskReminderTime, setTaskReminderTime] = useState("30");
  const [taskSound, setTaskSound] = useState("chime");
  const [taskVibration, setTaskVibration] = useState(true);
  
  const [prayerEnabled, setPrayerEnabled] = useState(true);
  const [prayerMethod, setPrayerMethod] = useState("ummAlQura");
  const [prayerSound, setPrayerSound] = useState("adhan");
  const [prayerVibration, setPrayerVibration] = useState(true);
  const [prayerBefore, setPrayerBefore] = useState("5");
  
  const [sleepEnabled, setSleepEnabled] = useState(false);
  const [sleepReminder, setSleepReminder] = useState("22:00");
  const [sleepWindDown, setSleepWindDown] = useState("30");
  const [sleepSound, setSleepSound] = useState("none");
  
  const [darkMode, setDarkMode] = useState(false);

  const taskReminderOptions = [
    { value: "15", label: "15 دقيقة قبل" },
    { value: "30", label: "30 دقيقة قبل" },
    { value: "60", label: "ساعة قبل" },
    { value: "120", label: "ساعتان قبل" },
  ];

  const prayerMethodOptions = [
    { value: "ummAlQura", label: "جامعة أم القرى" },
    { value: "mwl", label: "رابطة العالم الإسلامي" },
    { value: "egyptian", label: "الهيئة المصرية" },
    { value: "karachi", label: "جامعة كرachi" },
  ];

  const prayerBeforeOptions = [
    { value: "0", label: "في الوقت" },
    { value: "5", label: "5 دقائق قبل" },
    { value: "10", label: "10 دقائق قبل" },
    { value: "15", label: "15 دقيقة قبل" },
  ];

  const soundOptions = [
    { value: "none", label: "بدون صوت" },
    { value: "chime", label: "جرس" },
    { value: "soft", label: "ناعم" },
    { value: "vibrate", label: "اهتزاز فقط" },
  ];

  const PrayerSoundOptions = [
    { value: "none", label: "بدون صوت" },
    { value: "adhan", label: "أذان" },
    { value: "iqamah", label: "إقامة" },
    { value: "soft", label: "صوت ناعم" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`} dir="rtl">
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-lg ${darkMode ? "bg-gray-900/90 border-gray-700" : "bg-white/90 border-gray-200"} border-b`}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className={`p-2 rounded-xl transition-colors ${darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <h1 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>الإشعارات</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-colors ${darkMode ? "hover:bg-gray-800 text-amber-400" : "hover:bg-gray-100 text-amber-500"}`}
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Master Switch Card */}
        <div className={`rounded-2xl p-5 transition-all duration-300 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: masterEnabled ? "#00695C" : (darkMode ? "#374151" : "#E5E7EB") }}>
                <svg className={`w-6 h-6 ${masterEnabled ? "text-white" : (darkMode ? "text-gray-500" : "text-gray-400")}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>تفعيل الإشعارات</h2>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>تفعيل أو تعطيل جميع الإشعارات</p>
              </div>
            </div>
            <button
              onClick={() => setMasterEnabled(!masterEnabled)}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${masterEnabled ? "bg-[#00695C]" : (darkMode ? "bg-gray-600" : "bg-gray-300")}`}
            >
              <span
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${masterEnabled ? "right-7" : "right-1"}`}
              />
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div className="p-5 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: taskEnabled && masterEnabled ? "#E8F5E9" : (darkMode ? "#374151" : "#F3F4F6") }}>
                  <svg className="w-6 h-6" style={{ color: taskEnabled && masterEnabled ? "#00695C" : (darkMode ? "#6B7280" : "#9CA3AF") }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>المهام</h2>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>تذكيرات المهام والمواعيد</p>
                </div>
              </div>
              <button
                onClick={() => setTaskEnabled(!taskEnabled)}
                disabled={!masterEnabled}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${taskEnabled && masterEnabled ? "bg-[#00695C]" : (darkMode ? "bg-gray-600" : "bg-gray-300")} ${!masterEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${taskEnabled && masterEnabled ? "right-7" : "right-1"}`}
                />
              </button>
            </div>
          </div>

          <div className={`p-5 space-y-5 transition-opacity duration-300 ${taskEnabled && masterEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
            {/* Reminder Time */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>وقت التذكير</label>
              <select
                value={taskReminderTime}
                onChange={(e) => setTaskReminderTime(e.target.value)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#00695C] focus:ring-opacity-50 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
              >
                {taskReminderOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Sound */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>صوت الإشعارات</label>
              <select
                value={taskSound}
                onChange={(e) => setTaskSound(e.target.value)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#00695C] focus:ring-opacity-50 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
              >
                {soundOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Vibration */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>الاهتزاز</label>
              <button
                onClick={() => setTaskVibration(!taskVibration)}
                className={`relative w-12 h-7 rounded-full transition-all duration-300 ${taskVibration ? "bg-[#00695C]" : (darkMode ? "bg-gray-600" : "bg-gray-300")}`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${taskVibration ? "right-6" : "right-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Prayer Section */}
        <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div className="p-5 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: prayerEnabled && masterEnabled ? "#FFF8E1" : (darkMode ? "#374151" : "#F3F4F6") }}>
                  <svg className="w-6 h-6" style={{ color: prayerEnabled && masterEnabled ? "#FFB300" : (darkMode ? "#6B7280" : "#9CA3AF") }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>الصلاة</h2>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>إشعارات مواقيت الصلاة</p>
                </div>
              </div>
              <button
                onClick={() => setPrayerEnabled(!prayerEnabled)}
                disabled={!masterEnabled}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${prayerEnabled && masterEnabled ? "bg-[#00695C]" : (darkMode ? "bg-gray-600" : "bg-gray-300")} ${!masterEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${prayerEnabled && masterEnabled ? "right-7" : "right-1"}`}
                />
              </button>
            </div>
          </div>

          <div className={`p-5 space-y-5 transition-opacity duration-300 ${prayerEnabled && masterEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
            {/* Calculation Method */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>طريقة الحساب</label>
              <select
                value={prayerMethod}
                onChange={(e) =>
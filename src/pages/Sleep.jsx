

```jsx
import { useState, useEffect } from "react";

export default function SleepPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [bedtime, setBedtime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [quietMode, setQuietMode] = useState(true);
  const [autoFocus, setAutoFocus] = useState(true);
  const [focusDuration, setFocusDuration] = useState(8);
  const [notifications, setNotifications] = useState(true);
  const [smartAlarm, setSmartAlarm] = useState(false);
  const [windDown, setWindDown] = useState(true);
  const [windDownDuration, setWindDownDuration] = useState(30);
  const [sleepTracking, setSleepTracking] = useState(true);
  const [selectedDays, setSelectedDays] = useState([
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const days = [
    { id: "sun", label: "S" },
    { id: "mon", label: "M" },
    { id: "tue", label: "T" },
    { id: "wed", label: "W" },
    { id: "thu", label: "T" },
    { id: "fri", label: "F" },
    { id: "sat", label: "S" },
  ];

  const toggleDay = (dayId) => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((d) => d !== dayId)
        : [...prev, dayId]
    );
  };

  const calculateSleepDuration = () => {
    const [bedHour, bedMin] = bedtime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);

    let bedMinutes = bedHour * 60 + bedMin;
    let wakeMinutes = wakeHour * 60 + wakeMin;

    if (wakeMinutes <= bedMinutes) {
      wakeMinutes += 24 * 60;
    }

    const duration = wakeMinutes - bedMinutes;
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;

    return `${hours}h ${mins}m`;
  };

  const getSleepQuality = () => {
    const [bedHour] = bedtime.split(":").map(Number);
    const hours = parseInt(calculateSleepDuration());
    if (hours >= 7 && hours <= 9) return { level: "Optimal", color: "#10B981" };
    if (hours >= 6) return { level: "Good", color: "#22C55E" };
    if (hours >= 5) return { level: "Fair", color: "#F59E0B" };
    return { level: "Insufficient", color: "#EF4444" };
  };

  const sleepQuality = getSleepQuality();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
      dir="ltr"
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-lg ${
          darkMode
            ? "bg-gray-900/90 border-gray-800"
            : "bg-white/90 border-gray-200"
        } border-b`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
              <div>
                <h1
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Sleep Settings
                </h1>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Configure your sleep schedule and focus mode
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                darkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Sleep Schedule Card */}
        <section
          className={`rounded-2xl p-6 transition-all duration-300 ${
            darkMode ? "bg-gray-800/50" : "bg-white shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Sleep Schedule
                </h2>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Set your daily sleep routine
                </p>
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${sleepQuality.color}20`, color: sleepQuality.color }}
            >
              {sleepQuality.level}
            </span>
          </div>

          {/* Time Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Bedtime */}
            <div
              className={`p-4 rounded-xl transition-all duration-200 ${
                darkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Bedtime
              </label>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className={`w-full text-2xl font-semibold bg-transparent border-none focus:outline-none ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              />
              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                When you want to fall asleep
              </p>
            </div>

            {/* Wake Time */}
            <div
              className={`p-4 rounded-xl transition-all duration-200 ${
                darkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Wake Time
              </label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className={`w-full text-2xl font-semibold bg-transparent border-none focus:outline-none ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              />
              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                When you want to wake up
              </p>
            </div>
          </div>

          {/* Sleep Duration Display */}
          <div
            className={`p-4 rounded-xl flex items-center justify-between ${
              darkMode ? "bg-teal-900/30" : "bg-teal-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${darkMode ? "#00695C" : "#00695C"}20` }}
              >
                <svg
                  className="w-5 h-5 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Sleep Duration
                </p>
                <p
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {calculateSleepDuration()}
                </p>
              </div>
            </div>
            <div
              className={`text-right ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p className="text-xs">Recommended</p>
              <p className="text-sm font-medium">7-9 hours</p>
            </div>
          </div>
        </section>

        {/* Active Days */}
        <section
          className={`rounded-2xl p-6 transition-all duration-300 ${
            darkMode ? "bg-gray-800/50" : "bg-white shadow-sm"
          }`}
        >
          <h3
            className={`text-base font-medium mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Active Days
          </h3>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => toggleDay(day.id)}
                className={`w-12 h-12 rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
                  selectedDays.includes(day.id)
                    ? "text-white shadow-lg"
                    : darkMode
                    ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  selectedDays.includes(day.id)
                    ? { backgroundColor: "#00695C" }
                    : {}
                }
              >
                {day.label}
              </button>
            ))}
          </div>
          <p
            className={`text-sm mt-3 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {selectedDays.length === 7
              ? "Active every day"
              : `${selectedDays.length} day${selectedDays.length > 1 ? "s" : ""} selected`}
          </p>
        </section>

        {/* Quiet Mode & Auto-Focus */}
        <section
          className={`rounded-2xl p-6 transition-all duration-300 ${
            darkMode ? "bg-gray-800/50" : "bg-white shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 11l7-7 7 7M5 19l7-7 7 7"
                />
              </svg>
            </div>
            <div>
              <h2
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Focus Mode
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Minimize distractions during sleep hours
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Quiet Mode Toggle */}
            <div
              className={`p-4 rounded-xl transition-all duration-200 ${
                darkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      quietMode ? "bg-teal-500/20" : darkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        quietMode ? "text-teal-600" : darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                      />
                    </svg>
                  </div>
                  


```jsx
import { useState } from "react";

export default function TaskEditor() {
  const [darkMode, setDarkMode] = useState(false);
  const [taskType, setTaskType] = useState("duration");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [durationHours, setDurationHours] = useState("1");
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [subtasks, setSubtasks] = useState([
    { id: 1, text: "Research requirements", completed: false },
    { id: 2, text: "Create initial draft", completed: false },
  ]);
  const [newSubtask, setNewSubtask] = useState("");
  const [allowedApps, setAllowedApps] = useState([
    { id: 1, name: "Visual Studio Code", icon: "💻" },
    { id: 2, name: "Chrome", icon: "🌐" },
    { id: 3, name: "Figma", icon: "🎨" },
  ]);
  const [selectedApps, setSelectedApps] = useState([1, 2]);
  const [newAppName, setNewAppName] = useState("");
  const [showAppDropdown, setShowAppDropdown] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [reminder, setReminder] = useState("15");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Date.now(), text: newSubtask, completed: false },
      ]);
      setNewSubtask("");
    }
  };

  const toggleSubtask = (id) => {
    setSubtasks(
      subtasks.map((st) =>
        st.id === id ? { ...st, completed: !st.completed } : st
      )
    );
  };

  const removeSubtask = (id) => {
    setSubtasks(subtasks.filter((st) => st.id !== id));
  };

  const toggleApp = (appId) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter((id) => id !== appId));
    } else {
      setSelectedApps([...selectedApps, appId]);
    }
  };

  const addCustomApp = () => {
    if (newAppName.trim()) {
      setAllowedApps([
        ...allowedApps,
        { id: Date.now(), name: newAppName, icon: "📦" },
      ]);
      setNewAppName("");
      setShowAppDropdown(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const bgColor = darkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-300" : "text-gray-600";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = darkMode ? "bg-gray-700" : "bg-gray-50";
  const inputText = darkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${cardBg} border-b ${borderColor} sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className={`p-2 rounded-xl ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
              >
                <svg
                  className={`w-6 h-6 ${textSecondary}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div>
                <h1 className={`text-xl font-semibold ${textPrimary}`}>
                  Create New Task
                </h1>
                <p className={`text-sm ${textSecondary}`}>
                  Set up your task details and schedule
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-100 text-gray-600"} transition-all duration-300`}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Task Name & Description */}
          <div className={`${cardBg} rounded-2xl p-6 shadow-sm border ${borderColor} transition-all duration-300`}>
            <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
              <span className="w-8 h-8 rounded-lg bg-teal-500 bg-opacity-10 flex items-center justify-center">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>
              Task Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Task Name
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter task name..."
                  className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} border ${borderColor} focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Description (Optional)
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Add a description for this task..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} border ${borderColor} focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Task Type Selector */}
          <div className={`${cardBg} rounded-2xl p-6 shadow-sm border ${borderColor} transition-all duration-300`}>
            <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
              <span className="w-8 h-8 rounded-lg bg-amber-500 bg-opacity-10 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Schedule Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setTaskType("fixed")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  taskType === "fixed"
                    ? "border-teal-500 bg-teal-500 bg-opacity-10"
                    : `${borderColor} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    taskType === "fixed" ? "bg-teal-500 text-white" : `${inputBg} ${textSecondary}`
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className={`font-medium ${textPrimary}`}>Fixed Time</span>
                  <span className={`text-xs ${textSecondary}`}>Specific start & end</span>
                </div>
              </button>
              <button
                onClick={() => setTaskType("duration")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  taskType === "duration"
                    ? "border-teal-500 bg-teal-500 bg-opacity-10"
                    : `${borderColor} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    taskType === "duration" ? "bg-teal-500 text-white" : `${inputBg} ${textSecondary}`
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className={`font-medium ${textPrimary}`}>Duration</span>
                  <span className={`text-xs ${textSecondary}`}>Set length of time</span>
                </div>
              </button>
              <button
                onClick={() => setTaskType("unscheduled")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  taskType === "unscheduled"
                    ? "border-teal-500 bg-teal-500 bg-opacity-10"
                    : `${borderColor} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    taskType === "unscheduled" ? "bg-teal-500 text-white" : `${inputBg} ${textSecondary}`
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className={`font-medium ${textPrimary}`}>Unscheduled</span>
                  <span className={`text-xs ${textSecondary}`}>No specific time</span>
                </div>
              </button>
            </div>
          </div>

          {/* Time Settings */}
          {taskType !== "unscheduled" && (
            <div className={`${cardBg} rounded-2xl p-6 shadow-sm border ${borderColor} transition-all duration-300`}>
              <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                <span className="w-8 h-8 rounded-lg bg-teal-500 bg-opacity-10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                {taskType === "fixed" ? "Date & Time" : "Duration Settings"}
              </h2>
              
              {taskType === "fixed" ? (
                <div className="grid grid-col
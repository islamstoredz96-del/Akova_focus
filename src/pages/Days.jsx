

```jsx
import { useState } from "react";

export default function DaysPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "pending" });

  const days = [
    {
      id: 1,
      dayNumber: 1,
      date: "2026-09-01",
      title: "Foundation Day",
      description: "Establish core program structure and initial planning",
      progress: 100,
      tasks: [
        { id: 1, title: "Set up project environment", status: "completed", completedAt: "09:00" },
        { id: 2, title: "Define program objectives", status: "completed", completedAt: "10:30" },
        { id: 3, title: "Create initial documentation", status: "completed", completedAt: "14:00" },
      ],
      isCompleted: true,
    },
    {
      id: 2,
      dayNumber: 2,
      date: "2026-09-02",
      title: "Development Sprint",
      description: "Begin core feature implementation and coding",
      progress: 100,
      tasks: [
        { id: 1, title: "Implement authentication module", status: "completed", completedAt: "09:15" },
        { id: 2, title: "Design database schema", status: "completed", completedAt: "11:00" },
        { id: 3, title: "Build API endpoints", status: "completed", completedAt: "15:30" },
      ],
      isCompleted: true,
    },
    {
      id: 3,
      dayNumber: 3,
      date: "2026-09-03",
      title: "Integration Phase",
      description: "Connect modules and test integration points",
      progress: 75,
      tasks: [
        { id: 1, title: "Connect frontend to backend", status: "completed", completedAt: "09:00" },
        { id: 2, title: "Test API integration", status: "completed", completedAt: "11:30" },
        { id: 3, title: "Fix integration bugs", status: "in-progress", assignedTo: "Ahmed K." },
        { id: 4, title: "Performance optimization", status: "pending", assignedTo: "Sarah M." },
      ],
      isCompleted: false,
    },
    {
      id: 4,
      dayNumber: 4,
      date: "2026-09-04",
      title: "Testing & QA",
      description: "Comprehensive testing and quality assurance",
      progress: 40,
      tasks: [
        { id: 1, title: "Unit testing setup", status: "completed", completedAt: "09:00" },
        { id: 2, title: "Write test cases", status: "in-progress", assignedTo: "Omar F." },
        { id: 3, title: "Integration testing", status: "pending" },
        { id: 4, title: "User acceptance testing", status: "pending" },
        { id: 5, title: "Security audit", status: "pending" },
      ],
      isCompleted: false,
    },
    {
      id: 5,
      dayNumber: 5,
      date: "2026-09-05",
      title: "Deployment Prep",
      description: "Prepare for production deployment and launch",
      progress: 0,
      tasks: [
        { id: 1, title: "Prepare deployment scripts", status: "pending" },
        { id: 2, title: "Configure production environment", status: "pending" },
        { id: 3, title: "Set up monitoring", status: "pending" },
        { id: 4, title: "Create backup procedures", status: "pending" },
      ],
      isCompleted: false,
    },
    {
      id: 6,
      dayNumber: 6,
      date: "2026-09-06",
      title: "Launch Day",
      description: "Official program launch and initial deployment",
      progress: 0,
      tasks: [
        { id: 1, title: "Final system check", status: "pending" },
        { id: 2, title: "Deploy to production", status: "pending" },
        { id: 3, title: "Verify all systems operational", status: "pending" },
        { id: 4, title: "Launch announcement", status: "pending" },
      ],
      isCompleted: false,
    },
  ];

  const stats = {
    totalDays: days.length,
    completedDays: days.filter((d) => d.isCompleted).length,
    inProgressDays: days.filter((d) => !d.isCompleted && d.progress > 0).length,
    upcomingDays: days.filter((d) => d.progress === 0).length,
    totalTasks: days.reduce((acc, d) => acc + d.tasks.length, 0),
    completedTasks: days.reduce((acc, d) => acc + d.tasks.filter((t) => t.status === "completed").length, 0),
    overallProgress: Math.round(
      days.reduce((acc, d) => acc + d.progress, 0) / days.length
    ),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "in-progress":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "in-progress":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl ${darkMode ? "bg-slate-900/90 border-slate-800" : "bg-white/90 border-slate-200"} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>Days Management</h1>
                <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Program timeline and task tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Pause Toggle */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isPaused
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : darkMode
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isPaused ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                {isPaused ? "Resume" : "Pause Program"}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  darkMode
                    ? "bg-slate-800 text-amber-400 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Add Day Button */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Day
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pause Banner */}
        {isPaused && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${darkMode ? "text-amber-400" : "text-amber-700"}`}>Program Paused</h3>
                <p className={`text-sm ${darkMode ? "text-amber-400/70" : "text-amber-600"}`}>All activities are temporarily suspended. Click resume to continue.</p>
              </div>
              <button
                onClick={() => setIsPaused(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
              >
                Resume Now
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`p-5 rounded-2xl ${darkMode ? "bg-slate-800/50" : "bg-white"} shadow-sm border ${darkMode ? "border-slate-700" : "border-slate-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Total Days</span>
            </div>
            <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>{stats.totalDays}</p>
          </div>

          <div className={`p-5 rounded-2xl ${darkMode ? "bg-slate-800/50" : "bg-white"} shadow-sm border ${darkMode ? "border-slate-700" : "border-slate-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-5 h
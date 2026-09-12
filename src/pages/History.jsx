

```jsx
import { useState, useMemo } from "react";

// Sample data for task history
const generateSampleHistory = () => {
  const today = new Date();
  const history = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const completedCount = Math.floor(Math.random() * 6) + 2;
    const missedCount = Math.floor(Math.random() * 3);
    const exceptionCount = Math.floor(Math.random() * 2);

    for (let j = 0; j < completedCount; j++) {
      history.push({
        id: `task-${i}-${j}`,
        title: getRandomTaskTitle(i, j, "completed"),
        category: getRandomCategory(),
        date: date.toISOString(),
        status: "completed",
        completionTime: getRandomTime(),
        duration: Math.floor(Math.random() * 120) + 15,
      });
    }

    for (let j = 0; j < missedCount; j++) {
      history.push({
        id: `task-missed-${i}-${j}`,
        title: getRandomTaskTitle(i, j, "missed"),
        category: getRandomCategory(),
        date: date.toISOString(),
        status: "missed",
        scheduledTime: getRandomTime(),
        reason: getRandomMissedReason(),
      });
    }

    for (let j = 0; j < exceptionCount; j++) {
      history.push({
        id: `task-exception-${i}-${j}`,
        title: getRandomTaskTitle(i, j, "exception"),
        category: getRandomCategory(),
        date: date.toISOString(),
        status: "exception",
        exceptionType: getRandomExceptionType(),
        notes: getRandomExceptionNote(),
      });
    }
  }

  return history;
};

const getRandomTaskTitle = (day, index, type) => {
  const completedTasks = [
    "Morning meditation session",
    "Review quarterly reports",
    "Team standup meeting",
    "Code review for sprint 24",
    "Client presentation prep",
    "Weekly planning session",
    "Documentation update",
    "Performance evaluation",
    "Project milestone review",
    "Stakeholder meeting",
    "System maintenance check",
    "Budget analysis",
    "Marketing campaign review",
    "Customer feedback analysis",
    "Training session completion",
  ];

  const missedTasks = [
    "Gym workout",
    "Language practice",
    "Reading time",
    "Network call",
    "Dentist appointment",
    "Team sync",
    "Project deadline",
  ];

  const exceptionTasks = [
    "Doctor consultation",
    "Home repair",
    "Family emergency",
    "Travel delay",
    "System outage response",
  ];

  if (type === "completed") return completedTasks[(day + index) % completedTasks.length];
  if (type === "missed") return missedTasks[(day + index) % missedTasks.length];
  return exceptionTasks[(day + index) % exceptionTasks.length];
};

const getRandomCategory = () => {
  const categories = [
    { name: "Work", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
    { name: "Health", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
    { name: "Personal", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
    { name: "Learning", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
    { name: "Finance", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
    { name: "Social", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" },
  ];
  return categories[Math.floor(Math.random() * categories.length)];
};

const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 7;
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const getRandomMissedReason = () => {
  const reasons = [
    "Schedule conflict with another meeting",
    "Forgot to set reminder",
    "Unexpected work priority",
    "Time zone confusion",
    "Technical issues with device",
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
};

const getRandomExceptionType = () => {
  const types = ["Rescheduled", "Modified", "Partially Completed", "Delegated"];
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomExceptionNote = () => {
  const notes = [
    "Rescheduled to next available slot",
    "Modified scope to fit time constraints",
    "Completed 80% of the task",
    "Delegated to team member with follow-up",
  ];
  return notes[Math.floor(Math.random() * notes.length)];
};

const sampleHistory = generateSampleHistory();

// Icons
const CheckCircleIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExclamationIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CalendarIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronLeftIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const FunnelIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const TrendUpIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendDownIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const SearchIcon = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Date formatting helpers
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Filter tabs component
const FilterTabs = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All Tasks", count: sampleHistory.length },
    { id: "completed", label: "Completed", count: sampleHistory.filter((t) => t.status === "completed").length },
    { id: "missed", label: "Missed", count: sampleHistory.filter((t) => t.status === "missed").length },
    { id: "exception", label: "Exceptions", count: sampleHistory.filter((t) => t.status === "exception").length },
  ];

  return (
    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeFilter === filter.id
              ? "bg-white dark:bg-gray-700 text-[#00695C] dark:text-[#4DB6AC] shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          {filter.label}
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === filter.id
                ? "bg-[#00695C]/10 dark:bg-[#4DB6AC]/20 text-[#00695C] dark:text-[#4DB6AC]"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

// Stats card component
const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
            {isPositive ? <TrendUpIcon className="w-4 h-4 mr-1" /> : <TrendDownIcon className="w-4 h-4 mr-1" />}
            <span>{Math.abs(change)}% from last week</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

// Task card component
const TaskCard = ({ task }) => {
  const statusConfig = {
    completed: {
      icon: CheckCircleIcon,
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      label: "Completed",
    },
    missed: {
      icon: XCircleIcon,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-500",
      borderColor: "border-red-200 dark:border-red-800",
      label: "Missed",
    },
    exception: {
      icon: ExclamationIcon,
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-500",
      borderColor: "border-amber-200 dark:border-amber-800",
      label: "Exception",
    },
  };

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg bg-white dark:bg-gray-800`}>
          <StatusIcon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{task.title}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${config.iconColor} bg-white dark:bg-gray-800`}
            >
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${task.category.color}`}>
              {task.category.name}
            </span>
            {task.status === "completed" && (
              <>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" />
                  {task.completionTime}
                </span>
                <span>{task.duration} min</span>
              </>
            )}
            {task.status === "missed"

export default function History() { return null; }
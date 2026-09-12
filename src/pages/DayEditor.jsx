

```jsx
import { useState, useRef, useEffect } from "react";

// Sample data for a day
const initialTasks = [
  {
    id: 1,
    title: "Morning team standup meeting",
    description: "Discuss sprint progress and blockers",
    startTime: "09:00",
    endTime: "09:30",
    priority: "medium",
    completed: false,
    category: "meeting",
  },
  {
    id: 2,
    title: "Review pull requests",
    description: "Code review for authentication module",
    startTime: "10:00",
    endTime: "11:00",
    priority: "high",
    completed: true,
    category: "development",
  },
  {
    id: 3,
    title: "Lunch break",
    description: "",
    startTime: "12:00",
    endTime: "13:00",
    priority: "low",
    completed: false,
    category: "break",
  },
  {
    id: 4,
    title: "Update documentation",
    description: "API documentation for v2.0 release",
    startTime: "14:00",
    endTime: "15:30",
    priority: "medium",
    completed: false,
    category: "documentation",
  },
  {
    id: 5,
    title: "Client call - Project review",
    description: "Monthly progress review with Acme Corp",
    startTime: "16:00",
    endTime: "17:00",
    priority: "high",
    completed: false,
    category: "meeting",
  },
];

const categories = [
  { id: "meeting", label: "Meeting", icon: "👥" },
  { id: "development", label: "Development", icon: "💻" },
  { id: "documentation", label: "Documentation", icon: "📝" },
  { id: "break", label: "Break", icon: "☕" },
  { id: "personal", label: "Personal", icon: "⭐" },
];

const priorities = [
  { id: "high", label: "High", color: "#EF4444" },
  { id: "medium", label: "Medium", color: "#F59E0B" },
  { id: "low", label: "Low", color: "#22C55E" },
];

// Icons as components
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DragIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm2 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function DayEditor() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 15)); // September 15, 2026
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startTime: "09:00",
    endTime: "10:00",
    priority: "medium",
    category: "development",
  });

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateShort = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleDragStart = (e, task) => {
    dragItem.current = task.id;
    setDraggedTask(task);
    e.target.classList.add("opacity-50", "scale-105");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("opacity-50", "scale-105");
    setDraggedTask(null);
    setDragOverId(null);
  };

  const handleDragOver = (e, taskId) => {
    e.preventDefault();
    setDragOverId(taskId);
  };

  const handleDrop = (e, targetTask) => {
    e.preventDefault();
    if (!dragItem.current || dragItem.current === targetTask.id) return;

    const draggedTaskIndex = tasks.findIndex((t) => t.id === dragItem.current);
    const targetTaskIndex = tasks.findIndex((t) => t.id === targetTask.id);

    const newTasks = [...tasks];
    const [draggedItem] = newTasks.splice(draggedTaskIndex, 1);
    newTasks.splice(targetTaskIndex, 0, draggedItem);

    setTasks(newTasks);
    dragItem.current = null;
    dragOverItem.current = null;
    setDragOverId(null);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description || "",
      startTime: task.startTime,
      endTime: task.endTime,
      priority: task.priority,
      category: task.category,
    });
  };

  const handleSaveTask = () => {
    if (!newTask.title.trim()) return;

    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...newTask,
              }
            : task
        )
      );
    } else {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
      };
      setTasks([...tasks, task].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    }

    closeModal();
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingTask(null);
    setNewTask({
      title: "",
      description: "",
      startTime: "09:00",
      endTime: "10:00",
      priority: "medium",
      category: "development",
    });
  };

  const getPriorityColor = (priority) => {
    const p = priorities.find((pr) => pr.id === priority);
    return p ? p.color : "#6B7280";
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find((c) => c.id === categoryId) || categories[0];
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
<div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-lg ${darkMode ? "bg-gray-900/90 border-gray-800" : "bg-white/90 border-gray-200"} border-b`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#00695C" }}
              >
                <span className="text-white">
                  <CalendarIcon />
                </span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Day Editor
                </h1>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Plan and organize your day
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
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

              {/* Add Task Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-xl font-medium transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: "#00695C" }}
              >
                <PlusIcon />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => changeDate(-1)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
              }`}
            >
              <ChevronLeftIcon />
            </button>

            <div className="text-center">
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {formatDate(selectedDate)}
              </h2>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {completedCount} of {totalTasks} tasks completed
              </p>
            </div>

            <button
              onClick={() => changeDate(1)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
              }`}
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div

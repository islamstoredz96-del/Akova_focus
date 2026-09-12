```jsx
import React, { useState } from "react";

export default function Programs() {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "برنامج الإرشاد الأكاديمي",
      description: "برنامج شامل لمساعدة الطلاب في اختيار مساراتهم التعليمية والمهنية من خلال جلسات إرشادية فردية وجماعية.",
      status: "نشط",
      participants: 245,
      createdAt: "2026-01-15",
    },
    {
      id: 2,
      name: "برنامج تطوير المهارات القيادية",
      description: "يهدف إلى تنمية مهارات القيادة والعمل الجماعي لدى الشباب من خلال ورش عمل تفاعلية ومشاريع تطبيقية.",
      status: "نشط",
      participants: 128,
      createdAt: "2026-02-10",
    },
    {
      id: 3,
      name: "برنامج التوعية المجتمعية",
      description: "برنامج توعوي يركز على نشر الوعي حول القضايا الاجتماعية والصحية الهامة في المجتمع المحلي.",
      status: "متوقف",
      participants: 0,
      createdAt: "2025-11-20",
    },
    {
      id: 4,
      name: "برنامج الابتكار وريادة الأعمال",
      description: "دعم رواد الأعمال الشباب وتحويل أفكارهم المبتكرة إلى مشاريع حقيقية من خلال التدريب والتمويل.",
      status: "نشط",
      participants: 89,
      createdAt: "2026-03-05",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", status: "نشط" });
  const [activeProgramId, setActiveProgramId] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleCreate = () => {
    setEditingProgram(null);
    setFormData({ name: "", description: "", status: "نشط" });
    setShowModal(true);
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({ name: program.name, description: program.description, status: program.status });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProgram) {
      setPrograms(programs.map(p => p.id === editingProgram.id ? { ...p, ...formData } : p));
    } else {
      const newProgram = {
        id: Date.now(),
        ...formData,
        participants: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPrograms([newProgram, ...programs]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setPrograms(programs.filter(p => p.id !== id));
    setConfirmDelete(null);
    if (activeProgramId === id) setActiveProgramId(null);
  };

  const handleSwitch = (id) => {
    setActiveProgramId(id);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-[#F5F7F8] text-gray-800"}`} dir="rtl">
      {/* Header */}
      <header className={`sticky top-0 z-20 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-gray-200"} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00695C] flex items-center justify-center shadow-lg shadow-[#00695C]/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">البرامج</h1>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>إدارة البرامج التعليمية والمجتمعية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
              aria-label="تبديل الوضع الليلي"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleCreate}
              className="px-5 py-2.5 bg-[#00695C] hover:bg-[#00564B] text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-[#00695C]/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              برنامج جديد
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "إجمالي البرامج", value: programs.length, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
            { label: "البرامج النشطة", value: programs.filter(p => p.status === "نشط").length, icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
            { label: "إجمالي المشاركين", value: programs.reduce((acc, p) => acc + p.participants, 0), icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            { label: "برامج متوقفة", value: programs.filter(p => p.status === "متوقف").length, icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
          ].map((stat, idx) => (
            <div key={idx} className={`rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-[#00695C]">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-[#00695C]/10"}`}>
                  <svg className="w-6 h-6 text-[#00695C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Programs List */}
        <div className={`rounded-2xl shadow-sm ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-gray-200"} flex items-center justify-between`}>
            <h2 className="text-lg font-semibold">قائمة البرامج</h2>
            <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <span>البرنامج النشط:</span>
              <span className="font-medium text-[#00695C]">
                {programs.find(p => p.id === activeProgramId)?.name || "لا يوجد"}
              </span>
            </div>
          </div>

          {programs.length === 0 ? (
            <div className="py-16 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-4 text-gray-500">لا توجد برامج حالياً</p>
              <button onClick={handleCreate} className="mt-4 px-4 py-2 bg-[#00695C] text-white rounded-lg hover:bg-[#00564B] transition-colors">
                إنشاء برنامج جديد
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {programs.map((program) => (
                <li key={program.id} className={`px-6 py-5 transition-colors ${activeProgramId === program.id ? (darkMode ? "bg-[#00695C]/10" : "bg-[#00695C]/5") : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold truncate">{program.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${program.status === "نشط" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                          {program.status}
                        </span>
                        {activeProgramId === program.id && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00695C] text-white">
                            البرنامج النشط
                          </span>
                        )}
                      </div>
                      <p className={`mt-2 text-sm line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{program.description}</p>
                      <div className={`mt-3 flex items-center gap-6 text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {program.participants} مشارك
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(program.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                      </div>
                    
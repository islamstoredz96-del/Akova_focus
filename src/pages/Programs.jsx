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
              className="px-5 py-2.5 bg-[#00695C] hover:bg-[#00564B] text-white rounded-lg font-medium transition-colors duration-200"
            >
              إضافة برنامج جديد
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`p-6 rounded-2xl border transition-all duration-200 ${
                activeProgramId === program.id ? "ring-2 ring-[#00695C]" : ""
              } ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{program.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    program.status === "نشط"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {program.status}
                </span>
              </div>
              <p className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {program.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-4 border-gray-100 dark:border-gray-800">
                <span>المشاركون: {program.participants}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(program)}
                    className="text-blue-600 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    className="text-rose-600 hover:underline"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-2xl ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <h2 className="text-xl font-bold mb-4">
              {editingProgram ? "تعديل البرنامج" : "إضافة برنامج جديد"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">اسم البرنامج</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-2.5 rounded-lg border ${
                    darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الوصف</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full p-2.5 rounded-lg border ${
                    darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الحالة</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={`w-full p-2.5 rounded-lg border ${
                    darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <option value="نشط">نشط</option>
                  <option value="متوقف">متوقف</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00695C] text-white rounded-lg hover:bg-[#00564B]"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
                    

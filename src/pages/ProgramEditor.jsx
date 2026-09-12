```jsx
import { useState } from 'react';

export default function ProgramEditor() {
  const [darkMode, setDarkMode] = useState(false);
  const [programName, setProgramName] = useState('البرنامج التدريبي المتقدم');
  const [programDays, setProgramDays] = useState([
    { id: 1, name: 'اليوم الأول', type: 'تمارين القوة', duration: '45 دقيقة', color: '#00695C' },
    { id: 2, name: 'اليوم الثاني', type: 'تمارين الكارديو', duration: '30 دقيقة', color: '#FFB300' },
    { id: 3, name: 'اليوم الثالث', type: 'راحة', duration: '—', color: '#78909C' },
    { id: 4, name: 'اليوم الرابع', type: 'تمارين القوة', duration: '50 دقيقة', color: '#00695C' },
    { id: 5, name: 'اليوم الخامس', type: 'تمارين الكارديو', duration: '40 دقيقة', color: '#FFB300' },
    { id: 6, name: 'اليوم السادس', type: 'راحة', duration: '—', color: '#78909C' },
    { id: 7, name: 'اليوم السابع', type: 'تمارين شاملة', duration: '60 دقيقة', color: '#00695C' },
  ]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAddDay, setShowAddDay] = useState(false);
  const [newDayName, setNewDayName] = useState('');
  const [newDayType, setNewDayType] = useState('تمارين القوة');
  const [newDayDuration, setNewDayDuration] = useState('30 دقيقة');

  const containerClass = darkMode
    ? 'min-h-screen bg-gray-900 text-gray-100 transition-colors duration-500'
    : 'min-h-screen bg-gray-50 text-gray-800 transition-colors duration-500';

  const cardClass = darkMode
    ? 'bg-gray-800 border-gray-700 shadow-xl'
    : 'bg-white border-gray-200 shadow-lg';

  const inputClass = darkMode
    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-[#00695C]'
    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-[#00695C]';

  const handleAddDay = () => {
    if (!newDayName.trim()) return;
    const newDay = {
      id: Date.now(),
      name: newDayName.trim(),
      type: newDayType,
      duration: newDayDuration,
      color: newDayType === 'تمارين القوة' ? '#00695C' : newDayType === 'تمارين الكارديو' ? '#FFB300' : '#78909C',
    };
    setProgramDays([...programDays, newDay]);
    setNewDayName('');
    setShowAddDay(false);
  };

  const handleDeleteDay = (id) => {
    setProgramDays(programDays.filter(day => day.id !== id));
    if (selectedDay === id) setSelectedDay(programDays[0]?.id || null);
  };

  const selectedDayData = programDays.find(day => day.id === selectedDay);

  return (
    <div dir="rtl" className={containerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00695C] flex items-center justify-center shadow-lg shadow-teal-900/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Inter, Noto Naskh Arabic, Roboto, sans-serif' }}>
                محرر البرنامج
              </h1>
              <p className="text-sm opacity-70 mt-0.5">إنشاء وتعديل البرامج التدريبية وهيكلتها</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#00695C]`}
              aria-label="تبديل الوضع الليلي"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-[#FFB300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#00695C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button className="px-5 py-2.5 bg-[#00695C] text-white rounded-xl font-medium hover:bg-[#00574B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#00695C] focus:ring-offset-2 shadow-lg shadow-teal-900/20">
              حفظ البرنامج
            </button>
          </div>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Right column - Program details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Program name card */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00695C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                اسم البرنامج
              </h2>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00695C]/30 ${inputClass}`}
                placeholder="أدخل اسم البرنامج"
                style={{ fontFamily: 'Inter, Noto Naskh Arabic, Roboto, sans-serif' }}
              />
              <div className="mt-4 flex items-center justify-between text-sm opacity-70">
                <span>عدد الأيام: {programDays.length}</span>
                <span>آخر تعديل: اليوم</span>
              </div>
            </div>

            {/* Program stats */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300`}>
              <h2 className="text-lg font-semibold mb-4">إحصائيات البرنامج</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#00695C]/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#00695C]">{programDays.length}</div>
                  <div className="text-xs opacity-70 mt-1">إجمالي الأيام</div>
                </div>
                <div className="bg-[#FFB300]/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#FFB300]">
                    {programDays.filter(d => d.type === 'تمارين القوة').length}
                  </div>
                  <div className="text-xs opacity-70 mt-1">أيام القوة</div>
                </div>
                <div className="bg-[#FFB300]/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#FFB300]">
                    {programDays.filter(d => d.type === 'تمارين الكارديو').length}
                  </div>
                  <div className="text-xs opacity-70 mt-1">أيام الكارديو</div>
                </div>
                <div className="bg-gray-500/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-500">
                    {programDays.filter(d => d.type === 'راحة').length}
                  </div>
                  <div className="text-xs opacity-70 mt-1">أيام الراحة</div>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300 border-r-4 border-r-[#FFB300]`}>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FFB300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                نصائح سريعة
              </h2>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex items-start gap-2">
                  <span className="text-[#FFB300] mt-1">•</span>
                  <span>وازن بين أيام القوة والكارديو للحصول على أفضل النتائج.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFB300] mt-1">•</span>
                  <span>خصص يوم راحة واحد على الأقل كل 3-4 أيام تدريب.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFB300] mt-1">•</span>
                  <span>ابدأ بالأيام الأساسية ثم أضف التفاصيل لاحقاً.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Left column - Days list */}
          <div className="lg:col-span-2 space-y-6">
            {/* Days list */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#00695C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  أيام البرنامج
                </h2>
                <button
                  onClick={() => setShowAddDay(!showAddDay)}
                  className="px-4 py-2 bg-[#00695C] text-white rounded-xl text-sm font-medium hover:bg-[#00574B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#00695C] focus:ring-offset-2"
                >
                  + إضافة يوم
                </button>
              </div>

              {/* Add day form */}
              {showAddDay && (
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4 mb-4 border-2 border-[#00695C]/30 animate-pulse`}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={newDayName}
                      onChange={(e) => setNewDayName(e.target.value)}
                      placeholder="اسم اليوم"
                      className={`w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-[#00695C] text-sm ${inputClass}`}
                    />
                    <select
                      value={newDayType}
                      onChange={(e) => setNewDayType(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-[#00695C] text-sm ${inputClass}`}
                    >
                      <option>تمارين القوة</option>
                      <option>تمارين الكارديو</option>
                      <option>راحة</option>
                      <option>تمارين شاملة</option>
                    </select>
                    <input
                      type="text"
                      value={newDayDuration}
                      onChange={(e) => setNewDayDuration(e.target.value)}
                      placeholder="المدة"
                      className={`w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-[#00695C] text-sm ${inputClass}`}
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleAddDay}
                      className="px-4 py-2 bg-[#00695C] text-white rounded-lg text-sm hover:bg-[#00574B] transition-colors"
                    >
                      إضافة
                    </button>
                    <button
                      onClick={() => setShowAddDay(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* Days grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programDays.map((day) => (
                  <div
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`${selectedDay === day.id ? 'ring-2 ring-[#00695C] bg-[#00695C]/5' : darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl p-4 cursor-pointer transition-all duration-300 border border-transparent hover:border-[#00695C]/30`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: day.color }}
                        >
                          {day.id}
                        </div>
                        <div>
                          <div className="font-medium">{day.name}</div>
                          <div className="text-xs opacity-60">{day.type}</div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDay(day.id);
                        }}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-100 transition-colors opacity-60 hover:opacity-100"
                        aria-label={`حذف ${day.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="current
export default function Home() {
  const currentTask = {
    title: "مراجعة خطة التسويق الربع سنوية",
    project: "حملة إطلاق المنتج الجديد",
    priority: "عالية",
    progress: 65,
    dueTime: "2:30 م",
    assignee: "سارة أحمد",
  };

  const nextTask = {
    title: "اجتماع فريق التصميم",
    project: "تحديث الهوية البصرية",
    priority: "متوسطة",
    dueTime: "4:00 م",
    assignee: "عمر خالد",
  };

  const freeTime = {
    duration: "45 دقيقة",
    start: "6:00 م",
    suggestions: ["مراجعة البريد الإلكتروني", "تحديث الملفات الشخصية", "جلسة تركيز قصيرة"],
  };

  const weeklyStats = [
    { label: "المهام المكتملة", value: 18, icon: "✓", color: "#00695C" },
    { label: "المهام قيد التنفيذ", value: 5, icon: "◔", color: "#FFB300" },
    { label: "ساعات العمل", value: 32, icon: "⏱", color: "#1E88E5" },
    { label: "الاجتماعات", value: 7, icon: "📅", color: "#8E24AA" },
  ];

  const weeklyProgress = [
    { day: "السبت", percent: 80 },
    { day: "الأحد", percent: 65 },
    { day: "الاثنين", percent: 90 },
    { day: "الثلاثاء", percent: 45 },
    { day: "الأربعاء", percent: 70 },
    { day: "الخميس", percent: 55 },
    { day: "الجمعة", percent: 30 },
  ];

  const quickActions = [
    { title: "إنشاء مهمة جديدة", description: "أضف مهمة جديدة إلى قائمتك", icon: "＋", color: "#00695C" },
    { title: "جدولة اجتماع", description: "قم بجدولة اجتماع مع فريقك", icon: "📅", color: "#FFB300" },
    { title: "رفع ملف", description: "شارك ملفاً مع فريقك", icon: "⇧", color: "#1E88E5" },
    { title: "إرسال تقرير", description: "أنشئ تقريراً أسبوعياً", icon: "📊", color: "#8E24AA" },
  ];

  const upcomingDeadlines = [
    { task: "تسليم التقرير المالي", date: "اليوم", time: "5:00 م", color: "#C62828" },
    { task: "الموافقة على تصميم الشعار", date: "غداً", time: "10:00 ص", color: "#FFB300" },
    { task: "نشر مقال المدونة", date: "الأحد", time: "12:00 م", color: "#00695C" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 font-sans transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">لوحة التحكم الرئيسية</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">أهلاً بعودتك يا أحمد! لديك 3 مهام مستحقة اليوم.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 dark:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-12 h-12 rounded-full bg-[#00695C] text-white flex items-center justify-center text-xl font-bold shadow-lg">أ</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Task + Free Time */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Task Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#00695C] animate-pulse"></span>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">المهمة الحالية</h2>
                </div>
                <span className="px-3 py-1 bg-[#00695C]/10 text-[#00695C] dark:bg-[#00695C]/20 dark:text-teal-300 rounded-full text-sm font-semibold">
                  {currentTask.priority}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{currentTask.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{currentTask.project}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>نسبة الإنجاز</span>
                  <span className="font-semibold text-[#00695C]">{currentTask.progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-[#00695C] to-[#00897B] rounded-full transition-all duration-500"
                    style={{ width: `${currentTask.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-[#00695C]">⏰</span>
                  <span>تستحق: {currentTask.dueTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00695C]">👤</span>
                  <span>المسؤول: {currentTask.assignee}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 bg-[#00695C] text-white rounded-lg hover:bg-[#005a4f] transition-colors duration-300 text-sm font-semibold shadow-md hover:shadow-lg">
                  بدء المهمة
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-sm font-semibold">
                  التفاصيل
                </button>
              </div>
            </div>

            {/* Free Time Card */}
            <div className="bg-gradient-to-l from-[#00695C] to-[#00897B] rounded-2xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">وقت الفراغ</h2>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">مقترح</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">🌿</span>
                <div>
                  <p className="text-lg font-semibold">{freeTime.duration} من الوقت المتاح</p>
                  <p className="text-white/80 text-sm">يبدأ في {freeTime.start}</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-semibold mb-2 text-sm text-white/90">اقتراحات للاستفادة من الوقت:</p>
                <ul className="space-y-1.5">
                  {freeTime.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 bg-[#FFB300] rounded-full"></span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">تقدم المهام الأسبوعي</h2>
              <div className="flex items-end justify-between gap-2 md:gap-4 h-48">
                {weeklyProgress.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{item.percent}%</span>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden" style={{ height: "120px" }}>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          item.percent > 60
                            ? "bg-[#00695C]"
                            : item.percent > 40
                            ? "bg-[#FFB300]"
                            : "bg-gray-400 dark:bg-gray-500"
                        }`}
                        style={{ height: `${item.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Next Task + Stats + Quick Actions */}
          <div className="space-y-6">
            {/* Next Task Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-r-4 border-[#FFB300] transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">المهمة التالية</h2>
                <span className="px-3 py-1 bg-[#FFB300]/10 text-[#FFB300] dark:bg-[#FFB300]/20 dark:text-amber-300 rounded-full text-sm font-semibold">
                  {nextTask.priority}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{nextTask.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{nextTask.project}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFB300]">⏰</span>
                  <span>{nextTask.dueTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFB300]">👤</span>
                  <span>{nextTask.assignee}</span>
                </div>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-[#FFB300] text-gray-900 rounded-lg hover:bg-amber-400 transition-colors duration-300 text-sm font-semibold shadow-md hover:shadow-lg">
                عرض التفاصيل
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              {weeklyStats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl" style={{ color: stat.color }}>{stat.icon}</span>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">إجراءات سريعة</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="group p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 text-center"
                  >
                    <span
                      className="inline-flex w-10 h-10 items-center justify-center rounded-full text-white text-lg mb-2 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: action.color }}
                    >
                      {action.icon}
                    </span>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm mb-1">{action.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">المواعيد القادمة</h2>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: deadline.color }}></span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{deadline.task}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{deadline.date} · {deadline.time}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{deadline.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


```jsx
import { useState, useRef, useEffect } from "react";

export default function AIPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: {
        type: "greeting",
        text: "مرحباً! أنا مساعدك الذكي للتخطيط وتنظيم البرامج والجداول الزمنية. كيف يمكنني مساعدتك اليوم؟",
        suggestions: [
          "إنشاء جدول أسبوعي جديد",
          "تحسين برنامج تدريبي موجود",
          "تخطيط مشروع جديد",
          "تنظيم مواعيد العمل"
        ]
      }
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: {
        type: "text",
        text: inputValue
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content: {
          type: "response",
          text: "سأقوم بتحليل طلبك وإنشاء خطة شاملة لك. دعني أعرض عليك بعض الخيارات المحسّنة.",
          actions: [
            { label: "عرض التفاصيل", icon: "📋" },
            { label: "تعديل المقترح", icon: "✏️" },
            { label: "حفظ كمسودة", icon: "💾" }
          ]
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const schedules = [
    {
      id: 1,
      name: "البرنامج التدريبي الأسبوعي",
      tasks: 12,
      progress: 68,
      lastUpdated: "منذ ساعتين"
    },
    {
      id: 2,
      name: "جدول المشاريع الشهرية",
      tasks: 24,
      progress: 45,
      lastUpdated: "منذ يوم"
    },
    {
      id: 3,
      name: "مواعيد الفريق الأسبوعية",
      tasks: 8,
      progress: 82,
      lastUpdated: "منذ 3 أيام"
    }
  ];

  const aiCapabilities = [
    {
      id: 1,
      title: "إنشاء برامج",
      description: "قم بإنشاء برامج متكاملة من الصفر بناءً على أهدافك ومتطلباتك",
      icon: "📋",
      color: "bg-teal-500"
    },
    {
      id: 2,
      title: "تحسين الجداول",
      description: "حسّن جداولك الحالية واقترح تعديلات ذكية لزيادة الإنتاجية",
      icon: "⚡",
      color: "bg-amber-500"
    },
    {
      id: 3,
      title: "توزيع المهام",
      description: "وزّع المهام بذكاء على الوقت والموارد المتاحة",
      icon: "🎯",
      color: "bg-blue-500"
    },
    {
      id: 4,
      title: "المتابعة الذكية",
      description: "تتبع التقدم واحصل على تذكيرات ذكية للمواعيد",
      icon: "📊",
      color: "bg-purple-500"
    }
  ];

  const tabs = [
    { id: "chat", label: "المحادثة", icon: "💬" },
    { id: "planner", label: "المخطط", icon: "📅" },
    { id: "templates", label: "القوالب", icon: "📁" },
    { id: "history", label: "السجل", icon: "📜" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`} dir="rtl">
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg ${darkMode ? "bg-gray-900/90 border-gray-800" : "bg-white/90 border-gray-200"} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>المساعد الذكي</h1>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>مدير البرامج والجداول</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl transition-all duration-200 ${darkMode ? "bg-gray-800 text-amber-400 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
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
              <button className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${darkMode ? "bg-teal-600 hover:bg-teal-500 text-white" : "bg-teal-600 hover:bg-teal-700 text-white"}`}>
                ترقية الاشتراك
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={`${darkMode ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} border-b sticky top-16 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? darkMode
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/25"
                      : "bg-teal-600 text-white shadow-lg shadow-teal-600/25"
                    : darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2 space-y-4">
              {/* Chat Header */}
              <div className={`${darkMode ? "bg-gray-800/50" : "bg-white"} rounded-2xl p-4 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>المساعد الذكي</h2>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>متصل الآن</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    <button className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className={`${darkMode ? "bg-gray-800/50" : "bg-white"} rounded-2xl border ${darkMode ? "border-gray-700" : "border-gray-200"} h-96 lg:h-[500px] overflow-y-auto p-4 space-y-4`}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      )}
                      <div className={`${message.role === "user" ? "bg-teal-600 text-white" : darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} rounded-2xl rounded-tr-sm px-4 py-3`}>
                        <p className="text-sm leading-relaxed">{message.content.text}</p>
                        {message.content.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.content.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                                  darkMode
                                    ? "bg-gray-600 hover:bg
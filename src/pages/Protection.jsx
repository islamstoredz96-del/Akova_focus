```jsx
export default function Protection() {
  const protectionLevels = [
    {
      id: "flexible",
      name: "Flexible",
      arabicName: "مرن",
      description: "Minimal intervention. Allows most apps and activities while monitoring for potential risks.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      color: "#4CAF50",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      selected: false,
    },
    {
      id: "balanced",
      name: "Balanced",
      arabicName: "متوازن",
      description: "Recommended. Balances usability and protection with smart app behavior analysis.",
      icon: "M20 12a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 110 6 3 3 0 010-6z",
      color: "#FFB300",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      selected: true,
    },
    {
      id: "strict",
      name: "Strict",
      arabicName: "صارم",
      description: "Maximum security. Blocks suspicious apps and requires approval for sensitive actions.",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      color: "#D32F2F",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      selected: false,
    },
  ];

  const allowedApps = [
    { name: "WhatsApp", category: "Communication", icon: "M4 6h16M4 12h16M4 18h16", status: "Allowed", color: "text-green-600 dark:text-green-400" },
    { name: "Google Maps", category: "Navigation", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", status: "Allowed", color: "text-green-600 dark:text-green-400" },
    { name: "Spotify", category: "Music", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z", status: "Allowed", color: "text-green-600 dark:text-green-400" },
  ];

  const blockedApps = [
    { name: "TikTok", category: "Social Media", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 019.5 3H8", status: "Blocked", color: "text-red-600 dark:text-red-400" },
    { name: "Unknown APK", category: "Sideloaded", icon: "M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728", status: "Blocked", color: "text-red-600 dark:text-red-400" },
  ];

  const emergencyContacts = [
    { name: "Sarah Ahmed", relation: "Mother", phone: "+20 100 123 4567", initials: "SA" },
    { name: "Omar Hassan", relation: "Father", phone: "+20 100 765 4321", initials: "OH" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans" dir="rtl" style={{ fontFamily: "'Inter', 'Noto Naskh Arabic', 'Roboto', sans-serif" }}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: "#00695C" }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Protection</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">الحماية</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              Active
            </span>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Protection Level Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Protection Level</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose how strictly your device monitors app behavior</p>
            </div>
            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "#00695C", color: "#fff" }}>
              Current: Balanced
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {protectionLevels.map((level) => (
              <button
                key={level.id}
                className={`relative p-5 rounded-2xl border-2 text-right transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  level.selected ? "border-transparent shadow-lg" : "border-gray-200 dark:border-gray-700"
                } ${level.bg}`}
                style={level.selected ? { borderColor: "#00695C", boxShadow: "0 8px 24px rgba(0,105,92,0.15)" } : {}}
              >
                {level.selected && (
                  <span className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center" style={{ border: "2px solid #00695C" }}>
                    <svg className="w-3.5 h-3.5" style={{ color: "#00695C" }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: level.color }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={level.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{level.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{level.arabicName}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{level.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Apps Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Allowed Apps */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Allowed Apps</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Apps permitted to run</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                {allowedApps.length} total
              </span>
            </div>
            <div className="space-y-3">
              {allowedApps.map((app) => (
                <div key={app.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={app.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{app.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{app.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${app.color}`}>{app.status}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-[#00695C] hover:text-[#00695C] dark:hover:text-[#4DB6AC] transition-colors">
              + Add App to Allowed List
            </button>
          </section>

          {/* Blocked Apps */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Blocked Apps</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Apps denied access</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">
                {blockedApps.length} total
              </span>
            </div>
            <div className="space-y-3">
              {blockedApps.map((app) => (
                <div key={app.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100
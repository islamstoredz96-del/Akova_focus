import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import ProgramEditor from "./pages/ProgramEditor.jsx";
import Days from "./pages/Days.jsx";
import DayEditor from "./pages/DayEditor.jsx";
import TaskEditor from "./pages/TaskEditor.jsx";
import Schedule from "./pages/Schedule.jsx";
import Protection from "./pages/Protection.jsx";
import Prayer from "./pages/Prayer.jsx";
import Sleep from "./pages/Sleep.jsx";
import Notifications from "./pages/Notifications.jsx";
import Progress from "./pages/Progress.jsx";
import History from "./pages/History.jsx";
import Ai from "./pages/Ai.jsx";
import Auth from "./pages/Auth.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-white/10">
        <nav className="max-w-6xl mx-auto flex items-center gap-2 px-4 py-3 overflow-x-auto">
          <Link to="/" className="font-bold text-base mr-2 whitespace-nowrap">akova-focus</Link>
          <div className="flex gap-1 ml-auto">
          <Link to="/" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Home</Link>
          <Link to="/programs" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Programs</Link>
          <Link to="/program-editor" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Program Editor</Link>
          <Link to="/days" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Days</Link>
          <Link to="/day-editor" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Day Editor</Link>
          <Link to="/task-editor" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Task Editor</Link>
          <Link to="/schedule" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Schedule</Link>
          <Link to="/protection" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Protection</Link>
          <Link to="/prayer" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Prayer</Link>
          <Link to="/sleep" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Sleep</Link>
          <Link to="/notifications" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Notifications</Link>
          <Link to="/progress" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Progress</Link>
          <Link to="/history" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">History</Link>
          <Link to="/ai" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">AI</Link>
          <Link to="/auth" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Authentication</Link>
          <Link to="/settings" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Settings</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/program-editor" element={<ProgramEditor />} />
        <Route path="/days" element={<Days />} />
        <Route path="/day-editor" element={<DayEditor />} />
        <Route path="/task-editor" element={<TaskEditor />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/protection" element={<Protection />} />
        <Route path="/prayer" element={<Prayer />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/history" element={<History />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <footer className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © 2026 akova-focus
      </footer>
    </div>
  );
}

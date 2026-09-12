

```jsx
import { useState, useEffect } from "react";

const scheduleData = [
  {
    id: 1,
    title: "Morning Standup Meeting",
    titleAr: "اجتماع الوقوف الصباحي",
    time: "09:00",
    endTime: "09:30",
    type: "meeting",
    status: "completed",
    attendees: 5,
    location: "Conference Room A",
  },
  {
    id: 2,
    title: "Project Review Session",
    titleAr: "جلسة مراجعة المشروع",
    time: "10:00",
    endTime: "11:30",
    type: "review",
    status: "in-progress",
    attendees: 8,
    location: "Main Hall",
    conflict: true,
    conflictWith: "Client Call",
  },
  {
    id: 3,
    title: "Client Call",
    titleAr: "مكالمة العميل",
    time: "10:30",
    endTime: "11:00",
    type: "call",
    status: "conflict",
    attendees: 2,
    location: "Virtual",
  },
  {
    id: 4,
    title: "Design Sprint Planning",
    titleAr: "تخطيط سباق التصميم",
    time: "11:30",
    endTime: "13:00",
    type: "planning",
    status: "scheduled",
    attendees: 6,
    location: "Room 204",
  },
  {
    id: 5,
    title: "Lunch Break",
    titleAr: "استراحة الغداء",
    time: "13:00",
    endTime: "14:00",
    type: "break",
    status: "scheduled",
    location: "Cafeteria",
  },
  {
    id: 6,
    title: "Code Review & Merge",
    titleAr: "مراجعة الكود والدمج",
    time: "14:00",
    endTime: "15:30",
    type: "development",
    status: "delayed",
    delay: 25,
    attendees: 3,
    location: "Dev Lab",
  },
  {
    id: 7,
    title: "Documentation Update",
    titleAr: "تحديث التوثيق",
    time: "15:30",
    endTime: "16:30",
    type: "documentation",
    status: "scheduled",
    attendees: 1,
    location: "Home Office",
  },
  {
    id: 8,
    title: "Team Sync & Wrap-up",
    titleAr: "مزامنة الفريق والختام",
    time: "16:30",
    endTime: "17:30",
    type: "meeting",
    status: "scheduled",
    attendees: 12,
    location: "Conference Room B",
  },
];

const typeIcons = {
  meeting: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  review: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  call: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  planning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )
};

export default function Schedule() { return null; }

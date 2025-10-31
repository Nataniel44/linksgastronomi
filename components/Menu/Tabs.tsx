"use client";
import React from "react";

type Tab = {
  key: string;
  label: string;
};

interface TabsProps {
  tabs: Tab[];
  tab: string;
  setTab: (tab: string) => void;
}

export default function Tabs({ tabs, tab, setTab }: TabsProps) {
  return (
    <div className="flex gap-2 p-1 rounded-full bg-white/5 shadow-inner">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => setTab(t.key)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            tab === t.key ? "bg-white text-black" : "text-white/80 hover:text-white"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

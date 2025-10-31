import React from "react"
export function SideBanner({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="hidden lg:flex items-center ">
      <div
        className=" select-none text-white/80 tracking-[0.2em]"
        style={{ fontWeight: 700 }}
      >
        {label}
        {sub ? <span className="text-white/50"> • {sub}</span> : null}
      </div>
    </div>
  );
}

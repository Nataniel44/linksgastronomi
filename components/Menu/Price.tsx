"use client";


export function Price({ value }: { value: number | string }) {
  return (
    <span className="px-3 py-0.5 rounded-lg bg-white/10 border-white/20 font-semibold tracking-wider">
      $
      {typeof value === "number"
        ? value.toLocaleString("es-AR")
        : value}
    </span>
  );
}

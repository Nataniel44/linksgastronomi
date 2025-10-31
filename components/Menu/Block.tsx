import { neon } from "@/data/menuData";
import React from "react"
interface BlockProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string; // <-- importante
}
export function Block({
  title,
  subtitle,
  children,
  className
}: BlockProps) {
  return (
    <section className={`relative  rounded-2xl   flex flex-col  gap-3 ${className}`}>

      {title && (
        <h3 className="text-3xl text-start uppercase  md:text-2xl font-medium  mb-1  ">
          <span
            className="pr-2"
            style={{ textShadow: `0 0 15px ${neon.pink}aa` }}
          >
            {title}
          </span>
        </h3>
      )}
      {subtitle && (
        <p className="text-white text-sm mb-4">{subtitle}</p>
      )}
      {children}
    </section>
  );
}

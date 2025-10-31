"use client";
import React from "react"
import { DotSep } from "./DotSep";
import { Price } from "./Price";

export function Item({
  name,
  desc,
  price,
}: {
  name: string;
  desc?: string;
  price?: number | string;
}) {
  return (
    <div className="py-2">
      <div className="flex gap-3 items-start">
        <h4 className="font-semibold leading-tight">{name}</h4>
        {price != null && <Price value={price} />}
      </div>
      {desc && (
        <p className="text-white/70 text-sm mt-1 leading-snug">{desc}</p>
      )}
      <DotSep />
    </div>
  );
}

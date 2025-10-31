import React from "react";

export function ElegantSpacer({ size = "md", divId = "home" }: { size?: "sm" | "md" | "lg" | "x", divId?: string }) {
    const heights = {
        sm: "h-4",
        md: "h-8",
        lg: "h-16",
        x: "h-26",
    };
    return (
        <div id={divId} className={`w-full flex items-center justify-center ${heights[size]}`}>
            <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
    );
}

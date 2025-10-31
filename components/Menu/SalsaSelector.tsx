import React, { useState } from "react";

interface SalsaSelectorProps {
    salsas: string[];
    onSelect: (selected: string) => void;
}

export const SalsaSelector: React.FC<SalsaSelectorProps> = ({ salsas, onSelect }) => {
    const [selected, setSelected] = useState<string>("");

    const handleClick = (salsa: string) => {
        setSelected(salsa);
        onSelect(salsa);
    };

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {salsas.map((s) => (
                <button
                    key={s}
                    type="button"
                    className={`px-3 py-1 rounded-full border transition font-semibold ${selected === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-black border-gray-300"}`}
                    onClick={() => handleClick(s)}
                >
                    {s}
                </button>
            ))}
            <span className="text-xs text-gray-500 ml-2">(Elegí una salsa)</span>
        </div>
    );
};

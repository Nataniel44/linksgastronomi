import React, { useState } from "react";

interface GuarnicionSelectorProps {
    guarniciones: string[];
    maxSelect?: number;
    onSelect: (selected: string[]) => void;
}

export const GuarnicionSelector: React.FC<GuarnicionSelectorProps> = ({ guarniciones, maxSelect = 2, onSelect }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleClick = (guarnicion: string) => {
        let newSelected;
        if (selected.includes(guarnicion)) {
            newSelected = selected.filter(g => g !== guarnicion);
        } else if (selected.length < maxSelect) {
            newSelected = [...selected, guarnicion];
        } else {
            newSelected = selected;
        }
        setSelected(newSelected);
        onSelect(newSelected);
    };

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {guarniciones.map((g) => (
                <button
                    key={g}
                    type="button"
                    className={`px-3 py-1 rounded-full border transition font-semibold ${selected.includes(g) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-black border-gray-300"}`}
                    onClick={() => handleClick(g)}
                    disabled={selected.length >= maxSelect && !selected.includes(g)}
                >
                    {g}
                </button>
            ))}
            <span className="text-xs text-gray-500 ml-2">(Elegí hasta {maxSelect})</span>
        </div>
    );
};

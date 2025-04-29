"use client";

import { motion } from "framer-motion";

const items = [
    { text: " HAMBURGESAS", col: "col-span-3 md:col-span-3 bg-black", row: " ", delay: 0 },
    { text: "COMBOS", col: "", row: "row-span-2 bg-black", delay: 0.2 },
    { text: "SUPER", col: "col-span-2", row: "bg-black", delay: 0.4 },
    { text: "CLASICOS", col: "col-span-2", row: "bg-black", delay: 0.6 },
];

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-3 gap-3 p-4 h-64">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className={` text-center  p-3 rounded-lg flex text-white justify-center items-center text-xl font-bold ${item.col} ${item.row}`}
                >
                    {item.text}
                </motion.div>
            ))}
        </div>
    );
}

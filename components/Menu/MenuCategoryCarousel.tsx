// components/Menu/MenuCategoryCarousel.tsx
"use client";
import React, { useState } from "react";
import MenuCard from "./MenuCard";
import Tabs from "./Tabs";
import { Block } from "./Block";

type Category = {
    key: string;
    label: string;
    products: any[];
};

export default function MenuCategoryCarousel({ categories }: { categories: Category[] }) {
    const [activeTab, setActiveTab] = useState(categories[0].key);

    const tabs = categories.map((c) => ({ key: c.key, label: c.label }));

    const activeCategory = categories.find((c) => c.key === activeTab);

    return (
        <div className="flex flex-col gap-4">
            <Tabs tabs={tabs} tab={activeTab} setTab={setActiveTab} />

            {activeCategory?.products.map((subCat: any) => (
                <Block key={subCat.name} title={subCat.name}>
                    <MenuCard product={subCat} />
                </Block>
            ))}
        </div>
    );
}

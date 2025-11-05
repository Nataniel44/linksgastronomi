export type Extra = { name: string; price: number };

export type Size = { portion?: string; name?: string; price: number };

export type Salsa = string | { name: string; price?: number };

export type ProductOptions = {
    sizes?: Size[];
    extras?: Extra[];
    salsas?: Salsa[];
    sabores?: string[];
    precios?: Record<string, number>;
};

export type Product = {
    id: number;
    name: string;
    slug?: string;
    description?: string | null;
    image?: string | null;
    price: number;
    comparePrice?: number | null;
    options?: ProductOptions;
    categoryId?: number;
    subcategoryId?: number | null;
};

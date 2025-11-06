import React from 'react';
import { Phone, MessageCircle, MapPin, Store } from 'lucide-react';
import Image from 'next/image';

type BannerProps = {
    name: string;
    logo?: string | null;
    banner?: string | null;
    description?: string | null;
    phone?: string | null;
    whatsapp?: string | null;
    address?: string | null;
    getImageSrc: (src?: string) => string;
};

export const Banner: React.FC<BannerProps> = ({
    name,
    logo,
    banner,
    description,
    phone,
    whatsapp,
    address,
    getImageSrc
}) => (
    <div className="relative w-full h-[400px] md:h-[320px] overflow-hidden rounded-b-lg shadow-2xl ">
        {/* Imagen de fondo */}
        {banner ? (
            <div
                className="absolute inset-0 bg-cover bg-center"

            />
        ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-purple-600/50 to-pink-600/50" />
        )}

        {/* Overlay con gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-10">
            {/* Logo y Nombre */}
            <div className="mb-4">
                {logo ? (
                    <div className="bg-white/25 border border-black/30 backdrop-blur-sm rounded-xl p-4 inline-block shadow-xl ">
                        <Image
                            width={720}
                            height={568}
                            src={getImageSrc(logo)}
                            alt={name}
                            className="h-16 md:h-20 w-auto object-contain"
                        />
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                            <Store className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
                            {name}
                        </h1>
                    </div>
                )}
            </div>

            {/* Descripción */}
            {description && (
                <p className="text-sm md:text-base text-white/95 max-w-3xl mb-4 leading-relaxed drop-shadow-lg">
                    {description}
                </p>
            )}

            {/* Información de contacto - ESTILIZADO */}
            <div className="flex flex-wrap justify-center items-center gap-3">
                {phone && (
                    <a
                        href={`tel:${phone}`}
                        className="group flex items-center gap-2.5 bg-gradient-to-r from-blue-500/50 to-blue-600/50 hover:from-blue-600 hover:to-blue-700 backdrop-blur-md px-3 py-1  rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 border border-white/20"
                    >
                        <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                            <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-wide">{phone}</span>
                    </a>
                )}

                {whatsapp && (
                    <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 bg-gradient-to-r from-green-500/50 to-green-600/50 hover:from-green-600 hover:to-green-700 backdrop-blur-md px-3 py-1  rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 border border-white/20"
                    >
                        <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-wide">WhatsApp</span>
                    </a>
                )}

                {address && (
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 bg-gradient-to-r from-gray-500/50 to-gray-600/50 hover:from-gray-600 hover:to-gray-700 backdrop-blur-md px-3 py-1 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 border border-white/20"
                    >
                        <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-wide">Ubicación</span>
                    </a>
                )}

            </div>
        </div>
    </div>
);
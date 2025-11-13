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
    <div className="relative w-full h-[600px] md:h-[480px] overflow-hidden rounded-b-lg shadow-2xl ">
        {/* Imagen de fondo con background-image */}
        {banner ? (
            <>

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getImageSrc(banner)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 z-10 to-transparent" />
            </>

        ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        )}

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center z-30">
            <div className='flex flex-col justify-center items-center md:gap-8 md:flex-row'>
                {/* Logo */}
                <div className="mb-6">
                    {logo ? (
                        <div className="group relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden md:rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-2xl p-4 transition-all duration-300 hover:scale-105 hover:border-white/30">
                            <Image
                                src={getImageSrc(logo)}
                                alt={name}
                                width={176}
                                height={176}
                                priority
                                className="object-contain w-full h-full"
                            />
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-3">
                            <div className="bg-white/15 backdrop-blur-md p-3 rounded-xl border border-white/20">
                                <Store className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    )}
                </div>
                <div>


                    {/* Nombre del restaurante */}
                    <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight leading-tight mb-4">
                        {name}
                    </h1>

                    {/* Descripción */}
                    {description && (
                        <p className="text-sm md:text-lg text-white/90 max-w-2xl mb-8 leading-relaxed drop-shadow-lg font-light px-4">
                            {description}
                        </p>
                    )}

                    {/* Botones de contacto */}
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        {phone && (
                            <a
                                href={`tel:${phone}`}
                                className="group flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl px-5 py-3 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 border border-white/30"
                            >
                                <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
                                <span className="text-sm md:text-base font-semibold">{phone}</span>
                            </a>
                        )}

                        {whatsapp && (
                            <a
                                href={`https://wa.me/${whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2.5 bg-green-500 hover:bg-green-600 backdrop-blur-xl px-5 py-3 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
                            >
                                <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span className="text-sm md:text-base font-semibold">WhatsApp</span>
                            </a>
                        )}

                        {address && (
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl px-5 py-3 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 border border-white/30"
                            >
                                <MapPin className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span className="text-sm md:text-base font-semibold">Ubicación</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {/* Degradado inferior sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none" />
    </div>
);
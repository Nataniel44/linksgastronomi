import Image from "next/image";

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
    <div className="relative w-full h-[250px]">
        {banner && (
            <Image
                src={getImageSrc(banner)}
                alt={name}
                fill
                className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm flex flex-col justify-end p-6 md:p-12">
            <div className="flex items-center gap-4 mb-4">
                {logo ? (
                    <Image
                        src={getImageSrc(logo)}
                        alt={name}
                        width={200}
                        height={120}
                        className="  "
                    />
                ) : (
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        {name}
                    </h1>
                )}
            </div>
            <div className="text-white space-y-2 md:space-y-3">
                {description && <p className="text-sm md:text-lg text-white/90 max-w-2xl">{description}</p>}
                <div className="flex flex-wrap gap-4 mt-2 md:mt-4 text-sm md:text-base">
                    {phone && <span className="flex items-center gap-1">📞 <a href={`tel:${phone}`} className="underline">{phone}</a></span>}
                    {whatsapp && <span className="flex items-center gap-1">💬 <a href={`https://wa.me/${whatsapp}`} target="_blank" className="underline">WhatsApp</a></span>}
                    {address && <span className="flex items-center gap-1">📍 {address}</span>}
                </div>
            </div>
        </div>
    </div>
);

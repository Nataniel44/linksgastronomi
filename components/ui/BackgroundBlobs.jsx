export function BackgroundBlobs({ colors = [], className = '' }) {
    return (
        <div className={`absolute -z-50 top-0 left-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
            <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    <filter id="blurfondo" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="70" />
                    </filter>
                </defs>
                <ellipse cx="600" cy="200" rx="220" ry="120" fill={colors[0] || "#fde047"} filter="url(#blurfondo)" />
                <ellipse cx="200" cy="300" rx="180" ry="100" fill={colors[1] || "#facc15"} filter="url(#blurfondo)" />
                <ellipse cx="700" cy="500" rx="90" ry="60" fill={colors[2] || "#fbbf24"} filter="url(#blurfondo)" />
            </svg>
        </div>
    );
}
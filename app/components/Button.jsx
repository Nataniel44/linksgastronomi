import Link from "next/link";

export function Button() {
    return (
        <>
            <Link href="/demo">
                <button className="bg-green-500/40 hover:bg-green-400/40 uppercase backdrop-blur-md rounded-full px-4 border border-green-400/70 text-xs py-2">
                    Ver Demo
                </button>
            </Link>
        </>
    );
}

// components/ComboCard.jsx

export default function ComboCard({ title, description, price }) {
    return (
        <div className="bg-zinc-900 text-white rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            {description && <p className="text-sm text-zinc-300 mb-3">{description}</p>}
            <div className="text-2xl font-semibold text-yellow-400">${price}</div>
        </div>
    );
}

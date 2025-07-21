const HorarioModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto z-10 relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-1 shadow"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">Horarios de Atención</h2>
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden text-sm">
          <thead className="bg-yellow-100 text-yellow-700">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Día</th>
              <th className="px-4 py-2 text-left font-semibold">Apertura</th>
              <th className="px-4 py-2 text-left font-semibold">Cierre</th>
            </tr>
          </thead>
          <tbody>
            {[{ dia: "Viernes", apertura: "20:00", cierre: "23:00" },
              { dia: "Sábado", apertura: "20:00", cierre: "23:00" },
              { dia: "Domingo", apertura: "20:00", cierre: "23:00" }].map((h, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-yellow-50"}>
                <td className="px-4 py-2 text-gray-700">{h.dia}</td>
                <td className="px-4 py-2 text-gray-600">{h.apertura}</td>
                <td className="px-4 py-2 text-gray-600">{h.cierre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HorarioModal;

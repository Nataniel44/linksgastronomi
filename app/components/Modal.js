
export const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

    return (
        <div
            className="fixed inset-0 p-3  bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 "
            onClick={closeModal}
        >
            <div
                className="bg-black/80  backdrop-blur-sm border-black border  overflow-hidden rounded-lg max-w-full relative"
                onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer clic dentro del modal
            >
                <button
                    className="absolute top-2 right-2 text-lg font-bold text-white hover:text-gray-800"
                    onClick={closeModal}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};


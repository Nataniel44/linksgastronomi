
export const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

    return (
        <dialog
            className="fixed inset-0 h-full w-full p-3  bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 "
            onClick={closeModal}
        >
            <div
                className=" border-black overflow-hidden rounded-lg max-w-full relative"
                onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer clic dentro del modal
            >
                <button
                    className="fixed top-2 right-2 text-3xl font-bold text-black hover:text-gray-800 z-50"
                    onClick={closeModal}
                >
                    X
                </button>
                {children}
            </div>
        </dialog>
    );
};


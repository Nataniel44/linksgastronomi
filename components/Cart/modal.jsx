function Modal() {
    return (<>

        {/* Datos del cliente */}
        <div className="space-y-3">
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 text-gray-500 focus:ring-blue-500 outline-none"
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 text-gray-500 focus:ring-blue-500 outline-none"
            />
        </div>

        {/* Tipo de entrega */}
        <div>
            <h3 className="font-semibold text-gray-700 mb-2 mt-4">Tipo de entrega</h3>
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    className={`px-4 py-3 rounded-xl font-semibold shadow transition ${type === "delivery"
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    onClick={() => setType("delivery")}
                >
                    Delivery
                </button>
                <button
                    type="button"
                    className={`px-4 py-3 rounded-xl font-semibold shadow transition ${type === "retiro"
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    onClick={() => setType("retiro")}
                >
                    Retiro
                </button>
            </div>
        </div>

        {/* 🚫 Aviso si hay tragos en delivery */}
        {type === "delivery" && hasTragos && (
            <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                🚫 No se pueden enviar tragos por delivery.
                <button
                    type="button"
                    onClick={handleRemoveTragos}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                >
                    Eliminar tragos del pedido
                </button>
            </div>
        )}

        {/* Dirección si es delivery */}
        {type === "delivery" && (
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Dirección"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setUserCoords(null);
                        }}
                        className="flex-1 mt-4 rounded-lg border text-gray-500 border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleUseLocation}
                        className="text-sm text-blue-600 underline"
                    >
                        Usar ubicación
                    </button>
                </div>
                <button
                    type="button"
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow hover:bg-blue-700 transition"
                    disabled={loadingGeo}
                >
                    {loadingGeo ? "Calculando..." : "Calcular delivery"}
                </button>
                {userCoords && distance && cost && (
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                        Distancia: <strong>{distance} km</strong> – Costo delivery:{" "}
                        <strong>${cost}</strong>
                    </div>
                )}
                {geoError && <p className="text-red-600 text-sm">{geoError}</p>}
            </div>
        )}

        {/* Pago */}
        <div>
            <h3 className="font-semibold text-gray-700 mb-2 mt-4">Método de pago</h3>
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    className={`px-4 py-3 rounded-xl font-semibold shadow transition ${payment === "efectivo"
                        ? "bg-green-600 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    onClick={() => setPayment("efectivo")}
                >
                    Efectivo
                </button>
                <button
                    type="button"
                    className={`px-4 py-3 rounded-xl font-semibold shadow transition ${payment === "transferencia"
                        ? "bg-yellow-500 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    onClick={() => setPayment("transferencia")}
                >
                    Transferencia
                </button>
            </div>
            {payment === "transferencia" && (
                <div className="mb-5 flex flex-col items-center mt-3 relative bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
                    <span className="text-sm text-yellow-800 font-semibold"> Alias de pago: </span>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-mono select-all text-sm shadow-sm">
                            negocio.elys.bar
                        </span>
                        <button
                            type="button"
                            className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            onClick={() => {
                                navigator.clipboard.writeText("negocio.elys.bar");
                                setShowCopied(true);
                                setTimeout(() => setShowCopied(false), 1200);
                            }}
                        >
                            Copiar
                        </button>
                    </div>
                    <p className="text-xs text-yellow-700 mt-2 font-medium text-center">
                        Por favor enviar comprobante una vez realizado el pago
                    </p>
                    {showCopied && (
                        <div className="absolute -top-6 bg-yellow-500 text-white text-xs px-3 py-1 rounded shadow animate-fade-in">
                            ✅ Copiado!
                        </div>
                    )}
                </div>
            )}
        </div>
    </>);
}

export default Modal;
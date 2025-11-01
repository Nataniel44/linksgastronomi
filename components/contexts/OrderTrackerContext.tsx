// contexts/OrderTrackerContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OrderStatusTracker } from '@/components/OrderStatusTracker';

type OrderTrackerContextType = {
    showOrderTracker: (orderId: number) => void;
    hideOrderTracker: () => void;
    isTrackerVisible: boolean;
    currentOrderId: number | null;
};

const OrderTrackerContext = createContext<OrderTrackerContextType | undefined>(undefined);

export const OrderTrackerProvider = ({ children }: { children: ReactNode }) => {
    const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
    const [isTrackerVisible, setIsTrackerVisible] = useState(false);

    const showOrderTracker = (orderId: number) => {
        setCurrentOrderId(orderId);
        setIsTrackerVisible(true);
    };

    const hideOrderTracker = () => {
        setIsTrackerVisible(false);
        // Delay para que la animación de salida se complete
        setTimeout(() => setCurrentOrderId(null), 300);
    };

    return (
        <OrderTrackerContext.Provider
            value={{
                showOrderTracker,
                hideOrderTracker,
                isTrackerVisible,
                currentOrderId
            }}
        >
            {children}

            {/* Tracker Global */}
            {isTrackerVisible && currentOrderId && (
                <OrderStatusTracker
                    orderId={currentOrderId}
                    onClose={hideOrderTracker}
                />
            )}
        </OrderTrackerContext.Provider>
    );
};

export const useOrderTracker = () => {
    const context = useContext(OrderTrackerContext);
    if (!context) {
        throw new Error('useOrderTracker must be used within OrderTrackerProvider');
    }
    return context;
};
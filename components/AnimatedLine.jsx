// components/AnimatedLine.js
"use client";

import { useState, useEffect } from 'react';

const AnimatedLine = ({ children, delay = 0, duration = 800, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`
                transition-all ease-out  // 'ease-out' es una buena curva de aceleración
                ${isVisible
                    ? 'opacity-100 translate-y-0 blur-none' // Estado final: visible, en posición, nítido
                    : 'opacity-0 translate-y-1 sm:translate-y-2 blur-sm' // Estado inicial: invisible, ligeramente abajo, desenfocado
                }
                ${className}
            `}
            style={{
                transitionDuration: `${duration}ms`,
                // transitionProperty: 'opacity, transform, filter', // Opcional, para ser explícito
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedLine;
import React, { useState, useEffect } from 'react';

function AnimatedMessage({ message, onDismiss }) {
    
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setIsVisible(false);
            return;
        }

        setIsVisible(true);

        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        const dismissTimer = setTimeout(() => {
            onDismiss();
        }, 3000 + 300);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(dismissTimer);
        };
    }, [message, onDismiss]);

    const baseClasses = 'transition-all duration-300 ease-in-out text-red-500 text-center mt-2 py-2 px-2 bg-gray-900 border border-red-300 rounded sm:rounded-full';
    
    const animationClasses = isVisible
        ? 'opacity-100 transform translate-y-0 scale-100'
        : 'opacity-0 transform -translate-y-2 scale-95';  

    if (!message) {
        return null;
    }

    return (
        <div className={`${baseClasses} ${animationClasses}`}>
            {message}
        </div>
    );
}

export default AnimatedMessage;
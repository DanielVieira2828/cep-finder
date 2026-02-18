import { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onHide: () => void;
}

export function Toast({ message, isVisible, onHide }: ToastProps) {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                onHide();
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    if (!shouldRender) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div
                className={`
                    flex items-center gap-3 px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl
                    shadow-2xl shadow-green-500/20 backdrop-blur-sm
                    transition-all duration-300
                    ${isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }
                `}
            >
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm font-medium">{message}</span>
            </div>
        </div>
    );
}
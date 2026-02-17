import { useEffect, useState } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
    message: string | null;
    onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
    const [visible, setVisible] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            setShake(true);
            const t = setTimeout(() => setShake(false), 500);
            return () => clearTimeout(t);
        } else {
            setVisible(false);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div
            className={`
                relative flex items-start gap-3 p-4 rounded-xl mb-4 overflow-hidden
                bg-error-shade40 border border-error-primary/60
                transition-all duration-300
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                ${shake ? 'animate-shake' : ''}
            `}
        >
            {/* Barra lateral esquerda */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error-primary rounded-l-xl" />

            {/* Ícone */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-error-shade30 ml-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-error-tint20" />
            </div>

            {/* Texto */}
            <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-error-tint10 text-sm font-semibold leading-none mb-1">
                    Erro na busca
                </p>
                <p className="text-error-tint20 text-sm leading-snug">
                    {message}
                </p>
            </div>

            {/* Botão fechar */}
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg
                               text-error-tint20 hover:bg-error-shade30 transition-all"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
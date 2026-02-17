import { useState, useEffect } from 'react';
import { getCepHistory, clearCepHistory } from '../../../shared/lib/localStorage';

export function useCepHistory() {
    const [history, setHistory] = useState<string[]>([]);

    const loadHistory = () => {
        const savedHistory = getCepHistory();
        setHistory(savedHistory);
    };

    const clear = () => {
        clearCepHistory();
        setHistory([]);
    };

    useEffect(() => {
        loadHistory();
    }, []);

    return {
        history,
        loadHistory,
        clear,
    };
}
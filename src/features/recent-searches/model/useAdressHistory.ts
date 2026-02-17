import { useState, useEffect } from 'react';
import {
    getAddressHistory,
    clearAddressHistory,
    type AddressSearchHistory
} from '../../../shared/lib/localStorage';

export function useAddressHistory() {
    const [history, setHistory] = useState<AddressSearchHistory[]>([]);

    const loadHistory = () => {
        const savedHistory = getAddressHistory();
        setHistory(savedHistory);
    };

    const clear = () => {
        clearAddressHistory();
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
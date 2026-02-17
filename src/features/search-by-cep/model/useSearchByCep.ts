import { useState } from 'react';
import { searchAddressByCep } from '../api/viacep';
import { saveCepToHistory } from '../../../shared/lib/localStorage';
import { Address } from '../../../entities/address/model/types';

export function useSearchByCep() {
    const [address, setAddress] = useState<Address | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (cep: string) => {
        if (!cep.trim()) {
            setError('Digite um CEP válido');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAddress(null);

        try {
            const data = await searchAddressByCep(cep);
            setAddress(data);
            saveCepToHistory(cep);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar CEP');
            setAddress(null);
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setAddress(null);
        setError(null);
        setIsLoading(false);
    };

    return {
        address,
        isLoading,
        error,
        search,
        reset,
    };
}
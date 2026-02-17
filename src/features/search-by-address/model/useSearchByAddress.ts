import { useState } from 'react';
import { searchAddressByLocation } from '../api/viacep';
import { saveAddressToHistory } from '../../../shared/lib/localStorage';
import { Address } from '../../../entities/address/model/types';

export function useSearchByAddress() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (uf: string, city: string, street: string) => {
        if (!uf.trim() || !city.trim() || !street.trim()) {
            setError('Preencha todos os campos');
            return;
        }

        if (street.length < 3) {
            setError('O logradouro deve ter pelo menos 3 caracteres');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAddresses([]);

        try {
            const data = await searchAddressByLocation(uf, city, street);
            setAddresses(data);
            saveAddressToHistory({ uf, city, street });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar endereço');
            setAddresses([]);
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setAddresses([]);
        setError(null);
        setIsLoading(false);
    };

    return {
        addresses,
        isLoading,
        error,
        search,
        reset,
    };
}
import { useState, useEffect } from 'react';
import { useSearchByCep } from '../model/useSearchByCep';
import { useDebounce } from '../../../shared/hooks';
import { Address } from '../../../entities/address/model/types';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { AddressDetails } from '../../../shared/ui/AddressDetails/AddressDetails';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage';
import { AddressCard } from '../../../shared/ui/AddressCard/AddressCard';
import { SkeletonCard } from '../../../shared/ui/SkeletonCard';

interface SearchByCepProps {
    onSearchRef?: (searchFn: (cep: string) => void) => void;
}

export function SearchByCep({ onSearchRef }: SearchByCepProps) {
    const [cep, setCep] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const debouncedCep = useDebounce(cep, 800);
    const { address, isLoading, error, search, reset } = useSearchByCep();

    useEffect(() => {
        if (onSearchRef) {
            onSearchRef((newCep: string) => {
                setCep(newCep);
                search(newCep);
            });
        }
    }, [onSearchRef, search]);

    const formatCep = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 5) return cleaned;
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(formatCep(e.target.value));
    };

    useEffect(() => {
        const cleanCep = debouncedCep.replace(/\D/g, '');
        if (cleanCep.length === 8) search(debouncedCep);
    }, [debouncedCep]);

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-8">
                <label className="text-center text-white font-medium">
                    Digite o CEP (somente números)
                </label>

                <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                        width="20" height="20" viewBox="0 0 20 20" fill="none"
                    >
                        <path
                            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="00000-000"
                        maxLength={9}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-900 border border-gray-800 rounded-xl text-white 
                                   focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 
                                   transition-all placeholder:text-gray-500"
                    />
                    {isLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                                className="animate-spin h-5 w-5 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                <p className="text-center text-gray-400 text-sm">
                    Digite 8 números do CEP e a busca será feita automaticamente
                </p>
            </div>

            <ErrorMessage message={error} onDismiss={reset} />

            {isLoading && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white text-xl font-semibold">Buscando endereço...</h3>
                        <div className="w-20 h-4 bg-gray-800 rounded animate-pulse" />
                    </div>
                    <SkeletonCard />
                </div>
            )}

            {!isLoading && address && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white text-xl font-semibold">Resultados da busca</h3>
                        <span className="text-gray-400 text-sm">1 endereço encontrado</span>
                    </div>
                    <AddressCard
                        address={address}
                        onClick={() => setSelectedAddress(address)}
                    />
                </div>
            )}

            <Modal isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)}>
                {selectedAddress && (
                    <AddressDetails address={selectedAddress} onClose={() => setSelectedAddress(null)} />
                )}
            </Modal>
        </div>
    );
}
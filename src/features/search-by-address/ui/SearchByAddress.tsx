import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchByAddress } from '../model/useSearchByAddress';
import { Address } from '../../../entities/address/model/types';
import { AddressDetails } from '../../../shared/ui/AddressDetails';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage/ErrorMessage';
import { AddressCard } from '../../../shared/ui/AddressCard/AddressCard';
import { SkeletonCard } from '../../../shared/ui/SkeletonCard';
import { EmptyState } from '../../../shared/ui/EmptyState/EmptyState';

interface SearchByAddressProps {
    onSearchRef?: (searchFn: (uf: string, city: string, street: string) => void) => void;
}

export function SearchByAddress({ onSearchRef }: SearchByAddressProps) {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const { addresses, isLoading, error, search, reset } = useSearchByAddress();
    
    // Flag para evitar busca duplicada quando clica no histórico
    const isManualSearch = useRef(false);

    const handleSearch = useCallback((newUf: string, newCity: string, newStreet: string) => {
        setUf(newUf);
        setCity(newCity);
        setStreet(newStreet);
        isManualSearch.current = true; // Marca como busca manual
        search(newUf, newCity, newStreet);
    }, [search]);

    useEffect(() => {
        if (onSearchRef) {
            onSearchRef(handleSearch);
        }
    }, [onSearchRef, handleSearch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isManualSearch.current = false; // Form submit não precisa da flag
        search(uf, city, street);
    };

    const isNotFound = error?.toLowerCase().includes('não encontrado') || 
                       error?.toLowerCase().includes('nenhum endereço');
    const shouldShowError = error && !isNotFound;

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
                <label className="text-center text-white font-medium">
                    Preencha os campos abaixo
                </label>

                <div className="flex gap-3">
                    <div className="flex flex-col gap-2 w-24">
                        <label htmlFor="uf" className="text-gray-300 text-sm font-medium">UF</label>
                        <input
                            id="uf"
                            type="text"
                            value={uf}
                            onChange={(e) => {
                                setUf(e.target.value.toUpperCase());
                                isManualSearch.current = false;
                            }}
                            placeholder="SP"
                            maxLength={2}
                            className="px-4 py-3.5 bg-gray-900 border border-gray-800 rounded-xl text-white 
                                       focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 
                                       transition-all placeholder:text-gray-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="city" className="text-gray-300 text-sm font-medium">Cidade</label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                                isManualSearch.current = false;
                            }}
                            placeholder="São Paulo"
                            className="px-4 py-3.5 bg-gray-900 border border-gray-800 rounded-xl text-white 
                                       focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 
                                       transition-all placeholder:text-gray-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="street" className="text-gray-300 text-sm font-medium">Logradouro</label>
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
                            id="street"
                            type="text"
                            value={street}
                            onChange={(e) => {
                                setStreet(e.target.value);
                                isManualSearch.current = false;
                            }}
                            placeholder="Rua Cedral"
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-900 border border-gray-800 rounded-xl text-white 
                                       focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 
                                       transition-all placeholder:text-gray-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-medium 
                               hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed 
                               transition-all shadow-lg shadow-blue-600/20"
                >
                    {isLoading ? 'Buscando...' : 'Buscar'}
                </button>

                <p className="text-center text-gray-400 text-sm">
                    Mínimo de 3 caracteres para o logradouro
                </p>
            </form>

            {shouldShowError && <ErrorMessage message={error} onDismiss={reset} />}

            {isLoading && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                </div>
            )}

            {!isLoading && addresses.length > 0 && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-6 animate-fadeIn">
                        <h3 className="text-white text-xl font-bold">Resultados da busca</h3>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-950 border border-blue-900 rounded-lg">
                            <span className="text-blue-400 text-2xl font-bold tabular-nums">{addresses.length}</span>
                            <span className="text-gray-400 text-xs font-medium">
                                {addresses.length === 1 ? 'endereço' : 'endereços'}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {addresses.map((address, index) => (
                            <AddressCard
                                key={index}
                                address={address}
                                onClick={() => setSelectedAddress(address)}
                                animationDelay={index * 100}
                            />
                        ))}
                    </div>
                </div>
            )}

            {!isLoading && isNotFound && (
                <EmptyState
                    title="Nenhum endereço encontrado"
                    description="Tente ajustar os filtros de busca ou verifique a ortografia dos campos."
                    icon="search"
                />
            )}

            <Modal isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)}>
                {selectedAddress && (
                    <AddressDetails address={selectedAddress} onClose={() => setSelectedAddress(null)} />
                )}
            </Modal>
        </div>
    );
}
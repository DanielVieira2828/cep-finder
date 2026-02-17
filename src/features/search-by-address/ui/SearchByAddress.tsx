import { useState, useEffect } from 'react';
import { useSearchByAddress } from '../model/useSearchByAddress';
import { Address } from '../../../entities/address/model/types';
import { AddressDetails } from '../../../shared/ui/AddressDetails';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage';
import { AddressCard } from '../../../shared/ui/AddressCard/AddressCard';

interface SearchByAddressProps {
    onSearchRef?: (searchFn: (uf: string, city: string, street: string) => void) => void;
}

export function SearchByAddress({ onSearchRef }: SearchByAddressProps) {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const { addresses, isLoading, error, search, reset } = useSearchByAddress();

    useEffect(() => {
        if (onSearchRef) {
            onSearchRef((newUf, newCity, newStreet) => {
                setUf(newUf);
                setCity(newCity);
                setStreet(newStreet);
                search(newUf, newCity, newStreet);
            });
        }
    }, [onSearchRef, search]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        search(uf, city, street);
    };

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
                            onChange={(e) => setUf(e.target.value.toUpperCase())}
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
                            onChange={(e) => setCity(e.target.value)}
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
                        {/* Lupa */}
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
                            onChange={(e) => setStreet(e.target.value)}
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

            <ErrorMessage message={error} onDismiss={reset} />

            {addresses.length > 0 && (
    <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl font-semibold">Resultados da busca</h3>
            <span className="text-gray-400 text-sm">
                {addresses.length} {addresses.length === 1 ? 'endereço encontrado' : 'endereços encontrados'}
            </span>
        </div>
        <div className="flex flex-col gap-4">
            {addresses.map((address, index) => (
                <AddressCard
                    key={index}
                    address={address}
                    onClick={() => setSelectedAddress(address)}
                />
            ))}
        </div>
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
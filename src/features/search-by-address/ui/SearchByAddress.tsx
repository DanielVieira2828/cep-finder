import { useState, useEffect } from 'react';
import { useSearchByAddress } from '../model/useSearchByAddress';
import { Address } from '../../../entities/address/model/types';
import { AddressDetails } from '../../../shared/ui/AddressDetails';
import { Modal } from '../../../shared/ui/Modal/Modal';


interface SearchByAddressProps {
    onSearchRef?: (searchFn: (uf: string, city: string, street: string) => void) => void;
}

export function SearchByAddress({ onSearchRef }: SearchByAddressProps) {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const { addresses, isLoading, error, search } = useSearchByAddress();

    useEffect(() => {
        if (onSearchRef) {
            onSearchRef((newUf: string, newCity: string, newStreet: string) => {
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
                        <label htmlFor="uf" className="text-gray-300 text-sm font-medium">
                            UF
                        </label>
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
                        <label htmlFor="city" className="text-gray-300 text-sm font-medium">
                            Cidade
                        </label>
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
                    <label htmlFor="street" className="text-gray-300 text-sm font-medium">
                        Logradouro
                    </label>
                    <div className="relative">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                                stroke="#7F8282"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
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

            {error && (
                <div className="p-4 bg-error-shade40 border border-error-primary rounded-xl mb-4">
                    <p className="text-error-tint20 text-sm text-center">{error}</p>
                </div>
            )}

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
                            <button
                                key={index}
                                onClick={() => setSelectedAddress(address)}
                                className="w-full flex gap-4 p-6 bg-gray-900 rounded-2xl border border-gray-800 
                         hover:border-blue-600 hover:bg-gray-800 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-blue-900 rounded-xl flex-shrink-0 
                              group-hover:bg-blue-800 transition-all">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                            stroke="#0FB4E8"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle
                                            cx="12"
                                            cy="10"
                                            r="3"
                                            stroke="#0FB4E8"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <div className="flex-1 flex flex-col gap-3 text-left">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-300 font-semibold text-sm">CEP:</span>
                                        <span className="text-blue-400 text-sm">{address.cep}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                                stroke="#7F8282"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span className="text-blue-400 text-sm">{address.logradouro}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                                stroke="#7F8282"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                        <span className="text-blue-400 text-sm">
                                            {address.bairro} - {address.localidade}/{address.uf}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <svg
                                        className="text-gray-500 group-hover:text-blue-500 transition-all"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M9 18l6-6-6-6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </button>
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
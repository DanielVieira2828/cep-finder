
import { useState, useEffect } from 'react';
import { useSearchByCep } from '../model/useSearchByCep';
import { useDebounce } from '../../../shared/hooks';
import { Address } from '../../../entities/address/model/types';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { AddressDetails } from '../../../shared/ui/AddressDetails/AddresDetails';

interface SearchByCepProps {
    onSearchRef?: (searchFn: (cep: string) => void) => void;
}

export function SearchByCep({ onSearchRef }: SearchByCepProps) {
    const [cep, setCep] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const debouncedCep = useDebounce(cep, 800);
    const { address, isLoading, error, search } = useSearchByCep();

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
        if (cleaned.length <= 5) {
            return cleaned;
        }
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCep(e.target.value);
        setCep(formatted);
    };

    useEffect(() => {
        const cleanCep = debouncedCep.replace(/\D/g, '');

        if (cleanCep.length === 8) {
            search(debouncedCep);
        }
    }, [debouncedCep]);

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-8">
                <label className="text-center text-white font-medium">
                    Digite o CEP (somente números)
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
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="06396-020"
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

            {error && (
                <div className="p-4 bg-error-shade40 border border-error-primary rounded-xl mb-4">
                    <p className="text-error-tint20 text-sm text-center">{error}</p>
                </div>
            )}

            {address && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white text-xl font-semibold">Resultados da busca</h3>
                        <span className="text-gray-400 text-sm">1 endereço encontrado</span>
                    </div>

                    <button
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
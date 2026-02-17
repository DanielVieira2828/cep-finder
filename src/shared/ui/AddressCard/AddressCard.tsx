import { Address } from '../../../entities/address/model/types';

interface AddressCardProps {
    address: Address;
    onClick: () => void;
}

export function AddressCard({ address, onClick }: AddressCardProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex gap-4 p-6 bg-gray-900 rounded-2xl border border-gray-800 
                       hover:border-blue-600 hover:bg-gray-800 transition-all cursor-pointer group"
        >
            {/* Ícone de pin */}
            <div className="w-12 h-12 flex items-center justify-center bg-blue-900 rounded-xl flex-shrink-0
                            group-hover:bg-blue-800 transition-all">
                <svg className="text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Informações */}
            <div className="flex-1 flex flex-col gap-3 text-left">
                <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-semibold text-sm">CEP:</span>
                    <span className="text-blue-400 text-sm">{address.cep}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="text-gray-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-blue-400 text-sm truncate">{address.logradouro}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="text-gray-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="text-blue-400 text-sm truncate">
                        {address.bairro} - {address.localidade}/{address.uf}
                    </span>
                </div>
            </div>

            {/* Seta */}
            <div className="flex items-center">
                <svg className="text-gray-500 group-hover:text-blue-500 transition-all"
                    width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </button>
    );
}
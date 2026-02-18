import { Address } from '../../../entities/address/model/types';

interface AddressCardProps {
    address: Address;
    onClick: () => void;
    animationDelay?: number; // em milissegundos
}

export function AddressCard({ address, onClick, animationDelay = 0 }: AddressCardProps) {
    return (
        <button
            onClick={onClick}
            style={{ animationDelay: `${animationDelay}ms` }}
            className="w-full flex gap-4 p-6 bg-gray-900 rounded-2xl border border-gray-800 
                       hover:border-blue-600 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-600/10
                       transition-all cursor-pointer group animate-slideUp"
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
        <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">CEP</span>
        <span className="text-blue-400 text-base font-bold tabular-nums">{address.cep}</span>
    </div>
    <div className="flex items-center gap-2">
        <svg className="text-gray-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-white text-sm font-semibold truncate">{address.logradouro}</span>
    </div>
    <div className="flex items-center gap-2">
        <svg className="text-gray-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-gray-300 text-sm truncate">
            <span className="font-medium">{address.bairro}</span>
            <span className="text-gray-500 mx-1">—</span>
            <span className="font-medium">{address.localidade}</span>
            <span className="text-blue-400 font-bold">/{address.uf}</span>
        </span>
    </div>
</div>

            {/* Seta */}
           <div className="flex items-center">
    <svg className="text-gray-500 group-hover:text-blue-500 group-hover:translate-x-2 transition-transform duration-300"
        width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18l6-6-6-6" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
</div>
        </button>
    );
}
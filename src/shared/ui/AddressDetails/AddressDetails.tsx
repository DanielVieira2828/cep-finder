import { Address } from "../../../entities/address/model/types";

interface AddressDetailsProps {
    address: Address;
    onClose: () => void;
}

export function AddressDetails({ address, onClose }: AddressDetailsProps) {
    const fields = [
        { label: 'CEP', value: address.cep, icon: '📮' },
        { label: 'Logradouro', value: address.logradouro, icon: '🏠' },
        { label: 'Complemento', value: address.complemento || '-', icon: '📝' },
        { label: 'Unidade', value: address.unidade || '-', icon: '🏢' },
        { label: 'Bairro', value: address.bairro, icon: '🗺️' },
        { label: 'Localidade', value: address.localidade, icon: '🌆' },
        { label: 'UF', value: address.uf, icon: '📍' },
        { label: 'Estado', value: address.estado, icon: '🏛️' },
        { label: 'Região', value: address.regiao, icon: '🌎' },
        { label: 'IBGE', value: address.ibge, icon: '🔢' },
        { label: 'GIA', value: address.gia || '-', icon: '📊' },
        { label: 'DDD', value: address.ddd, icon: '📞' },
        { label: 'SIAFI', value: address.siafi, icon: '💼' },
    ];

    return (
        <>
            <div className="sticky top-0 bg-gray-1000 border-b border-gray-900 p-6 flex items-center justify-between">
                <h2 className="text-white text-2xl font-bold">Detalhes do Endereço</h2>
                <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-900 text-gray-300 
                   hover:bg-gray-800 hover:text-white transition-all"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6l12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field) => (
                        <div
                            key={field.label}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-blue-600/50 transition-all"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{field.icon}</span>
                                <span className="text-gray-400 text-sm font-medium">{field.label}</span>
                            </div>
                            <p className="text-white font-semibold">{field.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 bg-gray-1000 border-t border-gray-900 p-6">
                <button
                    onClick={onClose}
                    className="w-full px-6 py-3.5 bg-blue-600 text-white rounded-xl font-medium 
                   hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                    Fechar
                </button>
            </div>
        </>
    );
}
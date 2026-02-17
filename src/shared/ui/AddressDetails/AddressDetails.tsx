import { useState } from "react";
import {
    EnvelopeIcon,
    MapPinIcon,
    DocumentTextIcon,
    BuildingOfficeIcon,
    MapIcon,
    BuildingLibraryIcon,
    ArrowUpCircleIcon,
    FlagIcon,
    GlobeAmericasIcon,
    HashtagIcon,
    ChartBarIcon,
    PhoneIcon,
    BriefcaseIcon,
    XMarkIcon,
    ClipboardDocumentIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import { Address } from "../../../entities/address/model/types";

interface AddressDetailsProps {
    address: Address;
    onClose: () => void;
}

const ICON_CLASS = "text-blue-400";

export function AddressDetails({ address, onClose }: AddressDetailsProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (label: string, value: string) => {
        if (value === "-") return;
        navigator.clipboard.writeText(value).then(() => {
            setCopiedField(label);
            setTimeout(() => setCopiedField(null), 2000);
        });
    };

    const fields = [
        { label: "Logradouro",  value: address.logradouro,         Icon: MapPinIcon,          span: 4 },
        { label: "Bairro",      value: address.bairro,             Icon: MapIcon,             span: 2 },
        { label: "Localidade",  value: address.localidade,         Icon: BuildingLibraryIcon, span: 2 },
        { label: "Estado",      value: address.estado,             Icon: FlagIcon,            span: 2 },
        { label: "Região",      value: address.regiao,             Icon: GlobeAmericasIcon,   span: 2 },
        { label: "Complemento", value: address.complemento || "-", Icon: DocumentTextIcon,    span: 2 },
        { label: "Unidade",     value: address.unidade || "-",     Icon: BuildingOfficeIcon,  span: 1 },
        { label: "CEP",         value: address.cep,                Icon: EnvelopeIcon,        span: 1 },
        { label: "UF",          value: address.uf,                 Icon: ArrowUpCircleIcon,   span: 1 },
        { label: "DDD",         value: address.ddd,                Icon: PhoneIcon,           span: 1 },
        { label: "IBGE",        value: address.ibge,               Icon: HashtagIcon,         span: 1 },
        { label: "GIA",         value: address.gia || "-",         Icon: ChartBarIcon,        span: 1 },
        { label: "SIAFI",       value: address.siafi,              Icon: BriefcaseIcon,       span: 1 },
    ];

    return (
        <>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gray-1000 border-b border-gray-900 px-6 py-4 flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">Detalhes do Endereço</h2>
                <button
                    onClick={onClose}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 text-gray-400
                               hover:bg-gray-800 hover:text-white transition-all"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Grid */}
            <div className="p-6">
                <div className="grid grid-cols-4 gap-3">
                    {fields.map(({ label, value, Icon, span }) => {
                        const isCopied = copiedField === label;
                        const isEmpty  = value === "-";
                        const isSmall  = span === 1;

                        return (
                            <div
                                key={label}
                                onClick={() => handleCopy(label, value)}
                                style={{ gridColumn: `span ${span}` }}
                                className={`
                                    group relative bg-gray-900 border rounded-xl transition-all
                                    ${isSmall ? "p-3" : "p-5"}
                                    ${isEmpty
                                        ? "border-gray-800 cursor-default opacity-50"
                                        : isCopied
                                            ? "border-green-500/60 cursor-pointer"
                                            : "border-gray-800 cursor-pointer hover:border-blue-600/50"
                                    }
                                `}
                            >
                                {/* Label + ícone do campo */}
                                <div className={`flex items-center gap-2 ${isSmall ? "mb-1.5" : "mb-2.5"}`}>
                                    <Icon className={`shrink-0 ${ICON_CLASS} ${isSmall ? "w-4 h-4" : "w-5 h-5"}`} />
                                    <span className={`text-gray-400 font-medium uppercase tracking-wide truncate ${isSmall ? "text-[10px]" : "text-xs"}`}>
                                        {label}
                                    </span>
                                </div>

                                {/* Valor */}
                                <p
                                    className={`text-white font-semibold truncate ${isSmall ? "text-sm pr-5" : "text-lg pr-8"}`}
                                    title={value}
                                >
                                    {value}
                                </p>

                                {/* Ícone de copiar — canto inferior direito */}
                                {!isEmpty && (
                                    <div className={`
                                        absolute transition-all duration-300
                                        ${isSmall ? "bottom-2.5 right-2.5" : "bottom-4 right-4"}
                                        ${isCopied ? "text-green-400 scale-110" : "text-gray-600 group-hover:text-gray-400"}
                                    `}>
                                        {isCopied
                                            ? <CheckIcon className={isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} />
                                            : <ClipboardDocumentIcon className={isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} />
                                        }
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-1000 border-t border-gray-900 px-6 py-4">
                <button
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium
                               hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                    Fechar
                </button>
            </div>
        </>
    );
}
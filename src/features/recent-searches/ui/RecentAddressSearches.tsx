import { useAddressHistory } from '../model/useAdressHistory';

interface RecentAddressSearchesProps {
    onSearch: (uf: string, city: string, street: string) => void;
}

export function RecentAddressSearches({ onSearch }: RecentAddressSearchesProps) {
    const { history, clear, loadHistory } = useAddressHistory();

    if (history.length === 0) {
        return null;
    }

    const handleClickHistory = (item: { uf: string; city: string; street: string }) => {
        onSearch(item.uf, item.city, item.street);
        setTimeout(loadHistory, 100);
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-900">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Pesquisas Recentes</h3>
                <button
                    onClick={clear}
                    className="text-error-tint10 text-sm hover:underline transition-all"
                >
                    Limpar histórico
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {history.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleClickHistory(item)}
                        className="flex items-center gap-3 px-4 py-3 bg-gray-900 border border-gray-800 
                     rounded-xl hover:bg-gray-800 hover:border-blue-600 transition-all text-left"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0"
                        >
                            <circle cx="12" cy="12" r="10" stroke="#7F8282" strokeWidth="2" />
                            <path d="M12 6v6l4 2" stroke="#7F8282" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="text-gray-300 text-sm">
                            {item.street}, {item.city}/{item.uf}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
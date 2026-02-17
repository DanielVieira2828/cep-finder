const STORAGE_KEYS = {
    CEP_HISTORY: '@viacep:cep-history',
    ADDRESS_HISTORY: '@viacep:address-history',
} as const;

const MAX_HISTORY_ITEMS = 3;

// Funções genéricas
export function getFromStorage<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Erro ao ler do localStorage:', error);
        return null;
    }
}

export function saveToStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
}

export function removeFromStorage(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Erro ao remover do localStorage:', error);
    }
}

// Funções específicas para histórico de CEP
export function getCepHistory(): string[] {
    return getFromStorage<string[]>(STORAGE_KEYS.CEP_HISTORY) || [];
}

export function saveCepToHistory(cep: string): void {
    const history = getCepHistory();

    // Remove o CEP se já existir
    const filteredHistory = history.filter(item => item !== cep);

    // Adiciona o novo CEP no início
    const newHistory = [cep, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);

    saveToStorage(STORAGE_KEYS.CEP_HISTORY, newHistory);
}

export function clearCepHistory(): void {
    removeFromStorage(STORAGE_KEYS.CEP_HISTORY);
}

// Funções específicas para histórico de endereço
export interface AddressSearchHistory {
    uf: string;
    city: string;
    street: string;
}

export function getAddressHistory(): AddressSearchHistory[] {
    return getFromStorage<AddressSearchHistory[]>(STORAGE_KEYS.ADDRESS_HISTORY) || [];
}

export function saveAddressToHistory(search: AddressSearchHistory): void {
    const history = getAddressHistory();

    // Remove busca duplicada (mesma UF, cidade e rua)
    const filteredHistory = history.filter(
        item => !(
            item.uf === search.uf &&
            item.city === search.city &&
            item.street === search.street
        )
    );

    // Adiciona a nova busca no início
    const newHistory = [search, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);

    saveToStorage(STORAGE_KEYS.ADDRESS_HISTORY, newHistory);
}

export function clearAddressHistory(): void {
    removeFromStorage(STORAGE_KEYS.ADDRESS_HISTORY);
}
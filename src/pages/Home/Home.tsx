import { useRef, useState } from 'react';
import { Tabs } from '../../widgets/Tabs';
import { HomeHeader } from '../../widgets/HomeHeader/HomeHeader';
import { SearchByCep } from '../../features/search-by-cep/ui/SearchByCep';
import { SearchByAddress } from '../../features/search-by-address/ui';
import { RecentAddressSearches, RecentCepSearches } from '../../features/recent-searches/ui';

export function Home() {
    const [activeTab, setActiveTab] = useState('cep');
    const cepSearchRef = useRef<(cep: string) => void>(() => {});
    const addressSearchRef = useRef<(uf: string, city: string, street: string) => void>(() => {});

    const tabs = [
        { id: 'cep', label: 'Buscar por CEP' },
        { id: 'address', label: 'Buscar por Endereço' },
    ];

    return (
        <div className="min-h-screen px-8 py-8 flex flex-col bg-gray-1100">

            <HomeHeader />

            <main className="max-w-4xl mx-auto w-full flex-1">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="bg-gray-1000 p-8 rounded-2xl border border-gray-900">
                    {activeTab === 'cep' ? (
                        <>
                            <SearchByCep onSearchRef={(fn) => (cepSearchRef.current = fn)} />
                            <RecentCepSearches onSearch={(cep) => cepSearchRef.current(cep)} />
                        </>
                    ) : (
                        <>
                            <SearchByAddress onSearchRef={(fn) => (addressSearchRef.current = fn)} />
                            <RecentAddressSearches onSearch={(uf, city, street) => addressSearchRef.current(uf, city, street)} />
                        </>
                    )}
                </div>
            </main>

            <footer className="text-center mt-12 pt-6 text-gray-400 text-sm">
                <p>
                    Dados fornecidos pela API{' '}
                    <a
                        href="https://viacep.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-medium hover:underline"
                    >
                        ViaCEP
                    </a>
                </p>
            </footer>
        </div>
    );
}
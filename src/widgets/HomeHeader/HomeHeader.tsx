export function HomeHeader() {
    return (
        <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-950 to-blue-900 border border-blue-800 mb-6 shadow-lg shadow-blue-950/50">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                </span>
                <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent text-xs font-semibold tracking-widest uppercase">
                    Powered by ViaCEP
                </span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-600/40">
                    <svg className="text-white" width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="3"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className="text-5xl font-bold tracking-tight">
                    <span className="text-white">CEP</span>
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">-</span>
                    <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">FINDER</span>
                </h1>
            </div>

            <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
                Consulte <span className="text-gray-300 font-semibold">CEPs</span> e{' '}
                <span className="text-gray-300 font-semibold">endereços</span> de todo o Brasil{' '}
                <span className="text-blue-400 font-medium">de forma rápida e precisa</span>
            </p>
        </header>
    );
}
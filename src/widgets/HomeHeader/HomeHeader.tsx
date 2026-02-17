export function HomeHeader() {
    return (
        <header className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-900 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
                    Powered by ViaCEP
                </span>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/40">
                    <svg className="text-white" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="3"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className="text-white text-4xl font-bold tracking-tight">
                    CEP<span className="text-blue-400">-</span>FINDER
                </h1>
            </div>

            {/* Subtítulo */}
            <p className="text-gray-400 text-base max-w-sm mx-auto leading-relaxed">
                Consulte CEPs e endereços de todo o Brasil de forma rápida e precisa
            </p>
        </header>
    );
}
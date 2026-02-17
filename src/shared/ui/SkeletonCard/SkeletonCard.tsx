export function SkeletonCard() {
    return (
        <div className="w-full flex gap-4 p-6 bg-gray-900 rounded-2xl border border-gray-800 min-h-[120px]">
            {/* Ícone skeleton */}
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex-shrink-0 animate-pulse" />

            {/* Conteúdo skeleton */}
            <div className="flex-1 flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-3 bg-gray-800 rounded animate-pulse" />
                    <div className="w-28 h-3 bg-gray-700 rounded animate-pulse" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-48 h-3 bg-gray-700 rounded animate-pulse" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-40 h-3 bg-gray-700 rounded animate-pulse" />
                </div>
            </div>

            {/* Seta skeleton */}
            <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-800 rounded animate-pulse" />
            </div>
        </div>
    );
}
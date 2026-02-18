interface EmptyStateProps {
    title: string;
    description: string;
    icon?: 'search' | 'location';
}

export function EmptyState({ title, description, icon = 'search' }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 animate-fadeIn">
          
            <div className="relative mb-6">
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 to-blue-900/30 rounded-full blur-2xl scale-150" />
                
                
                <div className="relative w-24 h-24 flex items-center justify-center bg-gray-900 border-2 border-gray-800 rounded-full">
                    {icon === 'search' ? (
                        <svg className="text-gray-600" width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <svg className="text-gray-600" width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    )}
                </div>

                
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            
            <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm text-center max-w-sm leading-relaxed">{description}</p>
        </div>
    );
}
interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex gap-2 bg-gray-1000 p-1 rounded-2xl border border-gray-900 w-fit mx-auto mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`
            px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200
            ${activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                            : 'text-gray-300 hover:bg-gray-900'
                        }
          `}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
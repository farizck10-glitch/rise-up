import React from 'react';
import { Menu, Bell, ArrowLeft } from 'lucide-react';

interface Props {
    title?: string;
    onMenuClick?: () => void;
    onBackClick?: () => void;
    showBack?: boolean;
}

const AppHeader: React.FC<Props> = ({ title, onMenuClick, onBackClick, showBack }) => {
    return (
        <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
            {showBack ? (
                <button className="p-2 rounded-full hover:bg-gray-100 flex-center" onClick={onBackClick}>
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
            ) : (
                <button className="p-2 rounded-full hover:bg-gray-100 flex-center" onClick={onMenuClick}>
                    <Menu className="w-5 h-5 text-gray-700" />
                </button>
            )}

            {title ? (
                <div className="font-bold text-lg text-[#0A58CA]">{title}</div>
            ) : (
                <img src="/assets/logo.jpg" alt="Rise Up Panayi Logo" className="h-9 w-auto object-contain" />
            )}

            <button className="p-2 rounded-full hover:bg-gray-100 flex-center">
                <Bell className="w-5 h-5 text-gray-700" />
            </button>
        </header>
    );
};

export default AppHeader;

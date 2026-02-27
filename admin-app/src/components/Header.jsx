import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

const Header = ({ onMenuClick, title }) => {
    return (
        <header className="bg-surface/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
            <div className="flex items-center justify-between px-6 py-4 lg:px-10">
                <div className="flex items-center">
                    <button
                        onClick={onMenuClick}
                        className="p-2 mr-4 text-slate-500 hover:text-primary xl:hidden focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-slateDark">{title}</h2>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Search className="w-4 h-4 text-slate-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-48 text-slateDark"
                        />
                    </div>

                    <button className="relative p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 cursor-pointer">
                        <span className="text-primary font-bold text-sm">A</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

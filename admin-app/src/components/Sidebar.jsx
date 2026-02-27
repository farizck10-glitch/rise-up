import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    BookOpen,
    Megaphone,
    Bell,
    Settings,
    AlertCircle,
    LogOut,
    Verified,
    Menu,
    X
} from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const handleLogout = () => {
        signOut(auth);
    };

    const menuItems = [
        { label: 'Overview', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: 'Users', path: '/users', icon: <Users className="w-5 h-5" /> },
        { label: 'Workers', path: '/workers', icon: <Briefcase className="w-5 h-5" /> },
        { label: 'Schemes', path: '/schemes', icon: <BookOpen className="w-5 h-5" /> },
        { label: 'Emergency', path: '/emergency', icon: <AlertCircle className="w-5 h-5" /> },
        { label: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" /> },
        { label: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <>
            <div
                className={`fixed inset-0 bg-slateDark/50 z-20 xl:hidden ${isOpen ? 'block' : 'hidden'} `}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={`fixed xl:static inset-y-0 left-0 z-30 w-72 bg-surface border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'} flex flex-col h-screen rounded-r-2xl xl:rounded-none shadow-floating xl:shadow-none`}
            >
                <div className="p-6 flex items-center justify-between xl:justify-center border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-clean">
                            <Verified className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-slateDark tracking-tight">Admin Portal</h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary active:scale-95'
                                } `
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

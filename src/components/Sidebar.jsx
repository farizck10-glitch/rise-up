import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, AlertCircle, Newspaper, User, ShoppingBag, Briefcase, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { requireAuth } = useAuth();

    // Do not show on onboarding screens
    const hideOnRoutes = ['/', '/welcome', '/signup', '/member'];
    if (hideOnRoutes.includes(location.pathname)) return null;

    const navItems = [
        { id: 'dashboard', path: '/dashboard', icon: Home, label: 'ഹോം | Home' },
        { id: 'our-ward', path: '/our-ward', icon: Newspaper, label: 'വാർത്തകൾ | Updates' },
        { id: 'smart-ward', path: '/smart-ward', icon: Layers, label: 'സേവനങ്ങൾ | Services' },
        { id: 'kaithang', path: '/kaithang', icon: AlertCircle, label: 'അത്യാഹിതം | Emergency', highlight: true },
        { id: 'workplace', path: '/workplace', icon: Briefcase, label: 'തൊഴിൽ | Workplace' },
        { id: 'marketplace', path: '/marketplace', icon: ShoppingBag, label: 'ചന്ത | Marketplace' },
        { id: 'green', path: '/green', icon: Leaf, label: 'നാട്ടുനന്മ | Green' },
        { id: 'profile', path: '/profile', icon: User, label: 'പ്രൊഫൈൽ | Profile' },
    ];

    const handleNavigation = (item) => {
        if (item.id === 'profile') {
            requireAuth(() => navigate(item.path));
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className="hidden lg:flex w-[280px] xl:w-[320px] shrink-0 h-screen bg-white border-r border-slate-100 flex-col p-6 shadow-xl z-30 justify-between">
            <div>
                {/* Logo Section */}
                <div className="flex items-center gap-4 mb-12 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-xl font-bold font-sans">RU</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight font-sans">Rise Up</h1>
                        <p className="text-slate-500 text-xs tracking-wider uppercase font-semibold">Smart Ward</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-3">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`w-full flex items-center justify-center gap-[15px] px-6 py-[18px] rounded-2xl transition-all duration-300 relative group overflow-hidden ${isActive
                                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                                    : 'hover:bg-blue-50 hover:shadow-sm hover:text-blue-600 text-slate-500'
                                    } ${item.highlight && !isActive ? 'hover:bg-rose-50 hover:text-rose-600 hover:shadow-sm' : ''}`}
                            >
                                {/* Active Indicator background sweep animation could go here */}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    />
                                )}

                                <Icon
                                    className={`w-6 h-6 z-10 shrink-0 ${isActive ? 'text-blue-600 fill-blue-100' : 'group-hover:text-blue-500 group-hover:scale-110 transition-transform duration-300'} ${item.highlight && isActive ? 'text-rose-600 fill-rose-100' : ''}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className={`font-semibold z-10 text-[16px] whitespace-nowrap text-left ${isActive ? 'font-bold' : ''}`}>
                                    {item.label}
                                </span>

                                {item.highlight && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <p className="text-xs text-slate-500 text-center font-medium">Digital Ward Transformation</p>
                <p className="text-[10px] text-slate-400 text-center mt-1">Version 1.0.0</p>
            </div>
        </div>
    );
}

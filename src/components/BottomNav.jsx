import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, AlertCircle, Newspaper, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { requireAuth } = useAuth();

    // Do not show on onboarding screens
    const hideOnRoutes = ['/', '/welcome', '/signup', '/member'];
    if (hideOnRoutes.includes(location.pathname)) return null;

    // Order: Home · Updates · Services (center) · Emergency · Profile
    const navItems = [
        { id: 'dashboard', path: '/dashboard', icon: Home, label: 'Home', center: false },
        { id: 'our-ward', path: '/our-ward', icon: Newspaper, label: 'Updates', center: false },
        { id: 'smart-ward', path: '/smart-ward', icon: Layers, label: 'Services', center: true },
        { id: 'support', path: '/support', icon: AlertCircle, label: 'Emergency', center: false },
        { id: 'profile', path: '/profile', icon: User, label: 'Profile', center: false },
    ];

    const handleNavigation = (item) => {
        if (item.id === 'profile') {
            requireAuth(() => navigate(item.path));
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between pb-safe">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    /* ── Centered "Services" floating pill ── */
                    if (item.center) {
                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                whileTap={{ scale: 0.92 }}
                                className="relative flex flex-col items-center justify-center -mt-5 focus:outline-none"
                            >
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center"
                                    style={{
                                        background: isActive
                                            ? 'linear-gradient(135deg,#2563eb,#6366f1)'
                                            : 'linear-gradient(135deg,#1e3a8a,#3b82f6)',
                                        boxShadow: isActive
                                            ? '0 0 0 3px rgba(99,102,241,0.25), 0 8px 24px rgba(37,99,235,0.5)'
                                            : '0 0 0 2px rgba(212,180,131,0.4), 0 6px 20px rgba(30,58,138,0.4)',
                                    }}
                                >
                                    <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                                </div>
                                <span
                                    className="text-[9px] font-black uppercase tracking-widest mt-1"
                                    style={{ color: isActive ? '#2563eb' : '#94a3b8' }}
                                >
                                    {item.label}
                                </span>
                            </motion.button>
                        );
                    }

                    /* ── Regular nav items ── */
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => handleNavigation(item)}
                            whileTap={{ scale: 0.9 }}
                            className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full cursor-pointer"
                        >
                            <motion.div
                                animate={{
                                    y: isActive ? -4 : 0,
                                    color: isActive ? '#2563EB' : '#94a3b8',
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>

                            {/* Active indicator dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

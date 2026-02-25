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

    const navItems = [
        { id: 'dashboard', path: '/dashboard', icon: Home, label: 'ഹോം | Home' },
        { id: 'smart-ward', path: '/smart-ward', icon: Layers, label: 'സേവനങ്ങൾ | Services' },
        { id: 'support', path: '/support', icon: AlertCircle, label: 'അത്യാഹിതം | Emergency' },
        { id: 'our-ward', path: '/our-ward', icon: Newspaper, label: 'വാർത്തകൾ | Updates' },
        { id: 'profile', path: '/profile', icon: User, label: 'പ്രൊഫൈൽ | Profile' }
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
                                    color: isActive ? '#6366F1' : '#94a3b8'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>

                            {/* Active Indicator Dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"
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

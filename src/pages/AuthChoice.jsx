import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function AuthChoice() {
    const navigate = useNavigate();
    const { continueAsGuest } = useAuth();

    const handleLogin = () => {
        navigate('/signup');
    };

    const handleSkip = () => {
        continueAsGuest();
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col justify-between h-screen w-full p-6 bg-background lg:items-center">
            <div className="pt-12 w-full lg:max-w-3xl flex-1 flex flex-col justify-center">
                {/* Logo Section - Prepared for high-quality SVG/Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-sky-600 to-blue-700 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-2xl shadow-blue-200/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <svg viewBox="0 0 24 24" className="w-12 h-12 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Rise Up</h2>
                    <p className="text-[10px] uppercase tracking-[.3em] font-bold text-sky-600 mt-1 opacity-80">Panayi Ward</p>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl font-bold text-slate-800 font-sans tracking-tight text-center"
                >
                    ലോഗിൻ ചെയ്യുക
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-2"
                >
                    <p className="text-slate-500 font-sans text-center lg:text-lg">സേവനങ്ങൾ പൂർണ്ണമായും ലഭ്യമാകാൻ ലോഗിൻ ചെയ്യുക.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 space-y-4 w-full"
                >
                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-2xl text-[16px] font-bold shadow-xl shadow-blue-100/50 hover:bg-opacity-90 transition-all active:scale-[0.98] flex flex-col items-center justify-center leading-tight"
                    >
                        ലോഗിൻ / രജിസ്റ്റർ
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-60 mt-0.5">Mobile Login / Sign Up</span>
                    </button>
                    <button
                        onClick={handleSkip}
                        className="w-full bg-white text-slate-600 border border-slate-200 py-4 rounded-2xl text-[16px] font-bold hover:bg-slate-50 transition-all active:scale-[0.98] flex flex-col items-center justify-center leading-tight"
                    >
                        അതിഥിയായി തുടരുക
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mt-0.5">Continue as Guest</span>
                    </button>
                </motion.div>

            </div>
        </div>
    );
}

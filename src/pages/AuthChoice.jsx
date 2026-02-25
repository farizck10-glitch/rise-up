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
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-sm"
                >
                    <span className="text-primary text-3xl font-bold font-sans">RU</span>
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
                        className="w-full bg-primary text-white py-4 rounded-2xl text-lg font-semibold shadow-floating hover:bg-opacity-90 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-95"
                    >
                        ലോഗിൻ / രജിസ്റ്റർ
                        <span className="block text-[10px] uppercase tracking-widest font-semibold opacity-80 mt-0.5">Login / Sign Up</span>
                    </button>
                    <button
                        onClick={handleSkip}
                        className="w-full bg-slate-50 text-slate-600 border border-slate-200 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-100 transition-all focus:outline-none focus:ring-4 focus:ring-slate-200 active:scale-95"
                    >
                        അതിഥിയായി തുടരുക
                        <span className="block text-[10px] uppercase tracking-widest font-semibold opacity-60 mt-0.5">Continue as Guest</span>
                    </button>
                </motion.div>

            </div>
        </div>
    );
}

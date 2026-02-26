import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Splash() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-between h-screen w-full bg-white relative overflow-hidden">

            {/* Subtle background glow — doesn't interfere with text */}
            <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/6 rounded-full blur-[80px] pointer-events-none z-0" />
            <div className="absolute bottom-[20%] right-[-10%] w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none z-0" />

            {/* Center: Logo + Name + Motto */}
            <div className="flex-1 flex flex-col items-center justify-center w-full z-10 px-8">

                {/* Logo mark */}
                <motion.div
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8"
                >
                    <div
                        className="w-28 h-28 rounded-[2rem] flex items-center justify-center shadow-[0_12px_40px_rgba(30,58,138,0.28)]"
                        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}
                    >
                        <span className="text-white text-5xl font-bold font-sans tracking-tighter select-none">RU</span>
                    </div>
                </motion.div>

                {/* App name */}
                <motion.h1
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="text-[38px] font-bold text-slate-900 font-sans tracking-tight leading-none"
                >
                    Panayi Ward
                </motion.h1>

                {/* Motto — bilingual */}
                <motion.div
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
                    className="flex flex-col items-center mt-3 text-center gap-1"
                >
                    <p className="text-blue-700 font-malayalam font-bold text-[17px] leading-snug">
                        സ്മാർട്ട് വാർഡ്, സുരക്ഷിത വാർഡ്
                    </p>
                    <p className="text-slate-400 font-sans text-[11px] uppercase tracking-[0.2em] font-semibold">
                        Smart Ward · Safe Ward
                    </p>
                </motion.div>

                {/* Ward badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-6 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50"
                >
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">Ward 18 · Panayi</p>
                </motion.div>
            </div>

            {/* Bottom: Single elegant GET STARTED button */}
            <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
                className="w-full z-10 px-6 pb-10"
            >
                <button
                    onClick={() => navigate('/welcome')}
                    className="w-full py-4 rounded-2xl flex flex-col items-center justify-center gap-0.5 focus:outline-none active:scale-[0.98] transition-all duration-300"
                    style={{
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #6366f1 100%)',
                        boxShadow: '0 8px 32px rgba(30,58,138,0.35), 0 2px 8px rgba(99,102,241,0.2)',
                    }}
                >
                    <span className="font-malayalam font-bold text-[18px] text-white leading-none">പ്രവേശിക്കുക</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-white/60 mt-0.5">Enter App</span>
                </button>
            </motion.div>
        </div>
    );
}

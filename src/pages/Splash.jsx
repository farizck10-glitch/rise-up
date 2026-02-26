import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Splash() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-between h-screen w-full p-6 bg-white">
            <div className="flex-1 flex flex-col items-center justify-center w-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-32 h-32 bg-primary rounded-[2rem] shadow-floating flex items-center justify-center mb-8"
                >
                    <span className="text-white text-5xl font-bold font-sans tracking-tighter">RU</span>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-4xl font-bold text-slate-800 font-sans tracking-tight"
                >
                    Rise Up
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center mt-3 text-center"
                >
                    <p className="text-primary font-malayalam font-bold text-lg leading-tight">സ്മാർട്ട് വാർഡ്, സുരക്ഷിത വാർഡ്</p>
                    <p className="text-slate-500 font-sans mt-0.5 text-sm uppercase tracking-wider font-semibold">Smart Ward, Safe Ward</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="w-full pb-8 flex flex-col gap-3"
            >
                <button
                    onClick={() => navigate('/welcome')}
                    className="w-full bg-primary text-white py-4 flex flex-col items-center justify-center rounded-2xl shadow-floating hover:bg-opacity-90 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-95"
                >
                    <span className="font-malayalam font-bold text-lg">തുടങ്ങാം</span>
                    <span className="text-[11px] uppercase tracking-widest font-semibold opacity-80 mt-0.5">Get Started</span>
                </button>
                <motion.button
                    onClick={() => navigate('/welcome')}
                    whileTap={{ scale: 0.97 }}
                    className="w-full relative py-4 rounded-2xl font-black text-[13px] tracking-[0.18em] uppercase transition-all active:scale-95 focus:outline-none overflow-hidden group"
                    style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0f172a 100%)',
                        border: '1.5px solid rgba(212,180,131,0.55)',
                        boxShadow: '0 0 18px 0 rgba(212,180,131,0.18), 0 4px 24px 0 rgba(30,58,138,0.28)',
                        color: '#D4B483',
                    }}
                >
                    {/* Inner shimmer on hover */}
                    <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'linear-gradient(135deg,rgba(212,180,131,0.08) 0%,rgba(99,102,241,0.06) 100%)' }} />
                    <span className="relative z-10 flex flex-col items-center gap-0.5">
                        <span style={{ letterSpacing: '0.2em' }}>EXPLORE SERVICES</span>
                        <span className="text-[9px] font-bold tracking-widest uppercase opacity-50" style={{ color: '#D4B483', letterSpacing: '0.25em' }}>
                            Smart Ward · Village Services
                        </span>
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
}

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen w-full bg-background relative overflow-hidden lg:items-center">
            {/* Background Decorative Blob */}
            <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />

            <div className="flex-1 flex flex-col p-6 z-10 pt-16 w-full lg:max-w-3xl items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-8"
                >
                    <div className="relative w-36 h-36 mb-6">
                        <div className="absolute inset-0 bg-gradient-to-tr from-sky-600 to-indigo-600 rounded-3xl p-1 shadow-2xl">
                            <div className="w-full h-full bg-slate-100 rounded-[1.25rem] overflow-hidden flex items-center justify-center border-4 border-white relative">
                                {/* Modern SVG Profile Illustration */}
                                <div className="absolute inset-0 bg-sky-50 flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-sky-400 opacity-60">
                                        <circle cx="50" cy="35" r="15" fill="currentColor" />
                                        <path d="M20 85c0-15 10-25 30-25s30 10 30 25" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-sm font-bold">✓</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 font-malayalam text-center mb-1">സ്വാഗതം</h2>
                    <p className="text-sky-600 font-bold text-[10px] mt-0 uppercase tracking-[0.3em] opacity-80">Official Welcome</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-blue-100/50 border border-white relative"
                >
                    <div className="relative z-10">
                        <p className="text-slate-800 font-malayalam leading-relaxed text-center text-lg md:text-xl font-medium">
                            "നമ്മുടെ പാണായി വാർഡിന്റെ വികസനത്തിലേക്കും ഡിജിറ്റൽ സേവനങ്ങളിലേക്കും ഏവർക്കും സ്വാഗതം."
                        </p>
                        <div className="mt-8 flex flex-col items-center">
                            <div className="w-12 h-px bg-sky-200 mb-4" />
                            <p className="font-black text-slate-800 text-[14px] uppercase tracking-wider">നിങ്ങളുടെ മെമ്പർ</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ward Member · Panayi</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 bg-gradient-to-t from-background via-background to-transparent z-10 w-full lg:max-w-3xl"
            >
                <button
                    onClick={() => navigate('/showcase')}
                    className="w-full bg-primary text-white py-3.5 flex flex-col items-center justify-center rounded-2xl shadow-floating hover:bg-opacity-90 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-95 transition-all duration-300 shadow-[0_8px_32px_rgba(30,58,138,0.3)]"
                >
                    <span className="font-malayalam font-bold text-lg">തുടങ്ങാം</span>
                    <span className="text-[11px] uppercase tracking-widest font-semibold opacity-80 mt-0.5">Continue</span>
                </button>
            </motion.div>
        </div>
    );
}

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
                    <div className="relative w-32 h-32 mb-6">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full p-1 shadow-floating">
                            <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center border-4 border-white">
                                {/* SVG Avatar Placeholder */}
                                <svg className="w-16 h-16 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 font-malayalam text-center mb-1">മെമ്പറുടെ സന്ദേശം</h2>
                    <p className="text-primary font-bold text-xs mt-0 uppercase tracking-widest opacity-80">Member's Message</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-[2rem] p-8 shadow-floating border border-slate-50 relative"
                >
                    {/* Quote Icon */}
                    <div className="absolute top-6 left-6 text-primary/20 text-4xl font-serif">"</div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-slate-800 font-malayalam mb-4 pl-6 text-center leading-relaxed">പ്രിയ നാട്ടുകാരേ,</h3>
                        <p className="text-slate-600 font-malayalam leading-relaxed text-center md:text-lg">
                            നമ്മുടെ വാർഡിന്റെ വികസനവും സേവനങ്ങളും നിങ്ങളുടെ വിരൽത്തുമ്പിൽ എത്തിക്കുക എന്ന ലക്ഷ്യത്തോടെയാണ് ഈ ആപ്പ് നിർമ്മിച്ചിരിക്കുന്നത്. എല്ലാവരുടെയും സഹകരണം പ്രതീക്ഷിക്കുന്നു.
                        </p>
                        <div className="mt-6 flex flex-col items-center">
                            <img src="/vite.svg" alt="Signature Signature" className="h-8 opacity-50 mb-2 grayscale" />
                            <p className="font-semibold text-slate-800">Member Name</p>
                            <p className="text-sm text-slate-500">Panchayat Ward Member</p>
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
                    onClick={() => navigate('/auth')}
                    className="w-full bg-primary text-white py-3.5 flex flex-col items-center justify-center rounded-2xl shadow-floating hover:bg-opacity-90 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-95"
                >
                    <span className="font-malayalam font-bold text-lg">തുടങ്ങാം</span>
                    <span className="text-[11px] uppercase tracking-widest font-semibold opacity-80 mt-0.5">Continue</span>
                </button>
            </motion.div>
        </div>
    );
}

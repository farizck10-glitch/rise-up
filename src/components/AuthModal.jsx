import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Signup from '../pages/Signup';

export default function AuthModal() {
    const { isModalOpen, closeModal, login, authMessage } = useAuth();

    return (
        <AnimatePresence>
            {isModalOpen && (
                <>
                    {/* Backdrop Blur overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] cursor-pointer"
                    />

                    {/* Anti-Gravity Bottom Sheet / Centered Modal */}
                    <motion.div
                        initial={{ y: "100%", opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: "100%", opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[110] max-w-md mx-auto h-[85vh] bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
                    >
                        {/* Handle bar for bottom sheet look */}
                        <div className="w-full flex justify-center pt-4 pb-2 bg-white sticky top-0 z-10">
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                        </div>

                        <div className="px-6 pb-2 pt-2 text-center bg-white sticky top-12 z-10 border-b border-slate-50">
                            <h3 className="text-xl font-bold text-slate-800 font-malayalam tracking-tight leading-tight mb-1">
                                {authMessage?.title || "ഈ സേവനം ഉപയോഗിക്കാൻ ദയവായി ലോഗിൻ ചെയ്യുക"}
                            </h3>
                            <p className="text-sm font-sans text-slate-500 mt-1 pb-4">
                                {authMessage?.subtitle || "Please login to continue."}
                            </p>
                        </div>

                        {/* We render a scaled-down version of Signup flow or a simplified interceptor inside the modal */}
                        <div className="flex-1 overflow-y-auto w-full flex flex-col pt-0">
                            {/* Simplified intercept action - instead of full router flow, just a button for mockup */}
                            <div className="p-6 flex flex-col h-full justify-center pb-20">
                                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] mx-auto flex items-center justify-center mb-6 shadow-sm">
                                    <span className="text-primary text-3xl font-bold font-sans">RU</span>
                                </div>

                                <div className="space-y-4 w-full">
                                    <button
                                        onClick={login}
                                        className="w-full bg-primary text-white py-4 rounded-2xl text-lg font-semibold shadow-floating hover:bg-opacity-90 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-95"
                                    >
                                        Login / Sign Up
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-100 transition-all focus:outline-none focus:ring-4 focus:ring-slate-200 active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

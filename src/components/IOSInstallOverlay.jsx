import { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IOSInstallOverlay() {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        // Only show if on iOS Safari and not already in standalone mode
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

        if (isIOS && !isStandalone) {
            // Check if user has dismissed it before in this session
            const dismissed = sessionStorage.getItem('ios-pwa-dismissed');
            if (!dismissed) {
                setShowOverlay(true);
            }
        }
    }, []);

    const dismiss = () => {
        setShowOverlay(false);
        sessionStorage.setItem('ios-pwa-dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {showOverlay && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-[200] p-4 flex justify-center"
                >
                    <div className="w-full max-w-sm bg-white/90 backdrop-blur-2xl border border-sky-100 rounded-[2.5rem] p-6 shadow-2xl relative">
                        <button
                            onClick={dismiss}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                                <PlusSquare className="w-8 h-8 text-sky-600" />
                            </div>

                            <h3 className="font-bold text-slate-800 text-lg mb-1">Install Rise Up</h3>
                            <p className="text-slate-500 text-[13px] leading-relaxed mb-6">
                                Add this app to your Home Screen for a faster, full-screen experience and offline access.
                            </p>

                            <div className="space-y-4 w-full">
                                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <Share className="w-4 h-4 text-sky-600" />
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-700 text-left">
                                        1. Click the <span className="text-sky-600">Share</span> button in your browser
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <PlusSquare className="w-4 h-4 text-sky-600" />
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-700 text-left">
                                        2. Scroll down and tap <span className="text-sky-600">'Add to Home Screen'</span>
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={dismiss}
                                className="mt-8 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                            >
                                Not now, I'll do it later
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

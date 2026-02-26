import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    AlertCircle, Bell, X, Calendar, ChevronRight,
    CloudRain, Syringe, Users, IndianRupee, MapPin, CheckCircle2, Clock
} from 'lucide-react';

/* ─────────────────────────────────────────────
   WARD 18 CONFIG
───────────────────────────────────────────── */
const WARD = { name: 'Ward 18', location: 'Panayi', panchayat: 'Panayi Grama Panchayat' };
const GRAMASABHA_DATE = new Date('2026-03-15T10:00:00+05:30');

/* ─────────────────────────────────────────────
   LIVE COUNTDOWN HOOK
───────────────────────────────────────────── */
function useCountdown(targetDate) {
    const calc = () => {
        const diff = targetDate - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000),
            over: false,
        };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, [targetDate]);
    return time;
}

/* ─────────────────────────────────────────────
   EMERGENCY POPUP
───────────────────────────────────────────── */
export const EmergencyPopup = ({ isOpen, onClose, alert = {} }) => {
    const {
        type = 'rain',
        title = 'Heavy Rain Warning',
        message = `Heavy rainfall is expected in ${WARD.name} (${WARD.location}) over the next 24 hours. Stay indoors and contact emergency services if required.`,
        severity = 'red',
    } = alert;

    const Icon = type === 'vaccine' ? Syringe : CloudRain;
    const color = severity === 'amber'
        ? { glow: 'bg-amber-500/20', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/20', icon: 'bg-amber-500/20 border-amber-500/30 text-amber-400 shadow-amber-500/20', btn: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' }
        : { glow: 'bg-red-500/20', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-300 border-red-500/20', icon: 'bg-red-500/20 border-red-500/30 text-red-400 shadow-red-500/20', btn: 'bg-red-500 hover:bg-red-600 shadow-red-500/20' };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/70 backdrop-blur-[6px]"
                    />

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 280 } }}
                        exit={{ opacity: 0, scale: 0.9, y: 16 }}
                        className={`relative w-full max-w-md rounded-[28px] bg-gradient-to-br from-[#1E3A8A]/95 to-[#0F172A]/95 backdrop-blur-[24px] border ${color.border} shadow-[0_0_60px_rgba(0,0,0,0.5)] p-[1px] z-10`}
                    >
                        {/* Glow blob */}
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[80px] ${color.glow} blur-[50px] pointer-events-none rounded-full`} />

                        <div className="bg-white/[0.04] backdrop-blur-lg rounded-[27px] p-6 border border-white/[0.08] relative z-10">
                            {/* Close */}
                            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full hover:bg-white/10">
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-start gap-4">
                                <div className={`w-13 h-13 w-12 h-12 rounded-2xl ${color.icon} flex items-center justify-center shrink-0 border shadow-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="pt-0.5 flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase ${color.badge} border`}>
                                            Urgent — {WARD.name}
                                        </span>
                                    </div>
                                    <h3 className="text-[20px] font-black text-white tracking-tight mb-2 leading-tight">{title}</h3>
                                    <p className="text-[13px] text-blue-100/75 leading-relaxed mb-5">{message}</p>

                                    <div className="flex gap-3">
                                        <button onClick={onClose} className={`flex-1 ${color.btn} text-white font-bold py-3 rounded-2xl transition-colors shadow-lg text-sm flex items-center justify-center gap-2`}>
                                            <CheckCircle2 className="w-4 h-4" /> Got it
                                        </button>
                                        <button onClick={onClose} className="flex-1 bg-white/10 hover:bg-white/15 text-white/70 font-semibold py-3 rounded-2xl transition-colors text-sm border border-white/10">
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/* ─────────────────────────────────────────────
   SERVICE TOAST (slides from top-right)
───────────────────────────────────────────── */
export const ServiceToast = ({ isOpen, onClose, title = 'Ward Update', message = '', icon: Icon = Bell, type = 'info' }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 7000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    const accent = type === 'warning'
        ? 'border-amber-400/30 shadow-amber-500/10'
        : type === 'success'
            ? 'border-green-400/30 shadow-green-500/10'
            : 'border-blue-400/30 shadow-blue-500/10';

    const iconStyle = type === 'warning'
        ? 'bg-amber-500/20 border-amber-400/30 text-amber-300'
        : type === 'success'
            ? 'bg-green-500/20 border-green-400/30 text-green-300'
            : 'bg-blue-500/20 border-blue-400/30 text-blue-300';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 80, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0, transition: { type: 'spring', damping: 22, stiffness: 300 } }}
                    exit={{ opacity: 0, x: 60, y: -10, transition: { duration: 0.25 } }}
                    className={`fixed top-20 md:top-6 right-4 md:right-6 z-[150] w-[calc(100%-32px)] md:w-auto md:min-w-[340px] md:max-w-sm rounded-[20px] bg-[#1a2f6e]/85 backdrop-blur-[24px] border ${accent} p-[1px] shadow-2xl`}
                >
                    <div className="bg-white/[0.04] backdrop-blur-lg rounded-[19px] p-4 flex gap-3 items-center border border-white/[0.07] relative overflow-hidden">
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/8 blur-[30px] rounded-full pointer-events-none" />

                        <div className={`w-10 h-10 rounded-xl ${iconStyle} flex items-center justify-center shrink-0 border`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 relative z-10">
                            <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-[13px] font-bold text-white leading-tight">{title}</h4>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-300/60 bg-white/5 px-1.5 py-0.5 rounded">{WARD.name}</span>
                            </div>
                            <p className="text-[11px] text-blue-100/70 leading-snug">{message}</p>
                        </div>
                        <button onClick={onClose} className="shrink-0 text-white/30 hover:text-white/70 transition-colors p-1">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    {/* Auto-close progress bar */}
                    <motion.div
                        initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
                        transition={{ duration: 7, ease: 'linear' }}
                        className="h-[2px] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-b-[20px] origin-left mx-[1px]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ─────────────────────────────────────────────
   GRAMASABHA ALERT CARD (Dashboard section)
───────────────────────────────────────────── */
export const GramasabhaAlert = () => {
    const navigate = useNavigate();
    const time = useCountdown(GRAMASABHA_DATE);
    const [saved, setSaved] = useState(false);

    const pads = (n) => String(n).padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-[28px] bg-gradient-to-br from-[#1E3A8A] via-[#1e3a8a] to-[#0F172A] relative overflow-hidden shadow-2xl mb-2 p-[1px] border border-blue-400/20"
        >
            {/* Glow fx */}
            <div className="absolute top-1/2 right-0 w-[60%] h-[200%] bg-blue-500/10 blur-[70px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 blur-[50px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />

            <div className="bg-white/[0.04] backdrop-blur-[20px] rounded-[27px] p-5 md:p-7 border border-white/[0.08] relative z-10">
                {/* Header row */}
                <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15 shadow-inner">
                        <Calendar className="w-7 h-7 md:w-8 md:h-8 text-blue-300" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-lg text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-blue-500/25 text-blue-200 border border-blue-400/30">
                                Ward 18 Exclusive
                            </span>
                            {!time.over && (
                                <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold tracking-widest uppercase bg-green-500/20 text-green-300 border border-green-400/30 flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" /> Upcoming
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight">Next Gramasabha</h3>
                        <p className="text-[12px] text-blue-200/60 mt-0.5 font-medium">Panayi LP School • 10:00 AM</p>
                    </div>
                </div>

                {/* Countdown tiles */}
                {!time.over ? (
                    <div className="grid grid-cols-4 gap-2 mb-5">
                        {[['Days', time.days], ['Hrs', time.hours], ['Min', time.minutes], ['Sec', time.seconds]].map(([label, val]) => (
                            <div key={label} className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl py-3 text-center">
                                <div className="text-xl md:text-2xl font-black text-white tabular-nums leading-none">{pads(val)}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-blue-300/60 mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-5 bg-green-500/10 border border-green-400/20 rounded-2xl py-3 text-center">
                        <p className="text-green-300 font-bold text-sm">Gramasabha is happening today!</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-2 text-blue-100/60 text-[12px] font-semibold flex-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-blue-300/60" />
                        15 March 2026 · Panayi, {WARD.panchayat}
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <button
                            onClick={() => navigate('/gramasabha')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1 py-3 px-4 rounded-xl border border-white/20 bg-white/10 text-white/70 text-[12px] font-bold hover:bg-white/15 hover:text-white transition-all whitespace-nowrap"
                        >
                            View Portal <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setSaved(!saved)}
                            className={`flex-1 sm:flex-none font-bold py-3 px-5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 group whitespace-nowrap text-sm ${saved ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white hover:bg-blue-50 text-[#1E3A8A] shadow-white/10'}`}
                        >
                            {saved ? (
                                <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                            ) : (
                                <>Save the Date <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   NOTIFICATION CENTER DRAWER (bell button opens this)
───────────────────────────────────────────── */
const STATIC_NOTIFICATIONS = [
    { id: 1, type: 'emergency', icon: CloudRain, color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-400/25', title: 'Heavy Rain Warning', body: 'High rainfall expected in Ward 18 today. Stay safe.', time: 'Now', unread: true },
    { id: 2, type: 'service', icon: IndianRupee, color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-400/25', title: 'Pension Mustering', body: 'Pension verification camp at Panchayat office, 10 AM – 1 PM.', time: '2h ago', unread: true },
    { id: 3, type: 'event', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-400/25', title: 'Gramasabha Reminder', body: 'Next Gramasabha on 15 March 2026 at Panayi LP School.', time: 'Yesterday', unread: true },
    { id: 4, type: 'service', icon: Syringe, color: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-400/25', title: 'Vaccination Drive', body: 'Free vaccination camp for Ward 18 residents at PHC.', time: '2d ago', unread: false },
];

export const NotificationCenter = ({ isOpen, onClose }) => {
    const [items, setItems] = useState(STATIC_NOTIFICATIONS);
    const clearAll = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
    const dismiss = (id) => setItems(prev => prev.filter(n => n.id !== id));

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[180] flex justify-end">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[4px]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { type: 'spring', damping: 26, stiffness: 260 } }}
                        exit={{ x: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
                        className="relative z-10 w-full max-w-sm h-full bg-gradient-to-b from-[#1a2a70]/95 to-[#0d1440]/95 backdrop-blur-[28px] border-l border-white/10 flex flex-col shadow-2xl"
                    >
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 blur-[60px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-14 pb-5 border-b border-white/[0.08] shrink-0 relative z-10">
                            <div>
                                <h2 className="text-xl font-black text-white tracking-tight">Notifications</h2>
                                <p className="text-[11px] text-blue-300/60 font-semibold uppercase tracking-widest mt-0.5">{WARD.name} — {WARD.location}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={clearAll} className="text-[11px] font-bold text-blue-300/70 hover:text-blue-200 transition-colors uppercase tracking-wider">Mark all read</button>
                                <button onClick={onClose} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/50 hover:bg-white/15 hover:text-white transition-all">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Unread count */}
                        {items.some(n => n.unread) && (
                            <div className="px-6 py-3 relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300/50">
                                    {items.filter(n => n.unread).length} Unread
                                </span>
                            </div>
                        )}

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2 relative z-10 no-scrollbar">
                            <AnimatePresence>
                                {items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                                            className={`rounded-2xl ${item.bg} border ${item.border} p-4 flex gap-3 items-start relative group cursor-pointer hover:bg-white/[0.07] transition-colors`}
                                        >
                                            {item.unread && (
                                                <div className="absolute top-3.5 right-10 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                                            )}
                                            <div className={`w-9 h-9 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0 ${item.color}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0 pr-6">
                                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                                    <h4 className="text-[13px] font-bold text-white leading-tight truncate">{item.title}</h4>
                                                    <span className="text-[9px] text-blue-300/50 font-semibold whitespace-nowrap shrink-0">{item.time}</span>
                                                </div>
                                                <p className="text-[11px] text-blue-100/60 leading-snug">{item.body}</p>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); dismiss(item.id); }}
                                                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/70 transition-all"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {items.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <Bell className="w-10 h-10 text-blue-300/20 mb-3" />
                                    <p className="text-[13px] text-blue-100/30 font-semibold">All caught up!</p>
                                    <p className="text-[11px] text-blue-100/20">No new notifications for {WARD.name}.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

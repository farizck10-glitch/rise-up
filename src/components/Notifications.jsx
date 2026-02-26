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
        ? 'border-amber-300/60 shadow-amber-200/30'
        : type === 'success'
            ? 'border-green-300/60 shadow-green-200/30'
            : 'border-sky-300/60 shadow-sky-200/30';

    const iconStyle = type === 'warning'
        ? 'bg-amber-50 border-amber-200 text-amber-500'
        : type === 'success'
            ? 'bg-green-50 border-green-200 text-green-500'
            : 'bg-sky-50 border-sky-200 text-sky-500';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 80, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0, transition: { type: 'spring', damping: 22, stiffness: 300 } }}
                    exit={{ opacity: 0, x: 60, y: -10, transition: { duration: 0.25 } }}
                    className={`fixed top-20 md:top-6 right-4 md:right-6 z-[150] w-[calc(100%-32px)] md:w-auto md:min-w-[340px] md:max-w-sm rounded-[20px] bg-white/90 backdrop-blur-2xl border ${accent} p-[1px] shadow-xl`}
                >
                    <div className="bg-white/80 backdrop-blur-lg rounded-[19px] p-4 flex gap-3 items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100/50 blur-[30px] rounded-full pointer-events-none" />

                        <div className={`w-10 h-10 rounded-xl ${iconStyle} flex items-center justify-center shrink-0 border`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 relative z-10">
                            <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-[13px] font-bold text-slate-800 leading-tight">{title}</h4>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">{WARD.name}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">{message}</p>
                        </div>
                        <button onClick={onClose} className="shrink-0 text-slate-300 hover:text-slate-600 transition-colors p-1">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    {/* Auto-close progress bar */}
                    <motion.div
                        initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
                        transition={{ duration: 7, ease: 'linear' }}
                        className="h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-b-[20px] origin-left mx-[1px]"
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
            className="w-full rounded-[28px] bg-white/80 backdrop-blur-xl relative overflow-hidden shadow-lg mb-2 border border-sky-200"
        >
            {/* Soft light glow blobs */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-100 opacity-60 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-100 opacity-50 blur-[50px] rounded-full pointer-events-none" />

            <div className="relative z-10 p-5 md:p-7">
                {/* Header row */}
                <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0 shadow-sm">
                        <Calendar className="w-7 h-7 md:w-8 md:h-8 text-sky-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-lg text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-sky-100 text-sky-700 border border-sky-200">
                                Ward 18 Exclusive
                            </span>
                            {!time.over && (
                                <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold tracking-widest uppercase bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" /> Upcoming
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-tight">Next Gramasabha</h3>
                        <p className="text-[12px] text-slate-500 mt-0.5 font-medium">Panayi LP School • 10:00 AM</p>
                    </div>
                </div>

                {/* Countdown tiles */}
                {!time.over ? (
                    <div className="grid grid-cols-4 gap-2 mb-5">
                        {[['Days', time.days], ['Hrs', time.hours], ['Min', time.minutes], ['Sec', time.seconds]].map(([label, val]) => (
                            <div key={label} className="bg-sky-50 border border-sky-200 rounded-2xl py-3 text-center shadow-sm">
                                <div className="text-xl md:text-2xl font-black text-slate-800 tabular-nums leading-none">{pads(val)}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-sky-500 mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-2xl py-3 text-center">
                        <p className="text-emerald-600 font-bold text-sm">Gramasabha is happening today!</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-2 text-slate-500 text-[12px] font-semibold flex-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                        15 March 2026 · Panayi, {WARD.panchayat}
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <button
                            onClick={() => navigate('/gramasabha')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1 py-3 px-4 rounded-xl border border-sky-200 bg-sky-50 text-sky-700 text-[12px] font-bold hover:bg-sky-100 transition-all whitespace-nowrap"
                        >
                            View Portal <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setSaved(!saved)}
                            className={`flex-1 sm:flex-none font-bold py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group whitespace-nowrap text-sm ${saved ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-200 hover:from-sky-600 hover:to-blue-700'}`}
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

    // Light theme icon colours for notification types
    const LIGHT_COLORS = {
        emergency: { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
        service: { color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
        event: { color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-200' },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[180] flex justify-end">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/20 backdrop-blur-[4px]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { type: 'spring', damping: 26, stiffness: 260 } }}
                        exit={{ x: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
                        className="relative z-10 w-full max-w-sm h-full bg-white/95 backdrop-blur-2xl border-l border-sky-100 flex flex-col shadow-2xl shadow-sky-100/50"
                    >
                        {/* Subtle glow */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-100/60 blur-[60px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-14 pb-5 border-b border-sky-100 shrink-0 relative z-10">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">Notifications</h2>
                                <p className="text-[11px] text-sky-500 font-semibold uppercase tracking-widest mt-0.5">{WARD.name} — {WARD.location}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={clearAll} className="text-[11px] font-bold text-sky-500 hover:text-sky-700 transition-colors uppercase tracking-wider">Mark all read</button>
                                <button onClick={onClose} className="w-8 h-8 bg-sky-50 border border-sky-200 rounded-full flex items-center justify-center text-slate-400 hover:bg-sky-100 hover:text-slate-700 transition-all">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Unread count */}
                        {items.some(n => n.unread) && (
                            <div className="px-6 py-3 relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {items.filter(n => n.unread).length} Unread
                                </span>
                            </div>
                        )}

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2 relative z-10 no-scrollbar">
                            <AnimatePresence>
                                {items.map((item) => {
                                    const Icon = item.icon;
                                    const lc = LIGHT_COLORS[item.type] || LIGHT_COLORS.event;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                                            className={`rounded-2xl ${lc.bg} border ${lc.border} p-4 flex gap-3 items-start relative group cursor-pointer hover:shadow-sm transition-all`}
                                        >
                                            {item.unread && (
                                                <div className="absolute top-3.5 right-10 w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                                            )}
                                            <div className={`w-9 h-9 rounded-xl ${lc.bg} border ${lc.border} flex items-center justify-center shrink-0 ${lc.color}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0 pr-6">
                                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                                    <h4 className="text-[13px] font-bold text-slate-800 leading-tight truncate">{item.title}</h4>
                                                    <span className="text-[9px] text-slate-400 font-semibold whitespace-nowrap shrink-0">{item.time}</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 leading-snug">{item.body}</p>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); dismiss(item.id); }}
                                                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-slate-600 transition-all"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {items.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <Bell className="w-10 h-10 text-sky-200 mb-3" />
                                    <p className="text-[13px] text-slate-400 font-semibold">All caught up!</p>
                                    <p className="text-[11px] text-slate-300">No new notifications for {WARD.name}.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};



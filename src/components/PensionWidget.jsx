import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IndianRupee, ChevronRight, Phone, CheckCircle2,
    Clock, AlertCircle, Users, X, Sparkles
} from 'lucide-react';

/* ─────────────────────────────────────────────
   PENSION DATA — Ward 18 / Panayi
───────────────────────────────────────────── */
const CURRENT_MONTH = 'February 2026';
const NEXT_MUSTERING = 'March 1, 2026';
const WARD_MEMBER_PHONE = 'tel:+919876543210'; // Replace with actual number

const MONTHLY_STATUS = {
    label: `${CURRENT_MONTH} Pension`,
    status: 'Distributed',               // 'Distributed' | 'Pending' | 'Mustering'
    note: 'Amount credited to bank accounts',
};

const PENSION_TYPES = [
    { id: 1, type: 'Old Age Pension', malayalam: 'വൃദ്ധജന പെൻഷൻ', status: 'Distributed', beneficiaries: 42 },
    { id: 2, type: 'Widow Pension', malayalam: 'വിധവ പെൻഷൻ', status: 'Distributed', beneficiaries: 18 },
    { id: 3, type: 'Agricultural Labour', malayalam: 'കർഷക തൊഴിലാളി', status: 'Distributed', beneficiaries: 27 },
    { id: 4, type: 'Differently Abled', malayalam: 'ഭിന്നശേഷി പെൻഷൻ', status: 'Distributed', beneficiaries: 11 },
    { id: 5, type: 'Unmarried Women', malayalam: 'അവിവാഹിത വനിത', status: 'Mustering Due', beneficiaries: 6 },
    { id: 6, type: 'Fishermen Welfare', malayalam: 'ക്ഷേമനിധി', status: 'Pending', beneficiaries: 9 },
];

const STATUS_STYLE = {
    'Distributed': { dot: 'bg-green-400', text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Distributed' },
    'Pending': { dot: 'bg-amber-400', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Pending' },
    'Mustering Due': { dot: 'bg-red-400 animate-pulse', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Mustering Due' },
};

/* ─────────────────────────────────────────────
   MUSTERING ALERT BADGE (place near ID card)
───────────────────────────────────────────── */
export const MusteringBadge = ({ onClick }) => (
    <motion.button
        onClick={onClick}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:bg-amber-500/30 transition-all"
    >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Mustering Alert
    </motion.button>
);

/* ─────────────────────────────────────────────
   FULL PENSION WIDGET CARD
───────────────────────────────────────────── */
export default function PensionWidget() {
    const [expanded, setExpanded] = useState(false);
    const [contacted, setContacted] = useState(false);

    const hasMusteringDue = PENSION_TYPES.some(p => p.status === 'Mustering Due');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-[28px] bg-white/85 backdrop-blur-xl relative overflow-hidden shadow-lg border border-sky-200"
        >
            {/* Subtle ambient glows */}
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-sky-100/70 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-100/60 blur-[40px] rounded-full pointer-events-none" />

            <div className="relative z-10 overflow-hidden">

                {/* ── HEADER ── */}
                <div className="flex items-center justify-between px-5 md:px-6 pt-5 md:pt-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center shadow-sm shrink-0">
                            <IndianRupee className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-[16px] md:text-[17px] font-black text-slate-800 tracking-tight leading-none">Pension Updates</h3>
                                {hasMusteringDue && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-500 text-[9px] font-bold uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                        Action Needed
                                    </span>
                                )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-semibold mt-0.5 uppercase tracking-widest">Ward 18 — Panayi</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                {/* ── CURRENT MONTH STATUS BANNER ── */}
                <div className="mx-4 md:mx-6 mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] font-bold text-slate-800">{MONTHLY_STATUS.label}</p>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                {MONTHLY_STATUS.status}
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{MONTHLY_STATUS.note}</p>
                    </div>
                </div>

                {/* ── MUSTERING ALERT STRIP (if any type is due) ── */}
                {hasMusteringDue && (
                    <div className="mx-4 md:mx-6 mb-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[12px] font-bold text-amber-700">Mustering Starts {NEXT_MUSTERING}</p>
                            <p className="text-[10px] text-amber-600/80 mt-0.5 leading-snug">
                                Unmarried Women pension beneficiaries must appear at the Panchayat office for mustering verification.
                            </p>
                        </div>
                    </div>
                )}

                {/* ── EXPANDABLE PENSION TYPE TABLE ── */}
                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 md:px-6 pb-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Pension Type Status</p>

                                <div className="space-y-2">
                                    {PENSION_TYPES.map((pension) => {
                                        const s = STATUS_STYLE[pension.status] || STATUS_STYLE['Pending'];
                                        return (
                                            <div
                                                key={pension.id}
                                                className={`flex items-center justify-between rounded-2xl ${s.bg} border ${s.border} px-4 py-3 gap-3`}
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-bold text-slate-800 leading-tight">{pension.type}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 font-malayalam">{pension.malayalam}</p>
                                                </div>
                                                <div className="flex items-center gap-3 shrink-0">
                                                    <div className="text-right hidden sm:block">
                                                        <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                                                            <Users className="w-2.5 h-2.5" />
                                                            {pension.beneficiaries}
                                                        </div>
                                                    </div>
                                                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${s.bg} ${s.border}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                                        <span className={`text-[9px] font-black uppercase tracking-wider ${s.text}`}>{s.label}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── FOOTER: Show More + Contact ── */}
                <div className="px-4 md:px-6 pb-5 md:pb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 text-[12px] font-bold hover:bg-sky-100 hover:text-sky-800 transition-all"
                    >
                        {expanded ? 'Show Less' : 'View All Pension Types'}
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
                    </button>

                    <motion.a
                        href={WARD_MEMBER_PHONE}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => { setContacted(true); setTimeout(() => setContacted(false), 3000); }}
                        className={`flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-bold text-[12px] transition-all shadow-lg whitespace-nowrap ${contacted
                            ? 'bg-emerald-500 text-white shadow-emerald-200'
                            : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-200 hover:from-sky-600 hover:to-blue-700'
                            }`}
                    >
                        {contacted ? (
                            <><CheckCircle2 className="w-4 h-4" /> Connecting...</>
                        ) : (
                            <><Phone className="w-4 h-4" /> Contact Ward Member</>
                        )}
                    </motion.a>
                </div>

            </div>
        </motion.div>
    );
}

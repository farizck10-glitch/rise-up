import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Calendar, Download, FileText, CheckCircle2,
    Clock, MessageSquarePlus, X, Send, ChevronRight,
    Droplets, BookOpen, Leaf, Wrench, Users, AlertCircle,
    ClipboardList, MapPin, Star, Loader2
} from 'lucide-react';

/* ─────────────────────────────────────────────
   WARD 18 DATA
───────────────────────────────────────────── */
const MEETING = {
    date: '15 March 2026',
    time: '10:00 AM',
    venue: 'Panayi LP School, Ward 18',
    presiding: 'Ward Member, Panayi Grama Panchayat',
    noticeUrl: '#',   // Replace with actual PDF URL
};

const AGENDA_ITEMS = [
    { id: 1, icon: Droplets, title: 'Drinking Water Supply Project', malayalam: 'കുടിവെള്ള പദ്ധതി', detail: 'Review progress of the South Zone pipeline extension. Approval for remaining ₹2.4L budget.' },
    { id: 2, icon: BookOpen, title: 'School Infrastructure Report', malayalam: 'വിദ്യാഭ്യാസ റിപ്പോർട്ട്', detail: 'Presentation by Headmaster on classroom shortage and digital lab requirements.' },
    { id: 3, icon: Leaf, title: 'Haritha Keralam Waste Management', malayalam: 'ഹരിത കേരളം', detail: 'Monthly waste collection & bio-gas unit installation status update.' },
    { id: 4, icon: Wrench, title: 'Road & Street Light Repairs', malayalam: 'റോഡ്, വിളക്ക് നന്നാക്കൽ', detail: 'Petition review for 3 unlit roads and pothole repair approvals.' },
    { id: 5, icon: Users, title: 'Pension Mustering Schedule', malayalam: 'പെൻഷൻ മസ്റ്ററിംഗ്', detail: 'Announce mustering dates for Unmarried Women & Fishermen Welfare beneficiaries.' },
    { id: 6, icon: AlertCircle, title: 'Any Other Business (AOB)', malayalam: 'മറ്റ് വിഷയങ്ങൾ', detail: 'Open floor for residents to raise urgent local issues.' },
];

const PAST_DECISIONS = [
    { id: 1, date: 'Nov 15, 2025', resolution: 'Approved ₹3.6L for road widening near temple junction.', status: 'Implemented', tag: 'Infrastructure' },
    { id: 2, date: 'Nov 15, 2025', resolution: 'Sanctioned 8 new Kudumbashree units for self-employment.', status: 'Implemented', tag: 'Welfare' },
    { id: 3, date: 'Aug 12, 2025', resolution: 'Bio-gas plant for Ward 18: survey completed, work in progress.', status: 'In Progress', tag: 'Environment' },
    { id: 4, date: 'Aug 12, 2025', resolution: 'Rejected proposal for commercial construction on public land.', status: 'Closed', tag: 'Planning' },
    { id: 5, date: 'May 10, 2025', resolution: 'Pension mustering camp held. 94 beneficiaries verified.', status: 'Implemented', tag: 'Welfare' },
];

const STATUS_STYLES = {
    'Implemented': { dot: 'bg-green-400', text: 'text-green-300', chip: 'bg-green-500/15 border-green-400/25' },
    'In Progress': { dot: 'bg-amber-400', text: 'text-amber-300', chip: 'bg-amber-500/15 border-amber-400/25' },
    'Closed': { dot: 'bg-slate-400', text: 'text-slate-400', chip: 'bg-slate-500/15 border-slate-400/25' },
};

/* ─────────────────────────────────────────────
   SUGGEST A TOPIC MODAL
───────────────────────────────────────────── */
function SuggestModal({ onClose }) {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const categories = ['Roads & Infrastructure', 'Water Supply', 'Welfare / Pension', 'Environment', 'Health', 'Education', 'Other'];

    const handleSubmit = () => {
        if (!text.trim() || !category) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-slate-900/70 backdrop-blur-[6px]"
            />

            {/* Sheet */}
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { type: 'spring', damping: 26, stiffness: 260 } }}
                exit={{ y: '100%', opacity: 0, transition: { duration: 0.22 } }}
                className="relative z-10 w-full sm:max-w-lg rounded-t-[32px] sm:rounded-[28px] bg-gradient-to-b from-[#1a2f6e] to-[#0d1440] border border-white/10 shadow-2xl overflow-hidden"
            >
                {/* Handle bar (mobile) */}
                <div className="flex justify-center pt-3 pb-0 sm:hidden">
                    <div className="w-10 h-1 bg-white/20 rounded-full" />
                </div>

                <div className="px-6 pt-5 pb-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-black text-white tracking-tight">Suggest a Topic</h3>
                            <p className="text-[11px] text-blue-300/50 mt-0.5 uppercase tracking-widest font-semibold">Ward 18 · Next Gramasabha</p>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="py-8 flex flex-col items-center gap-4 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-white mb-1">Suggestion Submitted!</h4>
                                    <p className="text-[12px] text-blue-200/60 leading-relaxed">
                                        Thank you for participating in Ward 18's development. Your suggestion will be reviewed by the Ward Member.
                                    </p>
                                </div>
                                <button onClick={onClose} className="mt-2 bg-white/10 hover:bg-white/15 text-white/70 font-semibold py-2.5 px-8 rounded-2xl transition-colors text-sm border border-white/10">
                                    Close
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div key="form" className="space-y-4">
                                {/* Category chips */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-300/50 mb-2">Category *</p>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setCategory(cat)}
                                                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${category === cat
                                                        ? 'bg-blue-500/30 border-blue-400/50 text-blue-200'
                                                        : 'bg-white/[0.06] border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Textarea */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-300/50 mb-2">Describe the Issue / Suggestion *</p>
                                    <textarea
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        rows={4}
                                        maxLength={400}
                                        placeholder="Share your concern or idea for the next Gramasabha..."
                                        className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-blue-400/40 focus:bg-white/[0.08] transition-all resize-none leading-relaxed"
                                    />
                                    <p className="text-right text-[9px] text-blue-300/30 mt-1 font-semibold">{text.length}/400</p>
                                </div>

                                <motion.button
                                    onClick={handleSubmit}
                                    disabled={!text.trim() || !category || loading}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                    ) : (
                                        <><Send className="w-4 h-4" /> Submit to Ward Member</>
                                    )}
                                </motion.button>

                                <p className="text-center text-[10px] text-blue-200/30 leading-snug">
                                    Your name will not be shared publicly. Suggestions are reviewed by the Ward Member only.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function GramasabhaPortal() {
    const navigate = useNavigate();
    const [showSuggest, setShowSuggest] = useState(false);
    const [expandedAgenda, setExpandedAgenda] = useState(null);
    const [showAllDecisions, setShowAllDecisions] = useState(false);

    const visibleDecisions = showAllDecisions ? PAST_DECISIONS : PAST_DECISIONS.slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen w-full bg-[#f8fafc] overflow-y-auto no-scrollbar">

            {/* ── HERO HEADER ── */}
            <div className="bg-gradient-to-br from-[#1E3A8A] via-[#1a2f6e] to-[#0d1440] px-5 md:px-10 pt-12 pb-8 relative overflow-hidden">
                {/* Glow blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 blur-[60px] rounded-full pointer-events-none" />

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-blue-300/70 hover:text-white transition-colors text-sm font-bold mb-6 relative z-10"
                >
                    <ChevronLeft className="w-4 h-4" /> Dashboard
                </button>

                {/* Title block */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#D4B483] bg-[#D4B483]/15 border border-[#D4B483]/30 px-2.5 py-0.5 rounded-full">
                            Ward 18 Exclusive
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-300 bg-green-500/15 border border-green-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Upcoming
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-1">
                        Gramasabha Portal
                    </h1>
                    <p className="text-[13px] text-blue-200/60 font-semibold">Panayi Grama Panchayat · Ward 18</p>

                    {/* Meeting meta */}
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                        <div className="flex items-center gap-2 text-[12px] text-blue-100/60 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-[#D4B483]" /> {MEETING.date} · {MEETING.time}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-blue-100/60 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-[#D4B483]" /> {MEETING.venue}
                        </div>
                    </div>
                </div>

                {/* Download Notice button */}
                <motion.a
                    href={MEETING.noticeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 relative z-10 w-full sm:w-auto flex items-center justify-center gap-3 bg-white/[0.08] backdrop-blur-lg border border-white/15 hover:bg-white/[0.13] transition-all rounded-2xl py-4 px-6 group shadow-[0_0_24px_rgba(99,102,241,0.12)]"
                >
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all" />
                    <div className="w-10 h-10 rounded-xl bg-[#D4B483]/20 border border-[#D4B483]/30 flex items-center justify-center shrink-0 relative z-10 group-hover:bg-[#D4B483]/30 transition-colors">
                        <Download className="w-5 h-5 text-[#D4B483]" />
                    </div>
                    <div className="text-left relative z-10">
                        <p className="text-[13px] text-white font-bold leading-tight">Download Official Notice</p>
                        <p className="text-[10px] text-blue-200/50 font-semibold">Agenda PDF · Ward 18 · March 2026</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30 ml-auto relative z-10 group-hover:translate-x-1 group-hover:text-white/50 transition-all" />
                </motion.a>
            </div>

            {/* ── BODY ── */}
            <div className="flex-1 px-5 md:px-10 py-6 md:py-8 space-y-6 pb-28">

                {/* ── AGENDA CARD ── */}
                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <div className="rounded-[28px] bg-gradient-to-br from-[#1E3A8A] to-[#0f1e5c] border border-blue-400/20 shadow-xl overflow-hidden p-[1px]">
                        <div className="bg-white/[0.04] backdrop-blur-[20px] rounded-[27px] border border-white/[0.07]">
                            {/* Card header */}
                            <div className="flex items-center gap-3 px-5 md:px-6 pt-5 md:pt-6 pb-4 border-b border-white/[0.07]">
                                <div className="w-10 h-10 rounded-xl bg-[#D4B483]/15 border border-[#D4B483]/30 flex items-center justify-center shrink-0">
                                    <ClipboardList className="w-5 h-5 text-[#D4B483]" />
                                </div>
                                <div>
                                    <h2 className="text-[15px] md:text-[16px] font-black tracking-tight" style={{ color: '#D4B483' }}>
                                        Upcoming Gramasabha Agenda
                                    </h2>
                                    <p className="text-[10px] text-blue-300/40 font-bold uppercase tracking-widest mt-0.5">{MEETING.date}</p>
                                </div>
                            </div>

                            {/* Agenda list */}
                            <div className="px-4 md:px-5 py-3 space-y-1.5">
                                {AGENDA_ITEMS.map((item, index) => {
                                    const Icon = item.icon;
                                    const isExpanded = expandedAgenda === item.id;
                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => setExpandedAgenda(isExpanded ? null : item.id)}
                                            className="w-full text-left rounded-2xl px-4 py-3.5 flex items-start gap-3 transition-all hover:bg-white/[0.06] group"
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            {/* Number bubble */}
                                            <div className="w-7 h-7 rounded-full bg-[#D4B483]/15 border border-[#D4B483]/25 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-[11px] font-black" style={{ color: '#D4B483' }}>{index + 1}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <Icon className="w-3.5 h-3.5 text-blue-300/50 shrink-0" />
                                                    <p className="text-[13px] font-bold text-white leading-tight">{item.title}</p>
                                                </div>
                                                <p className="text-[11px] text-blue-200/40 mt-0.5 font-medium font-malayalam">{item.malayalam}</p>
                                                <AnimatePresence initial={false}>
                                                    {isExpanded && (
                                                        <motion.p
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="text-[11px] text-blue-100/60 mt-2 leading-snug overflow-hidden"
                                                        >
                                                            {item.detail}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 text-white/20 shrink-0 mt-0.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Footer hint */}
                            <p className="text-center text-[10px] text-blue-300/30 font-semibold pb-4 pt-1">
                                Tap any item to expand details
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* ── PAST DECISIONS ── */}
                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h2 className="text-[16px] font-black text-slate-800 tracking-tight">Previous Meeting Decisions</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Minutes of Past Meetings</p>
                        </div>
                        <button
                            onClick={() => setShowAllDecisions(!showAllDecisions)}
                            className="text-[12px] font-bold text-blue-600 hover:text-indigo-700 transition-colors"
                        >
                            {showAllDecisions ? 'Show Less' : 'View All'}
                        </button>
                    </div>

                    <div className="space-y-3">
                        <AnimatePresence initial={false}>
                            {visibleDecisions.map((dec) => {
                                const s = STATUS_STYLES[dec.status] || STATUS_STYLES['In Progress'];
                                return (
                                    <motion.div
                                        key={dec.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3.5 flex items-start gap-3"
                                    >
                                        <span className={`w-2 h-2 rounded-full ${s.dot} shrink-0 mt-1.5`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] text-slate-700 font-semibold leading-snug">{dec.resolution}</p>
                                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{dec.date}</span>
                                                <span className="text-slate-300">·</span>
                                                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">{dec.tag}</span>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full shrink-0 border ${s.chip}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                            <span className={`text-[9px] font-black uppercase tracking-wider ${s.text}`}>{dec.status}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </motion.section>

                {/* ── PARTICIPATION STRIP ── */}
                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <div className="rounded-[24px] bg-gradient-to-br from-[#1E3A8A]/90 to-[#0d1440]/90 border border-blue-400/20 p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4 shadow-xl">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-2xl bg-[#D4B483]/15 border border-[#D4B483]/30 flex items-center justify-center shrink-0">
                                <Star className="w-6 h-6 text-[#D4B483]" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-black text-white leading-tight">Have a Local Issue?</h3>
                                <p className="text-[11px] text-blue-200/50 mt-0.5 leading-snug">Suggest a topic for the next Gramasabha agenda.</p>
                            </div>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowSuggest(true)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1E3A8A] font-black py-3 px-6 rounded-2xl shadow-xl hover:bg-blue-50 transition-all text-[13px] whitespace-nowrap shrink-0"
                        >
                            <MessageSquarePlus className="w-4 h-4" /> Suggest a Topic
                        </motion.button>
                    </div>
                </motion.section>

            </div>

            {/* Suggest Modal */}
            <AnimatePresence>
                {showSuggest && <SuggestModal onClose={() => setShowSuggest(false)} />}
            </AnimatePresence>
        </div>
    );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Recycle, Sprout, BookOpen, Music2,
    CalendarDays, Trash2, Leaf, Droplets, Sun, CheckCircle2,
    AlertCircle, Users, MapPin, Clock, ChevronRight, Megaphone,
    Library, Trophy, Star, Phone, Info, FlowerIcon, Tractor
} from 'lucide-react';

/* ── DATA ─────────────────────────────────────────── */

const WASTE_SCHEDULE = [
    {
        id: 1, type: 'Plastic / Non-biodegradable', malayalam: 'പ്ലാസ്റ്റിക് / അജൈവ മാലിന്യം',
        icon: Trash2, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200',
        nextDate: '4 Mar 2026 (Wednesday)', frequency: 'Weekly',
        note: 'Clean, dry plastics only. Keep in green bag provided by HKS.',
    },
    {
        id: 2, type: 'Biodegradable / Organic', malayalam: 'ജൈവ മാലിന്യം (കിച്ചൺ വേസ്റ്റ്)',
        icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200',
        nextDate: 'Daily (Mon–Sat)', frequency: 'Daily',
        note: 'Use the brown compost bin. Contact HKS if missed.',
    },
    {
        id: 3, type: 'E-Waste', malayalam: 'ഇ-മാലിന്യം (ഇലക്ട്രോണിക്)',
        icon: Recycle, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
        nextDate: 'TBA — Contact Panchayat', frequency: 'Monthly',
        note: 'Old phones, batteries, cables. Hand over to authorized collector.',
    },
    {
        id: 4, type: 'Garden / Bulky Waste', malayalam: 'ഗാർഡൻ / ഭാരമേറിയ മാലിന്യം',
        icon: FlowerIcon, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200',
        nextDate: '15 Mar 2026 (Sunday)', frequency: 'Monthly',
        note: 'Tree branches, garden clippings, broken furniture.',
    },
];

const HKS_CONTACTS = [
    { name: 'Sindhu (HKS Leader)', phone: '+91 94471 55566' },
    { name: 'Panchayat Office', phone: '+91 480 2735100' },
];

const AGRI_TIPS = [
    { id: 1, title: 'Banana Cultivation Drive', malayalam: 'വാഴ കൃഷി പദ്ധതി', body: 'Krishi Bhavan is distributing Nendran and Robusta banana suckers for free this week. Visit on weekdays 9 AM – 12 PM.', icon: Sprout, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', date: '28 Feb 2026' },
    { id: 2, title: 'Vegetable Seed Kit', malayalam: 'പച്ചക്കറി വിത്ത് കിറ്റ്', body: 'Free vegetable seed kits (tomato, brinjal, ladies finger, bitter gourd) for all household gardens. One kit per family.', icon: Tractor, color: 'text-lime-600', bg: 'bg-lime-50', border: 'border-lime-200', date: '5 Mar 2026' },
    { id: 3, title: 'Organic Farming Workshop', malayalam: 'ജൈവ കൃഷി ശിൽപ്പശാല', body: 'Free workshop on composting, vermicomposting, and bio-pesticide preparation at the Panchayat Community Hall.', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', date: '12 Mar 2026' },
    { id: 4, title: 'Coconut Tree Insurance', malayalam: 'തെങ്ങ് ഇൻഷ്വറൻസ്', body: 'Koottayma providing coconut tree insurance up to ₹200/tree. Last date for registration is 15th March 2026.', icon: Sun, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', date: '15 Mar 2026', deadline: true },
    { id: 5, title: 'Water Conservation Tips', malayalam: 'ജല സംരക്ഷണം', body: 'Harvest rainwater using 2,000L tanks provided at subsidy (50% off) by Krishi Bhavan. Apply now.', icon: Droplets, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', date: 'Ongoing' },
];

const CULTURAL = [
    {
        id: 1, title: 'Panayi Public Library', type: 'Library', icon: Library, color: 'text-indigo-600',
        bg: 'bg-indigo-50', border: 'border-indigo-200',
        desc: 'Open Mon–Sat: 9 AM – 6 PM. Free membership for Ward 18 residents. New arrivals: Mathrubhoomi, DC Books collections.',
        phone: '+91 480 2735200', items: ['Free Wi-Fi inside', '2000+ books', 'Children section', 'Newspaper reading room']
    },
    {
        id: 2, title: 'Ward 18 Cultural Club', type: 'Arts & Culture', icon: Music2, color: 'text-purple-600',
        bg: 'bg-purple-50', border: 'border-purple-200',
        desc: 'Upcoming: Onam Sangeethasaram on 10th March at the Community Hall. Open to all. Free entry.',
        phone: '+91 94473 99988', items: ['Onam Sangeethasaram — 10 Mar', 'Art workshop — 22 Mar', 'Youth drama — April']
    },
    {
        id: 3, title: 'Sports Council Ward 18', type: 'Sports', icon: Trophy, color: 'text-amber-600',
        bg: 'bg-amber-50', border: 'border-amber-200',
        desc: 'Volleyball and cricket coaching for youth (15–25 yrs) every Saturday 6 AM – 8 AM at Panayi LP School ground.',
        phone: '+91 94477 33211', items: ['Free volleyball coaching', 'Cricket nets available', 'Kerala Games registration open']
    },
    {
        id: 4, title: 'Readers Forum — Panayi', type: 'Literature', icon: BookOpen, color: 'text-rose-600',
        bg: 'bg-rose-50', border: 'border-rose-200',
        desc: 'Monthly book discussion meets. Next: Discussion on "Manju" by MT Vasudevan Nair. 16 March, 5 PM.',
        phone: '', items: ['Monthly meets', 'Book exchange programme', 'Story writing competition — April']
    },
];

const CARD = 'bg-white/80 backdrop-blur-xl rounded-[2rem] border border-sky-100 shadow-md shadow-sky-100/40 overflow-hidden';

export default function GreenCulture() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('waste');

    const tabs = [
        { id: 'waste', label: 'Waste Mgmt', labelM: 'ഹരിത', icon: Recycle },
        { id: 'agri', label: 'Agriculture', labelM: 'കൃഷി', icon: Sprout },
        { id: 'culture', label: 'Culture', labelM: 'സംസ്കൃതി', icon: Music2 },
    ];

    return (
        <div
            className="flex flex-col min-h-screen w-full overflow-y-auto no-scrollbar"
            style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 30%, #f0f9ff 65%, #ffffff 100%)' }}
        >
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-400 to-teal-600 px-6 pt-12 pb-0 rounded-b-[2.5rem] shadow-lg shadow-emerald-200/50 sticky top-0 z-20">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/35 transition-colors"
                    >
                        <ArrowLeft className="text-white w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl font-bold font-malayalam leading-tight">നാട്ടുനന്മ</h2>
                        <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest">Green & Culture · Ward 18</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl text-[12px] font-bold whitespace-nowrap transition-all shrink-0 ${activeTab === tab.id
                                    ? 'bg-white text-emerald-700 shadow-sm'
                                    : 'text-white/80 hover:text-white hover:bg-white/15'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span className="font-malayalam">{tab.labelM}</span>
                                <span className="opacity-60">({tab.label})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="p-5 md:p-8 pb-28 space-y-6">

                <AnimatePresence mode="wait">

                    {/* ── WASTE MANAGEMENT TAB ── */}
                    {activeTab === 'waste' && (
                        <motion.div
                            key="waste"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-5"
                        >
                            <div className="px-1">
                                <h3 className="text-slate-800 font-black text-lg tracking-tight">Waste Management Calendar</h3>
                                <p className="font-malayalam text-[13px] text-slate-500 font-semibold mt-0.5">ഹരിത കർമ്മ സേന — Ward 18</p>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-start gap-3">
                                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <p className="text-[12px] text-emerald-700 font-medium leading-snug">
                                    Haritha Karma Sena (HKS) manages waste collection in Ward 18. Separate your waste correctly and place it ready before 7 AM on collection day.
                                </p>
                            </div>

                            {/* Schedule cards */}
                            {WASTE_SCHEDULE.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className={CARD + ' p-5'}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0`}>
                                                <Icon className={`w-6 h-6 ${item.color}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800 text-[15px] leading-tight">{item.type}</h4>
                                                <p className={`font-malayalam text-[12px] font-semibold mt-0.5 ${item.color}`}>{item.malayalam}</p>
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.bg} ${item.color} border-current/20 shrink-0`}>
                                                {item.frequency}
                                            </span>
                                        </div>

                                        <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                <span className="text-[12px] font-bold text-slate-700">Next: {item.nextDate}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                                <span className="text-[11px] text-slate-500 leading-snug">{item.note}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* HKS Contact */}
                            <div className={CARD + ' p-5'}>
                                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-emerald-500" /> HKS Contact Numbers
                                </h4>
                                <div className="space-y-3">
                                    {HKS_CONTACTS.map((c) => (
                                        <div key={c.name} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                                            <div>
                                                <p className="font-bold text-slate-800 text-[13px]">{c.name}</p>
                                                <p className="text-[12px] text-slate-500">{c.phone}</p>
                                            </div>
                                            <a
                                                href={`tel:${c.phone}`}
                                                className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm hover:bg-emerald-600 transition-colors"
                                            >
                                                <Phone className="w-4 h-4 text-white" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── AGRICULTURE TAB ── */}
                    {activeTab === 'agri' && (
                        <motion.div
                            key="agri"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-5"
                        >
                            <div className="px-1">
                                <h3 className="text-slate-800 font-black text-lg tracking-tight">Agriculture Hub</h3>
                                <p className="font-malayalam text-[13px] text-slate-500 font-semibold mt-0.5">കൃഷി ഭവൻ അറിയിപ്പുകൾ</p>
                            </div>

                            {/* Krishi Bhavan contact */}
                            <div className={CARD + ' p-5 flex items-center gap-4'}>
                                <div className="w-12 h-12 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                                    <Tractor className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-[14px]">Krishi Bhavan Office</h4>
                                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">Anakkayam • Mon–Fri 9 AM – 5 PM</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">+91 480 2763100</p>
                                </div>
                                <a
                                    href="tel:+914802763100"
                                    className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-sm hover:bg-green-600 transition-colors"
                                >
                                    <Phone className="w-4 h-4 text-white" />
                                </a>
                            </div>

                            {/* Updates */}
                            {AGRI_TIPS.map((tip, i) => {
                                const Icon = tip.icon;
                                return (
                                    <motion.div
                                        key={tip.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className={CARD + ' p-5'}
                                    >
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className={`w-11 h-11 rounded-2xl ${tip.bg} border ${tip.border} flex items-center justify-center shrink-0`}>
                                                <Icon className={`w-5 h-5 ${tip.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="font-bold text-slate-800 text-[14px] leading-tight">{tip.title}</h4>
                                                    {tip.deadline && (
                                                        <span className="text-[10px] font-black text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                                            Deadline
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="font-malayalam text-[12px] font-semibold text-slate-500 mt-0.5">{tip.malayalam}</p>
                                            </div>
                                        </div>

                                        <p className="text-[12px] text-slate-500 leading-relaxed">{tip.body}</p>

                                        <div className="mt-3 flex items-center gap-2">
                                            <CalendarDays className="w-3.5 h-3.5 text-slate-300" />
                                            <span className="text-[11px] text-slate-400 font-semibold">{tip.date}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Farming tip of the week */}
                            <div className="bg-green-50 border border-green-200 rounded-[2rem] p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Star className="w-4 h-4 text-green-600" />
                                    <h4 className="font-bold text-green-800 text-[14px]">Tip of the Week</h4>
                                </div>
                                <p className="text-[13px] text-green-700 leading-relaxed">
                                    <strong>Mulching:</strong> Use dry leaves and rice straw to mulch around vegetable beds. This retains moisture, suppresses weeds, and enriches soil as it decomposes — especially useful before the hot season (March–April).
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* ── CULTURAL DESK TAB ── */}
                    {activeTab === 'culture' && (
                        <motion.div
                            key="culture"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-5"
                        >
                            <div className="px-1">
                                <h3 className="text-slate-800 font-black text-lg tracking-tight">Cultural Desk</h3>
                                <p className="font-malayalam text-[13px] text-slate-500 font-semibold mt-0.5">ഗ്രന്ഥശാലയും ക്ലബ്ബ് അറിയിപ്പുകളും</p>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                                <Megaphone className="w-4 h-4 text-purple-600 shrink-0" />
                                <p className="text-[12px] text-purple-700 font-medium">
                                    Clubs and organizations in Ward 18 can share announcements here. Contact the Ward Member.
                                </p>
                            </div>

                            {CULTURAL.map((org, i) => {
                                const Icon = org.icon;
                                return (
                                    <motion.div
                                        key={org.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className={CARD + ' overflow-hidden'}
                                    >
                                        {/* Header strip */}
                                        <div className={`${org.bg} border-b ${org.border} px-5 py-4 flex items-center gap-3`}>
                                            <div className={`w-10 h-10 rounded-xl bg-white border ${org.border} flex items-center justify-center shrink-0 shadow-sm`}>
                                                <Icon className={`w-5 h-5 ${org.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-800 text-[14px] leading-tight">{org.title}</h4>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${org.color}`}>{org.type}</span>
                                            </div>
                                            {org.phone && (
                                                <a
                                                    href={`tel:${org.phone}`}
                                                    className={`w-9 h-9 rounded-full bg-white border ${org.border} flex items-center justify-center shrink-0 hover:${org.bg} transition-colors shadow-sm`}
                                                >
                                                    <Phone className={`w-4 h-4 ${org.color}`} />
                                                </a>
                                            )}
                                        </div>

                                        {/* Body */}
                                        <div className="p-5">
                                            <p className="text-[12px] text-slate-500 leading-relaxed mb-4">{org.desc}</p>

                                            <div className="space-y-2">
                                                {org.items.map((item) => (
                                                    <div key={item} className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${org.color.replace('text-', 'bg-')}`} />
                                                        <span className="text-[12px] text-slate-600 font-semibold">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Announcement CTA */}
                            <div className={CARD + ' p-6 text-center'}>
                                <Megaphone className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                                <h4 className="font-bold text-slate-800 text-[15px] mb-1">Share an Announcement</h4>
                                <p className="text-[12px] text-slate-400 mb-4 leading-relaxed">
                                    Is your club or organization organizing an event in Panayi Ward 18? Get it listed here for free.
                                </p>
                                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-[13px] shadow-sm shadow-purple-200 hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" /> Contact Ward Member
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

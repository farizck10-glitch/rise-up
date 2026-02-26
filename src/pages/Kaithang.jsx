import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, PhoneCall, Stethoscope, GraduationCap,
    Ambulance, Building2, Info, ExternalLink,
    BookOpen, Users, Award, ChevronDown, CheckCircle2,
    HeartPulse, Landmark, Calendar, MapPin, Map,
    ScrollText, Briefcase, ClipboardCheck, Sparkles,
    ChevronRight, BellRing
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Kaithang() {
    const navigate = useNavigate();
    const { requireAuth } = useAuth();
    const [expandedScheme, setExpandedScheme] = useState(null);
    const [activeTab, setActiveTab] = useState('health'); // 'health' or 'edu'

    const toggleScheme = (id) => {
        setExpandedScheme(expandedScheme === id ? null : id);
    };

    const handleCall = (name, number) => {
        requireAuth(() => {
            // alert(`Calling ${name}: ${number}`);
            window.location.href = `tel:${number}`;
        }, {
            title: "ഈ സേവനം ഉപയോഗിക്കാൻ ദയവായി ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to make calls."
        });
    };

    const handleOpenMap = (name, query) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
    };

    const handleExternalLink = (url) => {
        window.open(url, '_blank');
    };

    // --- DATA ---
    const healthCalendar = [
        { id: 1, date: 'Every Wed', event: 'Vaccination Day', mal: 'പ്രതിരോധ കുത്തിവയ്പ്പ്', location: 'Ward Health Center', color: 'bg-blue-500' },
        { id: 2, date: 'Every Sat', event: 'Lifestyle Clinic', mal: 'ജീവിതശൈലി ക്ലിനിക്ക്', location: 'Anganwadi 48', color: 'bg-emerald-500' },
        { id: 3, date: 'March 15', event: 'Eye Camp', mal: 'നേത്ര പരിശോധന ക്യാമ്പ്', location: 'Village Hall', color: 'bg-purple-500' }
    ];

    const healthCentres = [
        { name: 'Anakkayam FHC', mal: 'അനക്കയം ആരോഗ്യ കേന്ദ്രം', phone: '04832781393', query: 'Family Health Centre Anakkayam' },
        { name: 'Manjeri Medical College', mal: 'മഞ്ചേരി മെഡിക്കൽ കോളേജ്', phone: '04832766056', query: 'Government Medical College Manjeri' },
    ];

    const schemes = [
        {
            id: 'karunya',
            name: 'Karunya Benevolent Fund',
            mal: 'കാരുണ്യ ബെനവലന്റ് ഫണ്ട്',
            benefits: ['Treatment for Cancer, Kidney, Heart', 'Up to 3 Lakhs aid', 'Direct Hospital application'],
            url: 'https://karunya.kerala.gov.in/'
        },
        {
            id: 'ayushman',
            name: 'Ayushman Bharat',
            mal: 'ആയുഷ്മാൻ ഭാരത് (PM-JAY)',
            benefits: ['5 Lakhs family coverage', 'Cashless at empanelled hospitals', 'Covers pre/post hospitalization'],
            url: 'https://pmjay.gov.in/'
        }
    ];

    const scholarships = [
        { id: 1, title: 'National Scholarship (NSP)', mal: 'നാഷണൽ സ്കോളർഷിപ്പ്', dead: 'Oct 30', type: 'Open', color: 'text-green-400', url: 'https://scholarships.gov.in/' },
        { id: 2, title: 'e-Grantz 3.0', mal: 'ഇ-ഗ്രാന്റ്സ്', dead: 'Ongoing', type: 'Open', color: 'text-green-400', url: 'https://egrantz.kerala.gov.in/' },
        { id: 3, title: 'CH Muhammed Koya', mal: 'സി.എച്ച് മുഹമ്മദ് കോയ', dead: 'Apply Now', type: 'Open', color: 'text-amber-400', url: 'https://dce-scholarship.kerala.gov.in/cms/main.php' },
    ];

    const careerLinks = [
        { id: 1, title: 'PSC Thulasi Login', mal: 'പി.എസ്.സി ലോഗിൻ', url: 'https://thulasi.psc.kerala.gov.in/thulasi/' },
        { id: 2, title: 'PSC Notifications', mal: 'പി.എസ്.സി വാർത്തകൾ', url: 'https://www.keralapsc.gov.in/notifications' },
    ];

    return (
        <div className="flex flex-col h-screen w-full bg-[#020617] overflow-y-auto no-scrollbar pb-24 lg:items-center font-sans selection:bg-blue-500/30 text-slate-300">
            {/* ══ PREMIUM STICKY HEADER ══ */}
            <div className="bg-gradient-to-br from-[#0f172a]/95 via-[#1e293b]/95 to-[#0f172a]/95 backdrop-blur-2xl px-6 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8 rounded-b-[3rem] shadow-2xl sticky top-0 z-50 w-full lg:max-w-5xl border-b border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-5">
                        <motion.button
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(-1)}
                            className="w-11 h-11 bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl flex items-center justify-center border border-white/10 transition-all shadow-inner"
                        >
                            <ArrowLeft className="text-white w-5 h-5" />
                        </motion.button>
                        <div>
                            <h2 className="text-white text-2xl font-bold font-malayalam tracking-tight drop-shadow-sm">കൈത്താങ്ങ്</h2>
                            <p className="text-blue-400/60 text-[10px] font-black uppercase tracking-[0.3em] mt-0.5">Health & Education Hub</p>
                        </div>
                    </div>

                    {/* Minimal Tab Switcher */}
                    <div className="flex bg-white/[0.02] p-1 rounded-2xl border border-white/5 backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'health' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Health
                        </button>
                        <button
                            onClick={() => setActiveTab('edu')}
                            className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'edu' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Edu
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-10 space-y-12 w-full lg:max-w-5xl relative">

                {/* ══ HEALTH FLOW ══ */}
                <AnimatePresence mode="wait">
                    {activeTab === 'health' ? (
                        <motion.div
                            key="health-section"
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                            className="space-y-10"
                        >
                            {/* 1. Ward Health Calendar */}
                            <section>
                                <div className="flex items-center justify-between mb-5 px-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shadow-inner">
                                            <Calendar className="w-5.5 h-5.5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white font-malayalam tracking-tight">വാർഡ് ആരോഗ്യ കലണ്ടർ</h3>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Ward Health Calendar</p>
                                        </div>
                                    </div>
                                    <Sparkles className="w-5 h-5 text-blue-500/30" />
                                </div>

                                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 md:mx-0 md:px-0">
                                    {healthCalendar.map((item) => (
                                        <div key={item.id} className="shrink-0 w-64 bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-5 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                                            <div className={`absolute -right-4 -top-4 w-20 h-20 ${item.color} opacity-5 blur-2xl rounded-full group-hover:opacity-10 transition-opacity`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${item.color.replace('bg-', 'text-')} mb-3 block`}>{item.date}</span>
                                            <h4 className="text-white font-bold text-lg font-malayalam leading-tight">{item.event}</h4>
                                            <p className="text-slate-400 text-[11px] font-medium mt-1 font-malayalam opacity-60">{item.mal}</p>
                                            <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-slate-500">
                                                <MapPin className="w-3.5 h-3.5" /> {item.location}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 2. Health Centres & Emergency */}
                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Nearby Health Centres */}
                                <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-[2.5rem] border border-white/[0.07] p-7 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg font-malayalam leading-tight tracking-tight">ആരോഗ്യ കേന്ദ്രം</h4>
                                            <p className="text-[10px] font-bold text-blue-400/40 uppercase tracking-widest mt-0.5">Health Centres</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {healthCentres.map((centre, i) => (
                                            <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-[1.75rem] p-4 flex items-center justify-between hover:bg-white/[0.04] transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                                        <Map className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-[14px] leading-tight font-malayalam">{centre.mal}</p>
                                                        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tight">{centre.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleCall(centre.name, centre.phone)}
                                                        className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all border border-white/5"
                                                    >
                                                        <PhoneCall className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenMap(centre.name, centre.query)}
                                                        className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all border border-white/5"
                                                    >
                                                        <MapPin className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Emergency SOS Contacts */}
                                <div className="space-y-4">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-gradient-to-br from-rose-950 to-rose-900/40 rounded-[2.5rem] p-7 border border-rose-500/20 shadow-xl relative overflow-hidden group cursor-pointer"
                                        onClick={() => handleCall('ASHA Worker', '9447000000')}
                                    >
                                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                                                <BellRing className="text-rose-400 w-7 h-7" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-bold text-xl font-malayalam tracking-tight">ആശ വർക്കർ (ASHA)</h4>
                                                <p className="text-rose-300/40 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Primary Health Assistance</p>
                                            </div>
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 shadow-floating group-hover:rotate-12 transition-transform">
                                                <PhoneCall className="w-5 h-5 fill-rose-600/10" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white/[0.03] rounded-[2.5rem] p-7 border border-white/[0.07] shadow-xl relative overflow-hidden group cursor-pointer"
                                        onClick={() => handleCall('Emergency Ambulance', '108')}
                                    >
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all">
                                                <Ambulance className="text-slate-400 w-7 h-7" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-bold text-xl font-malayalam tracking-tight tracking-tight">ആംബുലൻസ് (SOS)</h4>
                                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">Call Ambulance 108</p>
                                            </div>
                                            <div className="w-10 h-10 bg-white/[0.05] rounded-full flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                                                <PhoneCall className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* 3. Govt Health Schemes (Accordion) */}
                            <section>
                                <div className="flex items-center gap-3 mb-5 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shadow-inner">
                                        <Landmark className="w-5.5 h-5.5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white font-malayalam tracking-tight">സർക്കാർ ആരോഗ്യ പദ്ധതികൾ</h3>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Govt Health Schemes</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {schemes.map((scheme) => (
                                        <div key={scheme.id} className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden">
                                            <button
                                                onClick={() => toggleScheme(scheme.id)}
                                                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-sky-500/20 rounded-2xl flex items-center justify-center">
                                                        <HeartPulse className="w-6 h-6 text-sky-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-[15px] leading-tight font-sans tracking-tight">{scheme.name}</p>
                                                        <p className="text-[11px] text-slate-500 font-bold mt-1 font-malayalam">{scheme.mal}</p>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${expandedScheme === scheme.id ? 'rotate-180 text-sky-400' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {expandedScheme === scheme.id && (
                                                    <motion.div
                                                        initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pt-2 border-t border-white/[0.03] space-y-4">
                                                            <div className="p-4 bg-white/[0.02] rounded-2xl">
                                                                <h5 className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mb-3">Key Benefits</h5>
                                                                <div className="space-y-2.5">
                                                                    {scheme.benefits.map((b, i) => (
                                                                        <div key={i} className="flex items-start gap-3 text-[12px] text-slate-400 font-medium">
                                                                            <CheckCircle2 className="w-4 h-4 text-emerald-400/70 shrink-0 mt-0.5" />
                                                                            {b}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleExternalLink(scheme.url)}
                                                                className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-[1.25rem] text-[12px] font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                                                            >
                                                                <ExternalLink className="w-4 h-4" /> Apply Now
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="edu-section"
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            {/* 1. Live Scholarship Desk */}
                            <section>
                                <div className="flex items-center gap-3 mb-6 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shadow-inner">
                                        <Award className="w-5.5 h-5.5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white font-malayalam tracking-tight">സ്കോളർഷിപ്പ് പോർട്ടൽ</h3>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Scholarship Portal</p>
                                    </div>
                                    <div className="ml-auto px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                        <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>

                                <div className="bg-white/[0.03] border border-white/[0.07] rounded-[2.5rem] overflow-hidden">
                                    <div className="divide-y divide-white/[0.04]">
                                        {scholarships.map((s) => (
                                            <div key={s.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ScrollText className="w-5 h-5 text-indigo-400/50" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-[15px] leading-tight tracking-tight font-malayalam">{s.mal}</p>
                                                        <p className="text-[10px] text-slate-500 font-bold mt-1 tracking-tight">{s.title} • <span className="text-slate-300 font-bold">{s.dead}</span></p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${s.color}`}>{s.type}</span>
                                                    <button
                                                        onClick={() => handleExternalLink(s.url)}
                                                        className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.1] transition-all"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-indigo-600/10 border-t border-white/[0.04] flex items-center justify-center gap-6">
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                            <Info className="w-3.5 h-3.5" /> Application Guide
                                        </p>
                                        <button
                                            onClick={() => handleExternalLink('https://scholarships.gov.in/')}
                                            className="text-[10px] font-bold text-white underline underline-offset-4 decoration-indigo-400/50 hover:decoration-indigo-400 transition-all font-malayalam"
                                        >
                                            വിശദാംശങ്ങൾ കാണുക
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Career & PSC Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-5 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shadow-inner">
                                        <Briefcase className="w-5.5 h-5.5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white font-malayalam tracking-tight">പി.എസ്.സി & തൊഴിൽ വാർത്തകൾ</h3>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">PSC & Career Hub</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {careerLinks.map((item) => (
                                        <div key={item.id} className="bg-white/[0.03] border border-white/[0.06] rounded-[1.75rem] p-5 flex flex-col justify-between group cursor-pointer hover:border-amber-500/30 transition-all"
                                            onClick={() => handleExternalLink(item.url)}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <ClipboardCheck className="w-6 h-6 text-amber-500/50 group-hover:text-amber-400 transition-colors" />
                                                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-500 group-hover:text-white">
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <h4 className="text-white font-bold text-lg font-malayalam tracking-tight leading-tight">{item.mal}</h4>
                                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">{item.title}</p>
                                        </div>
                                    ))}

                                    <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-amber-600/10 to-transparent border border-white/[0.07] rounded-[2rem] p-6 flex items-center gap-5 group cursor-pointer hover:border-amber-500/30 transition-all">
                                        <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                            <BellRing className="text-amber-400 w-7 h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-lg font-malayalam tracking-tight">ലേറ്റസ്റ്റ് നോട്ടിഫിക്കേഷൻ</h4>
                                            <p className="text-slate-400 text-xs font-medium font-malayalam opacity-60">പുതിയ തൊഴിൽ വാർത്തകൾക്കായി ഇവിടെ ക്ലിക്ക് ചെയ്യുക.</p>
                                        </div>
                                        <button
                                            onClick={() => handleExternalLink('https://www.keralapsc.gov.in/')}
                                            className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* 3. Local Career Guidance Card */}
                            <section className="bg-gradient-to-br from-[#1e1b4b] to-[#020617] rounded-[3rem] p-8 border border-white/[0.07] shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
                                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                                        <Users className="text-indigo-400 w-10 h-10" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white text-2xl font-bold font-malayalam tracking-tight leading-tight mb-2">കരിയർ ഗൈഡൻസ് മെന്റർമാർ</h4>
                                        <p className="text-indigo-200/50 text-sm font-medium font-malayalam tracking-tight max-w-lg mx-auto md:mx-0 tracking-tight">ഉന്നത പഠന റിപ്പോർട്ടുകൾക്കും സ്കോളർഷിപ്പ് സഹായങ്ങൾക്കും വാർഡ് മെന്റർമാരെ ബന്ധപ്പെടുക.</p>
                                    </div>
                                    <button
                                        onClick={() => handleCall('Career Mentor', '9446000000')}
                                        className="px-8 py-4 bg-white text-indigo-950 rounded-2xl text-[13px] font-bold shadow-xl hover:bg-slate-100 transition-all active:scale-95 whitespace-nowrap"
                                    >
                                        Contact Mentors
                                    </button>
                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ══ FOOTER INFO ══ */}
                <div className="mt-12 py-8 border-t border-white/[0.03] text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/[0.05] rounded-full mb-4">
                        <Info className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ward 18 Panayi · Anakkayam Panchayat</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium font-malayalam leading-relaxed max-w-sm mx-auto opacity-70">
                        ഈ വിവരങ്ങളിൽ എന്തെങ്കിലും തെറ്റുകൾ ഉണ്ടെങ്കിൽ മെമ്പറെയോ ആശ വർക്കറെയോ വിവരമറിയിക്കുക.
                    </p>
                </div>
            </div>
        </div>
    );
}

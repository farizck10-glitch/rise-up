import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Landmark, ShoppingBag, HeartPulse,
    ArrowRight, ChevronRight, LayoutDashboard,
    ExternalLink, Briefcase, GraduationCap
} from 'lucide-react';

const DigitalWardIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full p-12 bg-emerald-50/50">
        <rect x="50" y="200" width="300" height="20" rx="10" fill="#10b981" fillOpacity="0.1" />
        <rect x="80" y="100" width="60" height="100" rx="8" fill="#10b981" fillOpacity="0.2" />
        <rect x="160" y="60" width="80" height="140" rx="8" fill="#10b981" fillOpacity="0.3" />
        <rect x="260" y="120" width="60" height="80" rx="8" fill="#10b981" fillOpacity="0.2" />
        <circle cx="200" cy="150" r="40" fill="#10b981" fillOpacity="0.1" />
        <path d="M150 150l50-50 50 50-50 50z" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx="200" cy="100" r="4" fill="#10b981" />
        <circle cx="150" cy="150" r="4" fill="#10b981" />
        <circle cx="250" cy="150" r="4" fill="#10b981" />
    </svg>
);

const EconomyIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full p-12 bg-sky-50/50">
        <circle cx="200" cy="150" r="80" fill="#0284c7" fillOpacity="0.05" />
        <path d="M120 180h160v20H120zM140 180V120l60-40 60 40v60M170 180v-40h60v40" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="200" cy="80" r="10" fill="#0284c7" fillOpacity="0.2" />
        <path d="M150 220l50-20 50 20" fill="none" stroke="#0284c7" strokeWidth="2" strokeOpacity="0.3" />
    </svg>
);

const KaithangIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full p-12 bg-rose-50/50">
        <path d="M200 80c-25-25-60-10-60 20 0 30 60 70 60 70s60-40 60-70c0-30-35-45-60-20z" fill="#e11d48" fillOpacity="0.1" stroke="#e11d48" strokeWidth="2" />
        <rect x="185" y="110" width="30" height="10" rx="2" fill="#e11d48" />
        <rect x="195" y="100" width="10" height="30" rx="2" fill="#e11d48" />
        <path d="M100 220c0-30 40-50 100-50s100 20 100 50" fill="none" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.2" />
        <circle cx="200" cy="170" r="60" fill="none" stroke="#e11d48" strokeWidth="1" strokeDasharray="10 5" strokeOpacity="0.2" />
    </svg>
);

export default function Showcase() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);

    const pages = [
        {
            title: "Digital Ward",
            titleMal: "ഡിജിറ്റൽ വാർഡ്",
            category: "Connectivity",
            desc: "Access Village & e-District services from your home.",
            descMal: "വില്ലേജ്, ഇ-ഡിസ്ട്രിക്ട് സേവനങ്ങൾ ഇപ്പോൾ വിരൽത്തുമ്പിൽ.",
            icon: <Landmark className="w-10 h-10 text-emerald-600" />,
            bgColor: "bg-emerald-50",
            iconBg: "bg-emerald-100",
            illustration: <DigitalWardIllustration />,
            features: ["Village Certificates", "Land Tax", "e-District Portal"]
        },
        {
            title: "Local Marketplace",
            titleMal: "പ്രാദേശിക വിപണി",
            category: "Economy",
            desc: "Support local shops and find skilled workers easily.",
            descMal: "പ്രാദേശിക കടകളും തൊഴിലാളികളെയും പരസ്പരം ബന്ധിപ്പിക്കുന്നു.",
            icon: <ShoppingBag className="w-10 h-10 text-sky-600" />,
            bgColor: "bg-sky-50",
            iconBg: "bg-sky-100",
            illustration: <EconomyIllustration />,
            features: ["Marketplace", "Worker Directory", "Direct WhatsApp Order"]
        },
        {
            title: "Community Support",
            titleMal: "കൈത്താങ്ങ് സഹായം",
            category: "Assistance",
            desc: "Dedicated support for Health and Education assistance.",
            descMal: "ആരോഗ്യ കരിയർ മേഖലകളിലെ സഹായങ്ങൾക്കായി.",
            icon: <HeartPulse className="w-10 h-10 text-rose-600" />,
            bgColor: "bg-rose-50",
            iconBg: "bg-rose-100",
            illustration: <KaithangIllustration />,
            features: ["Health Support", "Scholarship Desk", "Assistance Forms"]
        }
    ];

    const next = () => {
        if (page < pages.length - 1) {
            setPage(page + 1);
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex-1 flex flex-col"
                >
                    {/* Top Illustration Section */}
                    <div className="h-[45vh] w-full relative overflow-hidden bg-slate-50 flex items-center justify-center">
                        {pages[page].illustration}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />

                        {/* Floating Icon Card */}
                        <div className={`absolute bottom-6 left-8 p-5 rounded-[2rem] ${pages[page].iconBg} border border-white/50 shadow-xl backdrop-blur-md`}>
                            {pages[page].icon}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 px-8 pt-8 pb-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full ${pages[page].iconBg.replace('bg-', 'text-').replace('100', '700')} ${pages[page].iconBg}`}>
                                    {pages[page].category}
                                </span>
                                <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                {pages[page].title}
                            </h2>
                            <h3 className="text-xl font-bold text-slate-600 font-malayalam mt-1">
                                {pages[page].titleMal}
                            </h3>
                            <p className="mt-4 text-slate-500 font-medium leading-relaxed">
                                {pages[page].desc}
                            </p>
                            <p className="text-slate-400 font-malayalam text-sm mt-1">
                                {pages[page].descMal}
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-2">
                                {pages[page].features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 py-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                        <span className="text-sm font-bold text-slate-700">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination & Button */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {pages.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${page === i ? 'w-8 bg-sky-600' : 'w-2 bg-slate-200'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 active:scale-90 transition-all shadow-lg"
                            >
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Skip Option */}
            <button
                onClick={() => navigate('/auth')}
                className="absolute top-10 right-8 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
                Skip Showcase
            </button>
        </div>
    );
}

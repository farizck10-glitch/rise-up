import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, PhoneCall, Stethoscope, GraduationCap,
    Ambulance, Building2, Info, ExternalLink,
    BookOpen, Users, Award, ChevronDown, CheckCircle2,
    HeartPulse, Landmark, Calendar, MapPin, Map,
    ScrollText, Briefcase, ClipboardCheck, Sparkles,
    ChevronRight, BellRing, Heart, Bike, Clock,
    Download, BookMarked, MonitorPlay, Wifi
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
        { id: 1, date: 'Every Wed', event: 'Vaccination Day', mal: 'പ്രതിരോധ കുത്തിവയ്പ്പ്', location: 'Ward Health Center', color: 'bg-blue-500', textColor: 'text-blue-600', lightBg: 'bg-blue-50 border-blue-200' },
        { id: 2, date: 'Every Sat', event: 'Lifestyle Clinic', mal: 'ജീവിതശൈലി ക്ലിനിക്ക്', location: 'Anganwadi 48', color: 'bg-emerald-500', textColor: 'text-emerald-600', lightBg: 'bg-emerald-50 border-emerald-200' },
        { id: 3, date: 'March 15', event: 'Eye Camp', mal: 'നേത്ര പരിശോധന ക്യാമ്പ്', location: 'Village Hall', color: 'bg-violet-500', textColor: 'text-violet-600', lightBg: 'bg-violet-50 border-violet-200' }
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
        { id: 1, title: 'National Scholarship (NSP)', mal: 'നാഷണൽ സ്കോളർഷിപ്പ്', dead: 'Oct 30', type: 'Open', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', url: 'https://scholarships.gov.in/' },
        { id: 2, title: 'e-Grantz 3.0', mal: 'ഇ-ഗ്രാന്റ്സ്', dead: 'Ongoing', type: 'Open', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', url: 'https://egrantz.kerala.gov.in/' },
        { id: 3, title: 'CH Muhammed Koya', mal: 'സി.എച്ച് മുഹമ്മദ് കോയ', dead: 'Apply Now', type: 'Open', color: 'text-amber-600 bg-amber-50 border-amber-200', url: 'https://dce-scholarship.kerala.gov.in/cms/main.php' },
    ];

    const [showForm, setShowForm] = useState(null); // 'health-req' or 'edu-req'
    const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success'

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate submission
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => {
                setShowForm(null);
                setFormStatus('idle');
            }, 2000);
        }, 1500);
    };

    const AssistanceForm = ({ type }) => (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
                <div className={`p-6 ${type === 'health' ? 'bg-rose-50' : 'bg-indigo-50'} border-b border-slate-100 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === 'health' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                            {type === 'health' ? <HeartPulse className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 font-malayalam">അപേക്ഷ ഫോം</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type === 'health' ? 'Health Assistance' : 'Education Support'}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8">
                    {formStatus === 'success' ? (
                        <div className="py-10 text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 font-malayalam tracking-tight">അപേക്ഷ ലഭിച്ചു!</h4>
                            <p className="text-slate-500 text-sm">നിങ്ങളുടെ അപേക്ഷ വിജയകരമായി അയച്ചു. ഉടൻ ബന്ധപ്പെടുന്നതാണ്.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                                <input required type="text" placeholder="പേര്" className="w-full bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl focus:ring-2 focus:ring-sky-500/20 font-sans outline-none font-medium" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Requirement</label>
                                <textarea required rows="3" placeholder="വിശദാംശങ്ങൾ ഇവിടെ എഴുതുക..." className="w-full bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl focus:ring-2 focus:ring-sky-500/20 font-sans outline-none font-medium resize-none"></textarea>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Phone</label>
                                    <input required type="tel" placeholder="ഫോൺ" className="w-full bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl focus:ring-2 focus:ring-sky-500/20 font-sans outline-none font-medium" />
                                </div>
                            </div>
                            <button
                                disabled={formStatus === 'submitting'}
                                className={`w-full py-4 mt-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${type === 'health' ? 'bg-gradient-to-r from-rose-500 to-rose-600' : 'bg-gradient-to-r from-indigo-500 to-indigo-600'} flex items-center justify-center gap-2`}
                            >
                                {formStatus === 'submitting' ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'സമർപ്പിക്കുക (Submit Request)'}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );

    const careerLinks = [
        { id: 1, title: 'PSC Thulasi Login', mal: 'പി.എസ്.സി ലോഗിൻ', url: 'https://thulasi.psc.kerala.gov.in/thulasi/' },
        { id: 2, title: 'PSC Notifications', mal: 'പി.എസ്.സി വാർത്തകൾ', url: 'https://www.keralapsc.gov.in/notifications' },
    ];

    // === NEW SECTION DATA ===
    const volunteers = [
        { id: 1, name: 'Akhil Rajan', mal: 'അഖിൽ രാജൻ', role: 'Medicine Delivery', roleMal: 'മരുന്ന് ഡെലിവറി', phone: '9744100001', emoji: '🏍️', tagColor: 'bg-sky-50 border-sky-200 text-sky-700' },
        { id: 2, name: 'Sreejith K.', mal: 'ശ്രീജിത്ത് കെ.', role: 'Emergency Transport', roleMal: 'അടിയന്തര ഗതാഗതം', phone: '9744100002', emoji: '🚗', tagColor: 'bg-rose-50 border-rose-200 text-rose-700' },
        { id: 3, name: 'Arjun P.', mal: 'അർജുൻ പി.', role: 'Medicine Delivery', roleMal: 'മരുന്ന് ഡെലിവറി', phone: '9744100003', emoji: '🏍️', tagColor: 'bg-sky-50 border-sky-200 text-sky-700' },
        { id: 4, name: 'Vishnu M.', mal: 'വിഷ്ണു എം.', role: 'Emergency Transport', roleMal: 'അടിയന്തര ഗതാഗതം', phone: '9744100004', emoji: '🚗', tagColor: 'bg-rose-50 border-rose-200 text-rose-700' },
    ];

    const localDoctors = [
        {
            id: 1, name: 'Dr. Suresh Kumar', mal: 'ഡോ. സുരേഷ് കുമാർ',
            speciality: 'General Physician', specialityMal: 'ജനറൽ ഫിസിഷ്യൻ',
            clinic: 'Panayi Medical Centre', clinicMal: 'പനായി മെഡിക്കൽ സെൻ്റർ',
            hours: 'Mon–Sat: 9 AM – 1 PM, 5 PM – 8 PM',
            phone: '9447100001',
            mapQuery: 'Panayi Medical Centre, Anakkayam',
            color: 'bg-blue-50 border-blue-200',
            iconColor: 'text-blue-600 bg-blue-100 border-blue-200',
        },
        {
            id: 2, name: 'Dr. Anitha Menon', mal: 'ഡോ. അനിത മേനോൻ',
            speciality: 'Paediatrician', specialityMal: 'ശിശുരോഗ വിദഗ്ദ്ധ',
            clinic: 'Anakkayam Child Care', clinicMal: 'അനക്കയം ചൈൽഡ് കെയർ',
            hours: 'Mon–Fri: 10 AM – 2 PM',
            phone: '9447100002',
            mapQuery: 'Anakkayam Child Care Clinic',
            color: 'bg-pink-50 border-pink-200',
            iconColor: 'text-pink-600 bg-pink-100 border-pink-200',
        },
        {
            id: 3, name: 'Dr. Rajan Nair', mal: 'ഡോ. രാജൻ നായർ',
            speciality: 'Orthopaedics', specialityMal: 'ഒർത്തോപീഡിക്‌സ്',
            clinic: 'Panayi Bone & Joint Clinic', clinicMal: 'പനായി ബോൺ ക്ലിനിക്ക്',
            hours: 'Mon, Wed, Fri: 6 PM – 9 PM',
            phone: '9447100003',
            mapQuery: 'Bone Joint Clinic Anakkayam',
            color: 'bg-violet-50 border-violet-200',
            iconColor: 'text-violet-600 bg-violet-100 border-violet-200',
        },
    ];

    const questionPapers = [
        {
            id: 'sslc', label: 'SSLC (10th)', mal: 'എസ്.എസ്.എൽ.സി',
            icon: '📘', color: 'bg-blue-50 border-blue-200 text-blue-700',
            headerColor: 'bg-blue-100',
            papers: [
                { year: '2024', url: 'https://www.keralapareekshabhavan.in/results/' },
                { year: '2023', url: 'https://www.keralapareekshabhavan.in/results/' },
                { year: '2022', url: 'https://www.keralapareekshabhavan.in/results/' },
            ]
        },
        {
            id: 'plus2', label: 'Plus Two (12th)', mal: 'പ്ലസ് ടു',
            icon: '📗', color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
            headerColor: 'bg-emerald-100',
            papers: [
                { year: '2024', url: 'https://www.dhsekerala.gov.in/previous_qp.html' },
                { year: '2023', url: 'https://www.dhsekerala.gov.in/previous_qp.html' },
                { year: '2022', url: 'https://www.dhsekerala.gov.in/previous_qp.html' },
            ]
        },
    ];

    const freeCourses = [
        {
            id: 'google',
            name: 'Google Digital Garage',
            mal: 'ഗൂഗിൾ ഡിജിറ്റൽ ഗ്യാരേജ്',
            desc: 'Free digital marketing, data, AI & career courses',
            descMal: 'ഡിജിറ്റൽ മാർക്കറ്റിംഗ്, AI, കരിയർ കോഴ്സുകൾ',
            url: 'https://grow.google/intl/en_in/courses-and-tools/',
            emoji: '🌐',
            color: 'bg-blue-50 border-blue-200',
            btnColor: 'bg-blue-600 hover:bg-blue-700',
            tag: 'Free Certificate',
        },
        {
            id: 'microsoft',
            name: 'Microsoft Learn',
            mal: 'മൈക്രോസോഫ്റ്റ് ലേൺ',
            desc: 'Azure, AI, Office & developer learning paths',
            descMal: 'ക്ലൗഡ്, AI, ഡെവലപ്പർ ലേണിംഗ്',
            url: 'https://learn.microsoft.com/en-in/training/',
            emoji: '💻',
            color: 'bg-indigo-50 border-indigo-200',
            btnColor: 'bg-indigo-600 hover:bg-indigo-700',
            tag: 'Free Certificate',
        },
        {
            id: 'asap',
            name: 'ASAP Kerala',
            mal: 'ASAP കേരള',
            desc: 'Skill courses for Kerala students — government certified',
            descMal: 'കേരള വിദ്യാർത്ഥികൾക്കുള്ള സർക്കാർ സ്‌കിൽ കോഴ്‌സ്',
            url: 'https://asapkerala.gov.in/',
            emoji: '🎓',
            color: 'bg-amber-50 border-amber-200',
            btnColor: 'bg-amber-600 hover:bg-amber-700',
            tag: 'Govt Certified',
        },
    ];

    return (
        <div className="flex flex-col h-screen w-full overflow-y-auto no-scrollbar pb-24 lg:items-center font-sans selection:bg-blue-200/60 text-slate-800" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 70%, #eff6ff 100%)' }}>

            {/* ══ PREMIUM STICKY HEADER — Light Version ══ */}
            <AnimatePresence>
                {showForm && (
                    <AssistanceForm
                        type={showForm === 'health-req' ? 'health' : 'edu'}
                    />
                )}
            </AnimatePresence>

            <div className="bg-white/80 backdrop-blur-2xl px-6 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8 rounded-b-[3rem] shadow-lg shadow-blue-100/50 sticky top-0 z-50 w-full lg:max-w-5xl border-b border-sky-100">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-5">
                        <motion.button
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(-1)}
                            className="w-11 h-11 bg-sky-50 hover:bg-sky-100 rounded-2xl flex items-center justify-center border border-sky-200 transition-all shadow-sm"
                        >
                            <ArrowLeft className="text-sky-600 w-5 h-5" />
                        </motion.button>
                        <div>
                            <h2 className="text-slate-800 text-2xl font-bold font-malayalam tracking-tight drop-shadow-sm">കൈത്താങ്ങ്</h2>
                            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mt-0.5">Health &amp; Education Hub</p>
                        </div>
                    </div>

                    {/* Light Tab Switcher */}
                    <div className="flex bg-sky-50 p-1 rounded-2xl border border-sky-200 shadow-inner">
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'health' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Health
                        </button>
                        <button
                            onClick={() => setActiveTab('edu')}
                            className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'edu' ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
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
                                        <div className="w-11 h-11 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 font-malayalam tracking-tight">വാർഡ് ആരോഗ്യ കലണ്ടർ</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Ward Health Calendar</p>
                                        </div>
                                    </div>
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                </div>

                                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 md:mx-0 md:px-0">
                                    {healthCalendar.map((item) => (
                                        <div key={item.id} className={`shrink-0 w-64 bg-white/80 backdrop-blur-xl border ${item.lightBg.split(' ')[1]} rounded-[2rem] p-5 relative overflow-hidden group hover:shadow-md transition-all duration-500 shadow-sm`}>
                                            <div className={`absolute -right-4 -top-4 w-20 h-20 ${item.color} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${item.textColor} mb-3 block`}>{item.date}</span>
                                            <h4 className="text-slate-800 font-bold text-lg font-malayalam leading-tight">{item.event}</h4>
                                            <p className="text-slate-500 text-[11px] font-medium mt-1 font-malayalam">{item.mal}</p>
                                            <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-slate-400">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 2. Health Centres & Emergency */}
                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Nearby Health Centres */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-sky-100 p-7 shadow-lg shadow-blue-50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 opacity-40 blur-[60px] rounded-full pointer-events-none" />
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-800 font-bold text-lg font-malayalam leading-tight tracking-tight">ആരോഗ്യ കേന്ദ്രം</h4>
                                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Health Centres</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setShowForm('health-req')}
                                            className="w-full py-4 bg-rose-50 border border-rose-200 rounded-[1.75rem] text-rose-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-rose-100 transition-all mb-2 shadow-sm"
                                        >
                                            <HeartPulse className="w-5 h-5" /> ചികിത്സാ സഹായം ആവശ്യപ്പെടുക
                                        </button>
                                        {healthCentres.map((centre, i) => (
                                            <div key={i} className="bg-sky-50 border border-sky-100 rounded-[1.75rem] p-4 flex items-center justify-between hover:bg-sky-100 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                                        <Map className="w-5 h-5 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-800 font-bold text-[14px] leading-tight font-malayalam">{centre.mal}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">{centre.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleCall(centre.name, centre.phone)}
                                                        className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 hover:text-white hover:bg-blue-500 transition-all border border-blue-200"
                                                    >
                                                        <PhoneCall className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenMap(centre.name, centre.query)}
                                                        className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 hover:text-white hover:bg-emerald-500 transition-all border border-emerald-200"
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
                                        className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[2.5rem] p-7 border border-rose-400/30 shadow-xl shadow-rose-100 relative overflow-hidden group cursor-pointer"
                                        onClick={() => handleCall('ASHA Worker', '9447000000')}
                                    >
                                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg group-hover:scale-110 transition-transform">
                                                <BellRing className="text-white w-7 h-7" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-bold text-xl font-malayalam tracking-tight">ആശ വർക്കർ (ASHA)</h4>
                                                <p className="text-rose-100 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Primary Health Assistance</p>
                                            </div>
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 shadow-floating group-hover:rotate-12 transition-transform">
                                                <PhoneCall className="w-5 h-5 fill-rose-600/10" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-7 border border-sky-100 shadow-lg relative overflow-hidden group cursor-pointer hover:border-sky-300 transition-all"
                                        onClick={() => handleCall('Emergency Ambulance', '108')}
                                    >
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center border border-sky-200 group-hover:border-sky-300 transition-all">
                                                <Ambulance className="text-sky-500 w-7 h-7" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-slate-800 font-bold text-xl font-malayalam tracking-tight">ആംബുലൻസ് (SOS)</h4>
                                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">Call Ambulance 108</p>
                                            </div>
                                            <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                                <PhoneCall className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* 3. Govt Health Schemes (Accordion) */}
                            <section>
                                <div className="flex items-center gap-3 mb-5 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm">
                                        <Landmark className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 font-malayalam tracking-tight">സർക്കാർ ആരോഗ്യ പദ്ധതികൾ</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Govt Health Schemes</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {schemes.map((scheme) => (
                                        <div key={scheme.id} className="bg-white/80 backdrop-blur-xl border border-sky-100 rounded-[2rem] overflow-hidden shadow-sm">
                                            <button
                                                onClick={() => toggleScheme(scheme.id)}
                                                className="w-full p-6 flex items-center justify-between text-left hover:bg-sky-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center border border-sky-200">
                                                        <HeartPulse className="w-6 h-6 text-sky-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-800 font-bold text-[15px] leading-tight font-sans tracking-tight">{scheme.name}</p>
                                                        <p className="text-[11px] text-slate-400 font-bold mt-1 font-malayalam">{scheme.mal}</p>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedScheme === scheme.id ? 'rotate-180 text-sky-500' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {expandedScheme === scheme.id && (
                                                    <motion.div
                                                        initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pt-2 border-t border-sky-100 space-y-4">
                                                            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                                                                <h5 className="text-[9px] font-bold text-sky-600 uppercase tracking-widest mb-3">Key Benefits</h5>
                                                                <div className="space-y-2.5">
                                                                    {scheme.benefits.map((b, i) => (
                                                                        <div key={i} className="flex items-start gap-3 text-[12px] text-slate-600 font-medium">
                                                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                                            {b}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleExternalLink(scheme.url)}
                                                                className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-[1.25rem] text-[12px] font-bold transition-all flex items-center justify-center gap-2 shadow-md"
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

                            {/* ══ 4. VOLUNTEER NETWORK ══ */}
                            <section>
                                <div className="flex items-center gap-3 mb-5 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm">
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 font-malayalam tracking-tight">ഒപ്പമുണ്ട്</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Volunteer Network · Ward 18</p>
                                    </div>
                                </div>
                                <p className="text-[12px] text-slate-500 font-malayalam mb-4 px-1 leading-relaxed">പ്രായപെട്ടവർക്ക് മരുന്ന് എത്തിക്കൊടുക്കുവാൻ ആവശ്യമാണോ? അടിയന്തര ഗതാഗതം വേണോ? വാർഡ് സ്വയംസേവകരെ വിളിക്കുക.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {volunteers.map((v) => (
                                        <div key={v.id} className="bg-white/80 backdrop-blur-xl border border-sky-100 rounded-[1.5rem] p-5 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
                                            <div className="text-3xl w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">{v.emoji}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-800 text-[14px] leading-tight">{v.name}</p>
                                                <p className="text-[10px] text-slate-500 font-malayalam mt-0.5">{v.mal}</p>
                                                <span className={`inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${v.tagColor}`}>{v.role}</span>
                                            </div>
                                            <button
                                                onClick={() => handleCall(v.name, v.phone)}
                                                className="w-11 h-11 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md hover:from-sky-600 hover:to-blue-700 active:scale-95 transition-all shrink-0"
                                            >
                                                <PhoneCall className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* ══ 5. DOCTOR DIRECTORY ══ */}
                            <section>
                                <div className="flex items-center gap-3 mb-5 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                                        <Stethoscope className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 font-malayalam tracking-tight">ഡോക്ടർ ഓൺ കോൾ</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Local Doctors · Panayi &amp; Anakkayam</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {localDoctors.map((doc) => (
                                        <div key={doc.id} className={`bg-white/80 backdrop-blur-xl border rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all ${doc.color}`}>
                                            <div className="flex items-start gap-4">
                                                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${doc.iconColor}`}>
                                                    <Stethoscope className="w-7 h-7" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-slate-800 text-[15px] leading-tight">{doc.name}</p>
                                                    <p className="text-[11px] text-slate-500 font-malayalam mt-0.5">{doc.mal}</p>
                                                    <span className="inline-block mt-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">{doc.speciality}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 space-y-2">
                                                <div className="flex items-center gap-2.5 text-[11px] text-slate-600">
                                                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span className="font-malayalam">{doc.clinic}</span>
                                                </div>
                                                <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span>{doc.hours}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 mt-4">
                                                <button
                                                    onClick={() => handleCall(doc.name, doc.phone)}
                                                    className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl text-[12px] font-bold flex items-center justify-center gap-2 shadow-md hover:from-sky-600 hover:to-blue-700 active:scale-95 transition-all"
                                                >
                                                    <PhoneCall className="w-4 h-4" /> Call Now
                                                </button>
                                                <button
                                                    onClick={() => handleOpenMap(doc.clinic, doc.mapQuery)}
                                                    className="w-12 h-12 bg-sky-50 border border-sky-200 text-sky-600 rounded-2xl flex items-center justify-center hover:bg-sky-100 active:scale-95 transition-all shadow-sm"
                                                >
                                                    <MapPin className="w-4 h-4" />
                                                </button>
                                            </div>
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
                                    <div className="w-11 h-11 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 font-malayalam tracking-tight">സ്കോളർഷിപ്പ് പോർട്ടൽ</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Scholarship Portal</p>
                                    </div>
                                    <div className="ml-auto px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full">
                                        <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowForm('edu-req')}
                                    className="w-full py-4 bg-indigo-50 border border-indigo-200 rounded-[2rem] text-indigo-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-100 transition-all mb-4 shadow-sm"
                                >
                                    <GraduationCap className="w-5 h-5" /> വിദ്യാഭ്യാസ സഹായം അപേക്ഷിക്കുക
                                </button>

                                <div className="bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                                    <div className="divide-y divide-slate-100">
                                        {scholarships.map((s) => (
                                            <div key={s.id} className="p-6 flex items-center justify-between hover:bg-sky-50 transition-colors group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ScrollText className="w-5 h-5 text-indigo-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-800 font-bold text-[15px] leading-tight tracking-tight font-malayalam">{s.mal}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tight">{s.title} • <span className="text-slate-600 font-bold">{s.dead}</span></p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${s.color}`}>{s.type}</span>
                                                    <button
                                                        onClick={() => handleExternalLink(s.url)}
                                                        className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 hover:text-white hover:bg-indigo-500 transition-all"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-indigo-50 border-t border-indigo-100 flex items-center justify-center gap-6">
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                            <Info className="w-3.5 h-3.5" /> Application Guide
                                        </p>
                                        <button
                                            onClick={() => handleExternalLink('https://scholarships.gov.in/')}
                                            className="text-[10px] font-bold text-indigo-700 underline underline-offset-4 decoration-indigo-400 hover:decoration-indigo-600 transition-all font-malayalam"
                                        >
                                            വിശദാംശങ്ങൾ കാണുക
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Career & PSC Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-5 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 font-malayalam tracking-tight">പി.എസ്.സി &amp; തൊഴിൽ വാർത്തകൾ</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">PSC &amp; Career Hub</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {careerLinks.map((item) => (
                                        <div key={item.id} className="bg-white/80 backdrop-blur-xl border border-amber-100 rounded-[1.75rem] p-5 flex flex-col justify-between group cursor-pointer hover:border-amber-300 hover:shadow-md transition-all"
                                            onClick={() => handleExternalLink(item.url)}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <ClipboardCheck className="w-6 h-6 text-amber-500 group-hover:text-amber-600 transition-colors" />
                                                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <h4 className="text-slate-800 font-bold text-lg font-malayalam tracking-tight leading-tight">{item.mal}</h4>
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">{item.title}</p>
                                        </div>
                                    ))}

                                    <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[2rem] p-6 flex items-center gap-5 group cursor-pointer hover:border-amber-300 hover:shadow-md transition-all">
                                        <div className="w-14 h-14 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                            <BellRing className="text-amber-600 w-7 h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-slate-800 font-bold text-lg font-malayalam tracking-tight">ലേറ്റസ്റ്റ് നോട്ടിഫിക്കേഷൻ</h4>
                                            <p className="text-slate-500 text-xs font-medium font-malayalam">പുതിയ തൊഴിൽ വാർത്തകൾക്കായി ഇവിടെ ക്ലിക്ക് ചെയ്യുക.</p>
                                        </div>
                                        <button
                                            onClick={() => handleExternalLink('https://www.keralapsc.gov.in/')}
                                            className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* ══ 3. LEARNING SUPPORT (പഠനമുറി) ══ */}
                            <section>
                                <div className="flex items-center gap-3 mb-5 px-1">
                                    <div className="w-11 h-11 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600 shadow-sm">
                                        <BookMarked className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 font-malayalam tracking-tight">പഠനമുറി</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Learning Support · Study Resources</p>
                                    </div>
                                </div>

                                {/* Question Papers */}
                                <div className="mb-6">
                                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                                        <Download className="w-3.5 h-3.5" /> Previous Year Question Papers
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {questionPapers.map((qp) => (
                                            <div key={qp.id} className={`border rounded-[2rem] overflow-hidden shadow-sm ${qp.color}`}>
                                                <div className={`px-5 py-3 ${qp.headerColor} flex items-center gap-3`}>
                                                    <span className="text-2xl">{qp.icon}</span>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-[14px]">{qp.label}</p>
                                                        <p className="text-[10px] text-slate-500 font-malayalam">{qp.mal}</p>
                                                    </div>
                                                </div>
                                                <div className="p-3 space-y-2 bg-white/60">
                                                    {qp.papers.map((paper) => (
                                                        <a
                                                            key={paper.year}
                                                            href={paper.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between px-4 py-3 bg-white border border-slate-100 rounded-2xl hover:bg-sky-50 hover:border-sky-200 transition-all group active:scale-95"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors" />
                                                                <span className="text-[12px] font-bold text-slate-700">{paper.year} Question Paper</span>
                                                            </div>
                                                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-600 rounded-full group-hover:bg-sky-500 group-hover:text-white transition-all">Download</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Free Certificate Courses */}
                                <div>
                                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                                        <MonitorPlay className="w-3.5 h-3.5" /> Free Certificate Courses — Register Now
                                    </p>
                                    <div className="space-y-3">
                                        {freeCourses.map((course) => (
                                            <div key={course.id} className={`border rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all bg-white/80 backdrop-blur-xl ${course.color}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-3xl w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                                                        {course.emoji}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className="font-bold text-slate-800 text-[14px] leading-tight">{course.name}</p>
                                                            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">{course.tag}</span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 font-malayalam mt-0.5">{course.descMal}</p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5">{course.desc}</p>
                                                    </div>
                                                </div>
                                                <a
                                                    href={course.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`mt-4 w-full py-3.5 text-white rounded-2xl text-[12px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${course.btnColor}`}
                                                >
                                                    <ExternalLink className="w-4 h-4" /> Register for Free Course
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* 4. Local Career Guidance Card */}
                            <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-[3rem] p-8 border border-indigo-100 shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 opacity-20 blur-[80px] rounded-full pointer-events-none" />
                                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
                                    <div className="w-20 h-20 bg-indigo-100 border border-indigo-200 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Users className="text-indigo-600 w-10 h-10" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-slate-800 text-2xl font-bold font-malayalam tracking-tight leading-tight mb-2">കരിയർ ഗൈഡൻസ് മെന്റർമാർ</h4>
                                        <p className="text-slate-500 text-sm font-medium font-malayalam tracking-tight max-w-lg mx-auto md:mx-0">ഉന്നത പഠന റിപ്പോർട്ടുകൾക്കും സ്കോളർഷിപ്പ് സഹായങ്ങൾക്കും വാർഡ് മെന്റർമാരെ ബന്ധപ്പെടുക.</p>
                                    </div>
                                    <button
                                        onClick={() => handleCall('Career Mentor', '9446000000')}
                                        className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl text-[13px] font-bold shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all active:scale-95 whitespace-nowrap"
                                    >
                                        Contact Mentors
                                    </button>
                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ══ FOOTER INFO ══ */}
                <div className="mt-12 py-8 border-t border-slate-200 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full mb-4">
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ward 18 Panayi · Anakkayam Panchayat</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium font-malayalam leading-relaxed max-w-sm mx-auto">
                        ഈ വിവരങ്ങളിൽ എന്തെങ്കിലും തെറ്റുകൾ ഉണ്ടെങ്കിൽ മെമ്പറെയോ ആശ വർക്കറെയോ വിവരമറിയിക്കുക.
                    </p>
                </div>
            </div>
        </div>
    );
}

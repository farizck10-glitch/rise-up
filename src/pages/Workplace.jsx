import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Zap, Wrench, Car, Hammer, BookOpen, Scissors, TramFront,
    Cpu, UtensilsCrossed, Paintbrush, Truck, PhoneCall, MessageCircle,
    ChevronRight, Star, Clock, MapPin, CheckCircle2, Plus, X,
    User, AlertCircle, ShieldCheck, Upload, ChevronLeft,
    Briefcase, CalendarDays, Users, IndianRupee
} from 'lucide-react';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const CATEGORIES = [
    { id: 'electrical', label: 'Electrical', malayalam: 'ഇലക്ട്രിക്', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200', gradient: 'from-amber-400 to-orange-500', count: 3 },
    { id: 'plumbing', label: 'Plumbing', malayalam: 'പ്ലംബിംഗ്', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', gradient: 'from-blue-400 to-sky-500', count: 2 },
    { id: 'driving', label: 'Driving', malayalam: 'ഡ്രൈവിംഗ്', icon: Car, color: 'text-sky-600', bg: 'bg-sky-100', border: 'border-sky-200', gradient: 'from-sky-400 to-blue-500', count: 4 },
    { id: 'construction', label: 'Construction', malayalam: 'നിർമ്മാണം', icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200', gradient: 'from-orange-400 to-red-400', count: 3 },
    { id: 'teaching', label: 'Teaching / Tutoring', malayalam: 'ട്യൂഷൻ', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-200', gradient: 'from-indigo-400 to-purple-500', count: 2 },
    { id: 'tailoring', label: 'Tailoring', malayalam: 'ടൈലറിംഗ്', icon: Scissors, color: 'text-pink-600', bg: 'bg-pink-100', border: 'border-pink-200', gradient: 'from-pink-400 to-rose-500', count: 2 },
    { id: 'it', label: 'IT / Computer', malayalam: 'ഐടി', icon: Cpu, color: 'text-violet-600', bg: 'bg-violet-100', border: 'border-violet-200', gradient: 'from-violet-400 to-indigo-500', count: 2 },
    { id: 'catering', label: 'Catering / Cooking', malayalam: 'കേറ്ററിംഗ്', icon: UtensilsCrossed, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200', gradient: 'from-emerald-400 to-teal-500', count: 2 },
    { id: 'painting', label: 'Painting', malayalam: 'പെയിന്റിംഗ്', icon: Paintbrush, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', gradient: 'from-red-400 to-pink-400', count: 2 },
    { id: 'transport', label: 'Transport / Goods', malayalam: 'ഗുഡ്സ് ട്രാൻസ്പോർട്ട്', icon: Truck, color: 'text-teal-600', bg: 'bg-teal-100', border: 'border-teal-200', gradient: 'from-teal-400 to-cyan-500', count: 2 },
    { id: 'auto', label: 'Auto Service', malayalam: 'ഓട്ടോ സർവീസ്', icon: TramFront, color: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-200', gradient: 'from-yellow-400 to-amber-500', count: 5 },
];

// Worker initials to use as avatar placeholders (coloured circles)
const WORKERS = {
    auto: [
        { id: 101, name: 'Arun B', initials: 'AB', avatarColor: 'bg-yellow-500', skill: 'Auto Rickshaw Driver', malayalam: 'ഓട്ടോ ഡ്രൈവർ', exp: 9, area: 'Panayi Junction & Anakkayam', phone: '+919847665533', rating: 4.8, verified: true, avail: '6 AM – 10 PM', autoNumber: 'KL 10 P 4421', nightTrip: true, longDistance: false },
        { id: 102, name: 'Shafeeq M', initials: 'SH', avatarColor: 'bg-amber-600', skill: 'Auto Rickshaw Driver', malayalam: 'ഓട്ടോ ഡ്രൈവർ', exp: 7, area: 'Panayi, Chelembra, Tirur', phone: '+919446001234', rating: 4.9, verified: true, avail: '24 Hours', autoNumber: 'KL 10 P 7803', nightTrip: true, longDistance: true },
        { id: 103, name: 'Rajesh K', initials: 'RK', avatarColor: 'bg-orange-500', skill: 'Auto Rickshaw Driver', malayalam: 'ഓട്ടോ ഡ്രൈവർ', exp: 5, area: 'Panayi & Keezhpally', phone: '+919447991100', rating: 4.6, verified: true, avail: '6 AM – 9 PM', autoNumber: 'KL 10 P 3317', nightTrip: false, longDistance: true },
        { id: 104, name: 'Riyas P', initials: 'RP', avatarColor: 'bg-yellow-600', skill: 'Auto Rickshaw Driver', malayalam: 'ഓട്ടോ ഡ്രൈവർ', exp: 11, area: 'Anakkayam Panchayat wide', phone: '+919744556611', rating: 4.7, verified: true, avail: '5 AM – 11 PM', autoNumber: 'KL 10 P 5590', nightTrip: true, longDistance: true },
        { id: 105, name: 'Subin T', initials: 'ST', avatarColor: 'bg-amber-500', skill: 'Auto Rickshaw Driver', malayalam: 'ഓട്ടോ ഡ്രൈവർ', exp: 3, area: 'Panayi Ward 18 area', phone: '+919895220033', rating: 4.5, verified: false, avail: '7 AM – 8 PM', autoNumber: 'KL 10 P 6644', nightTrip: false, longDistance: false },
    ],
    electrical: [
        { id: 1, name: 'Biju K', initials: 'BK', avatarColor: 'bg-amber-500', skill: 'Licensed Electrician', malayalam: 'ഇലക്ട്രീഷ്യൻ', exp: 8, area: 'Panayi & Anakkayam', phone: '+914802735100', rating: 4.7, verified: true, avail: 'Mon–Sat' },
        { id: 2, name: 'Anoop V', initials: 'AV', avatarColor: 'bg-orange-500', skill: 'House Wiring Specialist', malayalam: 'ഹൗസ് വയറിംഗ്', exp: 12, area: 'Anakkayam Panchayat', phone: '+919447122233', rating: 4.9, verified: true, avail: 'Daily' },
        { id: 3, name: 'Sijo M', initials: 'SM', avatarColor: 'bg-yellow-500', skill: 'Motor / Pump Repairs', malayalam: 'മോട്ടോർ റിപ്പയർ', exp: 5, area: 'Panayi South', phone: '+919847001122', rating: 4.5, verified: false, avail: 'Flexible' },
    ],
    plumbing: [
        { id: 4, name: 'Suresh P', initials: 'SP', avatarColor: 'bg-blue-500', skill: 'Plumber & Pipe Fitter', malayalam: 'പ്ലംബർ', exp: 12, area: 'Panayi & Keezhpally', phone: '+919447122233', rating: 4.8, verified: true, avail: 'Mon–Sat' },
        { id: 5, name: 'Rino T', initials: 'RT', avatarColor: 'bg-sky-500', skill: 'Sanitary & Bathroom Works', malayalam: 'സാനിറ്ററി ഫിറ്റർ', exp: 6, area: 'Anakkayam', phone: '+919656223344', rating: 4.6, verified: true, avail: 'Weekdays' },
    ],
    driving: [
        { id: 6, name: 'Santhosh R', initials: 'SR', avatarColor: 'bg-sky-600', skill: 'Private Car (LMV)', malayalam: 'കാർ ഡ്രൈവർ', exp: 7, area: 'Anakkayam Panchayat', phone: '+919100678800', rating: 4.5, verified: true, avail: 'Daily' },
        { id: 7, name: 'Arun B', initials: 'AB', avatarColor: 'bg-blue-600', skill: 'Auto Rickshaw', malayalam: 'ഓട്ടോ ഡ്രൈവർ', exp: 9, area: 'Panayi Junction area', phone: '+919847665533', rating: 4.7, verified: true, avail: '6 AM – 10 PM' },
        { id: 8, name: 'Pradeep K', initials: 'PK', avatarColor: 'bg-indigo-500', skill: 'Tempo / Goods Vehicle', malayalam: 'ടെമ്പോ ഡ്രൈവർ', exp: 11, area: 'Panayi & Malappuram', phone: '+919995667788', rating: 4.6, verified: false, avail: 'Weekdays' },
        { id: 9, name: 'Shafeeq M', initials: 'SH', avatarColor: 'bg-teal-600', skill: 'Heavy Truck / Lorry', malayalam: 'ലോറി ഡ്രൈവർ', exp: 14, area: 'All Kerala', phone: '+919446001234', rating: 4.8, verified: true, avail: 'Flexible' },
    ],
    construction: [
        { id: 10, name: 'Rajan T', initials: 'RJ', avatarColor: 'bg-orange-600', skill: 'Mason / Civil Works', malayalam: 'കൊത്ത് ജോലി', exp: 15, area: 'Panayi & Keezhpally', phone: '+919447223399', rating: 4.8, verified: true, avail: 'Daily' },
        { id: 11, name: 'Anoop M', initials: 'AM', avatarColor: 'bg-red-500', skill: 'Carpenter & Furniture', malayalam: 'ആശാരി', exp: 10, area: 'Ward 18 & nearby', phone: '+919447765544', rating: 4.6, verified: true, avail: 'Mon–Sat' },
        { id: 12, name: 'Sabu C', initials: 'SC', avatarColor: 'bg-amber-600', skill: 'Steel & Welding', malayalam: 'വെൽഡർ', exp: 8, area: 'Anakkayam', phone: '+919745991100', rating: 4.4, verified: false, avail: 'Flexible' },
    ],
    teaching: [
        { id: 13, name: 'Deepa P', initials: 'DP', avatarColor: 'bg-indigo-500', skill: 'Maths & Science (SSLC)', malayalam: 'ഗണിതം & ശാസ്ത്രം', exp: 6, area: 'Panayi', phone: '+919447001234', rating: 4.9, verified: true, avail: 'Evenings' },
        { id: 14, name: 'Athira M', initials: 'AT', avatarColor: 'bg-purple-500', skill: 'English & Malayalam', malayalam: 'ഭാഷ ട്യൂഷൻ', exp: 4, area: 'Panayi & online', phone: '+919656443311', rating: 4.7, verified: true, avail: 'Evenings & Weekend' },
    ],
    tailoring: [
        { id: 15, name: 'Sujatha R', initials: 'SR', avatarColor: 'bg-pink-500', skill: 'Ladies Garments & Blouse', malayalam: 'ടൈലർ', exp: 12, area: 'Panayi Market area', phone: '+919447556677', rating: 4.9, verified: true, avail: 'Mon–Sat 9AM–6PM' },
        { id: 16, name: 'Latha K', initials: 'LK', avatarColor: 'bg-rose-400', skill: 'Kids Wear & Alterations', malayalam: 'കുട്ടി ഡ്രസ്', exp: 7, area: 'Panayi', phone: '+919847112233', rating: 4.6, verified: false, avail: 'Flexible' },
    ],
    it: [
        { id: 17, name: 'Jijo V', initials: 'JV', avatarColor: 'bg-violet-500', skill: 'Computer Repair & Networking', malayalam: 'കംപ്യൂട്ടർ', exp: 5, area: 'Panayi Junction', phone: '+919947422100', rating: 4.8, verified: true, avail: 'Daily' },
        { id: 18, name: 'Akash S', initials: 'AS', avatarColor: 'bg-purple-600', skill: 'Web Design & DTP', malayalam: 'വെബ് & ഡിടിപി', exp: 3, area: 'Panayi & Remote', phone: '+919400112345', rating: 4.7, verified: true, avail: 'Evenings' },
    ],
    catering: [
        { id: 19, name: 'Geetha B', initials: 'GB', avatarColor: 'bg-emerald-500', skill: 'Kerala Catering (Sadya)', malayalam: 'സദ്യ / കേറ്ററിംഗ്', exp: 10, area: 'Panayi & Anakkayam', phone: '+919744223300', rating: 4.9, verified: true, avail: 'By booking' },
        { id: 20, name: 'Rahul K', initials: 'RK', avatarColor: 'bg-teal-500', skill: 'Snacks & Bakery Items', malayalam: 'ബേക്കറി', exp: 5, area: 'Panayi', phone: '+919847331100', rating: 4.6, verified: false, avail: 'Daily (orders 1 day prior)' },
    ],
    painting: [
        { id: 21, name: 'Bijesh P', initials: 'BP', avatarColor: 'bg-red-500', skill: 'Interior & Exterior Painting', malayalam: 'ഇന്റീരിയർ പെയിന്ററ്', exp: 10, area: 'Ward 18 & nearby', phone: '+919447667799', rating: 4.8, verified: true, avail: 'Daily' },
        { id: 22, name: 'Soman N', initials: 'SN', avatarColor: 'bg-pink-500', skill: 'Texture & Waterproofing', malayalam: 'ടെക്സ്ചർ / വാട്ടർ', exp: 7, area: 'Anakkayam Panchayat', phone: '+919447998800', rating: 4.5, verified: false, avail: 'Weekdays' },
    ],
    transport: [
        { id: 23, name: 'Jobin M', initials: 'JM', avatarColor: 'bg-teal-600', skill: 'Mini Truck Goods Transport', malayalam: 'ഗുഡ്സ് ടെമ്പോ', exp: 6, area: 'Malappuram District', phone: '+919895441122', rating: 4.6, verified: true, avail: 'Flexible' },
        { id: 24, name: 'Sunil P', initials: 'SU', avatarColor: 'bg-cyan-600', skill: 'Pickup & House Shifting', malayalam: 'ഹൗസ് ഷിഫ്റ്റിംഗ്', exp: 9, area: 'Panayi & Anakkayam', phone: '+919744556677', rating: 4.7, verified: true, avail: 'Daily' },
    ],
};

const CARD = 'bg-white/85 backdrop-blur-xl rounded-[2rem] border border-sky-100 shadow-md shadow-sky-100/40';

/* ─────────────────────────────────────────
   REGISTER FORM MODAL
───────────────────────────────────────── */
function RegisterModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', phone: '', category: '', skill: '', exp: '', area: '', description: '' });
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const digits = value.replace(/\D/g, '').replace(/^(91|0)/, '');
            if (digits.length > 0 && digits.length < 10) setPhoneError('Phone number must be 10 digits');
            else if (digits.length > 10) setPhoneError('Too many digits — enter 10-digit mobile number');
            else setPhoneError('');
        }
        setForm(f => ({ ...f, [name]: value }));
    };

    const isPhoneValid = form.phone.replace(/\D/g, '').replace(/^(91|0)/, '').length === 10;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isPhoneValid) { setPhoneError('Please enter a valid 10-digit phone number'); return; }
        setSubmitted(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
        >
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-full max-w-lg bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 pt-6 pb-8 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/25 rounded-full flex items-center justify-center hover:bg-white/35 transition-colors">
                        <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/25 rounded-2xl flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg leading-tight">Register as a Worker</h3>
                            <p className="font-malayalam text-orange-100 text-[12px] mt-0.5">നിങ്ങളുടെ കഴിവ് രജിസ്റ്റർ ചെയ്യൂ</p>
                        </div>
                    </div>

                    {/* Step indicators */}
                    {!submitted && (
                        <div className="flex gap-2 mt-5">
                            {[1, 2].map(s => (
                                <div key={s} className={`h-1.5 rounded-full transition-all ${s === step ? 'bg-white flex-1' : s < step ? 'bg-white/60 w-8' : 'bg-white/30 w-8'}`} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6">
                    {submitted ? (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h4 className="font-bold text-slate-800 text-lg mb-2">Application Submitted!</h4>
                            <p className="font-malayalam text-slate-600 text-[13px] mb-2 leading-relaxed">
                                നിങ്ങളുടെ പ്രൊഫൈൽ വാർഡ് 18 ടീം അവലോകനം ചെയ്ത ശേഷം ആക്ടിവേറ്റ് ആകും.
                            </p>
                            <p className="text-slate-400 text-[12px] mb-6">Your profile will go live after a quick verification (usually within 24 hours).</p>
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-3 text-left mb-6">
                                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                                <p className="text-[12px] text-amber-700 font-medium">Admin approval ensures only genuine, local workers are listed for community safety.</p>
                            </div>
                            <button onClick={onClose} className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[13px]">
                                Done
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Step 1 — Personal Details</p>

                                        <div>
                                            <label className="text-[12px] font-bold text-slate-600 mb-1.5 block">Full Name *</label>
                                            <input
                                                name="name" value={form.name} onChange={handleChange} required
                                                placeholder="e.g. Suresh P"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-slate-600 mb-1.5 block">WhatsApp / Phone Number *</label>
                                            <input
                                                name="phone" value={form.phone} onChange={handleChange} required type="tel"
                                                maxLength={14}
                                                placeholder="+91 94471 XXXXX"
                                                className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all ${phoneError ? 'border-red-300 focus:ring-red-300/40 focus:border-red-400' : 'border-slate-200 focus:ring-amber-400/40 focus:border-amber-300'}`}
                                            />
                                            {phoneError && <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">⚠ {phoneError}</p>}
                                            {isPhoneValid && form.phone && <p className="text-emerald-500 text-[11px] font-bold mt-1.5 ml-1">✓ Valid phone number</p>}
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-slate-600 mb-1.5 block">Service Area (where you work)</label>
                                            <input
                                                name="area" value={form.area} onChange={handleChange}
                                                placeholder="e.g. Panayi & Anakkayam"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            disabled={!form.name || !isPhoneValid}
                                            onClick={() => setStep(2)}
                                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[13px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                                        >
                                            Continue <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Step 2 — Skill & Experience</p>

                                        <div>
                                            <label className="text-[12px] font-bold text-slate-600 mb-1.5 block">Job Category *</label>
                                            <select
                                                name="category" value={form.category} onChange={handleChange} required
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all appearance-none"
                                            >
                                                <option value="">Select a category…</option>
                                                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label} ({c.malayalam})</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-slate-600 mb-1.5 block">Your Specific Skill *</label>
                                            <input
                                                name="skill" value={form.skill} onChange={handleChange} required
                                                placeholder="e.g. House Wiring, Plumbing, SSLC Maths…"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-slate-600 mb-1.5 block">Years of Experience *</label>
                                            <input
                                                name="exp" value={form.exp} onChange={handleChange} required type="number" min="0" max="50"
                                                placeholder="e.g. 8"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-slate-600 mb-1.5 block">Brief Description (optional)</label>
                                            <textarea
                                                name="description" value={form.description} onChange={handleChange} rows={3}
                                                placeholder="Tell us about your experience, past projects, certifications…"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all resize-none"
                                            />
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors">
                                            <Upload className="w-5 h-5 text-slate-400 shrink-0" />
                                            <div>
                                                <p className="text-[13px] font-bold text-slate-600">Upload Photo (optional)</p>
                                                <p className="text-[11px] text-slate-400">Profile photos get 3× more calls</p>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-start gap-3">
                                            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                            <p className="text-[11px] text-blue-700 leading-snug">
                                                Your profile will be reviewed by the Ward 18 team and go live within 24 hours. This ensures only genuine local workers are listed.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <button type="button" onClick={() => setStep(1)} className="flex items-center justify-center gap-1 px-5 py-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-200 transition-colors">
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!form.category || !form.skill || !form.exp}
                                                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[13px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4" /> Submit Application
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   WORKER PROFILE DRAWER
───────────────────────────────────────── */
function WorkerDrawer({ worker, category, onClose }) {
    const [called, setCalled] = useState(false);
    const handleCall = () => { setCalled(true); window.location.href = `tel:${worker.phone}`; setTimeout(() => setCalled(false), 3000); };
    const handleWhatsApp = () => { window.open(`https://wa.me/${worker.phone.replace(/\D/g, '')}?text=Hi%20${worker.name}%2C%20I%20found%20your%20profile%20on%20Rise%20Up%20Panayi%20Ward%2018.%20Are%20you%20available%3F`, '_blank'); };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-end justify-center">
            <motion.div
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-full max-w-lg bg-white rounded-t-[2.5rem] shadow-2xl p-0 overflow-hidden"
            >
                {/* Coloured avatar header */}
                <div className={`bg-gradient-to-br ${category.gradient} px-6 pt-8 pb-10 relative`}>
                    <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/25 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex items-center gap-5">
                        <div className={`w-20 h-20 rounded-3xl ${worker.avatarColor} flex items-center justify-center text-white text-2xl font-black shadow-lg border-4 border-white/30`}>
                            {worker.initials}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-white text-xl font-black">{worker.name}</h3>
                                {worker.verified && (
                                    <div className="bg-white/20 rounded-full px-2 py-0.5 flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3 text-white" />
                                        <span className="text-[9px] text-white font-bold uppercase tracking-wider">Verified</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-white/90 font-bold text-[13px] mt-0.5">{worker.skill}</p>
                            <p className={`font-malayalam text-[12px] mt-0.5 text-white/70`}>{worker.malayalam}</p>

                            {/* Rating row */}
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(worker.rating) ? 'fill-white text-white' : 'text-white/30'}`} />
                                    ))}
                                    <span className="text-white/90 text-[11px] font-bold ml-1">{worker.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info strip */}
                <div className="-mt-5 mx-4 bg-white rounded-2xl border border-slate-100 shadow-md p-4 grid grid-cols-3 gap-3 text-center mb-4">
                    {[
                        { label: 'Experience', value: `${worker.exp} yrs`, icon: Clock },
                        { label: 'Availability', value: worker.avail, icon: CalendarDays },
                        { label: 'Area', value: worker.area.split('&')[0].trim(), icon: MapPin },
                    ].map(({ label, value, icon: Icon }) => (
                        <div key={label}>
                            <Icon className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                            <div className="text-[12px] font-bold text-slate-800 leading-tight">{value}</div>
                            <div className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>

                <div className="px-4 pb-6 space-y-3">
                    {/* Full service area */}
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <p className="text-[12px] text-slate-600 font-semibold">Serves: <span className="text-slate-800 font-bold">{worker.area}</span></p>
                    </div>

                    {!worker.verified && (
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                            <p className="text-[12px] text-amber-700">Verification pending — profile under review</p>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={handleCall}
                            className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-[13px] transition-all shadow-sm ${called ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-200'}`}
                        >
                            <PhoneCall className="w-4 h-4" /> {called ? 'Calling…' : 'Call Now'}
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={handleWhatsApp}
                            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-[13px] bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm shadow-emerald-200 transition-all"
                        >
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Workplace() {
    const navigate = useNavigate();
    const [selectedCat, setSelectedCat] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);

    const activeCategory = CATEGORIES.find(c => c.id === selectedCat);
    const activeWorkers = selectedCat ? (WORKERS[selectedCat] || []) : [];

    return (
        <>
            <div
                className="flex flex-col min-h-screen w-full overflow-y-auto no-scrollbar"
                style={{ background: 'linear-gradient(135deg, #fefce8 0%, #f0f9ff 40%, #ffffff 70%, #f0fdf4 100%)' }}
            >
                {/* ── HEADER ── */}
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-lg shadow-amber-200/50 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={selectedCat ? () => setSelectedCat(null) : () => navigate(-1)}
                            className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/35 transition-colors"
                        >
                            <ArrowLeft className="text-white w-5 h-5" />
                        </button>
                        <div className="flex-1 min-w-0">
                            {selectedCat && activeCategory ? (
                                <>
                                    <h2 className="text-white text-xl font-bold leading-tight">{activeCategory.label}</h2>
                                    <p className="font-malayalam text-orange-100 text-[12px] font-semibold uppercase tracking-widest">{activeCategory.malayalam} · Ward 18</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-white text-xl font-bold font-malayalam leading-tight">തൊഴിലിടം</h2>
                                    <p className="text-orange-100 text-[12px] font-semibold uppercase tracking-widest">Workplace · Ward 18</p>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => setShowRegister(true)}
                            className="flex items-center gap-2 bg-white text-amber-600 text-[12px] font-bold px-4 py-2.5 rounded-2xl shadow-sm hover:bg-amber-50 transition-colors whitespace-nowrap"
                        >
                            <Plus className="w-3.5 h-3.5" /> Register
                        </button>
                    </div>
                </div>

                <div className="p-5 md:p-8 pb-28 space-y-6">

                    <AnimatePresence mode="wait">

                        {/* ── CATEGORY GRID ── */}
                        {!selectedCat && (
                            <motion.div key="categories" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                {/* Hero banner */}
                                <div className={`${CARD} p-5 mb-6 flex items-center gap-4`}>
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                        <Briefcase className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800 text-[15px] leading-tight">Local Skill Directory</h3>
                                        <p className="font-malayalam text-[12px] text-slate-500 mt-0.5">Panayi Ward 18 — Verified Workers</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-xl font-black text-amber-600">{Object.values(WORKERS).flat().length}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Workers</div>
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {[
                                        { label: 'Categories', value: CATEGORIES.length, icon: Users, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
                                        { label: 'Verified', value: Object.values(WORKERS).flat().filter(w => w.verified).length, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                                        { label: 'Avg Rating', value: '4.7★', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
                                    ].map(s => {
                                        const Icon = s.icon;
                                        return (
                                            <div key={s.label} className={`rounded-2xl ${s.bg} border ${s.border} p-3 text-center`}>
                                                <Icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} />
                                                <div className={`text-lg font-black ${s.color}`}>{s.value}</div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{s.label}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Category cards */}
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 mb-3">
                                    Browse by Category
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {CATEGORIES.map((cat, i) => {
                                        const Icon = cat.icon;
                                        return (
                                            <motion.button
                                                key={cat.id}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                onClick={() => setSelectedCat(cat.id)}
                                                whileTap={{ scale: 0.96 }}
                                                className={`${CARD} p-4 text-left flex flex-col hover:shadow-lg transition-all group relative overflow-hidden`}
                                            >
                                                <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                                <div className={`w-11 h-11 rounded-2xl ${cat.bg} border ${cat.border} flex items-center justify-center mb-3`}>
                                                    <Icon className={`w-5 h-5 ${cat.color}`} />
                                                </div>
                                                <h4 className="font-bold text-slate-800 text-[13px] leading-tight">{cat.label}</h4>
                                                <p className={`font-malayalam text-[11px] font-semibold mt-0.5 ${cat.color}`}>{cat.malayalam}</p>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className={`text-[11px] font-black ${cat.color}`}>{cat.count} workers</span>
                                                    <ChevronRight className={`w-4 h-4 ${cat.color} group-hover:translate-x-1 transition-transform`} />
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Register CTA */}
                                <div className={`${CARD} p-5 mt-4 flex items-center gap-4`}>
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-[14px]">Are you a local worker?</h4>
                                        <p className="font-malayalam text-[12px] text-slate-500 mt-0.5">നിങ്ങളുടെ കഴിവ് ഇവിടെ ലിസ്റ്റ് ചെയ്യൂ</p>
                                    </div>
                                    <button
                                        onClick={() => setShowRegister(true)}
                                        className="bg-amber-500 hover:bg-amber-600 text-white text-[12px] font-bold px-4 py-2.5 rounded-2xl transition-colors shadow-sm shadow-amber-200 whitespace-nowrap"
                                    >
                                        Register Now
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* ── WORKER CARDS (after category selected) ── */}
                        {selectedCat && activeCategory && (
                            <motion.div key="workers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                                {/* Category header strip */}
                                <div className={`bg-gradient-to-r ${activeCategory.gradient} rounded-[2rem] p-5 flex items-center gap-4 text-white`}>
                                    <div className="w-13 h-13 bg-white/20 rounded-2xl flex items-center justify-center">
                                        {(() => { const Icon = activeCategory.icon; return <Icon className="w-7 h-7 text-white" />; })()}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl leading-tight">{activeCategory.label}</h3>
                                        <p className="font-malayalam text-white/80 text-[13px] font-semibold">{activeCategory.malayalam}</p>
                                        <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mt-1">{activeWorkers.length} workers listed • Ward 18</p>
                                    </div>
                                </div>

                                {/* Approved badge */}
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <p className="text-[12px] text-emerald-700 font-medium">All verified profiles are checked by Ward 18 admin before going live.</p>
                                </div>

                                {/* Worker cards */}
                                {activeWorkers.map((worker, i) => (
                                    <motion.div
                                        key={worker.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className={`${CARD} overflow-hidden`}
                                    >
                                        {/* Card header */}
                                        <div className={`bg-gradient-to-r ${activeCategory.gradient} px-5 py-4`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-2xl ${worker.avatarColor} flex items-center justify-center text-white text-lg font-black shadow-md border-2 border-white/30`}>
                                                    {worker.initials}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-white font-black text-[15px]">{worker.name}</span>
                                                        {worker.verified && (
                                                            <span className="bg-white/25 rounded-full px-2 py-0.5 text-[9px] text-white font-bold uppercase tracking-wider flex items-center gap-1">
                                                                <ShieldCheck className="w-2.5 h-2.5" /> Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-white/90 text-[12px] font-semibold mt-0.5">{worker.skill}</p>
                                                    <p className="font-malayalam text-white/70 text-[11px]">{worker.malayalam}</p>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                                                    <span className="text-white font-black text-[13px]">{worker.rating}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="px-5 pt-4 pb-2">
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                {[
                                                    { label: 'Experience', value: `${worker.exp} yrs`, icon: Clock },
                                                    { label: 'Availability', value: worker.avail, icon: CalendarDays },
                                                    { label: 'Area', value: worker.area.split('&')[0].trim(), icon: MapPin },
                                                ].map(({ label, value, icon: Icon }) => (
                                                    <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl px-2 py-2.5 text-center">
                                                        <Icon className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                                                        <div className="text-[11px] font-bold text-slate-800 leading-tight">{value}</div>
                                                        <div className="text-[9px] text-slate-400 uppercase tracking-wide font-bold mt-0.5">{label}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Auto-specific: plate number + service tags */}
                                            {worker.autoNumber && (
                                                <div className="mb-4 space-y-2">
                                                    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-2.5">
                                                        <TramFront className="w-4 h-4 text-yellow-700 shrink-0" />
                                                        <span className="text-[12px] font-black text-yellow-800 tracking-widest">{worker.autoNumber}</span>
                                                        <span className="text-[10px] text-yellow-600 font-bold ml-1 uppercase tracking-wide">Auto No.</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {worker.nightTrip && (
                                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-black tracking-wide">
                                                                🌙 <span className="font-malayalam">രാത്രികാല സേവനം</span> <span className="opacity-60">(Night Trip)</span>
                                                            </span>
                                                        )}
                                                        {worker.longDistance && (
                                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-black tracking-wide">
                                                                🛣️ Long Distance
                                                            </span>
                                                        )}
                                                        {!worker.nightTrip && !worker.longDistance && (
                                                            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-semibold">
                                                                Local trips only
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action buttons */}
                                        <div className="px-4 pb-4 grid grid-cols-3 gap-2">
                                            <motion.a
                                                href={`tel:${worker.phone}`}
                                                whileTap={{ scale: 0.96 }}
                                                className="col-span-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-[12px] shadow-sm shadow-sky-200"
                                            >
                                                <PhoneCall className="w-3.5 h-3.5" /> {worker.autoNumber ? 'Call Driver' : 'Call'}
                                            </motion.a>
                                            <motion.a
                                                href={`https://wa.me/${worker.phone.replace(/\D/g, '')}?text=Hi%20${worker.name}%2C%20I%20found%20your%20profile%20on%20Rise%20Up%20Ward%2018.%20Are%20you%20available%3F`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileTap={{ scale: 0.96 }}
                                                className="col-span-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-[12px] shadow-sm shadow-emerald-200"
                                            >
                                                <MessageCircle className="w-3.5 h-3.5" /> WA
                                            </motion.a>
                                            <button
                                                onClick={() => setSelectedWorker(worker)}
                                                className="col-span-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[12px] hover:bg-slate-200 transition-colors"
                                            >
                                                View <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Register CTA inside list */}
                                <div className={`${CARD} p-5 flex items-center gap-4`}>
                                    <div className={`w-11 h-11 rounded-2xl ${activeCategory.bg} border ${activeCategory.border} flex items-center justify-center shrink-0`}>
                                        <Plus className={`w-5 h-5 ${activeCategory.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-700 text-[13px]">Know a {activeCategory.label} expert?</h4>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Help them get discovered in Ward 18</p>
                                    </div>
                                    <button
                                        onClick={() => setShowRegister(true)}
                                        className="bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold px-3 py-2 rounded-xl transition-colors shadow-sm whitespace-nowrap"
                                    >
                                        Add Worker
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Overlays */}
            <AnimatePresence>
                {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
                {selectedWorker && activeCategory && (
                    <WorkerDrawer
                        worker={selectedWorker}
                        category={activeCategory}
                        onClose={() => setSelectedWorker(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

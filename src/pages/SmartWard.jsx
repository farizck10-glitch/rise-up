import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowLeft, Bell, CreditCard, FileText,
    Landmark, ScrollText, Send, Phone,
    AlertCircle, FileCheck, CheckCircle2,
    Image as ImageIcon, Search, Plus, Clock, CheckCircle, Star,
    X, Users, Briefcase, Home, MessageSquare,
    ExternalLink, FileBadge, ClipboardEdit, ChevronDown, ChevronRight, Copy, Check,
    CalendarDays, Trophy, Droplets, Zap, Trash2,
    MapPin, PhoneCall, Building2, Search as SearchIcon, Shield, Sprout, ShoppingCart
} from 'lucide-react';

export default function SmartWard() {
    const navigate = useNavigate();
    const { requireAuth } = useAuth();

    // Complaint State
    const [complaintView, setComplaintView] = useState("submit"); // "submit" | "track"
    const [complaintText, setComplaintText] = useState("");
    const [complaintImage, setComplaintImage] = useState(null);
    const [trackIdInput, setTrackIdInput] = useState("");
    const [trackedResult, setTrackedResult] = useState(null);
    const [myComplaints, setMyComplaints] = useState([
        // Mock data for tracking demonstration
        { id: "CMP-2026-8432", text: "Streetlight not working near Ward Office.", date: "24/02/2026", status: 3 }, // In Progress
        { id: "CMP-2026-1055", text: "Water pipe leakage at main junction.", date: "15/02/2026", status: 4 }, // Resolved
    ]);
    const [ratings, setRatings] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [webViewUrl, setWebViewUrl] = useState(null);
    const [webViewTitle, setWebViewTitle] = useState("");
    const fileInputRef = useRef(null);
    const [smartFill, setSmartFill] = useState({ name: '', houseNo: '', surveyNo: '', aadhaarLast4: '' });
    const [smartFillCopied, setSmartFillCopied] = useState(false);
    const [expandedGuide, setExpandedGuide] = useState(null);
    const [expandedDocs, setExpandedDocs] = useState(null);
    const toggleDocs = (key) => setExpandedDocs(prev => prev === key ? null : key);

    const openWebView = (url, title) => {
        setWebViewUrl(url);
        setWebViewTitle(title);
    };

    const handleRating = (id, star) => {
        setRatings(prev => ({ ...prev, [id]: star }));
    };

    const simulateAdminUpdate = () => {
        if (trackedResult && trackedResult.status < 4) {
            const nextStatus = trackedResult.status + 1;
            const statusLabels = { 2: 'Under Review', 3: 'In Progress', 4: 'Resolved' };

            const updated = { ...trackedResult, status: nextStatus };
            setTrackedResult(updated);
            setMyComplaints(myComplaints.map(c => c.id === updated.id ? updated : c));

            const newNotif = `Status Update: ${updated.id} is now ${statusLabels[nextStatus]}.`;
            setNotifications(prev => [...prev, newNotif]);

            setTimeout(() => {
                setNotifications(prev => prev.slice(1));
            }, 5000);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setComplaintImage(e.target.files[0]);
        }
    };

    const handleComplaintSubmit = (e) => {
        e.preventDefault();
        requireAuth(() => {
            const newId = `CMP - ${new Date().getFullYear()} -${Math.floor(1000 + Math.random() * 9000)} `;
            const newComplaint = {
                id: newId,
                text: complaintText,
                date: new Date().toLocaleDateString('en-GB'),
                status: 1 // 1: Submitted
            };
            setMyComplaints([newComplaint, ...myComplaints]);
            alert(`Complaint Submitted successfully!\nYour Tracking ID is: ${newId} `);
            setComplaintText("");
            setComplaintImage(null);
            setTrackedResult(newComplaint);
            setComplaintView("track");
        }, {
            title: "പരാതി സമർപ്പിക്കാൻ ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to submit your complaint."
        });
    };

    const handleTrack = (e) => {
        e.preventDefault();
        const found = myComplaints.find(c => c.id.toUpperCase() === trackIdInput.trim().toUpperCase());
        if (found) {
            setTrackedResult(found);
        } else {
            alert("Complaint ID not found. Please check and try again.");
            setTrackedResult(null);
        }
    };

    const handleCall = (number) => {
        window.location.href = `tel:${number} `;
    };

    return (
        <div className="flex flex-col h-screen w-full relative overflow-y-auto no-scrollbar lg:items-center pb-24" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 70%, #eff6ff 100%)' }}>
            {/* In-App WebView Modal */}
            <AnimatePresence>
                {webViewUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[200] bg-white flex flex-col"
                    >
                        <div className="bg-purple-600 px-4 py-3 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setWebViewUrl(null)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                                    <X className="text-white w-4 h-4" />
                                </button>
                                <span className="text-white font-bold text-sm font-malayalam tracking-tight truncate max-w-[200px]">{webViewTitle}</span>
                            </div>
                            <span className="text-purple-200 text-[10px] uppercase font-bold tracking-widest leading-tight text-right">K-SMART<br />Portal</span>
                        </div>
                        <div className="flex-1 w-full relative bg-slate-100">
                            {/* Loader behind the iframe */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-3"></div>
                                <span className="text-sm font-bold text-slate-400 font-sans tracking-tight">Loading K-SMART...</span>
                            </div>
                            {/* We use standard iframe. Important: Real production sites might block iframes with X-Frame-Options, so we usually use a fallback anchor tag if needed. */}
                            <iframe
                                src={webViewUrl}
                                className="w-full h-full relative z-10 bg-transparent border-0"
                                title="K-SMART Service"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notifications */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
                <AnimatePresence>
                    {notifications.map((notif, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white/90 backdrop-blur-xl border border-sky-100 text-slate-800 px-4 py-3 rounded-2xl shadow-lg shadow-blue-100/50 flex items-center gap-3 font-medium text-sm"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <Bell className="w-4 h-4 text-blue-500" />
                            </div>
                            {notif}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Header Area */}
            <div className="bg-gradient-to-br from-sky-400 to-blue-600 px-6 pt-12 pb-24 rounded-b-[2.5rem] shadow-lg shadow-blue-200/50 sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                            <ArrowLeft className="text-white w-5 h-5" />
                        </button>
                        <div>
                            <h2 className="text-white text-xl font-bold font-malayalam tracking-tight">സ്മാർട്ട് വാർഡ്</h2>
                            <p className="text-purple-100 text-[11px] font-bold uppercase tracking-widest font-sans mt-0.5">Smart Ward</p>
                        </div>
                    </div>
                    {/* Addition: Notification Bell */}
                    <button className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <Bell className="text-white w-5 h-5" />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-sky-400 rounded-full animate-pulse"></span>
                    </button>
                </div>
            </div>

            <div className="px-6 -mt-16 relative z-30 space-y-6 w-full lg:max-w-3xl">

                {/* Addition: Emergency Helpline */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 w-full">
                    <button onClick={() => handleCall('104')} className="flex-1 flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-3 rounded-2xl font-malayalam font-bold text-sm hover:bg-rose-100 transition-colors border border-rose-100 shadow-floating">
                        <Phone className="w-4 h-4" /> അക്ഷയ കേന്ദ്രം
                    </button>
                    <button onClick={() => handleCall('100')} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-2xl font-malayalam font-bold text-sm hover:bg-blue-100 transition-colors border border-blue-100 shadow-floating">
                        <Phone className="w-4 h-4" /> പഞ്ചായത്ത് ഓഫീസ്
                    </button>
                </motion.div>

                {/* 2x2 Grid Layout for Core Features */}
                <div className="grid grid-cols-2 gap-4">

                    {/* ══ PANCHAYAT SERVICES — K-SMART ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="col-span-2 rounded-[28px] bg-white/70 backdrop-blur-xl border border-sky-100 shadow-lg shadow-blue-50 overflow-hidden"
                    >
                        <div className="p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100 opacity-40 blur-[60px] rounded-full pointer-events-none" />

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-black text-slate-800 tracking-tight font-malayalam">പഞ്ചായത്ത് സേവനങ്ങൾ</h3>
                                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Panchayat Services · K-SMART</p>
                                </div>
                                <span className="text-[8px] font-black uppercase text-blue-600 bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full shrink-0">K-SMART</span>
                            </div>

                            {/* 2×3 Service Grid */}
                            <div className="grid grid-cols-2 gap-2.5">
                                {[
                                    {
                                        icon: Landmark,
                                        mal: 'കെട്ടിട നികുതി',
                                        eng: 'Property Tax',
                                        url: 'https://ksmart.lsgkerala.gov.in/ui/web-portal/property-tax',
                                        accent: 'bg-amber-500/15 border-amber-400/25 text-amber-300',
                                        iconBg: 'bg-amber-500/20 border-amber-400/30',
                                    },
                                    {
                                        icon: Users,
                                        mal: 'ജനന രജിസ്ട്രേഷൻ',
                                        eng: 'Birth Registration',
                                        url: 'https://ksmart.lsgkerala.gov.in/ui/web-portal/birth-registration',
                                        accent: 'bg-sky-500/15 border-sky-400/25 text-sky-300',
                                        iconBg: 'bg-sky-500/20 border-sky-400/30',
                                    },
                                    {
                                        icon: Users,
                                        mal: 'മരണ രജിസ്ട്രേഷൻ',
                                        eng: 'Death Registration',
                                        url: 'https://ksmart.lsgkerala.gov.in/ui/web-portal/death-registration',
                                        accent: 'bg-rose-500/15 border-rose-400/25 text-rose-300',
                                        iconBg: 'bg-rose-500/20 border-rose-400/30',
                                    },
                                    {
                                        icon: Users,
                                        mal: 'വിവാഹ രജിസ്ട്രേഷൻ',
                                        eng: 'Marriage Registration',
                                        url: 'https://ksmart.lsgkerala.gov.in/ui/web-portal/marriage-registration',
                                        accent: 'bg-pink-500/15 border-pink-400/25 text-pink-300',
                                        iconBg: 'bg-pink-500/20 border-pink-400/30',
                                    },
                                    {
                                        icon: Home,
                                        mal: 'കെട്ടിട നിർമ്മാണ അനുമതി',
                                        eng: 'Building Permit',
                                        url: 'https://ksmart.lsgkerala.gov.in/ui/web-portal/building-permit',
                                        accent: 'bg-violet-500/15 border-violet-400/25 text-violet-300',
                                        iconBg: 'bg-violet-500/20 border-violet-400/30',
                                    },
                                    {
                                        icon: Briefcase,
                                        mal: 'വ്യാപാര ലൈസൻസ്',
                                        eng: 'Trade License',
                                        url: 'https://ksmart.lsgkerala.gov.in/ui/web-portal/trade-license',
                                        accent: 'bg-orange-500/15 border-orange-400/25 text-orange-300',
                                        iconBg: 'bg-orange-500/20 border-orange-400/30',
                                    },
                                ].map((svc) => {
                                    const Icon = svc.icon;
                                    return (
                                        <button
                                            key={svc.eng}
                                            onClick={() => openWebView(svc.url, svc.mal)}
                                            className="flex flex-col gap-2.5 rounded-2xl p-3.5 border border-sky-200 bg-sky-50 hover:bg-sky-100 active:scale-[0.97] transition-all group text-left"
                                        >
                                            <div className="w-9 h-9 rounded-xl border border-sky-200 bg-white flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 text-sky-600" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-black text-slate-800 leading-tight font-malayalam">{svc.mal}</p>
                                                <p className="text-[9px] text-slate-400 font-sans uppercase tracking-wider mt-1 font-bold">{svc.eng}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink className="w-2.5 h-2.5" /> K-SMART
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-center text-[10px] text-slate-400 font-semibold mt-4">
                                Opens official K-SMART Kerala portal
                            </p>
                        </div>
                    </motion.div>

                    {/* ══ VILLAGE SERVICES — e-DISTRICT ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="col-span-2 rounded-[28px] bg-white/70 backdrop-blur-xl border border-emerald-100 shadow-lg shadow-emerald-50 overflow-hidden"
                    >
                        <div className="p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100 opacity-50 blur-[60px] rounded-full pointer-events-none" />

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                                    <Landmark className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-black text-slate-800 tracking-tight font-malayalam">വില്ലേജ് സേവനങ്ങൾ</h3>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-0.5">Village &amp; e-District Services</p>
                                </div>
                                <span className="text-[8px] font-black uppercase text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">e-District</span>
                            </div>

                            {/* Primary Official Link Button */}
                            <a
                                href="https://edistrict.kerala.gov.in/generalService.htm?event=services&token=17721312715457889237474437163097"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mb-5 flex items-center gap-4 rounded-2xl p-4 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 active:scale-[0.98] transition-all group shadow-sm"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-[14px] font-black leading-tight text-slate-800 font-malayalam">വില്ലേജ് സർവീസുകൾ (e-District)</p>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">Official Digital Portal</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Open →</span>
                                </div>
                            </a>

                            {/* 2×2 + 1 wide Service Grid */}
                            <div className="grid grid-cols-2 gap-2.5">
                                {[
                                    {
                                        icon: Sprout,
                                        mal: 'ഭൂനികുതി അടയ്ക്കാം',
                                        eng: 'Land Tax Payment',
                                        url: 'https://edistrict.kerala.gov.in/',
                                        accent: 'bg-green-500/15 border-green-400/25 text-green-300',
                                        iconBg: 'bg-green-500/20 border-green-400/30',
                                        wide: false,
                                    },
                                    {
                                        icon: FileText,
                                        mal: 'വരുമാന സർട്ടിഫിക്കറ്റ്',
                                        eng: 'Income Certificate',
                                        url: 'https://edistrict.kerala.gov.in/',
                                        accent: 'bg-teal-500/15 border-teal-400/25 text-teal-300',
                                        iconBg: 'bg-teal-500/20 border-teal-400/30',
                                        wide: false,
                                    },
                                    {
                                        icon: FileBadge,
                                        mal: 'ജാതി സർട്ടിഫിക്കറ്റ്',
                                        eng: 'Caste Certificate',
                                        url: 'https://edistrict.kerala.gov.in/',
                                        accent: 'bg-amber-500/15 border-amber-400/25 text-amber-300',
                                        iconBg: 'bg-amber-500/20 border-amber-400/30',
                                        wide: false,
                                    },
                                    {
                                        icon: MapPin,
                                        mal: 'ലൊക്കേഷൻ സർട്ടിഫിക്കറ്റ്',
                                        eng: 'Location Certificate',
                                        url: 'https://edistrict.kerala.gov.in/',
                                        accent: 'bg-cyan-500/15 border-cyan-400/25 text-cyan-300',
                                        iconBg: 'bg-cyan-500/20 border-cyan-400/30',
                                        wide: false,
                                    },
                                    {
                                        icon: ShoppingCart,
                                        mal: 'റേഷൻ കാർഡ് അപേക്ഷകൾ',
                                        eng: 'Ration Card Services',
                                        url: 'https://epds.kerala.gov.in/',
                                        accent: 'bg-emerald-500/15 border-emerald-400/25 text-emerald-700',
                                        iconBg: 'bg-emerald-500/20 border-emerald-400/30',
                                        wide: true,
                                    },
                                ].map((svc) => {
                                    const Icon = svc.icon;
                                    return (
                                        <a
                                            key={svc.eng}
                                            href={svc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex gap-3 rounded-2xl p-6 border border-emerald-200 bg-white ${svc.wide ? 'col-span-2 items-center' : 'flex-col'} hover:bg-emerald-50 active:scale-[0.97] transition-all group shadow-lg shadow-emerald-100/20`}
                                        >
                                            <div className="w-10 h-10 rounded-xl border border-emerald-100 bg-emerald-50 flex items-center justify-center shrink-0">
                                                <Icon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[14px] font-black text-slate-800 leading-tight font-malayalam">{svc.mal}</p>
                                                <p className="text-[10px] text-slate-500 font-sans uppercase tracking-wider mt-1.5 font-bold">{svc.eng}</p>
                                            </div>
                                            {svc.wide ? (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-emerald-200 group-hover:bg-emerald-700 transition-colors shrink-0">
                                                    OPEN <ExternalLink className="w-3 h-3" />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 mt-3">
                                                    <ExternalLink className="w-3 h-3" /> e-District
                                                </div>
                                            )}
                                        </a>
                                    );
                                })}
                            </div>

                            <p className="text-center text-[10px] text-emerald-300/20 font-semibold mt-4">
                                Opens official Kerala e-District / EPDS portal
                            </p>
                        </div>
                    </motion.div>






                    {/* Feature 3: Panchayat Schemes — Featured Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="col-span-2 bg-[#F0FFF4] rounded-[2.5rem] p-7 shadow-lg shadow-emerald-100/50 border border-emerald-200 relative overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
                                    <ScrollText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 text-[18px] tracking-tight font-malayalam">പഞ്ചായത്ത് പദ്ധതികൾ</h3>
                                    <p className="text-[10px] font-black font-sans text-emerald-600 uppercase tracking-[0.15em] mt-0.5">Panchayat Schemes • Featured</p>
                                </div>
                            </div>
                            <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-200 animate-bounce">NEW</span>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {/* Scheme 1 */}
                            <div className="group bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-black text-slate-800 text-[15px] font-malayalam leading-tight">ലൈഫ് മിഷൻ ഭവന പദ്ധതി (ഘട്ടം 3)</h4>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-[12px] text-slate-500 mb-4 font-medium leading-relaxed">Financial assistance for landless homeless families.</p>
                                <button className="w-full bg-blue-600 text-white font-black py-3 rounded-xl text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                                    Apply Now — ഘട്ടം 3
                                </button>
                            </div>

                            {/* Scheme 2 */}
                            <div className="group bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-black text-slate-800 text-[15px] font-malayalam leading-tight">വയോമിത്രം പദ്ധതി</h4>
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                </div>
                                <p className="text-[12px] text-slate-500 mb-4 font-medium leading-relaxed">Free healthcare and medicines for senior citizens (65+).</p>
                                <button className="w-full bg-slate-800 text-white font-black py-3 rounded-xl text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 4: Complaint Box */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="col-span-2 bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-lg shadow-blue-50 border border-sky-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-700 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>

                        <div className="flex items-center justify-between mb-4 relative z-10 w-full overflow-hidden">
                            <div className="flex items-center gap-3 shrink-1">
                                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div className="hidden sm:block">
                                    <h3 className="font-bold text-slate-800 text-base font-malayalam whitespace-nowrap">പരാതി പെട്ടി</h3>
                                    <p className="text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest">Complaint Box</p>
                                </div>
                            </div>
                            <div className="flex gap-1 bg-sky-50 border border-sky-200 p-1 rounded-xl shrink-0">
                                <button
                                    onClick={() => setComplaintView("submit")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${complaintView === 'submit' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                                ><Plus className="w-3.5 h-3.5 inline mr-1" />New</button>
                                <button
                                    onClick={() => setComplaintView("track")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${complaintView === 'track' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                                ><Search className="w-3.5 h-3.5 inline mr-1" />Track</button>
                            </div>
                        </div>

                        {complaintView === "submit" ? (
                            <form onSubmit={handleComplaintSubmit} className="space-y-3 relative z-10">
                                <textarea
                                    value={complaintText}
                                    onChange={(e) => setComplaintText(e.target.value)}
                                    placeholder="നിങ്ങളുടെ പരാതികൾ ഇവിടെ രേഖപ്പെടുത്തുക ലെ... (Write your complaint...)"
                                    className="w-full bg-sky-50 border border-sky-200 rounded-2xl p-4 text-sm font-medium text-slate-800 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-shadow resize-none placeholder:text-slate-400"
                                    required
                                ></textarea>

                                {complaintImage && (
                                    <div className="text-xs text-purple-300 font-medium bg-slate-900/50 p-2 rounded-lg flex items-center gap-2 border border-slate-700">
                                        <ImageIcon className="w-4 h-4" />
                                        {complaintImage.name}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-500 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-colors"
                                    >
                                        <ImageIcon className="w-5 h-5" />
                                    </button>
                                    <button type="submit" className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold font-malayalam rounded-xl flex items-center justify-center gap-2 hover:from-sky-600 hover:to-blue-700 transition-colors text-sm shadow-md">
                                        <Send className="w-4 h-4" /> അയക്കുക (Send)
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4 relative z-10 animate-fade-in">
                                <form onSubmit={handleTrack} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter ID (e.g., CMP-2026-1055)"
                                        value={trackIdInput}
                                        onChange={(e) => setTrackIdInput(e.target.value)}
                                        className="flex-1 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 placeholder:text-slate-400 uppercase"
                                        required
                                    />
                                    <button type="submit" className="bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold font-sans text-xs hover:bg-slate-600 transition-colors shadow-sm">
                                        Track
                                    </button>
                                </form>

                                {trackedResult && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-1">ID: {trackedResult.id}</p>
                                                <p className="text-sm text-slate-200 line-clamp-1">{trackedResult.text}</p>
                                            </div>
                                            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-medium mt-0.5">{trackedResult.date}</span>
                                        </div>

                                        <div className="relative pt-2 pb-1">
                                            {/* Progress Bar Background */}
                                            <div className="absolute top-[8px] sm:top-[12px] left-4 right-4 h-0.5 bg-slate-700 z-0"></div>
                                            {/* Active Progress Bar */}
                                            <div className="absolute top-[8px] sm:top-[12px] left-4 h-0.5 bg-purple-500 z-0 transition-all duration-1000 ease-out" style={{ width: `${(trackedResult.status - 1) * 33.33}% ` }}></div>

                                            <div className="flex justify-between relative z-10">
                                                {[
                                                    { id: 1, label: 'Submitted' },
                                                    { id: 2, label: 'Review' },
                                                    { id: 3, label: 'In Progress' },
                                                    { id: 4, label: 'Resolved' }
                                                ].map((step) => (
                                                    <div key={step.id} className="flex flex-col items-center flex-1">
                                                        <div className={`w - 4 h - 4 sm: w - 6 sm: h - 6 rounded - full flex items - center justify - center mb - 1 sm: mb - 2 border sm: border - 2 transition - colors duration - 500 ${trackedResult.status >= step.id ? 'bg-purple-500 border-purple-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-600'} `}>
                                                            {trackedResult.status > step.id ? (
                                                                <CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                                                            ) : trackedResult.status === step.id ? (
                                                                <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 animate-pulse" />
                                                            ) : (
                                                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-600"></div>
                                                            )}
                                                        </div>
                                                        <span className={`text - [8px] sm: text - [9px] font - bold uppercase tracking - wider text - center px - 1 ${trackedResult.status >= step.id ? 'text-purple-300' : 'text-slate-500 hidden sm:block'} `}>
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 5-Star Rating System for Resolved Complaints */}
                                        {trackedResult.status === 4 && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 pt-5 border-t border-slate-700/50 flex flex-col items-center">
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Rate Resolution</p>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => handleRating(trackedResult.id, star)}
                                                            className="focus:outline-none transition-transform hover:scale-125 hover:-rotate-6 active:scale-95"
                                                        >
                                                            <Star className={`w - 7 h - 7 ${(ratings[trackedResult.id] || 0) >= star
                                                                ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                                                                : 'text-slate-600'
                                                                } `} />
                                                        </button>
                                                    ))}
                                                </div>
                                                {(ratings[trackedResult.id] || 0) > 0 && (
                                                    <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-green-400 mt-3 font-bold bg-green-400/10 px-3 py-1.5 rounded-lg border border-green-400/20">
                                                        Thanks for your feedback!
                                                    </motion.span>
                                                )}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Demo Simulate Button */}
                                {trackedResult && trackedResult.status < 4 && (
                                    <button
                                        onClick={simulateAdminUpdate}
                                        className="mt-2 w-full bg-slate-800/50 border border-slate-700 border-dashed text-slate-400 py-3 rounded-2xl text-xs font-bold hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Clock className="w-3.5 h-3.5" /> (Demo) Advance Status
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>

                </div>

                {/* ═══════════════════════════════════════════
                    DIGITAL VILLAGE PORTAL
                ═══════════════════════════════════════════ */}

                {/* Section Divider */}
                <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm whitespace-nowrap flex items-center gap-1.5">
                        <Shield className="w-2.5 h-2.5" /> Digital Village Portal
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
                </div>

                {/* ── Digital Village Portal: Main Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                    className="rounded-[28px] bg-white/80 backdrop-blur-xl border border-sky-100 shadow-lg overflow-hidden"
                >
                    <div className="p-5 md:p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none" />

                        {/* Portal Header with official seal feel */}
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 shadow-md">
                                <Building2 className="w-7 h-7 text-blue-700" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[18px] font-black text-slate-800 tracking-tight">Village Office Services</h3>
                                <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.15em] mt-0.5">Official e-District Portal</p>
                            </div>
                            <div className="shrink-0">
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse inline-block" />
                                    ONLINE
                                </span>
                            </div>
                        </div>
                        <p className="text-[12px] text-slate-500 mb-6 ml-[64px] font-medium leading-snug">
                            Access all Kerala e-District services securely.
                        </p>

                        {/* ── 3 Hero Service Buttons ── */}
                        <div className="grid grid-cols-3 gap-2.5 mb-3">
                            {[
                                {
                                    label: 'Land Tax',
                                    mal: 'ഭൂനികുതി',
                                    url: 'https://edistrict.kerala.gov.in/',
                                    emoji: '🏠',
                                    color: 'from-green-600/30 to-emerald-700/20 border-green-400/30 text-green-200',
                                    tag: 'Pay Now',
                                },
                                {
                                    label: 'Income Cert.',
                                    mal: 'വരുമാന സർട്ടിഫിക്കറ്റ്',
                                    url: 'https://edistrict.kerala.gov.in/',
                                    emoji: '📄',
                                    color: 'from-indigo-600/30 to-blue-700/20 border-indigo-400/30 text-indigo-200',
                                    tag: 'Apply',
                                },
                                {
                                    label: 'App. Status',
                                    mal: 'അപേക്ഷ സ്ഥിതി',
                                    url: 'https://edistrict.kerala.gov.in/',
                                    emoji: '🔍',
                                    color: 'from-violet-600/30 to-purple-700/20 border-violet-400/30 text-violet-200',
                                    tag: 'Track',
                                },
                            ].map((svc) => (
                                <a
                                    key={svc.label}
                                    href={svc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-col items-center text-center gap-2 rounded-2xl p-3.5 border border-sky-200 bg-sky-50 hover:bg-sky-100 transition-all active:scale-95 group`}
                                >
                                    <span className="text-2xl">{svc.emoji}</span>
                                    <div>
                                        <p className="text-[12px] font-black text-slate-800 leading-tight">{svc.label}</p>
                                        <p className="text-[8px] font-medium text-slate-400 font-malayalam mt-0.5 leading-tight">{svc.mal}</p>
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-wider bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200 group-hover:bg-blue-200 transition-colors">
                                        {svc.tag} →
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* ── Secondary Links Row ── */}
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: 'Caste Certificate', mal: 'ജാതി സർട്ടിഫിക്കറ്റ്', url: 'https://edistrict.kerala.gov.in/', icon: FileBadge },
                                { label: 'Possession Cert.', mal: 'കൈവശ സർട്ടിഫിക്കറ്റ്', url: 'https://edistrict.kerala.gov.in/', icon: Landmark },
                            ].map((svc) => {
                                const Icon = svc.icon;
                                return (
                                    <a
                                        key={svc.label}
                                        href={svc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-2xl p-3.5 border border-sky-100 bg-sky-50 hover:bg-sky-100 transition-all group active:scale-95"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-bold text-slate-800 leading-tight truncate">{svc.label}</p>
                                            <p className="text-[9px] text-slate-400 font-malayalam">{svc.mal}</p>
                                        </div>
                                        <ExternalLink className="w-3 h-3 text-blue-300/30 group-hover:text-blue-300/60 transition-colors shrink-0 ml-auto" />
                                    </a>
                                );
                            })}
                        </div>

                        <p className="text-center text-[10px] text-blue-300/25 font-semibold mt-4">
                            Opens official Kerala e-District portal in browser
                        </p>
                    </div>
                </motion.div>

                {/* ── Village Guide: Manual Services ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="rounded-[28px] bg-white/80 backdrop-blur-xl border border-sky-100 shadow-lg overflow-hidden"
                >
                    <div className="bg-white/50 backdrop-blur-[20px] rounded-[27px] p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                                <ClipboardEdit className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-black text-slate-800 tracking-tight">Village Guide</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Manual Services — Physical Forms</p>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            {/* Guide cards */}
                            {[
                                {
                                    id: 'mutation',
                                    title: 'Mutation (പോക്കുവരവ്)',
                                    tag: 'Land Transfer',
                                    tagColor: 'text-green-300 bg-green-500/20 border-green-400/25',
                                    docs: [
                                        'Sale deed / Gift deed (registered)',
                                        'Previous land tax receipt',
                                        'Aadhaar card of new owner',
                                        'Application form (from Village Office)',
                                        'Attested copy of Thandaper (survey no.)',
                                    ],
                                    steps: [
                                        'Collect application from Village Office or download from e-District',
                                        'Attach all required documents above',
                                        'Submit at Village Office counter with ₹10 stamp',
                                        'Receive acknowledgement with tracking number',
                                        'Mutation entry usually done within 30 working days',
                                    ],
                                },
                                {
                                    id: 'correction',
                                    title: 'Correction of Records',
                                    tag: 'Record Fix',
                                    tagColor: 'text-rose-300 bg-rose-500/20 border-rose-400/25',
                                    docs: [
                                        'Proof of original (SSLC / Aadhaar / Ration card)',
                                        'Existing document with the error',
                                        'Affidavit (from notary) if name mismatch',
                                        'Gazette notification (if applicable)',
                                    ],
                                    steps: [
                                        'Visit Village Office with originals + copies',
                                        'Fill Correction Application Form (Form 8)',
                                        'Village Officer verifies documents',
                                        'Correction order issued within 15 days',
                                        'Collect corrected certificate in person',
                                    ],
                                },
                            ].map((guide) => (
                                <div key={guide.id} className="rounded-2xl bg-sky-50 border border-sky-100 overflow-hidden">
                                    <button
                                        onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                                        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-white/[0.04] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${guide.tagColor}`}>{guide.tag}</span>
                                            <p className="text-[13px] font-bold text-slate-800">{guide.title}</p>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-blue-300/50 shrink-0 transition-transform duration-200 ${expandedGuide === guide.id ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {expandedGuide === guide.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 pb-4 space-y-3 border-t border-sky-100 pt-3">
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-2">Required Documents</p>
                                                        <ul className="space-y-1.5">
                                                            {guide.docs.map((doc, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600">
                                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                                                    {doc}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-2">Steps</p>
                                                        <ol className="space-y-1.5">
                                                            {guide.steps.map((step, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600">
                                                                    <span className="w-4 h-4 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[8px] font-black text-blue-600 shrink-0 mt-0.5">{i + 1}</span>
                                                                    {step}
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Smart Fill Form ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                    className="rounded-[28px] bg-white/80 backdrop-blur-xl border border-sky-100 shadow-lg overflow-hidden"
                >
                    <div className="p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
                                <CreditCard className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-black text-slate-800 tracking-tight">Smart Fill</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Pre-fill your details · Copy to e-District</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-blue-200/40 mb-4 ml-[52px] leading-snug">
                            Save your basic info here, then copy and paste directly on e-District forms.
                        </p>

                        <div className="space-y-3">
                            {[
                                { key: 'name', label: 'Full Name (as in records)', placeholder: 'e.g. Rajan K. Nair', type: 'text' },
                                { key: 'houseNo', label: 'House / Panchayat Number', placeholder: 'e.g. P-14', type: 'text' },
                                { key: 'surveyNo', label: 'Survey / Thandaper Number', placeholder: 'e.g. 124/B3', type: 'text' },
                                { key: 'aadhaarLast4', label: 'Aadhaar Last 4 Digits', placeholder: 'e.g. 5678', type: 'number', max: 4 },
                            ].map((field) => (
                                <div key={field.key}>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-blue-300/40 mb-1">{field.label}</p>
                                    <input
                                        type={field.type}
                                        maxLength={field.max || 80}
                                        placeholder={field.placeholder}
                                        value={smartFill[field.key]}
                                        onChange={e => setSmartFill(prev => ({ ...prev, [field.key]: e.target.value }))}
                                        className="w-full bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-sky-100 transition-all"
                                    />
                                </div>
                            ))}

                            <motion.button
                                onClick={() => {
                                    const text = `Name: ${smartFill.name}\nHouse No: ${smartFill.houseNo}\nSurvey No: ${smartFill.surveyNo}\nAadhaar (Last 4): ${smartFill.aadhaarLast4}`;
                                    navigator.clipboard?.writeText(text);
                                    setSmartFillCopied(true);
                                    setTimeout(() => setSmartFillCopied(false), 2500);
                                }}
                                disabled={!smartFill.name}
                                whileTap={{ scale: 0.97 }}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-[13px] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                                style={{ background: smartFillCopied ? 'linear-gradient(135deg,#16a34a,#15803d)' : 'linear-gradient(135deg,#3b82f6,#6366f1)' }}
                            >
                                {smartFillCopied
                                    ? <><Check className="w-4 h-4" /> Copied to Clipboard!</>
                                    : <><Copy className="w-4 h-4" /> Copy Details for e-District</>}
                            </motion.button>

                            <a
                                href="https://edistrict.kerala.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-3 rounded-2xl text-[12px] font-bold text-blue-500 hover:text-blue-700 transition-colors border border-sky-200 hover:bg-sky-50 bg-sky-50/50"
                            >
                                <ExternalLink className="w-3.5 h-3.5" /> Open e-District Kerala
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* ── Village Office Info Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
                    className="rounded-[28px] bg-white/80 backdrop-blur-xl border border-sky-100 shadow-lg overflow-hidden"
                >
                    <div className="p-5 md:p-6 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600/10 blur-[40px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-rose-500" />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-black text-slate-800 tracking-tight">Village Office</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Panayi · Contact &amp; Hours</p>
                            </div>
                        </div>

                        {/* Info rows */}
                        <div className="space-y-3">
                            {/* Location */}
                            <div className="flex items-start gap-3 rounded-2xl bg-sky-50 border border-sky-100 p-3.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-0.5">Location</p>
                                    <p className="text-[13px] font-bold text-slate-800 leading-snug">Panayi Village Office</p>
                                    <p className="text-[11px] text-slate-500 leading-snug font-malayalam">പനായി വില്ലേജ് ഓഫീസ്, Kozhikode Dist.</p>
                                </div>
                            </div>

                            {/* Contact — tappable */}
                            <a
                                href="tel:+914952480100"
                                className="flex items-start gap-4 rounded-2xl bg-white border border-sky-100 p-4 hover:bg-sky-50 transition-all active:scale-[0.98] group shadow-sm"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                    <PhoneCall className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Contact Number</p>
                                    <p className="text-[15px] font-black text-slate-800 group-hover:text-emerald-700 transition-colors">0495 248 0100</p>
                                    <p className="text-[10px] text-slate-400 font-bold font-sans mt-0.5">Tap to call Village Office directly</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors shrink-0 mt-1" />
                            </a>

                            {/* Working Hours */}
                            <div className="rounded-2xl bg-white border border-sky-100 p-4 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Working Hours</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { days: 'Mon – Fri', time: '10:00 AM – 5:00 PM', color: 'text-emerald-700 bg-emerald-50' },
                                        { days: 'Saturday', time: '10:00 AM – 1:00 PM', color: 'text-amber-700 bg-amber-50' },
                                        { days: 'Sunday', time: 'Closed', color: 'text-rose-700 bg-rose-50' },
                                        { days: 'Public Holidays', time: 'Closed', color: 'text-rose-700 bg-rose-50' },
                                    ].map((row, i) => (
                                        <div key={i} className={`flex flex-col gap-1 p-3.5 rounded-2xl border border-slate-100 shadow-sm ${row.color.split(' ')[1]}`}>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{row.days}</p>
                                            <p className={`text-[13px] font-black ${row.color.split(' ')[0]} mt-0.5`}>{row.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-[10px] text-blue-300/25 font-semibold mt-4">
                            Panayi Village Office · Ward 18, Kozhikode
                        </p>
                    </div>
                </motion.div>

                {/* ─────────────────────────────────────────────
                    SECTION DIVIDER — Ward Engagement
                ───────────────────────────────────────────── */}
                <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm whitespace-nowrap">
                        Ward 18 · Community
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                </div>

                {/* ══ 1. WARD CALENDAR ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="rounded-[28px] bg-gradient-to-br from-[#1E3A8A] via-[#1a2f6e] to-[#0d1440] border border-blue-400/20 shadow-2xl overflow-hidden p-[1px]"
                >
                    <div className="bg-white/[0.04] backdrop-blur-[20px] rounded-[27px] border border-white/[0.07] p-5 md:p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                                <CalendarDays className="w-5 h-5 text-blue-300" />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-black text-white tracking-tight font-malayalam">വാർഡ് കലണ്ടർ</h3>
                                <p className="text-[10px] text-blue-300/50 font-bold uppercase tracking-widest mt-0.5">Ward Calendar · Upcoming Events</p>
                            </div>
                        </div>

                        {/* Event List */}
                        <div className="space-y-3">
                            {[
                                {
                                    date: 'Feb 28',
                                    day: 'Fri',
                                    title: 'Anganwadi Distribution',
                                    mal: 'അൻഗൻവാടി വിതരണം',
                                    time: '9:00 AM',
                                    venue: 'Anganwadi Centre, Ward 18',
                                    color: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300',
                                    dot: 'bg-emerald-400',
                                },
                                {
                                    date: 'Mar 04',
                                    day: 'Tue',
                                    title: 'Kudumbashree Meeting',
                                    mal: 'കുടുംബശ്രീ യോഗം',
                                    time: '2:00 PM',
                                    venue: 'Ward Office, Panayi',
                                    color: 'bg-violet-500/20 border-violet-400/30 text-violet-300',
                                    dot: 'bg-violet-400',
                                },
                                {
                                    date: 'Mar 10',
                                    day: 'Mon',
                                    title: 'Gramasabha Meeting',
                                    mal: 'ഗ്രാമസഭ',
                                    time: '10:00 AM',
                                    venue: 'Panchayat Hall',
                                    color: 'bg-amber-500/20 border-amber-400/30 text-amber-300',
                                    dot: 'bg-amber-400',
                                },
                            ].map((event, i) => (
                                <div key={i} className={`flex items-stretch gap-3 rounded-2xl border p-3.5 ${event.color}`}>
                                    {/* Date block */}
                                    <div className="flex flex-col items-center justify-center w-12 shrink-0 text-center">
                                        <span className="text-[10px] font-bold uppercase opacity-60">{event.day}</span>
                                        <span className="text-[18px] font-black text-slate-700 leading-none">{event.date.split(' ')[1]}</span>
                                        <span className="text-[9px] font-bold uppercase opacity-60">{event.date.split(' ')[0]}</span>
                                    </div>
                                    {/* Divider dot line */}
                                    <div className="flex flex-col items-center gap-1 py-1">
                                        <div className={`w-2 h-2 rounded-full shrink-0 ${event.dot}`}></div>
                                        <div className="flex-1 w-px bg-white/10"></div>
                                    </div>
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-black text-slate-800 leading-tight">{event.title}</p>
                                        <p className="text-[10px] font-medium text-slate-500 font-malayalam mt-0.5">{event.mal}</p>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <span className="text-[10px] font-bold opacity-60 flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" />{event.time}
                                            </span>
                                            <span className="text-[10px] font-medium opacity-50 truncate">{event.venue}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ══ 2. TALENTS OF WARD 18 ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                    className="rounded-[28px] bg-white/80 backdrop-blur-xl border border-sky-100 shadow-lg overflow-hidden"
                >
                    <div className="p-5 md:p-6 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-100 opacity-30 blur-[50px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                                <Trophy className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-black text-white tracking-tight font-malayalam">വാർഡ് 18 ൻ്റെ പ്രതിഭകൾ</h3>
                                <p className="text-[10px] text-purple-300/50 font-bold uppercase tracking-widest mt-0.5">Talents of Ward 18 · Spotlight</p>
                            </div>
                        </div>

                        {/* Talent Cards */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    name: 'Arjun P.',
                                    achievement: 'State Chess Champion',
                                    mal: 'ചെസ്സ് ജേതാവ്',
                                    emoji: '♟️',
                                    badge: 'Sports',
                                    badgeColor: 'bg-blue-500/20 border-blue-400/25 text-blue-300',
                                },
                                {
                                    name: 'Meera S.',
                                    achievement: 'District Art Winner',
                                    mal: 'ചിത്രകലാ ജേതാവ്',
                                    emoji: '🎨',
                                    badge: 'Arts',
                                    badgeColor: 'bg-pink-500/20 border-pink-400/25 text-pink-300',
                                },
                                {
                                    name: 'Rohit K.',
                                    achievement: '100% Score — 10th',
                                    mal: 'സ്കൂൾ ടോപ്പർ',
                                    emoji: '📚',
                                    badge: 'Academics',
                                    badgeColor: 'bg-emerald-500/20 border-emerald-400/25 text-emerald-300',
                                },
                            ].map((talent, i) => (
                                <div key={i} className="flex flex-col items-center text-center rounded-2xl bg-sky-50 border border-sky-100 p-3 gap-2">
                                    <div className="w-12 h-12 rounded-full bg-white border border-sky-100 flex items-center justify-center text-2xl">
                                        {talent.emoji}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[12px] font-black text-slate-800 leading-tight">{talent.name}</p>
                                        <p className="text-[9px] text-slate-400 font-medium font-malayalam leading-snug">{talent.mal}</p>
                                    </div>
                                    <p className="text-[9px] text-slate-500 font-medium leading-tight">{talent.achievement}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-[10px] text-purple-300/30 font-semibold mt-4">
                            Celebrating local heroes of Ward 18, Panayi
                        </p>
                    </div>
                </motion.div>

                {/* ══ 3. UTILITY STATUS ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    className="rounded-[28px] bg-white/80 backdrop-blur-xl border border-sky-100 shadow-lg overflow-hidden"
                >
                    <div className="bg-white/[0.04] backdrop-blur-[20px] rounded-[27px] border border-white/[0.07] p-5 md:p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                                <Zap className="w-5 h-5 text-cyan-300" />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-black text-white tracking-tight font-malayalam">യൂട്ടിലിറ്റി സ്ഥിതി</h3>
                                <p className="text-[10px] text-blue-300/50 font-bold uppercase tracking-widest mt-0.5">Utility Status · Ward 18</p>
                            </div>
                        </div>

                        {/* Status Row */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    icon: Droplets,
                                    label: 'Water',
                                    mal: 'ജലം',
                                    status: 'Normal',
                                    statusMal: 'സാധാരണ',
                                    isNormal: true,
                                    iconColor: 'text-sky-300',
                                    iconBg: 'bg-sky-500/20 border-sky-400/30',
                                },
                                {
                                    icon: Zap,
                                    label: 'Electricity',
                                    mal: 'വൈദ്യുതി',
                                    status: 'Delayed',
                                    statusMal: 'കാലതാമസം',
                                    isNormal: false,
                                    iconColor: 'text-yellow-300',
                                    iconBg: 'bg-yellow-500/20 border-yellow-400/30',
                                },
                                {
                                    icon: Trash2,
                                    label: 'Waste',
                                    mal: 'മാലിന്യം',
                                    status: 'Normal',
                                    statusMal: 'സാധാരണ',
                                    isNormal: true,
                                    iconColor: 'text-green-300',
                                    iconBg: 'bg-green-500/20 border-green-400/30',
                                },
                            ].map((util, i) => {
                                const Icon = util.icon;
                                return (
                                    <div key={i} className="flex flex-col items-center text-center rounded-2xl bg-sky-50 border border-sky-100 p-4 gap-2.5">
                                        <div className={`w-11 h-11 rounded-xl bg-${util.iconColor.split('-')[1]}-100 border border-${util.iconColor.split('-')[1]}-200 flex items-center justify-center`}>
                                            <Icon className={`w-5 h-5 ${util.iconColor}`} />
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-black text-slate-800">{util.label}</p>
                                            <p className="text-[9px] text-slate-400 font-malayalam">{util.mal}</p>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${util.isNormal
                                            ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                                            : 'bg-red-100 border-red-200 text-red-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full inline-block ${util.isNormal ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-pulse'}`}></span>
                                            {util.status}
                                        </span>
                                        <p className="text-[8px] text-slate-400 font-malayalam">{util.statusMal}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-center text-[10px] text-blue-300/25 font-semibold mt-4">
                            Last updated: Today, 6:00 PM · Ward 18 Operations
                        </p>
                    </div>
                </motion.div>

            </div >
        </div >
    );
}

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowLeft, Bell, CreditCard, FileText,
    Landmark, ScrollText, Send, Phone,
    AlertCircle, FileCheck, CheckCircle2,
    Image as ImageIcon, Search, Plus, Clock, CheckCircle, Star,
    X, Users, Briefcase, Home, MessageSquare
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
        <div className="flex flex-col h-screen w-full bg-slate-50 relative overflow-y-auto no-scrollbar lg:items-center pb-24">
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
                            className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-2xl shadow-floating flex items-center gap-3 font-medium text-sm"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                <Bell className="w-4 h-4 text-purple-400" />
                            </div>
                            {notif}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Header Area */}
            <div className="bg-purple-600 px-6 pt-12 pb-24 rounded-b-[2.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
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
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-purple-600 rounded-full animate-pulse"></span>
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

                    {/* Feature 1: K-SMART Direct */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-2 bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-base font-malayalam">K-SMART സേവനങ്ങൾ</h3>
                                <p className="text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest">K-SMART Direct</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => openWebView("https://ksmart.lsgkerala.gov.in/property-tax", "കെട്ടിട നികുതി")} className="bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all p-3 rounded-2xl flex flex-col items-center gap-2 group focus:outline-none focus:ring-4 focus:ring-purple-100 text-center">
                                <Landmark className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
                                <div>
                                    <h4 className="font-bold text-slate-700 text-[11px] sm:text-xs font-malayalam leading-tight">കെട്ടിട നികുതി</h4>
                                    <p className="text-[8px] text-slate-500 font-sans uppercase mt-0.5 font-bold">Property Tax</p>
                                </div>
                            </button>

                            <button onClick={() => openWebView("https://ksmart.lsgkerala.gov.in/civil-registration", "ജനന/മരണ/വിവാഹ രജിസ്ട്രേഷൻ")} className="bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all p-3 rounded-2xl flex flex-col items-center gap-2 group focus:outline-none focus:ring-4 focus:ring-purple-100 text-center">
                                <Users className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
                                <div>
                                    <h4 className="font-bold text-slate-700 text-[11px] sm:text-xs font-malayalam leading-tight">ജനന/മരണ/വിവാഹ രജിസ്ട്രേഷൻ</h4>
                                    <p className="text-[8px] text-slate-500 font-sans uppercase mt-0.5 font-bold">Civil Registration</p>
                                </div>
                            </button>

                            <button onClick={() => openWebView("https://ksmart.lsgkerala.gov.in/trade-license", "വ്യാപാര ലൈസൻസുകൾ")} className="bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all p-3 rounded-2xl flex flex-col items-center gap-2 group focus:outline-none focus:ring-4 focus:ring-purple-100 text-center">
                                <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
                                <div>
                                    <h4 className="font-bold text-slate-700 text-[11px] sm:text-xs font-malayalam leading-tight">വ്യാപാര ലൈസൻസുകൾ</h4>
                                    <p className="text-[8px] text-slate-500 font-sans uppercase mt-0.5 font-bold">Trade Licenses</p>
                                </div>
                            </button>

                            <button onClick={() => openWebView("https://ksmart.lsgkerala.gov.in/building-permit", "കെട്ടിട നിർമ്മാണ അനുമതി")} className="bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all p-3 rounded-2xl flex flex-col items-center gap-2 group focus:outline-none focus:ring-4 focus:ring-purple-100 text-center">
                                <Home className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
                                <div>
                                    <h4 className="font-bold text-slate-700 text-[11px] sm:text-xs font-malayalam leading-tight">കെട്ടിട നിർമ്മാണ അനുമതി</h4>
                                    <p className="text-[8px] text-slate-500 font-sans uppercase mt-0.5 font-bold">Building Permits</p>
                                </div>
                            </button>

                            <button onClick={() => openWebView("https://ksmart.lsgkerala.gov.in/grievance", "പരാതി പരിഹാരം")} className="col-span-2 bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all p-3 rounded-2xl flex flex-row items-center justify-center gap-3 group focus:outline-none focus:ring-4 focus:ring-purple-100 text-left">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                    <MessageSquare className="w-4 h-4 text-purple-600 transition-colors group-hover:scale-110" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-[11px] sm:text-xs font-malayalam leading-tight">പരാതി പരിഹാരം</h4>
                                    <p className="text-[8px] text-slate-500 font-sans uppercase mt-0.5 font-bold">Public Grievance</p>
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Feature 2: Village Guide */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2rem] p-6 shadow-floating border border-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                                <FileCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-indigo-900 text-base font-malayalam">വില്ലേജ് ഗൈഡ്</h3>
                                <p className="text-[10px] font-bold font-sans text-indigo-400 uppercase tracking-widest">Village Guide</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Document Requirement 1 */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100/50">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-slate-800 text-sm font-malayalam">വരുമാന സർട്ടിഫിക്കറ്റ്</h4>
                                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase font-bold">Income</span>
                                </div>
                                <ul className="text-xs text-slate-500 font-sans space-y-1.5 pl-1">
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Ration Card Copy</li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Aadhaar Card</li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Land Tax Receipt (Current Year)</li>
                                </ul>
                            </div>

                            {/* Document Requirement 2 */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100/50">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-slate-800 text-sm font-malayalam">ജാതി സർട്ടിഫിക്കറ്റ്</h4>
                                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase font-bold">Caste</span>
                                </div>
                                <ul className="text-xs text-slate-500 font-sans space-y-1.5 pl-1">
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> SSLC Book / School Certificate</li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Parents' Caste Document</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 3: Panchayat Schemes */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="col-span-2 bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <ScrollText className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-base font-malayalam">പഞ്ചായത്ത് പദ്ധതികൾ</h3>
                                <p className="text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest">Panchayat Schemes</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Scheme 1 */}
                            <div className="relative pl-4 border-l-2 border-green-200">
                                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-green-500 ring-4 ring-white"></span>
                                <h4 className="font-bold text-slate-800 text-sm font-malayalam mb-1">ലൈഫ് മിഷൻ ഭവന പദ്ധതി (ഘട്ടം 3)</h4>
                                <p className="text-xs text-slate-500 mb-2 font-sans">Financial assistance for landless homeless families.</p>
                                <button className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-green-100 transition-colors">Apply Now</button>
                            </div>

                            {/* Scheme 2 */}
                            <div className="relative pl-4 border-l-2 border-slate-100">
                                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300 ring-4 ring-white"></span>
                                <h4 className="font-bold text-slate-800 text-sm font-malayalam mb-1">വയോമിത്രം പദ്ധതി</h4>
                                <p className="text-xs text-slate-500 mb-2 font-sans">Free healthcare and medicines for senior citizens (65+).</p>
                                <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-blue-100 transition-colors">Apply Now</button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 4: Complaint Box */}
                    <motion.div id="complaint" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="col-span-2 bg-slate-800 rounded-[2rem] p-6 shadow-floating relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-700 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>

                        <div className="flex items-center justify-between mb-4 relative z-10 w-full overflow-hidden">
                            <div className="flex items-center gap-3 shrink-1">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div className="hidden sm:block">
                                    <h3 className="font-bold text-white text-base font-malayalam whitespace-nowrap">പരാതി പെട്ടി</h3>
                                    <p className="text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest">Complaint Box</p>
                                </div>
                            </div>
                            <div className="flex gap-1 bg-slate-900 border border-slate-700 p-1 rounded-xl shrink-0">
                                <button
                                    onClick={() => setComplaintView("submit")}
                                    className={`px - 3 py - 1.5 rounded - lg text - xs font - bold transition - all ${complaintView === 'submit' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'} `}
                                ><Plus className="w-3.5 h-3.5 inline mr-1" />New</button>
                                <button
                                    onClick={() => setComplaintView("track")}
                                    className={`px - 3 py - 1.5 rounded - lg text - xs font - bold transition - all ${complaintView === 'track' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'} `}
                                ><Search className="w-3.5 h-3.5 inline mr-1" />Track</button>
                            </div>
                        </div>

                        {complaintView === "submit" ? (
                            <form onSubmit={handleComplaintSubmit} className="space-y-3 relative z-10">
                                <textarea
                                    value={complaintText}
                                    onChange={(e) => setComplaintText(e.target.value)}
                                    placeholder="നിങ്ങളുടെ പരാതികൾ ഇവിടെ രേഖപ്പെടുത്തുക ലെ... (Write your complaint...)"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm font-medium text-white min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow resize-none placeholder:text-slate-500"
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
                                        className="p-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-600 transition-colors"
                                    >
                                        <ImageIcon className="w-5 h-5" />
                                    </button>
                                    <button type="submit" className="flex-1 bg-purple-600 text-white font-bold font-malayalam rounded-xl flex items-center justify-center gap-2 hover:bg-purple-500 transition-colors text-sm shadow-md">
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
                                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-slate-500 uppercase"
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
            </div>
        </div>
    );
}
